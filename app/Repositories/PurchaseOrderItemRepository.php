<?php

namespace App\Repositories;

use App\PurchaseOrderItem;

class PurchaseOrderItemRepository extends Repository
{
    /**
     * Create new instance of purchase order item repository.
     *
     * @param PurchaseOrderItem $puchaseOrderItem PurchaseOrderItem repository.
     */
    public function __construct(PurchaseOrderItem $puchaseOrderItem)
    {
        parent::__construct($puchaseOrderItem);
        $this->puchaseOrderItem = $puchaseOrderItem;
    }
}
