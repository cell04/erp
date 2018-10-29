<?php 

namespace App\Repositories;

use App\Bill;
use App\Contact;
use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;
use App\Notifications\CreateInvoice;

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
            $contact->notify(new CreateInvoice($bill));

            return $bill;
        });
    }
}