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

    public function allBaseUnit() 
    {
        return $this->unitOfMeasurement->where('default_value', 'yes')
        ->get();
    }

    public function allWithTheSameBaseUnit($id) 
    {   
        $unit = $this->unitOfMeasurement->findOrFail($id);

        if ($unit->default_value === 'yes') {
            return $this->unitOfMeasurement->where('id', $unit->id)
            ->orWhere('base_unit_id', $unit->id)
            ->get();
        }

        if ($unit->default_value === 'no') {
            return $this->unitOfMeasurement->where('id', $unit->id)
            ->orWhere('base_unit_id', $unit->base_unit_id)
            ->orWhere('id', $unit->base_unit_id)
            ->get();
        }   
    }
}
