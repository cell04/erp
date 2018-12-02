<?php

namespace App\Repositories;

use App\Branch;
use App\Stock;
use App\StockTransfer;
use App\Warehouse;
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
    protected $stock;

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
        Warehouse $warehouse,
        Stock $stock
    ) {
        parent::__construct($stockTransfer);
        $this->stockTransfer = $stockTransfer;
        $this->branch        = $branch;
        $this->warehouse     = $warehouse;
        $this->stock = $stock;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $stockTransfer = $this->stockTransfer->create($request->all());
            $stockTransfer->stockTransferItems()->createMany($request->stock_transfer_items);
            $this->decrementStocksQuantity($stockTransfer);

            return $stockTransfer;
        });
    }

    public function decrementStocksQuantity($stockTransfer)
    {
        $stocks = $stockTransfer->stockTransferableFrom->stocks;
        $stockTransferItems = $stockTransfer->stockTransferItems;

        foreach ($stockTransferItems as $stockTransferItem) {
            $itemTransferQuantity = $stockTransferItem->quantity;
            foreach ($stocks as $stock) {
                if ($stock->item_id == $stockTransferItem->item_id) {
                    if ($stock->quantity > 0) {
                        if ($stock->quantity >= $itemTransferQuantity) {
                            $stock->decrement('quantity', $itemTransferQuantity);
                            $itemTransferQuantity = 0;
                        } else {
                            if ($itemTransferQuantity > $stock->quantity) {
                                $stock->decrement('quantity', $stock->quantity);
                                $itemTransferQuantity = $itemTransferQuantity - $stock->quantity;
                            }
                        }
                    }
                }
            }
        }

        return 'ahehe';
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

    /**
     * Change stock transfer status to transfer using specified id.
     *
     * @param  int $id
     * @return boolean
     */
    public function transferred($id)
    {
        return $this->stockTransfer->where('id', $id)->update([
            'status' => 1
        ]);
    }
}
