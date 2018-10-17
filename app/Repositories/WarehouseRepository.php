<?php

namespace App\Repositories;

use App\Warehouse;

class WarehouseRepository extends Repository
{
    /**
     * Create new instance of warehouse repository.
     *
     * @param Warehouse warehouse Warehouse model
     */
    public function __construct(Warehouse $warehouse)
    {
        parent::__construct($warehouse);
        $this->warehouse = $warehouse;
    }
}
