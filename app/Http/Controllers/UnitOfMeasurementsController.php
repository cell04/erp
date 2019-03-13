<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UnitOfMeasurementResource;
use App\Repositories\UnitOfMeasurementRepository;

class UnitOfMeasurementsController extends Controller
{
    /**
     * UnitOfMeasurement repository.
     *
     * @var App\Repositories\UnitOfMeasurementRepository
     */
    protected $unitOfMeasurement;

    /**
     * Create new instance of unit of measurement controller.
     *
     * @param UnitOfMeasurementRepository unitOfMeasurement UnitOfMeasurement repository
     */
    public function __construct(UnitOfMeasurementRepository $unitOfMeasurement)
    {
        $this->unitOfMeasurement = $unitOfMeasurement;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = UnitOfMeasurementResource::collection(
            $this->unitOfMeasurement->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'name'          =>  'required|string|min:3|max:255',
            'abbreviation'  =>  'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->unitOfMeasurement->store($request)) {
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
        if (! $unitOfMeasurement = $this->unitOfMeasurement->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully retrieve',
            'unitOfMeasurement' => $unitOfMeasurement
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
            'name'          =>  'required|string|min:3|max:255',
            'abbreviation'  =>  'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->unitOfMeasurement->update($request, $id)) {
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
        if (! $this->unitOfMeasurement->findOrFail($id)->delete()) {
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
        if (! $this->unitOfMeasurement->restore($id)) {
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
        if (! $this->unitOfMeasurement->forceDestroy($id)) {
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
    public function getAllUnitOfMeasurements()
    {
        if (cache()->has('unit-of-measurements')) {
            return response()->json([
                'response'             => true,
                'message'              => 'Resources successfully retrieve.',
                'unit_of_measurements' => cache('unit-of-measurements', 5)
            ], 200);
        }

        if (! $unitOfMeasurements = $this->unitOfMeasurement->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'             => true,
            'message'              => 'Resources successfully retrieve.',
            'unit_of_measurements' => $unitOfMeasurements
        ], 200);
    }

    /**
     * Retrieve all resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllBaseUnitOfMeasurements()
    {
        if (! $unitOfMeasurements = $this->unitOfMeasurement->allBaseUnit()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'             => true,
            'message'              => 'Resources successfully retrieve.',
            'unit_of_measurements' => $unitOfMeasurements
        ], 200);
    }

    /**
     * Retrieve all resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllTheSameBaseUnitOfMeasurements(Request $request)
    {
        if (! $unitOfMeasurements = $this->unitOfMeasurement->allWithTheSameBaseUnit($request->unit_of_measurement_id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'             => true,
            'message'              => 'Resources successfully retrieve.',
            'unit_of_measurements' => $unitOfMeasurements
        ], 200);
    }   
}
