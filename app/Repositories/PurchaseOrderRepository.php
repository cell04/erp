<?php

namespace App\Repositories;

use App\PurchaseOrder;

class PurchaseOrderRepository extends Repository
{
    /**
     * Create new instance of purchase order repository.
     *
     * @param PurchaseOrder $purchaseOrder PurchaseOrder repository.
     */
    public function __construct(PurchaseOrder $purchaseOrder)
    {
        parent::__construct($purchaseOrder);
        $this->purchaseOrder = $purchaseOrder;
    }
}
