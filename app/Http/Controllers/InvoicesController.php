<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\InvoiceResource;
use App\Repositories\InvoiceRepository;
use Illuminate\Support\Facades\Validator;

class InvoicesController extends Controller
{
    /**
     * Invoice repository.
     *
     * @var App\Repositories\InvoiceRepository
     */
    protected $invoice;

    /**
     * Create new instance of invoice controller.
     *
     * @param InvoiceRepository invoice Invoice repository
     */
    public function __construct(InvoiceRepository $invoice)
    {
        $this->invoice = $invoice;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = InvoiceResource::collection(
            $this->invoice->paginateWithFilters(request(), request()->per_page, request()->order_by)
        );

        if (! $data) {
            return response()->json([
                'message' => 'Failed to retrieve resource'
            ], 400);
        }

        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'quotation_id'                              =>  'required|integer',
            'contact_id'                                =>  'required|integer',
            'reference_number'                          =>  'required|string|max:255',
            'due_date'                                  =>  'required|date',
            'amount'                                    =>  'required|numeric|min:0',
            'invoice_payments.*.item_id'                =>  'required|integer',
            'invoice_payments.*.unit_of_measurement_id' =>  'required|integer',
            'invoice_payments.*.quantity'               =>  'required|numeric|min:0',
            'invoice_payments.*.price'                  =>  'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->invoice->store($request)) {
            return response()->json([
                'message' => 'Failed to store resource'
            ], 500);
        }

        return response()->json([
            'message' => 'Resource successfully stored'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (! $invoice = $this->invoice->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully retrieve',
            'invoice' => $invoice
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'quotation_id'                              =>  'required|integer',
            'contact_id'                                =>  'required|integer',
            'reference_number'                          =>  'required|string|max:255',
            'due_date'                                  =>  'required|date',
            'amount'                                    =>  'required|numeric|min:0',
            'invoice_payments.*.item_id'                =>  'required|integer',
            'invoice_payments.*.unit_of_measurement_id' =>  'required|integer',
            'invoice_payments.*.quantity'               =>  'required|numeric|min:0',
            'invoice_payments.*.price'                  =>  'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->invoice->update($request, $id)) {
            return response()->json([
                'message' => 'Failed to update resource'
            ], 500);
        }

        return response()->json([
            'message' => 'Resource successfully updated'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (! $this->invoice->findOrFail($id)->delete()) {
            return response()->json([
                'message' => 'Failed to delete resource'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully deleted'
        ], 200);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        if (! $this->invoice->restore($id)) {
            return response()->json([
                'message' => 'Failed to restore resource'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully restored'
        ], 200);
    }

    /**
     * Forcefully remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forceDestroy($id)
    {
        if (! $this->invoice->forceDestroy($id)) {
            return response()->json([
                'message' => 'Failed to permanently delete resource'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully deleted permanently'
        ], 200);
    }

    /**
     * Retrieve all resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllIvoices()
    {
        if (cache()->has('invoices')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'invoices' => cache('invoices', 5)
            ], 200);
        }

        if (! $invoices = $this->invoice->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'invoices' => $invoices
        ], 200);
    }
}
