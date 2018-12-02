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

    public function store($request)
    {
        $count = $this->payableAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->count();
        if ($count) {
            $this->payableAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->delete();
        }

        return $this->payableAccount->create($request->all());
    }  
}