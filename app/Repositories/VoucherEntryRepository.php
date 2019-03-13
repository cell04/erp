<?php 

namespace App\Repositories;

use App\VoucherEntry;
use App\Repositories\Repository;

class VoucherEntryRepository extends Repository
{
    public function __construct(VoucherEntry $voucherEntry)
    {
        parent::__construct($voucherEntry);
        $this->voucherEntry = $voucherEntry;
    }  
}