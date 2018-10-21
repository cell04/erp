<?php

namespace App\Repositories;

use App\Branch;
use App\Warehouse;
use App\StockTransfer;

class StockTransferRepository extends Repository
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
     * Create new instance of stock transfer repository.
     *
     * @param StockTransfer $stockTransfer Stock Transfer Model
     * @param Branch        $branch        Branch Model
     * @param Warehouse     $warehouse     Warehouse Model
     */
    public function __construct(
        StockTransfer $stockTransfer,
        Branch $branch,
        Warehouse $warehouse
    ) {
        parent::__construct($stockTransfer);
        $this->stockTransfer = $stockTransfer;
        $this->branch        = $branch;
        $this->warehouse     = $warehouse;
    }
}
