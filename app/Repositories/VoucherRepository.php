<?php 

namespace App\Repositories;

use App\Voucher;
use App\Repositories\Repository;

class VoucherRepository extends Repository
{
    public function __construct(Voucher $voucher)
    {
        parent::__construct($voucher);
        $this->voucher = $voucher;
    }  
}