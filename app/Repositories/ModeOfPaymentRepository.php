<?php 

namespace App\Repositories;

use App\ModeOfPayment;
use App\Repositories\Repository;

class ModeOfPaymentRepository extends Repository
{
    public function __construct(ModeOfPayment $modeOfPayment)
    {
        parent::__construct($modeOfPayment);
    }  
}