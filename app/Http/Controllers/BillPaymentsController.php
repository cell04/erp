<?php

namespace App\Http\Controllers;

use App\BillPayment;
use App\Http\Resources\BillPaymentResource;
use App\Repositories\BillPaymentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BillPaymentsController extends Controller
{
    protected $billPayment;

    public function __construct(BillPaymentRepository $billPayment)
    {
        $this->billPayment = $billPayment;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! $data = BillPaymentResource::collection($this->billPayment->paginate())) {
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
            'bill_id'               => 'required|integer',
            'amount'                => 'required|numeric',
            'mode_of_payment_id'    => 'required|integer',
            'cr_number'             => 'string|max:255|nullable',
            'bank_name'             => 'string|max:255|nullable',
            'check'                 => 'string|max:255|nullable'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }
    
        if (! $this->billPayment->store($request)) {
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
        if (! $billPayment = $this->billPayment->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }
    
        return response()->json([
            'message' => 'Resource successfully retrieve',
            'billPayment' => $billPayment
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
            'bill_id'               =>  'required|integer',
            'amount'                => 'required|numeric',
            'mode_of_payment_id'    => 'required|integer',
            'cr_number'             => 'string|max:255|nullable',
            'bank_name'             => 'string|max:255|nullable',
            'check'                 => 'string|max:255|nullable'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }
    
        if (! $this->billPayment->update($request, $id)) {
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
        if (! $this->billPayment->findOrFail($id)->delete()) {
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
        if (! $this->billPayment->restore($id)) {
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
        if (! $this->billPayment->forceDestroy($id)) {
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
    public function getAllBillPayments()
    {
        if (cache()->has('invoice_payments')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'invoice_payments' => cache('invoice_payments', 5)
            ], 200);
        }

        if (! $billPayments = $this->billPayment->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'bill_payments' => $billPayments
        ], 200);
    }
}
