<?php

namespace App\Repositories;

use App\InvoicePayment;
use Illuminate\Support\Facades\DB;

class InvoicePaymentRepository extends Repository
{
    /**
     * Create new instance of invoice payment repository.
     *
     * @param InvoicePayment invoicePayment InvoicePayment model
     */
    public function __construct(InvoicePayment $invoicePayment)
    {
        parent::__construct($invoicePayment);
        $this->invoicePayment = $invoicePayment;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $invoicePayment = $this->invoicePayment->create($request->all());
            //Journal Entries
            return $billPaymentEntries = $this->generateBillPaymentEntries($invoicePayment);
            return $invoicePayment;
        });
    }

    public function generateBillPaymentEntries($invoicePayment)
    {
        $i = 0;

        $journal_entries[$i++] = [
            'account_id' => session('account-payable'),
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $invoicePayment->invoice->receiveOrder->purchaseOrder->warehouse_id,
            'amount' => $invoicePayment->amount,
            'type' => 1, //debit entries
        ];

         $journal_entries[$i++] = [
            'account_id' => $invoicePayment->invoice->contact->account_id,
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $invoicePayment->invoice->receiveOrder->purchaseOrder->warehouse_id,
            'amount' => $invoicePayment->amount,
            'type' => 2, //credit entries
        ];

        // return $journal_entries;

        $journal = [
            'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
            'user_id'           =>  auth('api')->user()->id,
            'reference_number'  =>  $invoicePayment->invoice->reference_number,
            'memo'              =>  'Bills Payments',
            'amount'            =>  $invoicePayment->amount,
            'posting_period'    =>  $invoicePayment->created_at,
            'journal_entries'   =>  $journal_entries
        ];

        return $journal;
    }
}
