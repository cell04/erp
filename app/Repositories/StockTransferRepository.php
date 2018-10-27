<?php

namespace App\Repositories;

use App\Branch;
use App\Warehouse;
use App\StockTransfer;
use Illuminate\Support\Facades\DB;

class StockTransferRepository extends Repository
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
     * Create new instance of stock transfer repository.
     *
     * @param StockTransfer $stockTransfer Stock Transfer Model
     * @param Branch        $branch        Branch Model
     * @param Warehouse     $warehouse     Warehouse Model
     */
    public function __construct(
        StockTransfer $stockTransfer,
        Branch $branch,
        Warehouse $warehouse
    ) {
        parent::__construct($stockTransfer);
        $this->stockTransfer = $stockTransfer;
        $this->branch        = $branch;
        $this->warehouse     = $warehouse;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $stockTransfer = $this->stockTransfer->create($request->all());
            $stockTransfer->stockTransferItems()->createMany($request->stock_transfer_items);
            return $stockTransfer;
        });
    }

    public function all()
    {
        return $this->stockTransfer->with('stockTransferableFrom', 'stockTransferableTo', 'user')
            ->get();
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->stockTransfer->with('stockTransferableFrom', 'stockTransferableTo', 'user')
            ->filter($request)
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->stockTransfer->createPaginationUrl($request, $removePage)
            );
    }

    public function findOrFail($id)
    {
        return  $this->stockTransfer->with(['stockTransferableFrom', 'stockTransferableTo', 'user', 'stockTransferItems' => function ($query) {
            $query->with('item', 'unitOfMeasurement');
        }])->findOrFail($id);
    }

    /*public function insertStockTransferable($request)
    {
        //check if the stock Transferable to type is warehouse
        if (mb_strtolower($request->stock_transferable_to_type) == 'warehouse') {
            $stockTransferableToType = get_class($this->warehouse);
        }

        //check if the stock transferable to type is branch
        if (mb_strtolower($request->stock_transferable_to_type) == 'branch') {
            $stockTransferableToType = get_class($this->branch);
        }

        //check if the stock transferable from type is warehouse
        if (mb_strtolower($request->stock_transferable_from_type) == 'warehouse') {
            $stockTransferableFromType = get_class($this->warehouse);
        }

        //check if the stock transferable from type is branch
        if (mb_strtolower($request->stock_transferable_from_type) == 'branch') {
            $stockTransferableFromType = get_class($this->branch);
        }

        return $request->request->add(['stock_transferable_to_type' => $stockTransferableToType, 'stock_transferable_from_type' => $stockTransferableFromType]);
    }*/

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            //find stock request
            $stockTransfer = $this->stockTransfer->findOrFail($id);
            //insert Stock Transferable from and to type
            $this->insertStockTransferable($request);
            //update stock request
            $stockTransfer->fill($request->all());
            $stockTransfer->save();
            //soft delete the stock request items where not in the stock request items array
            $stockTransfer->stockTransferItems()->delete();
            //create new stock request items
            $stockTransfer->stockTransferItems()->createMany($request->stock_transfer_items);

            return $stockTransfer;
        });
    }
}
