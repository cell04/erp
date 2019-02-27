<?php

namespace App\Repositories;

use App\Conversion;
use App\Item;
use App\Journal;
use App\PurchaseOrder;
use App\ReceiveOrder;
use App\Warehouse;
use Illuminate\Support\Facades\DB;

class ReceiveOrderRepository extends Repository
{
    protected $purchaseOrder;
    protected $journal;
    protected $conversion;
    protected $item;

    /**
     * Create new instance of receive order repository.
     *
     * @param ReceiveOrder $receiveOrder ReceiveOrder repository.
     */
    public function __construct(ReceiveOrder $receiveOrder, PurchaseOrder $purchaseOrder, Journal $journal, Conversion $conversion, Item $item)
    {
        parent::__construct($receiveOrder);
        $this->receiveOrder = $receiveOrder;
        $this->purchaseOrder = $purchaseOrder;
        $this->journal = $journal;
        $this->conversion = $conversion;
        $this->item = $item;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            //Receive Order conversion Quantity Checker
            if ($this->validRequest($request)) {
                //Store Receive Order
                $receiveOrder = $this->receiveOrder->create($request->all());
                //Store Receive Order Items
                $receiveOrderItems = $receiveOrder->receiveOrderItems()->createMany($request->receive_order_items);
                //get receive order items converted quantity and converter_value 
                $request->request->add(['receive_order_items' => $this->getReceiveOrderTotalValueOfConversion($request)]);
                //Store stocks
                $receiveOrder->purchaseOrder->warehouse->stocks()->createMany($request->receive_order_items);
                //Store journal entries
                $receiveOrderEntries = $this->generateReceiveOrderEntries($receiveOrder, $receiveOrderItems);
                //Update Purchase Order Status
                $this->purchaseOrderUpdateStatus($receiveOrder);

                return $receiveOrder;
            }

            return false;
        });
    }

    public function getReceiveOrderTotalValueOfConversion($request)
    {
        $i = 0;
        foreach ($request->receive_order_items as $receiveOrderItem) {
            $multiplier = 1;
            $converterValue = 1;
            $item = $this->item->findOrFail($receiveOrderItem['item_id']);

            $conversions = $this->conversion->selectRaw('from_value * to_value as total')
            ->whereHas('itemConversions', function ($query)  use ($receiveOrderItem) {
                $query->where([
                    ['item_id', $receiveOrderItem['item_id']],
                    ['module', 1]
                ]);
            })->get();

            if ($conversions) {
                foreach ($conversions as $conversion) {

                    if ($conversion->unit_of_measurement_from_id === $item->default_unit_of_measurement_id || $conversion->unit_of_measurement_to_id === $item->default_unit_of_measurement_id) {
                        
                        $converterValue = $converterValue * $conversion->total;
                    }

                    $multiplier = $multiplier * $conversion->total;
                };
            }
            
            $receiveOrderItems[$i++] = [
                'item_id' => $receiveOrderItem['item_id'],
                'quantity' => $receiveOrderItem['quantity'] * $multiplier,
                'unit_of_measurement_id' => $item->default_unit_of_measurement_id,
                'item_pricelist_id' => $receiveOrderItem['item_pricelist_id'],
                'tracking_number' => $receiveOrderItem['tracking_number'],
                'expiration_date' => $receiveOrderItem['expiration_date'],
                'converter_value' => $converterValue
            ];
        }

        return $receiveOrderItems;
    }

    public function validRequest($request)
    {
        $i = 0;
        $purchaseOrder = $this->purchaseOrder->find($request->purchase_order_id);
        foreach ($purchaseOrder->purchaseOrderItems as $purchaseOrderItem) {
            if ($purchaseOrder->has('receiveOrders')) {
                $quantity = 0;
                foreach ($purchaseOrder->receiveOrders as $receiveOrder) {
                    foreach ($receiveOrder->receiveOrderItems as $receiveOrderItem) {
                        if ($purchaseOrderItem->item_id == $receiveOrderItem->item_id) {
                            $quantity += $receiveOrderItem->quantity;
                        }
                    }
                }
            }

            foreach ($request->receive_order_items as $receive_order_item) {
                if ($purchaseOrderItem->item_id == $receive_order_item['item_id']) {
                    $quantity += $receive_order_item['quantity'];
                }
            }

            if ($purchaseOrderItem->quantity < $quantity) {
                return false;
            }
        }

        return true;
    }

    public function purchaseOrderUpdateStatus($receiveOrder)
    {
        $i = 0;
        foreach ($receiveOrder->purchaseOrder->purchaseOrderItems as $purchaseOrderItem) {
            $quantity = 0;
            foreach ($receiveOrder->purchaseOrder->receiveOrders as $receiveOrder) {
                foreach ($receiveOrder->receiveOrderItems as $receiveOrderItem) {
                    if ($receiveOrderItem->item_id == $purchaseOrderItem->item_id) {
                        $quantity += $receiveOrderItem->quantity;
                    }
                }
            }

            if ($purchaseOrderItem->quantity == $quantity) {
                
            } else {
                return $receiveOrder;
            }
        }

        return $receiveOrder->purchaseOrder()->update(['status' => 1]);
    }

    public function generateReceiveOrderEntries($receiveOrder, $receiveOrderItems)
    {
        $purchaseOrder = $this->purchaseOrder->findOrFail($receiveOrder->purchase_order_id);
        $i = 0;
        $total = 0;
        $costCenters = $purchaseOrder->warehouse->costCenter;

        foreach ($costCenters as $costCenter) {
            $costCenterID = $costCenter->id;
        }

        foreach ($receiveOrderItems as $receiveOrderItem) {
            $selectedItem = $purchaseOrder->purchaseOrderItems()->where('item_id', $receiveOrderItem->item_id)->first();
            $itemTotalAmount = $receiveOrderItem->quantity * $selectedItem->itemPricelist->price;
            $total = $total + $itemTotalAmount;

            $journal_entries[$i++] = [
                'account_id'     => $selectedItem->item->asset_account_id,
                'corporation_id' => request()->headers->get('CORPORATION-ID'),
                'cost_center_id' => $purchaseOrder->warehouse_id,
                'amount'         => $itemTotalAmount,
                'type'           => 1
            ];
        }

        $journal_entries[$i++] = [
            'account_id'     => session('irnb'),
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $purchaseOrder->warehouse_id,
            'amount'         => $total,
            'type'           => 2
        ];

        $journal = $this->journal->create([
            'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
            'user_id'           =>  auth('api')->user()->id,
            'reference_number'  =>  $purchaseOrder->reference_number,
            'memo'              =>  'Receive Order',
            'amount'            =>  $total,
            'contact_id'        =>  $purchaseOrder->contact_id,
            'posting_period'    =>  $receiveOrder->created_at
        ]);

        return $journal->journalEntries()->createMany($journal_entries);
    }

    // public function generateReceiveOrderEntries($receiveOrder, $receiveOrderItems)
    // {
    //     $purchaseOrder = $this->purchaseOrder->findOrFail($receiveOrder->purchase_order_id);
    //     $i = 0;
    //     $total = 0;

    //     foreach ($receiveOrderItems as $receiveOrderItem) {
    //         $selectedItem = $purchaseOrder->purchaseOrderItems()->where('item_id', $receiveOrderItem->item_id)->first();
    //         $itemTotalAmount = $receiveOrderItem->quantity * $selectedItem->itemPricelist->price;
    //         $total = $total + $itemTotalAmount;

    //         $journal_entries[$i++] = [
    //             'account_id' => $selectedItem->item->asset_account_id,
    //             'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //             'cost_center_id' => $purchaseOrder->warehouse_id,
    //             'amount' => $itemTotalAmount,
    //             'type' => 1, //debit entries
    //         ];
    //     }

    //     $journal_entries[$i++] = [
    //         'account_id' => session('irnb'),
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $purchaseOrder->warehouse_id,
    //         'amount' => $total,
    //         'type' => 2, //credit entries
    //     ];

    //     // return $journal_entries;

    //     $data = [
    //         'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
    //         'user_id'           =>  auth('api')->user()->id,
    //         'reference_number'  =>  $purchaseOrder->reference_number,
    //         'memo'              =>  'Receive Order',
    //         'amount'            =>  $total,
    //         'posting_period'    =>  $receiveOrder->created_at,
    //         'journal_entries'   =>  $journal_entries
    //     ];

    //     /*if (session()->has('accounting.auth')) {
    //         $accountingAuth = session('accounting.auth');
    //         $token = $accountingAuth['token_type'] . ' ' . $accountingAuth['access_token'];
    //     }*/

    //     $http = new \GuzzleHttp\Client(['verify' => false ]);
    //     $url  = env('ACC_URL') . '/api/journals';
    //     $auth = session('accounting.auth');

    //     try {
    //         $response = $http->post($url, [
    //             'form_params' => $data,
    //             'headers' => [
    //                 'Authorization' => $auth['token_type'] . ' ' . $auth['access_token'],
    //                 'CORPORATION-ID' => request()->headers->get('CORPORATION-ID')
    //             ]
    //         ]);

    //         return true;
    //     } catch (Exception $exception) {
    //         if ($exception->getCode() == 400) {
    //             return response()->json(
    //                 'Invalid Request. Please enter a username or a password.',
    //                 $exception->getCode()
    //             );
    //         } elseif ($exception->getCode() == 401) {
    //             return response()->json(
    //                 'Your credentials are incorrect Please try again.',
    //                 $exception->getCode()
    //             );
    //         }

    //         return response()->json(
    //             'Something went wrong on the server.',
    //             $exception->getCode()
    //         );
    //     }
    // }

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
