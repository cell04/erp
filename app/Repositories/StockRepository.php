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
}
