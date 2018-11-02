<?php 

namespace App\Repositories;

use App\InventoryReturnNotCreditedAccount;
use App\Repositories\Repository;

class InventoryReturnNotCreditedAccountRepository extends Repository
{
    public function __construct(InventoryReturnNotCreditedAccount $inventoryReturnNotCreditedAccount)
    {
        parent::__construct($inventoryReturnNotCreditedAccount);
        $this->inventoryReturnNotCreditedAccount = $inventoryReturnNotCreditedAccount;
    } 

    public function store($request)
    {
        $count = $this->inventoryReturnNotCreditedAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->count();
        if ($count) {
            $this->inventoryReturnNotCreditedAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->delete();
        }

        return $this->inventoryReturnNotCreditedAccount->create($request->all());
    } 
}