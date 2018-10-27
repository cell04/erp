<?php

namespace App\Repositories;

use App\Branch;
use App\StockReceive;
use App\Warehouse;
use Illuminate\Support\Facades\DB;

class StockReceiveRepository extends Repository
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
     * Create new instance of stock receive repository.
     *
     * @param StockReceive $stockReceive Stock Receive Model
     * @param Branch       $branch       Branch Model
     * @param Warehouse    $warehouse    Warehouse
     */
    public function __construct(
        StockReceive $stockReceive,
        Branch $branch,
        Warehouse $warehouse
    ) {
        parent::__construct($stockReceive);
        $this->stockReceive = $stockReceive;
        $this->branch       = $branch;
        $this->warehouse    = $warehouse;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $stockReceive = $this->stockReceive->create($request->all());
            $stockReceive->stockReceiveItems()->createMany($request->stock_receive_items);
            return $stockReceive;
        });
    }

    public function insertStockReceivable($request)
    {
        //check if the stock receivable to type is warehouse
        if (mb_strtolower($request->stock_receivable_to_type) == 'warehouse') {
            $stockReceivableToType = get_class($this->warehouse);
        }

        //check if the stock receivable to type is branch
        if (mb_strtolower($request->stock_receivable_to_type) == 'branch') {
            $stockReceivableToType = get_class($this->branch);
        }

        //check if the stock receivable from type is warehouse
        if (mb_strtolower($request->stock_receivable_from_type) == 'warehouse') {
            $stockReceivableFromType = get_class($this->warehouse);
        }

        //check if the stock receivable from type is branch
        if (mb_strtolower($request->stock_receivable_from_type) == 'branch') {
            $stockReceivbleFromType = get_class($this->branch);
        }
        
        return $request->request->add(['stock_receivable_to_type' => $stockReceivableToType, 'stock_receivable_from_type' => $stockReceivableFromType]);
    }
    
    public function findOrFail($id)
    {
        return  $this->stockReceive->with(['stockReceivableFrom', 'stockReceivableTo', 'user', 'stockReceiveItems' => function ($query) {
            $query->with('item', 'unitOfMeasurement');
        }])->findOrFail($id);
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->stockReceive->with('stockReceivableFrom', 'stockReceivableTo', 'user')
        ->filter($request)
        ->orderBy('created_at', $orderBy)
        ->paginate($length)
        ->withPath(
            $this->stockReceive->createPaginationUrl($request, $removePage)
        );
    }
}
