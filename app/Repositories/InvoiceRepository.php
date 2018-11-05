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
            $invoice->invoiceItems()->createMany($request->invoice_items);
            //Journal Entries
            $invoiceEntries = $this->generateQuotationEntries($invoice);

            return $invoice;
        });
    }

    public function generateQuotationEntries($invoice)
    {
        $i = 0;
        $costCenters = $invoice->quotation->quotable->costCenter;

        foreach ($costCenters as $costCenter) {
            $costCenterID = $costCenter->id;
        }

        foreach ($invoice->invoiceItems as $invoiceItem) {
            $journal_entries[$i++] = [
                'account_id' => $invoiceItem->item->sales_account_id,
                'corporation_id' => $invoice->corporation_id,
                'cost_center_id' => $costCenterID,
                'amount' => $invoiceItem->price * $invoiceItem->quantity,
                'type' => 2, //credit entries
            ];
        }



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
}
