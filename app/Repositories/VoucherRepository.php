<?php 

namespace App\Repositories;

use App\Voucher;
use App\Repositories\Repository;
use App\Contracts\RepositoryInterface;

class VoucherRepository extends Repository implements RepositoryInterface
{
    public function __construct(Voucher $voucher)
    {
        parent::__construct($voucher);
        $this->voucher = $voucher;
    }  
}