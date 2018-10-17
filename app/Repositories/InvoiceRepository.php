<?php

namespace App\Repositories;

use App\Invoice;

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
}
