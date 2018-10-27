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
            return $invoice;
        });
    }
}
