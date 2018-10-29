<?php 

namespace App\Repositories;

use App\BillPayment;
use App\Repositories\Repository;

class BillPaymentRepository extends Repository
{
	protected $billPayemnt;

    public function __construct(BillPayment $billPayment)
    {
        parent::__construct($billPayment);
		$this->billPayment = $billPayment;
    }  
}