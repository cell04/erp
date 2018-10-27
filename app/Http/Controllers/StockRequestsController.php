<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\StockRequestResource;
use App\Repositories\StockRequestRepository;

class StockRequestsController extends Controller
{
    /**
     * StockRequest repository.
     *
     * @var App\Repositories\StockRequestRepository
     */
    protected $stockRequest;

    /**
     * Create new instance of stock request controller.
     *
     * @param StockRequestRepository stockRequest StockRequest repository
     */
    public function __construct(StockRequestRepository $stockRequest)
    {
        $this->stockRequest = $stockRequest;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = StockRequestResource::collection(
            $this->stockRequest->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
        return $this->stockRequest->store($request);

        $validator = Validator::make($request->all(), [

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->stockRequest->store($request)) {
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
        if (! $stockRequest = $this->stockRequest->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully retrieve',
            'stockRequest' => $stockRequest
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
        return $this->stockRequest->update($request, $id);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->stockRequest->update($request, $id)) {
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
        if (! $this->stockRequest->findOrFail($id)->delete()) {
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
        if (! $this->stockRequest->restore($id)) {
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
        if (! $this->stockRequest->forceDestroy($id)) {
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
    public function getAllStockRequests()
    {
        if (cache()->has('stock_requests')) {
            return response()->json([
                'response'       => true,
                'message'        => 'Resources successfully retrieve.',
                'stock_requests' => cache('stock_requests', 5)
            ], 200);
        }

        if (! $stock_requests = $this->stockRequest->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'       => true,
            'message'        => 'Resources successfully retrieve.',
            'stock_requests' => $stock_requests
        ], 200);
    }

    /**
     * Approve stock request status to approved using specified id.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function approve($id)
    {
        if (! $this->stockRequest->approve($id)) {
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

    /**
     * Approve stock request status to cancelled using specified id.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function cancel($id)
    {
        if (! $this->stockRequest->cancel($id)) {
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
