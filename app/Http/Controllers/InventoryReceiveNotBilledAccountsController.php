<?php

namespace App\Http\Controllers;

use App\Http\Resources\InventoryReturnNotCreditedAccountResource;
use App\Repositories\InventoryReceiveNotBilledAccountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InventoryReceiveNotBilledAccountsController extends Controller
{
    protected $inventoryReceiveNotBilledAccount;

    public function __construct(InventoryReceiveNotBilledAccountRepository $inventoryReceiveNotBilledAccount)
    {
        $this->inventoryReceiveNotBilledAccount = $inventoryReceiveNotBilledAccount;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = InventoryReturnNotCreditedAccountResource::collection(
            $this->inventoryReceiveNotBilledAccount->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
           
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }

        if (! $this->inventoryReceiveNotBilledAccount->store($request)) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to store resource.'
            ], 500);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully stored.'
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
        if (! $inventoryReceiveNotBilledAccount = $this->inventoryReceiveNotBilledAccount->findOrFail($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Resource does not exist.'
            ], 200);
        }

        return response()->json([
            'response'    => true,
            'message'     => 'Resource successfully retrieve.',
            'inventoryReceiveNotBilledAccount' => $inventoryReceiveNotBilledAccount
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
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }

        if (! $this->inventoryReceiveNotBilledAccount->update($request, $id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to update resource.'
            ], 500);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully updated.'
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
        if (! $this->inventoryReceiveNotBilledAccount->findOrFail($id)->delete()) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to delete resource.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully deleted.'
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
        if (! $this->inventoryReceiveNotBilledAccount->restore($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to restore resource.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully restored.'
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
        if (! $this->inventoryReceiveNotBilledAccount->forceDestroy($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to permanently delete resource.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully deleted permanently.'
        ], 200);
    }

    /**
     * Retrieve all resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllInventoryReceiveNotBilledAccounts()
    {
        if (cache()->has('inventory_receive_not_billed_accounts')) {
            return response()->json([
                'response'     => true,
                'message'      => 'Resources successfully retrieve.',
                'inventory_receive_not_billed_accounts' => cache('inventory_receive_not_billed_accounts')
            ], 200);
        }

        if (! $inventory_receive_not_billed_accounts = $this->inventoryReceiveNotBilledAccount->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'     => true,
            'message'      => 'Resources successfully retrieve.',
            'inventory_receive_not_billed_accounts' => $inventory_receive_not_billed_accounts
        ], 200);
    }  
}
