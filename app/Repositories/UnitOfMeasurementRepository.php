<?php

namespace App\Repositories;

use App\UnitOfMeasurement;

class UnitOfMeasurementRepository extends Repository
{
    /**
     * Create new instance of unit of measurement repository.
     *
     * @param UnitOfMeasurement $unitOfMeasurement UnitOfMeasurement repository.
     */
    public function __construct(UnitOfMeasurement $unitOfMeasurement)
    {
        parent::__construct($unitOfMeasurement);
        $this->unitOfMeasurement = $unitOfMeasurement;
    }
}
