<?php 

namespace App\Repositories;

use App\Http\Resources\InventoryReceiveNotBilledAccountResource;
use App\InventoryReceiveNotBilledAccount;
use App\Repositories\Repository;

class InventoryReceiveNotBilledAccountRepository extends Repository
{

    public function __construct(InventoryReceiveNotBilledAccount $inventoryReceiveNotBilledAccount)
    {
        parent::__construct($inventoryReceiveNotBilledAccount);
        $this->inventoryReceiveNotBilledAccount = $inventoryReceiveNotBilledAccount;
    }

    public function store($request)
    {
        $count = $this->inventoryReceiveNotBilledAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->count();
        if ($count) {
            $this->inventoryReceiveNotBilledAccount->where('corporation_id', request()->headers->get('CORPORATION-ID'))->delete();
        }

        return $this->inventoryReceiveNotBilledAccount->create($request->all());
    }
}