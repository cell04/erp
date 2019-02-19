<?php

namespace App\Repositories;

use App\CostCenter;
use App\Repositories\Repository;

class CostCenterRepository extends Repository
{
    public function __construct(CostCenter $costCenter)
    {
        parent::__construct($costCenter);
        $this->costCenter = $costCenter;
    }
}
