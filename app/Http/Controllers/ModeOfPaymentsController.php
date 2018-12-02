<?php

namespace App\Http\Controllers;

use App\Repositories\ModeOfPaymentRepository;
use App\Http\Resources\ModeOfPaymentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModeOfPaymentsController extends Controller
{
    protected $modeOfPayment;

    public function __construct(ModeOfPaymentRepository $modeOfPayment)
    {
        $this->modeOfPayment = $modeOfPayment;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! $data = ModeOfPaymentResource::collection($this->modeOfPayment->paginate(request()->per_page))) {
            return response()->json([
                'response' => false,
                'message'  => 'Failed to retrieve resource.'
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
            'name'              =>  'required|string|max:255',
            'display_name'      =>  'required|string|max:255'
        ]); 

        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }

        if (! $this->modeOfPayment->store($request)) {
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
        if (! $modeOfPayment = $this->modeOfPayment->findOrFail($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Resource does not exist.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully retrieve.',
            'modeOfPayment'  => $modeOfPayment
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
            'name'              =>  'required|string|max:255',
            'display_name'      =>  'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }

        if (! $this->modeOfPayment->update($request, $id)) {
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
        if (! $this->modeOfPayment->findOrFail($id)->delete()) {
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
        if (! $this->modeOfPayment->restore($id)) {
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
        if (! $this->modeOfPayment->forceDestroy($id)) {
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
    public function getAllModeOfPayment()
    {
        if (cache()->has('mode_of_payments')) {
            return response()->json([
                'response' => true,
                'message'  => 'Resources successfully retrieve.',
                'mode_of_payments' => cache('mode_of_payments', 5)
            ], 200);
        }

        if (! $mode_of_payments = $this->modeOfPayment->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resources successfully retrieve.',
            'mode_of_payments' => $mode_of_payments
        ], 200);
    }
}
