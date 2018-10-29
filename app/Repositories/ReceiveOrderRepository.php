<?php

namespace App\Repositories;

use App\PurchaseOrder;
use App\ReceiveOrder;
use App\Stock;
use Illuminate\Support\Facades\DB;

class ReceiveOrderRepository extends Repository
{
    /**
     * Create new instance of receive order repository.
     *
     * @param ReceiveOrder $receiveOrder ReceiveOrder repository.
     */
    public function __construct(ReceiveOrder $receiveOrder)
    {
        parent::__construct($receiveOrder);
        $this->receiveOrder = $receiveOrder;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $receiveOrder = $this->receiveOrder->create($request->all());
            $receiveOrder->receiveOrderItems()->createMany($request->receive_order_items);

            $purchaseOrder = PurchaseOrder::find($request->purchase_order_id);

            foreach ($request->receive_order_items as $receiveOrderItem) {
                $data = [
                    'stockable_id' => $purchaseOrder->warehouse_id,
                    'stockable_type' => 'App\\Warehouse',
                    'item_id' => $receiveOrderItem['item_id'],
                    'quantity' => $receiveOrderItem['quantity'],
                    'unit_of_measurement_id' => $receiveOrderItem['unit_of_measurement_id']
                ];

                Stock::create($data);
            }

            return $receiveOrder;
        });
    }

    public function findOrFail($id)
    {
        return $this->receiveOrder->with([
            'contact',
            'user',
            'purchaseOrder',
            'corporation',
            'receiveOrderItems' => function ($query) {
                $query->with('item', 'unitOfMeasurement', 'itemPricelist');
            }
        ])->findOrFail($id);
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            $receiveOrder = $this->receiveOrder->findOrFail($id);
            $receiveOrder->fill($request->all());
            $receiveOrder->save();
            $receiveOrder->purchaseOrderItems()->delete();
            $receiveOrder->purchaseOrderItems()->createMany($request->receive_order_items);

            return $receiveOrder;
        });
    }
}
