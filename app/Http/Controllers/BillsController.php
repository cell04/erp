<?php

namespace App\Http\Controllers;
use App\Http\Resources\BillResource;
use App\Repositories\BillRepository;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class BillsController extends Controller
{
    protected $bill;

    public function __construct(BillRepository $bill)
    {
        $this->bill = $bill;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = BillResource::collection(
            $this->bill->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'amount'                                =>  'required|numeric',
            'receive_order_id'                      =>  'required|integer',
            'contact_id'                            =>  'required|integer',
            'due_date'                              =>  'required|date',
            'reference_number'                      =>  'required|string|max:255',
            'bill_items.*.item_id'                  =>  'required|integer',
            'bill_items.*.unit_of_measurement_id'   =>  'required|integer',
            'bill_items.*.quantity'                 =>  'required|numeric',
            'bill_items.*.item_pricelist_id'        =>  'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->bill->store($request)) {
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
        if (! $bill = $this->bill->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message'   => 'Resource successfully retrieve',
            'bill' => $bill
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
            'amount'                                =>  'required|numeric',
            'receive_order_id'                      =>  'required|integer',
            'contact_id'                            =>  'required|integer',
            'due_date'                              =>  'required|date',
            'reference_number'                      =>  'required|string|max:255',
            'bill_items.*.item_id'                  =>  'required|integer',
            'bill_items.*.unit_of_measurement_id'   =>  'required|integer',
            'bill_items.*.quantity'                 =>  'required|numeric',
            'bill_items.*.item_pricelist_id'        =>  'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->bill->update($request, $id)) {
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
        if (! $this->bill->findOrFail($id)->delete()) {
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
        if (! $this->bill->restore($id)) {
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
        if (! $this->bill->forceDestroy($id)) {
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
    public function getAllBills()
    {
        if (cache()->has('bills')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'bills'      => cache('bills', 5)
            ], 200);
        }

        if (! $bills = $this->bill->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'bills'      => $bills
        ], 200);
    }
}
