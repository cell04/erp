<?php

namespace App\Repositories;

use App\Invoice;
use App\Journal;
use Illuminate\Support\Facades\DB;

class InvoiceRepository extends Repository
{
    
    /**
     * Create new instance of invoice repository.
     *
     * @param Invoice $invoice Invoice repository.
     */
    public function __construct(Invoice $invoice)
    {
        parent::__construct($invoice);
        $this->invoice = $invoice;
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

            $invoice = $this->invoice->create($request->all());
            if ($request->invoice_items) {
                $invoice->invoiceItems()->createMany($request->invoice_items);
                $this->deductStocksQuantity($invoice);
                $invoice->quotation()->update(['status' => 5]);
            } 

            if ($invoice->bidSheet) {
                $invoice->bidSheet()->update(['status' => 5]);
            }

            //Journal Entries
            $invoiceEntries = $this->generateQuotationEntries($invoice);

            return $invoice;
        });
    }

    public function deductStocksQuantity($invoice)
    {
        $componentItems = $this->getTotalComponentQuantity($invoice);

        foreach ($componentItems as $item) {
            $stocks = $invoice->quotation->quotable->stocks()->where('item_id', $item['id'])
            ->orderBy('id', 'desc')
            ->get();

            $itemQuantity = $item['quantity'];

            foreach ($stocks as $stock) {
                if ($stock->item_id == $item['id']) {
                    if ($stock->quantity > 0) {
                        if ($stock->quantity >= $itemQuantity) {
                            $stock->decrement('quantity', $itemQuantity);
                            $itemQuantity = 0;
                        } else {
                            if ($itemQuantity > $stock->quantity) {
                                $stock->decrement('quantity', $stock->quantity);
                                $itemQuantity = $itemQuantity - $stock->quantity;
                            }
                        }
                    }
                }
            }
        }

        return $invoice;    
    }

    public function getTotalComponentQuantity($invoice) 
    {
        $items = [];
        $i = 0;

        foreach ($invoice->invoiceItems as $invoiceItem) {
            if ($invoiceItem->item->with_component === 'yes') {
                foreach ($invoiceItem->item->itemComponents as $firstLayer) {
                    if ($firstLayer->component->with_component === 'yes') {
                        foreach ($firstLayer->component->itemComponents as $secondLayer) {
                            if ($secondLayer->component->with_component == 'yes') {
                                foreach ($secondLayer->component->itemComponents as $thirdLayer) {
                                    if ($thirdLayer->component->with_component === 'yes') {
                                        foreach ($thirdLayer->component->itemComponents as $forthLayer) {
                                            $items[$i++] = array (
                                                'item' => $forthLayer->component->name,
                                                'item_id' => $forthLayer->component->id,
                                                'quantity' => $invoiceItem->quantity * ($forthLayer->quantity * $forthLayer->converter_value)
                                            );
                                        }
                                    } else {
                                        $items[$i++] = array (
                                            'item' => $thirdLayer->component->name,
                                            'item_id' => $thirdLayer->component->id,
                                            'quantity' => $invoiceItem->quantity * ($thirdLayer->quantity * $thirdLayer->converter_value)
                                        );
                                    }
                                }
                            } else {
                                $items[$i++] = array (
                                    'item' => $secondLayer->component->name,
                                    'item_id' => $secondLayer->component->id,
                                    'quantity' => $invoiceItem->quantity * ($secondLayer->quantity * $secondLayer->converter_value) 
                                );
                            }
                        }
                    } else {
                        $items[$i++] = array (
                            'item' => $firstLayer->component->name,
                            'item_id' => $firstLayer->component->id,
                            'quantity' => $invoiceItem->quantity * ($firstLayer->quantity * $firstLayer->converter_value) 
                        );
                    }
                }
            } else {
                $items[$i++] = array (
                    'item' => $invoiceItem->item->name,
                    'item_id' => $invoiceItem->item->id,
                    'quantity' => $invoiceItem->quantity * $invoiceItem->converter_value
                );
            }
        }

        $uniqueItems = collect($items)->unique('item_id')->values()->all();

        $i = 0;

        foreach ($uniqueItems as $item) {
            $totalQuantityPerItems[$i++] = [
                'name' => $item['item'],
                'id' => $item['item_id'],
                'quantity' => collect($items)->where('item_id', $item['item_id'])->sum('quantity')
            ];
        }

        return $totalQuantityPerItems;
    }

    public function generateQuotationEntries($invoice)
    {
        $i = 0;

        if ($invoice->quotation) {
            $costCenters = $invoice->quotation->quotable->costCenter;
        }

        if ($invoice->bidSheet) {
            $costCenters = $invoice->bidSheet->location->costCenter;
        }

        foreach ($costCenters as $costCenter) {
            $costCenterID = $costCenter->id;
        }

        $journal_entries[$i++] = [
            'account_id' => session('cash'),
            'corporation_id' => $invoice->corporation_id,
            'cost_center_id' => $costCenterID,
            'amount' => $invoice->amount,
            'type' => 2, //credit entries
        ];



        $journal_entries[$i++] = [
            'account_id' => session('cash'),
            'corporation_id' => $invoice->corporation_id,
            'cost_center_id' => $costCenterID,
            'amount' => $invoice->amount,
            'type' => 1, //debit entries
        ];

        // return $journal_entries;

        $journal = Journal::create([
            'corporation_id'    =>  $invoice->corporation_id,
            'user_id'           =>  $invoice->user_id,
            'reference_number'  =>  $invoice->reference_number,
            'memo'              =>  'Invoice',
            'amount'            =>  $invoice->amount,
            'posting_period'    =>  $invoice->updated_at,
            'contact_id'        =>  $invoice->contact_id
        ]);

        return $journal->journalEntries()->createMany($journal_entries);
    }

    // public function generateBillEntries($invoice)
    // {
    //     $i = 0;
    //     $costCenters = $invoice->receiveOrder->purchaseOrder->warehouse->costCenter;

    //     foreach ($costCenters as $costCenter) {
    //         $costCenterID = $costCenter->id;
    //     }

    //     $journal_entries[$i++] = [
    //         'account_id' => session('irnb'),
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $costCenterID,
    //         'amount' => $invoice->amount,
    //         'type' => 1, //debit entries
    //     ];

    //      $journal_entries[$i++] = [
    //         'account_id' => session('account-payable'),
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $costCenterID,
    //         'amount' => $invoice->amount,
    //         'type' => 2, //credit entries
    //     ];

    //     // return $journal_entries;

    //     $journal = Journal::create([
    //         'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
    //         'user_id'           =>  auth('api')->user()->id,
    //         'reference_number'  =>  $invoice->reference_number,
    //         'memo'              =>  'Bills',
    //         'amount'            =>  $invoice->amount,
    //         'contact_id'        =>  $invoice->contact_id,
    //         'posting_period'    =>  $invoice->created_at
    //     ]);

    //     return $journal->journalEntries()->createMany($journal_entries);
    // }

    /**
     * Create pagination with filters for the resources.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  integer                   $length
     * @param  string                    $orderBy
     * @param  boolean                   $removePage
     * @return array json object
     */
    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->model->filter($request)
            ->orderBy('created_at', $orderBy)
            ->whereNull('bid_sheet_id')
            ->paginate($length)
            ->withPath(
                $this->model->createPaginationUrl($request, $removePage)
            );
    }

    public function all()
    {
        return $this->invoice->whereNull('bid_sheet_id')
        ->get();
    }

    public function allServiceInvoice()
    {
        return $this->invoice->whereNull('quotation_id')
        ->whereIn('status', array(0,1))
        ->get();
    }

    public function paginateWithFilterAllServices(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->model->filter($request)
            ->orderBy('created_at', $orderBy)
            ->whereNull('quotation_id')
            ->paginate($length)
            ->withPath(
                $this->model->createPaginationUrl($request, $removePage)
            );
    }
}
