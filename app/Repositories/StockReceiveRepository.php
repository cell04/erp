<?php

namespace App\Repositories;

use App\Branch;
use App\Warehouse;
use App\StockReceive;

class StockReceiveRepository extends Repository
{
    /**
     * Branch model.
     *
     * @var App\Branch
     */
    protected $branch;

    /**
     * Warehouse model.
     *
     * @var App\Warehouse
     */
    protected $warehouse;

    /**
     * Create new instance of stock receive repository.
     *
     * @param StockReceive $stockReceive Stock Receive Model
     * @param Branch       $branch       Branch Model
     * @param Warehouse    $warehouse    Warehouse
     */
    public function __construct(
        StockReceive $stockReceive,
        Branch $branch,
        Warehouse $warehouse
    ) {
        parent::__construct($stockReceive);
        $this->stockReceive = $stockReceive;
        $this->branch       = $branch;
        $this->warehouse    = $warehouse;
    }
}
