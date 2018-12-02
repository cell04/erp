<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuotationResource;
use App\Repositories\QuotationRepository;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class QuotationsController extends Controller
{
    /**
     * Quotation repository.
     *
     * @var App\Repositories\QuotationRepository
     */
    protected $quotation;

    /**
     * Create new instance of quotation controller.
     *
     * @param QuotationRepository quotation Quotation repository
     */
    public function __construct(QuotationRepository $quotation)
    {
        $this->quotation = $quotation;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = QuotationResource::collection(
            $this->quotation->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'quotable_id'                                   =>  'required|integer',
            'quotable_type'                                 =>  'required|string|max:255',
            'contact_id'                                    =>  'required|integer',
            'number'                                        =>  'required|string|max:255',
            'amount'                                        =>  'required|numeric|min:0',
            'purchase_order_items.*.item_id'                =>  'required|integer',
            'purchase_order_items.*.unit_of_measurement_id' =>  'required|integer',
            'purchase_order_items.*.quantity'               =>  'required|numeric|min:0',
            'purchase_order_items.*.item_pricelist_id'      =>  'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->quotation->store($request)) {
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
        if (! $quotation = $this->quotation->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message'   => 'Resource successfully retrieve',
            'quotation' => $quotation
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
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->quotation->update($request, $id)) {
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
        if (! $this->quotation->findOrFail($id)->delete()) {
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
        if (! $this->quotation->restore($id)) {
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
        if (! $this->quotation->forceDestroy($id)) {
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
    public function getAllQuotations()
    {
        if (cache()->has('quotations')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'quotations' => cache('quotations', 5)
            ], 200);
        }

        if (! $quotations = $this->quotation->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'quotations' => $quotations
        ], 200);
    }

    public function contactApproval($id, $status) 
    {
        if (! $quotation = $this->quotation->contactApproval($id, $status)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return view('contact-approvals.home')->with('quotation', (object) $quotation);
    }
}
