<?php

namespace App\Repositories;

use App\Stock;

class StockRepository extends Repository
{
    /**
     * Create new instance of stock repository.
     *
     * @param Stock $stock Stock repository.
     */
    public function __construct(Stock $stock)
    {
        parent::__construct($stock);
        $this->stock = $stock;
    }

    public function paginateWithFiltersPerLocation(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->model->filter($request)
            ->selectRaw('corporation_id, stockable_id, stockable_type, item_id, SUM(quantity) as quantity, unit_of_measurement_id')
            ->where('stockable_id', $request->stockable_id)
            ->where('stockable_type', $request->stockable_type)
            ->groupBy('stockable_type', 'stockable_id', 'item_id', 'corporation_id', 'unit_of_measurement_id')
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->model->createPaginationUrl($request, $removePage)
            );
    }
}
