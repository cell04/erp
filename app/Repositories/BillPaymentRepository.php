<?php

namespace App\Repositories;

use App\Bill;
use App\BillPayment;
use App\Repositories\Repository;

class BillPaymentRepository extends Repository
{
    protected $billPayemnt;

    public function __construct(BillPayment $billPayment)
    {
        parent::__construct($billPayment);
        $this->billPayment = $billPayment;
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return boolean
     */
    public function store($request)
    {
        $this->billPayment->create($request->all());
        $bill = Bill::find($request->bill_id);

        $oldAmountPaid = $bill->amount_paid;

        $newAmountPaid = $bill->amount_paid + $request->amount;

        if ($oldAmountPaid < $newAmountPaid) {
            $bill->status = 1;
        }

        if ($newAmountPaid >= $oldAmountPaid) {
            $bill->status = 2;
        }

        $bill->amount_paid = $newAmountPaid;

        $bill->save();

        return true;
    }
}
