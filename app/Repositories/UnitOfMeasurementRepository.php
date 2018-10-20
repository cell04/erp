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

    public function all()
    {
        return  $this->model->where('corporation_id', request()->headers->get('CORPORATION-ID'))
                ->all();
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->model->filter($request)
            ->where('corporation_id', request()->headers->get('CORPORATION-ID'))
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->model->createPaginationUrl($request, $removePage)
            );
    }
}
