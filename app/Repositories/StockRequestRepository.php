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

    public function store($request)
    {
        if (mb_strtolower($request->stock_requestable_to_type) == 'warehouse') {
            $stockRequestableToType = get_class($this->warehouse);
        }

        if (mb_strtolower($request->stock_requestable_to_type) == 'branch') {
            $stockRequestableToType = get_class($this->branch);
        }

        $request->request->add(['stock_requestable_to_type' => $stockRequestableToType]);

        if (mb_strtolower($request->stock_requestable_from_type) == 'warehouse') {
            $warehouse = $this->warehouse->find($request->stock_requestable_from_id);
            $stockRequest = $warehouse->stockRequestFrom()->create($request->all());
        }

        if (mb_strtolower($request->stock_requestable_from_type) == 'branch') {
            $branch = $this->branch->find($request->stock_requestable_from_id);
            $stockRequest = $branch->stockRequestFrom()->create($request->all());
        }

        $stockRequest->stockRequestItems()->createMany($request->stock_request_items);

        return  $stockRequest;
    }

    public function findOrFail($id)
    {
        return  $this->stockRequest->with(['stockRequestableFrom', 'stockRequestableTo', 'approveBy', 'user', 'stockRequestItems' => function ($query) {
                    $query->with('item', 'unitOfMeasurement');
                }])->findOrFail($id);
    }
}
