<?php

namespace App\Repositories;

use App\Bill;
use App\BillPayment;
use App\Journal;
use App\Repositories\Repository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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
        return DB::transaction(function () use ($request) { 
            $billPayment = $this->billPayment->create($request->all());
            $this->generateBillPaymentEntries($billPayment);
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
        });
    }

    public function generateBillPaymentEntries($billPayment)
    {
        $i = 0;
        $costCenters = $billPayment->bill->receiveOrder->purchaseOrder->warehouse->costCenter;

        foreach ($costCenters as $costCenter) {
            $costCenterID = $costCenter->id;
        }

        $journal_entries[$i++] = [
            'account_id' => session('account-payable'),
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $costCenterID,
            'amount' => $billPayment->amount,
            'type' => 1, //debit entries
        ];

         $journal_entries[$i++] = [
            'account_id' => $billPayment->bill->contact->account_id,
            'corporation_id' => request()->headers->get('CORPORATION-ID'),
            'cost_center_id' => $costCenterID,
            'amount' => $billPayment->amount,
            'type' => 2, //credit entries
        ];

        //store Journal
        $journal = Journal::create([
            'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
            'user_id'           =>  $billPayment->bill->user_id,
            'reference_number'  =>  $billPayment->bill->reference_number,
            'memo'              =>  'Bills Payments',
            'amount'            =>  $billPayment->amount,
            'contact_id'        =>  $billPayment->bill->contact_id,
            'posting_period'    =>  Carbon::parse($billPayment->created_at)
        ]);

        // Store Journal Entries
        $journalEntries = $journal->journalEntries()->createMany($journal_entries);

        //Store Voucher
        $voucher = $journal->voucher()->create([
            'verified_by'       =>  $billPayment->bill->user_id,
            'user_id'           =>  $billPayment->bill->user_id,
            'reference_number'  =>  $billPayment->bill->reference_number,
            'number'            =>  $billPayment->cr_number,
            'memo'              =>  'Bills Payments',
            'amount'            =>  $billPayment->amount,
            'contact_id'        =>  $billPayment->bill->contact_id,
            'posting_period'    =>  Carbon::parse($billPayment->created_at),
            'status'            =>  1
        ]);

        //Store Voucher Entries
        return $voucher->voucherEntries()->createMany($journalEntries->toArray());
    }
}
