<?php

namespace App\Repositories;

use App\InvoiceItem;

class InvoiceItemRepository extends Repository
{
    /**
     * Create new instance of invoice item repository.
     *
     * @param InvoiceItem $invoiceItem InvoiceItem repository.
     */
    public function __construct(InvoiceItem $invoiceItem)
    {
        parent::__construct($invoiceItem);
        $this->invoiceItem = $invoiceItem;
    }
}
