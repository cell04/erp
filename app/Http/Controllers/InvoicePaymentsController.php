<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoicePaymentResource;
use App\Repositories\InvoicePaymentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InvoicePaymentsController extends Controller
{
    /**
     * InvoicePayment repository.
     *
     * @var App\Repositories\InvoicePaymentRepository
     */
    protected $invoicePayment;
    
    /**
     * Create new instance of invoicePayment controller.
     *
     * @param InvoicePaymentRepository invoicePayment InvoicePayment repository
     */
    public function __construct(InvoicePaymentRepository $invoicePayment)
    {
        $this->invoicePayment = $invoicePayment;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! $data = InvoicePaymentResource::collection($this->invoicePayment->paginate())) {
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
            'invoice_id'                =>  'required|integer',
            'amount'                    =>  'required|numeric',
            'mode_of_payment_id'        =>  'required|integer',
            'cr_number'                 =>  'string|max:255|nullable',
            'bank_name'                 =>  'string|max:255|nullable',
            'check'                     =>  'string|max:255|nullable',
            'invoice_payment_number'    =>  'required|string|min:2',
            'invoice_payment_date'      =>  'required|date'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }
        
        if (! $this->invoicePayment->store($request)) {
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
        if (! $invoicePayment = $this->invoicePayment->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }
    
        return response()->json([
            'message' => 'Resource successfully retrieve',
            'invoicePayment' => $invoicePayment
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
            'invoice_id'                =>  'required|integer',
            'amount'                    =>  'required|numeric',
            'mode_of_payment_id'        =>  'required|integer',
            'cr_number'                 =>  'string|max:255|nullable',
            'bank_name'                 =>  'string|max:255|nullable',
            'check'                     =>  'string|max:255|nullable',
            'invoice_payment_number'    =>  'required|string|min:2',
            'invoice_payment_date'      =>  'required|date'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }
    
        if (! $this->invoicePayment->update($request, $id)) {
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
        if (! $this->invoicePayment->findOrFail($id)->delete()) {
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
        if (! $this->invoicePayment->restore($id)) {
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
        if (! $this->invoicePayment->forceDestroy($id)) {
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
    public function getAllIvoicePayment()
    {
        if (cache()->has('invoice_payments')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'invoice_payments' => cache('invoice_payments', 5)
            ], 200);
        }

        if (! $invoicePayments = $this->invoicePayment->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'invoice_payments' => $invoicePayments
        ], 200);
    }
}
