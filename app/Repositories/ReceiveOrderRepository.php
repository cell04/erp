<?php

namespace App\Repositories;

use App\ReceiveOrder;

class ReceiveOrderRepository extends Repository
{
    /**
     * Create new instance of receive order repository.
     *
     * @param ReceiveOrder $receiveOrder ReceiveOrder repository.
     */
    public function __construct(ReceiveOrder $receiveOrder)
    {
        parent::__construct($receiveOrder);
        $this->receiveOrder = $receiveOrder;
    }
}
