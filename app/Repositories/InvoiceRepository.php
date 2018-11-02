<?php

namespace App\Repositories;

use App\Invoice;
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
            $invoiceEntries = $this->generateBillEntries($invoice);
            return $invoice;
        });
    }

    public function generateBillEntries($invoice)
    {
        $i = 0;

        $journal_entries[$i++] = [
            'account_id' => session('irnb'),
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $invoice->receiveOrder->purchaseOrder->warehouse_id,
            'amount' => $invoice->amount,
            'type' => 1, //debit entries
        ];

         $journal_entries[$i++] = [
            'account_id' => session('account-payable'),
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $invoice->receiveOrder->purchaseOrder->warehouse_id,
            'amount' => $invoice->amount,
            'type' => 2, //credit entries
        ];

        // return $journal_entries;

        $journal = [
            'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
            'user_id'           =>  auth('api')->user()->id,
            'reference_number'  =>  $invoice->reference_number,
            'memo'              =>  'Bills',
            'amount'            =>  $invoice->amount,
            'posting_period'    =>  $invoice->created_at,
            'journal_entries'   =>  $journal_entries
        ];

        return $journal;
    }
}
