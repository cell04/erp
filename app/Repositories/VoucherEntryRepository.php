<?php 

namespace App\Repositories;

use App\VoucherEntry;
use App\Repositories\Repository;
use App\Contracts\RepositoryInterface;

class VoucherEntryRepository extends Repository implements RepositoryInterface
{
    public function __construct(VoucherEntry $voucherEntry)
    {
        parent::__construct($voucherEntry);
        $this->voucherEntry = $voucherEntry;
    }  
}