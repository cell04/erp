<?php

namespace App\Repositories;

use App\ReceiveOrder;
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
            $receiveOrder->receiveOrderItems->createMany($request->receive_order_items);

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
