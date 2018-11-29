<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ReceiveOrderResource;
use App\Repositories\ReceiveOrderRepository;

class ReceiveOrdersController extends Controller
{
    /**
     * ReceiveOrder repository.
     *
     * @var App\Repositories\ReceiveOrderRepository
     */
    protected $receiveOrder;

    /**
     * Create new instance of receive order controller.
     *
     * @param ReceiveOrderRepository receiveOrder ReceiveOrder repository
     */
    public function __construct(ReceiveOrderRepository $receiveOrder)
    {
        $this->receiveOrder = $receiveOrder;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ReceiveOrderResource::collection(
            $this->receiveOrder->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'purchase_order_id'                            =>  'required|integer',
            'reference_number'                             =>  'required|string|max:255',
            'contact_id'                                   =>  'required|integer',
            'receive_order_items.*.item_id'                =>  'required|integer',
            'receive_order_items.*.unit_of_measurement_id' =>  'required|integer',
            'receive_order_items.*.quantity'               =>  'required|numeric|min:0',
            'receive_order_items.*.tracking_number'        =>  'required|string|max:255',
            'receive_order_items.*.expiration_date'        =>  'date|nullable',
            'receive_order_items.*.item_pricelist_id'      =>  'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->receiveOrder->store($request)) {
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
        if (! $receiveOrder = $this->receiveOrder->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully retrieve',
            'receiveOrder' => $receiveOrder
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
            'purchase_order_id'                            =>  'required|integer',
            'reference_number'                             =>  'required|string|max:255',
            'contact_id'                                   =>  'required|integer',
            'receive_order_items.*.item_id'                =>  'required|integer',
            'receive_order_items.*.unit_of_measurement_id' =>  'required|integer',
            'receive_order_items.*.quantity'               =>  'required|numeric|min:0',
            'receive_order_items.*.tracking_number'        =>  'required|string|max:255',
            'receive_order_items.*.expiration_date'        =>  'date|nullable',
            'receive_order_items.*.item_pricelist_id'      =>  'required|integer'
        ]); 

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->receiveOrder->update($request, $id)) {
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
        if (! $this->receiveOrder->findOrFail($id)->delete()) {
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
        if (! $this->receiveOrder->restore($id)) {
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
        if (! $this->receiveOrder->forceDestroy($id)) {
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
    public function getAllReceiveOrder()
    {
        if (cache()->has('receive-orders')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'receive_orders' => cache('receive-orders', 5)
            ], 200);
        }

        if (! $receiveOrders = $this->receiveOrder->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'receive_orders' => $receiveOrders
        ], 200);
    }
}
