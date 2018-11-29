<?php

namespace App\Repositories;

use App\PurchaseOrder;
use Illuminate\Support\Facades\DB;

class PurchaseOrderRepository extends Repository
{
    /**
     * Purchse order status.
     *
     * @var array
     */
    protected $status = [
        0 => 'Issued',
        1 => 'Closed'
    ];

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
            $purchaseOrder->purchaseOrderItems()->createMany($request->purchase_order_items);
            return $purchaseOrder;
        });
    }

    // /**
    //  * Find the resource using the specified id or else fail.
    //  *
    //  * @param  int $id
    //  * @return json object
    //  */
    // public function findOrFail($id)
    // {
    //     return $this->purchaseOrder->with([
    //         'contact',
    //         'user',
    //         'receiveOrders',
    //         'warehouse',
    //         'purchaseOrderItems' => function ($query) {
    //             $query->with('item', 'unitOfMeasurement', 'itemPricelist');
    //         }
    //     ])->findOrFail($id);
    // }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            $purchaseOrder = $this->purchaseOrder->findOrFail($id);
            $purchaseOrder->fill($request->all());
            $purchaseOrder->save();
            $purchaseOrder->purchaseOrderItems()->delete();
            $purchaseOrder->purchaseOrderItems()->createMany($request->purchase_order_items);

            return $purchaseOrder;
        });
    }

    public function all()
    {
        return $this->purchaseOrder->where('status', 0)
        ->get();
    }

    public function findOrFail($id)
    {
        $purchaseOrder = $this->purchaseOrder->findOrFail($id);

        return [
            'id' =>  $purchaseOrder->id,
            'corporation_id' => $purchaseOrder->corporation_id,
            'corporation' => $purchaseOrder->corporation,
            'user_id' => $purchaseOrder->user_id,
            'user' => $purchaseOrder->user,
            'reference_number' => $purchaseOrder->reference_number,
            'warehouse_id' => $purchaseOrder->warehouse,
            'warehouse' => $purchaseOrder->warehouse,
            'contact_id' => $purchaseOrder->contact_id,
            'contact' => $purchaseOrder->contact,
            'amount' => $purchaseOrder->amount,
            'status' => $purchaseOrder->status,
            'purchase_order_items' => $this->getAvailableItemQuantityToReceive($purchaseOrder)
        ];
    }

    public function getAvailableItemQuantityToReceive($purchaseOrder)
    {
        $data = [];
        $i = 0;
        foreach ($purchaseOrder->purchaseOrderItems as $purchaseOrderItem) {
            $receiveOrderItemQuantity = 0;
            if ($purchaseOrder->has('receiveOrders')) {
                foreach ($purchaseOrder->receiveOrders as $receiveOrder) {
                    foreach ($receiveOrder->receiveOrderItems as $receiveOrderItem) {
                        if ($purchaseOrderItem->item_id == $receiveOrderItem->item_id) {
                            $receiveOrderItemQuantity += $receiveOrderItem->quantity;
                        }
                    }
                }
            }

            $data[$i++] = [
                'purchase_order_id' => $purchaseOrder->id,
                'id' => $purchaseOrderItem->id,
                'item_id' => $purchaseOrderItem->item_id,
                'item' => $purchaseOrderItem->item,
                'quantity' => $purchaseOrderItem->quantity,
                'receive_quantity' => $receiveOrderItemQuantity,
                'unit_of_measurement_id' => $purchaseOrderItem->unit_of_measurement_id,
                'unit_of_measurement' => $purchaseOrderItem->unitOfMeasurement,
                'item_pricelist_id' => $purchaseOrderItem->item_pricelist_id,
                'item_pricelist' => $purchaseOrderItem->itemPricelist,
                'status'
            ];
        }

        return $data;
    }
}
