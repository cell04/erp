<?php

namespace App\Repositories;

use App\Branch;
use App\Warehouse;
use App\StockRequest;

class StockRequestRepository extends Repository
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
     * Create new instance of stock request repository.
     *
     * @param StockRequest $stockRequest Stock Request Model
     * @param Branch       $branch       Branch Model
     * @param Warehouse    $warehouse    Warehouse Model
     */
    public function __construct(
        StockRequest $stockRequest,
        Branch $branch,
        Warehouse $warehouse
    ) {
        parent::__construct($stockRequest);
        $this->stockRequest = $stockRequest;
        $this->branch       = $branch;
        $this->warehouse    = $warehouse;
    }

    // public function store($request)
    // {
    //     if ($request->stock_requestable_from_type == 'Warehouse') {

    //     }

    //     if ($request->stock_requestable_from_type == 'Branch') {

    //     }
    // }
}
