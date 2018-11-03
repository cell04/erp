<?php

namespace App\Repositories;

use App\Bill;
use App\BillPayment;
use App\Journal;
use App\Repositories\Repository;

class BillPaymentRepository extends Repository
{
    protected $billPayemnt;

    public function __construct(BillPayment $billPayment)
    {
        parent::__construct($billPayment);
        $this->billPayment = $billPayment;
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return boolean
     */
    public function store($request)
    {
        $billPayment = $this->billPayment->create($request->all());
        $this->generateInvoicePaymentEntries($billPayment);
        $bill = Bill::find($request->bill_id);
        $oldAmountPaid = $bill->amount_paid;

        $newAmountPaid = $bill->amount_paid + $request->amount;

        if ($oldAmountPaid < $newAmountPaid) {
            $bill->status = 1;
        }

        if ($newAmountPaid >= $oldAmountPaid) {
            $bill->status = 2;
        }

        $bill->amount_paid = $newAmountPaid;

        $bill->save();

        return true;
    }

    public function generateInvoicePaymentEntries($billPayment)
    {
        $i = 0;

        $journal_entries[$i++] = [
            'account_id' => $billPayment->bill->contact->account_id,
            'corporation_id' => $billPayment->bill->corporation_id,
            'cost_center_id' => $billPayment->bill->billable_id,
            'amount' => $billPayment->amount,
            'type' => 1, //credit entries
        ];

        $journal_entries[$i++] = [
            'account_id' => session('cash'),
            'corporation_id' => $billPayment->bill->corporation_id,
            'cost_center_id' => $billPayment->bill->billable_id,
            'amount' => $billPayment->amount,
            'type' => 2, //debit entries
        ];

        // return $journal_entries;

        $journal = Journal::create([
            'corporation_id'    =>  $billPayment->bill->corporation_id,
            'user_id'           =>  $billPayment->bill->user_id,
            'reference_number'  =>  $billPayment->bill->reference_number,
            'memo'              =>  'Invoice Payments',
            'amount'            =>  $billPayment->amount,
            'posting_period'    =>  $billPayment->updated_at,
            'contact_id'        =>  $billPayment->bill->contact_id
        ]);

        return $journal->journalEntries()->createMany($journal_entries);
    }
}
