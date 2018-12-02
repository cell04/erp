<?php

namespace App\Repositories;

use App\InvoicePayment;

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
}
