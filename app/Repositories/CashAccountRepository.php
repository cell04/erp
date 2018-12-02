<?php 

namespace App\Repositories;

use App\CashAccount;
use App\Repositories\Repository;

class CashAccountRepository extends Repository
{
    protected $cashAccount;

    public function __construct(CashAccount $cashAccount)
    {
        parent::__construct($cashAccount);
        $this->cashAccount = $cashAccount;
    } 

    public function store($request)
    {
        $count = $this->cashAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->count();
        if ($count) {
            $this->cashAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->delete();
        }

        return $this->cashAccount->create($request->all());
    } 
}