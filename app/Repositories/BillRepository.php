<?php

namespace App\Repositories;

use App\Bill;
use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;

class BillRepository extends Repository
{
    public function __construct(Bill $bill)
    {
        parent::__construct($bill);
        $this->bill = $bill;
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return boolean
     */
    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $bill = $this->bill->create($request->all());
            $bill->billItems()->createMany($request->bill_items);

            return $bill;
        });
    }
}
