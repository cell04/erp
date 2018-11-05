<?php

namespace App\Repositories;

use App\InvoicePayment;
use App\Journal;
use App\Voucher;
use Carbon\Carbon;
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
            $invoicePayment->invoice()->increment('amount_paid', $invoicePayment->amount);
            //update invoice status
            $this->updateBillStatus($invoicePayment);
            //Store Entries
            // $this->generateBillPaymentEntries($invoicePayment);

            return $invoicePayment;
        });
    }

    // public function generateInvoicePaymentEntries($billPayment)
    // {
    //     $i = 0;

    //     $journal_entries[$i++] = [
    //         'account_id' => $billPayment->bill->contact->account_id,
    //         'corporation_id' => $billPayment->bill->corporation_id,
    //         'cost_center_id' => $billPayment->bill->billable_id,
    //         'amount' => $billPayment->amount,
    //         'type' => 1, //credit entries
    //     ];

    //     $journal_entries[$i++] = [
    //         'account_id' => session('cash'),
    //         'corporation_id' => $billPayment->bill->corporation_id,
    //         'cost_center_id' => $billPayment->bill->billable_id,
    //         'amount' => $billPayment->amount,
    //         'type' => 2, //debit entries
    //     ];

    //     // return $journal_entries;

    //     $journal = Journal::create([
    //         'corporation_id'    =>  $billPayment->bill->corporation_id,
    //         'user_id'           =>  $billPayment->bill->user_id,
    //         'reference_number'  =>  $billPayment->bill->reference_number,
    //         'memo'              =>  'Invoice Payments',
    //         'amount'            =>  $billPayment->amount,
    //         'posting_period'    =>  $billPayment->updated_at,
    //         'contact_id'        =>  $billPayment->bill->contact_id
    //     ]);

    //     return $journal->journalEntries()->createMany($journal_entries);
    // }

    // public function generateBillPaymentEntries($invoicePayment)
    // {
    //     $i = 0;
    //     $costCenters = $invoicePayment->invoice->receiveOrder->purchaseOrder->warehouse->costCenter;

    //     foreach ($costCenters as $costCenter) {
    //         $costCenterID = $costCenter->id;
    //     }

    //     $journal_entries[$i++] = [
    //         'account_id' => session('account-payable'),
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $costCenterID,
    //         'amount' => $invoicePayment->amount,
    //         'type' => 1, //debit entries
    //     ];

    //      $journal_entries[$i++] = [
    //         'account_id' => $invoicePayment->invoice->contact->account_id,
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $costCenterID,
    //         'amount' => $invoicePayment->amount,
    //         'type' => 2, //credit entries
    //     ];

    //     //store Journal
    //     $journal = Journal::create([
    //         'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
    //         'user_id'           =>  auth('api')->user()->id,
    //         'reference_number'  =>  $invoicePayment->invoice->reference_number,
    //         'memo'              =>  'Bills Payments',
    //         'amount'            =>  $invoicePayment->amount,
    //         'contact_id'        =>  $invoicePayment->invoice->contact_id,
    //         'posting_period'    =>  Carbon::parse($invoicePayment->created_at)
    //     ]);

    //     // Store Journal Entries
    //     $journalEntries = $journal->journalEntries()->createMany($journal_entries);

    //     //Store Voucher
    //     $voucher = $journal->voucher()->create([
    //         'verified_by'       =>  auth('api')->user()->id,
    //         'reference_number'  =>  $invoicePayment->invoice->reference_number,
    //         'number'            =>  $invoicePayment->cr_number,
    //         'memo'              =>  'Bills Payments',
    //         'amount'            =>  $invoicePayment->amount,
    //         'contact_id'        =>  $invoicePayment->invoice->contact_id,
    //         'posting_period'    =>  Carbon::parse($invoicePayment->created_at),
    //         'status'            =>  1
    //     ]);

    //     //Store Voucher Entries
    //     return $voucher->voucherEntries()->createMany($journalEntries->toArray());
    // }
}
