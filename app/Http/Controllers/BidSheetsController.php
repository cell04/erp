<?php

namespace App\Http\Controllers;

use App\Http\Resources\BidSheetResource;
use App\Repositories\BidSheetRepository;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class BidSheetsController extends Controller
{
    protected $bidSheet;

    public function __construct(BidSheetRepository $bidSheet)
    {
        $this->bidSheet = $bidSheet;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = BidSheetResource::collection(
            $this->bidSheet->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'location_id'       =>  'required|integer',
            'location_type'     =>  'required|string|max:255',
            'contact_id'        =>  'required|integer',
            'bid_sheet_number'  =>  'required|string|max:255',
            'amount'            =>  'required|numeric|min:0',
            'bid_sheet_date'    =>  'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->bidSheet->store($request)) {
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
        if (! $bidSheet = $this->bidSheet->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message'   => 'Resource successfully retrieve',
            'bidSheet'  => $bidSheet
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

        if (! $this->bidSheet->update($request, $id)) {
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
        if (! $this->bidSheet->findOrFail($id)->delete()) {
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
        if (! $this->bidSheet->restore($id)) {
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
        if (! $this->bidSheet->forceDestroy($id)) {
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
    public function getAllBidSheets()
    {
        if (cache()->has('bid_sheets')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'bid_sheets' => cache('bid_sheets', 5)
            ], 200);
        }

        if (! $bid_sheets = $this->bidSheet->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'bid_sheets' => $bid_sheets
        ], 200);
    }

    // public function contactApproval($id, $status) 
    // {
    //     if (! $quotation = $this->quotation->contactApproval($id, $status)) {
    //         return response()->json([
    //             'message' => 'Resource does not exist'
    //         ], 400);
    //     }

    //     return view('contact-approvals.home')->with('quotation', (object) $quotation);
    // }
}
