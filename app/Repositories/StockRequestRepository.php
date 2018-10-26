<?php

namespace App\Repositories;

use App\Branch;
use App\StockRequest;
use App\Warehouse;
use Illuminate\Support\Facades\DB;


class StockRequestRepository extends Repository
{
    /**
     * Branch model.
     *
     * @var App\Branch
     */
    protected $branch;

    /**
     * Warehouse model.
     *
     * @var App\Warehouse
     */
    protected $warehouse;

    /**
     * Create new instance of stock request repository.
     *
     * @param StockRequest $stockRequest Stock Request Model
     * @param Branch       $branch       Branch Model
     * @param Warehouse    $warehouse    Warehouse Model
     */
    public function __construct(
        StockRequest $stockRequest,
        Branch $branch,
        Warehouse $warehouse
    ) {
        parent::__construct($stockRequest);
        $this->stockRequest = $stockRequest;
        $this->branch       = $branch;
        $this->warehouse    = $warehouse;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            //insert Stock Requestable from and to type
            $this->insertStockRequestable($request);
            // store stock request 
            $stockRequest = $this->stockRequest->create($request->all());
            //store stock request items
            $stockRequest->stockRequestItems()->createMany($request->stock_request_items);

            return  $stockRequest;
        });
    }

    public function insertStockRequestable($request)
    {
        //check if the stock requestable to type is warehouse
        if (mb_strtolower($request->stock_requestable_to_type) == 'warehouse') {
            $stockRequestableToType = get_class($this->warehouse);
        }

        //check if the stock requestable to type is branch
        if (mb_strtolower($request->stock_requestable_to_type) == 'branch') {
            $stockRequestableToType = get_class($this->branch);
        }

        //check if the stock requestable from type is warehouse
        if (mb_strtolower($request->stock_requestable_from_type) == 'warehouse') {
            $stockRequestableFromType = get_class($this->warehouse);
        }

        //check if the stock requestable from type is branch
        if (mb_strtolower($request->stock_requestable_from_type) == 'branch') {
            $stockRequestableFromType = get_class($this->branch);
        }
        
        return $request->request->add(['stock_requestable_to_type' => $stockRequestableToType, 'stock_requestable_from_type' => $stockRequestableFromType]);
    }

    public function all()
    {
        return $this->stockRequest->with('stockRequestableFrom', 'stockRequestableTo', 'approveBy', 'user')
            ->get();
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->stockRequest->with('stockRequestableFrom', 'stockRequestableTo', 'approveBy', 'user')
            ->filter($request)
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->stockRequest->createPaginationUrl($request, $removePage)
            );
    }

    public function findOrFail($id)
    {
        return  $this->stockRequest->with([
            'stockRequestableFrom', 
            'stockRequestableTo', 
            'approveBy', 
            'user', 
            'stockRequestItems' => function ($query) {
                $query->with('item', 'unitOfMeasurement');
            }
        ])->findOrFail($id);
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) { 
            //find stock request
            $stockRequest = $this->stockRequest->findOrFail($id);
            // check if status is equal to 0 = pending
            if ($stockRequest->status == 0) {
                if (count($request->status)) {
                    //insert Stock Request Approve By
                    $request->request->add(['approve_by' => auth('api')->user()->id]);

                } else {
                    //insert Stock Requestable from and to type
                    $this->insertStockRequestable($request);
                }
                
                //update stock request
                $stockRequest->fill($request->all());
                $stockRequest->save();

                // check if stock request items is exist
                if ($request->has('stock_request_items')) {
                    //soft delete the stock request items where not in the stock request items array
                    $stockRequest->stockRequestItems()->delete();
                    //create new stock request items
                    $StockRequest->stockRequestItems()->createMany($request->stock_request_items);
                }

                return $stockRequest;
            }

            return null;
        });
    }
}
