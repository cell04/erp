<?php

namespace App\Repositories;

use App\PurchaseOrder;
use App\ReceiveOrder;
use App\Stock;
use Illuminate\Support\Facades\DB;

class ReceiveOrderRepository extends Repository
{
    protected $purchaseOrder;

    /**
     * Create new instance of receive order repository.
     *
     * @param ReceiveOrder $receiveOrder ReceiveOrder repository.
     */
    public function __construct(ReceiveOrder $receiveOrder, PurchaseOrder $purchaseOrder)
    {
        parent::__construct($receiveOrder);
        $this->receiveOrder = $receiveOrder;
        $this->purchaseOrder = $purchaseOrder;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $receiveOrder = $this->receiveOrder->create($request->all());
            $receiveOrderItems = $receiveOrder->receiveOrderItems()->createMany($request->receive_order_items);

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

            //journal entries
            $receiveOrderEntries = $this->generateReceiveOrderEntries($receiveOrder, $receiveOrderItems);

            return $receiveOrder;
        });
    }

    public function generateReceiveOrderEntries($receiveOrder, $receiveOrderItems)
    {
        $purchaseOrder = $this->purchaseOrder->findOrFail($receiveOrder->purchase_order_id);
        $i = 0;
        $total = 0;

        foreach ($receiveOrderItems as $receiveOrderItem) {
            $selectedItem = $purchaseOrder->purchaseOrderItems()->where('item_id', $receiveOrderItem->item_id)->first();
            $itemTotalAmount = $receiveOrderItem->quantity * $selectedItem->itemPricelist->price;
            $total = $total + $itemTotalAmount;

            $journal_entries[$i++] = [
                'account_id' => $selectedItem->item->asset_account_id,
                'corporation_id' => request()->headers->get('CORPORATION-ID'),
                'cost_center_id' => $purchaseOrder->warehouse_id,
                'amount' => $itemTotalAmount,
                'type' => 1, //debit entries
            ];
        }

        $journal_entries[$i++] = [
            'account_id' => session('irnb'),
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $purchaseOrder->warehouse_id,
            'amount' => $total,
            'type' => 2, //credit entries
        ];

        // return $journal_entries;

        $journal = [
            'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
            'user_id'           =>  auth('api')->user()->id,
            'reference_number'  =>  $purchaseOrder->reference_number,
            'memo'              =>  'Receive Order',
            'amount'            =>  $total,
            'posting_period'    =>  $receiveOrder->created_at,
            'journal_entries'   =>  $journal_entries
        ];

        return $journal;
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
