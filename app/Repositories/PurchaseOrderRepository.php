<?php

namespace App\Repositories;

use App\PurchaseOrder;
use Illuminate\Support\Facades\DB;

class PurchaseOrderRepository extends Repository
{
    /**
     * Create new instance of purchase order repository.
     *
     * @param PurchaseOrder $purchaseOrder PurchaseOrder repository.
     */
    public function __construct(PurchaseOrder $purchaseOrder)
    {
        parent::__construct($purchaseOrder);
        $this->purchaseOrder = $purchaseOrder;
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return boolean
     */
    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $purchaseOrder = $this->purchaseOrder->create($request->all());
            $purchaseOrder->purchaseOrderItem->createMany($request->purchase_order_items);
            return $purchaseOrder;
        });
    }

    /**
     * Find the resource using the specified id or else fail.
     *
     * @param  int $id
     * @return json object
     */
    public function findOrFail($id)
    {
        return $this->purchaseOrder->with([
            'contact',
            'user',
            'receiveOrders',
            'warehouse',
            'purchaseOrderItem' => function ($query) {
                $query->with('item', 'unitOfMeasurement', 'itemPricelist');
            }
        ])->findOrFail($id);
    }
}
