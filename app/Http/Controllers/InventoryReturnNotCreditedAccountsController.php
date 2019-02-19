<?php

namespace App\Http\Controllers;

use App\Http\Resources\InventoryReceiveNotBilledAccountResource;
use App\Repositories\InventoryReturnNotCreditedAccountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InventoryReturnNotCreditedAccountsController extends Controller
{
    protected $inventoryReturnNotCreditedAccount;

    public function __construct(InventoryReturnNotCreditedAccountRepository $inventoryReturnNotCreditedAccount)
    {
        $this->inventoryReturnNotCreditedAccount = $inventoryReturnNotCreditedAccount;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = InventoryReceiveNotBilledAccountResource::collection(
            $this->inventoryReturnNotCreditedAccount->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'account_id' =>  'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }

        if (! $this->inventoryReturnNotCreditedAccount->store($request)) {
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
        if (! $inventoryReturnNotCreditedAccount = $this->inventoryReturnNotCreditedAccount->findOrFail($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Resource does not exist.'
            ], 200);
        }

        return response()->json([
            'response'    => true,
            'message'     => 'Resource successfully retrieve.',
            'inventoryReturnNotCreditedAccount' => $inventoryReturnNotCreditedAccount
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
            'account_id' =>  'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }

        if (! $this->inventoryReturnNotCreditedAccount->update($request, $id)) {
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
        if (! $this->inventoryReturnNotCreditedAccount->findOrFail($id)->delete()) {
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
        if (! $this->inventoryReturnNotCreditedAccount->restore($id)) {
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
        if (! $this->inventoryReturnNotCreditedAccount->forceDestroy($id)) {
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
    public function getAllInventoryReturnNotCreditedAccounts()
    {
        if (cache()->has('inventory_return_not_credited_accounts')) {
            return response()->json([
                'response'     => true,
                'message'      => 'Resources successfully retrieve.',
                'inventory_return_not_credited_accounts' => cache('inventory_return_not_credited_accounts')
            ], 200);
        }

        if (! $inventory_return_not_credited_accounts = $this->inventoryReturnNotCreditedAccount->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'     => true,
            'message'      => 'Resources successfully retrieve.',
            'inventory_return_not_credited_accounts' => $inventory_retuen_not_credited_accounts
        ], 200);
    }
}
