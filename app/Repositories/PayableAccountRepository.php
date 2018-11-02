<?php 

namespace App\Repositories;

use App\PayableAccount;
use App\Repositories\Repository;

class PayableAccountRepository extends Repository
{
    public function __construct(PayableAccount $payableAccount)
    {
        parent::__construct($payableAccount);
        $this->payableAccount = $payableAccount;
    }  
}