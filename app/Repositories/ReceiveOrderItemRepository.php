<?php

namespace App\Repositories;

use App\ReceiveOrderItem;

class ReceiveOrderItemRepository extends Repository
{
    /**
     * Create new instance of receive order item repository.
     *
     * @param ReceiveOrderItem $receiveOrderItem ReceiveOrderItem repository.
     */
    public function __construct(ReceiveOrderItem $receiveOrderItem)
    {
        parent::__construct($receiveOrderItem);
        $this->receiveOrderItem = $receiveOrderItem;
    }
}
