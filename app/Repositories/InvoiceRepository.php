<?php

namespace App\Repositories;

use App\Invoice;
use App\Journal;
use Illuminate\Support\Facades\DB;

class InvoiceRepository extends Repository
{
    
    /**
     * Create new instance of invoice repository.
     *
     * @param Invoice $invoice Invoice repository.
     */
    public function __construct(Invoice $invoice)
    {
        parent::__construct($invoice);
        $this->invoice = $invoice;
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

            $invoice = $this->invoice->create($request->all());
            // $invoice->invoiceItems()->createMany($request->invoice_items);
            //Journal Entries
            $invoiceEntries = $this->generateQuotationEntries($invoice);

            return $invoice;
        });
    }

    public function generateQuotationEntries($invoice)
    {
        $i = 0;

        if ($invoice->quotation) {
            $costCenters = $invoice->quotation->quotable->costCenter;
        }

        if ($invoice->bidSheet) {
            $costCenters = $invoice->bidSheet->location->costCenter;
        }

        foreach ($costCenters as $costCenter) {
            $costCenterID = $costCenter->id;
        }

        $journal_entries[$i++] = [
            'account_id' => session('cash'),
            'corporation_id' => $invoice->corporation_id,
            'cost_center_id' => $costCenterID,
            'amount' => $invoice->amount,
            'type' => 2, //credit entries
        ];



        $journal_entries[$i++] = [
            'account_id' => session('cash'),
            'corporation_id' => $invoice->corporation_id,
            'cost_center_id' => $costCenterID,
            'amount' => $invoice->amount,
            'type' => 1, //debit entries
        ];

        // return $journal_entries;

        $journal = Journal::create([
            'corporation_id'    =>  $invoice->corporation_id,
            'user_id'           =>  $invoice->user_id,
            'reference_number'  =>  $invoice->reference_number,
            'memo'              =>  'Invoice',
            'amount'            =>  $invoice->amount,
            'posting_period'    =>  $invoice->updated_at,
            'contact_id'        =>  $invoice->contact_id
        ]);

        return $journal->journalEntries()->createMany($journal_entries);
    }

    // public function generateBillEntries($invoice)
    // {
    //     $i = 0;
    //     $costCenters = $invoice->receiveOrder->purchaseOrder->warehouse->costCenter;

    //     foreach ($costCenters as $costCenter) {
    //         $costCenterID = $costCenter->id;
    //     }

    //     $journal_entries[$i++] = [
    //         'account_id' => session('irnb'),
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $costCenterID,
    //         'amount' => $invoice->amount,
    //         'type' => 1, //debit entries
    //     ];

    //      $journal_entries[$i++] = [
    //         'account_id' => session('account-payable'),
    //         'corporation_id' => request()->headers->get('CORPORATION-ID'),
    //         'cost_center_id' => $costCenterID,
    //         'amount' => $invoice->amount,
    //         'type' => 2, //credit entries
    //     ];

    //     // return $journal_entries;

    //     $journal = Journal::create([
    //         'corporation_id'    =>  request()->headers->get('CORPORATION-ID'),
    //         'user_id'           =>  auth('api')->user()->id,
    //         'reference_number'  =>  $invoice->reference_number,
    //         'memo'              =>  'Bills',
    //         'amount'            =>  $invoice->amount,
    //         'contact_id'        =>  $invoice->contact_id,
    //         'posting_period'    =>  $invoice->created_at
    //     ]);

    //     return $journal->journalEntries()->createMany($journal_entries);
    // }

    /**
     * Create pagination with filters for the resources.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  integer                   $length
     * @param  string                    $orderBy
     * @param  boolean                   $removePage
     * @return array json object
     */
    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->model->filter($request)
            ->orderBy('created_at', $orderBy)
            ->whereNull('bid_sheet_id')
            ->paginate($length)
            ->withPath(
                $this->model->createPaginationUrl($request, $removePage)
            );
    }

    public function all()
    {
        return $this->invoice->whereNull('bid_sheet_id')
        ->get();
    }

    public function allServiceInvoice()
    {
        return $this->invoice->whereNull('quotation_id')
        ->get();
    }

    public function paginateWithFilterAllServices(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->model->filter($request)
            ->orderBy('created_at', $orderBy)
            ->whereNull('quotation_id')
            ->paginate($length)
            ->withPath(
                $this->model->createPaginationUrl($request, $removePage)
            );
    }
}
