<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\StockTransferResource;
use App\Repositories\StockTransferRepository;

class StockTransfersController extends Controller
{
    /**
     * StockTransfer repository.
     *
     * @var App\Repositories\StockTransferRepository
     */
    protected $stockTransfer;

    /**
     * Create new instance of stock transfer controller.
     *
     * @param StockTransferRepository stockTransfer StockTransfer repository
     */
    public function __construct(StockTransferRepository $stockTransfer)
    {
        $this->stockTransfer = $stockTransfer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = StockTransferResource::collection(
            $this->stockTransfer->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'stock_request_id'                              =>  'required|integer',
            'stock_transferable_from_id'                    =>  'required|integer',
            'stock_transferable_from_type'                  =>  'required|string|max:255',
            'stock_transferable_to_id'                      =>  'required|integer',
            'stock_transferable_to_type'                    =>  'required|string|max:255',
            'number'                                        =>  'required|string|max:255',
            'stock_transfer_items.*.item_id'                =>  'required|integer',
            'stock_transfer_items.*.unit_of_measurement_id' =>  'required|integer',
            'stock_transfer_items.*.quantity'               =>  'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        // return $this->stockTransfer->store($request);

        if (! $this->stockTransfer->store($request)) {
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
        if (! $stockTransfer = $this->stockTransfer->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully retrieve',
            'stockTransfer' => $stockTransfer
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
            'stock_request_id'                              =>  'required|integer',
            'stock_transferable_from_id'                    =>  'required|integer',
            'stock_transferable_from_type'                  =>  'required|string|max:255',
            'stock_transferable_to_id'                      =>  'required|integer',
            'stock_transferable_to_type'                    =>  'required|string|max:255',
            'number'                                        =>  'required|string|max:255',
            'stock_transfer_items.*.item_id'                =>  'required|integer',
            'stock_transfer_items.*.unit_of_measurement_id' =>  'required|integer',
            'stock_transfer_items.*.quantity'               =>  'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->stockTransfer->update($request, $id)) {
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
        if (! $this->stockTransfer->findOrFail($id)->delete()) {
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
        if (! $this->stockTransfer->restore($id)) {
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
        if (! $this->stockTransfer->forceDestroy($id)) {
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
    public function getAllStockTransfers()
    {
        if (cache()->has('stock_transfers')) {
            return response()->json([
                'response'          => true,
                'message'           => 'Resources successfully retrieve.',
                'stock_transfers'    => cache('stock_transfers', 5)
            ], 200);
        }

        if (! $stock_transfers = $this->stockTransfer->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'          => true,
            'message'           => 'Resources successfully retrieve.',
            'stock_transfers'   => $stock_transfers
        ], 200);
    }

    /**
     * Change stock transfer status to transfer using specified id.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function transferred($id)
    {
        if (! $this->stockTransfer->transferred($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to updated resource.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully updated.'
        ], 200);
    }
}
