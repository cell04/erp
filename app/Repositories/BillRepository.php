<?php

namespace App\Repositories;

use App\Bill;
use App\Contact;
use App\Journal;
use App\Notifications\CreateInvoice;
use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;

class BillRepository extends Repository
{
    private $contact;

    public function __construct(Bill $bill, Contact $contact)
    {
        parent::__construct($bill);
        $this->bill = $bill;
        $this->contact = $contact;
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
            $bill = $this->bill->create($request->all());
            $bill->billItems()->createMany($request->bill_items);
            $contact = $this->contact->findOrFail($bill->contact_id);
            $journal = $this->generateSalesEntries($bill);
            $contact->notify(new CreateInvoice($bill));

            return $bill;
        });
    }

    public function generateSalesEntries($bill)
    {
        $i = 0;

        foreach ($bill->billItems as $billItem) {
            $journal_entries[$i++] = [
                'account_id' => $billItem->item->sales_account_id,
                'corporation_id' => $bill->corporation_id,
                'cost_center_id' => $bill->billable_id,
                'amount' => $billItem->price * $billItem->quantity,
                'type' => 2, //credit entries
            ];
        }



        $journal_entries[$i++] = [
            'account_id' => session('cash'),
            'corporation_id' => $bill->corporation_id,
            'cost_center_id' => $bill->billable_id,
            'amount' => $bill->amount,
            'type' => 1, //debit entries
        ];

        // return $journal_entries;

        $journal = Journal::create([
            'corporation_id'    =>  $bill->corporation_id,
            'user_id'           =>  $bill->user_id,
            'reference_number'  =>  $bill->reference_number,
            'memo'              =>  'Invoice',
            'amount'            =>  $bill->amount,
            'posting_period'    =>  $bill->updated_at,
            'contact_id'        =>  $bill->contact_id
        ]);

        return $journal->journalEntries()->createMany($journal_entries);
    }
}
