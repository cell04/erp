<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ItemClassificationResource;
use App\Repositories\ItemClassificationRepository;

class ItemClassificationsController extends Controller
{
    /**
     * ItemClassification repository.
     *
     * @var App\Repositories\ItemClassificationRepository
     */
    protected $itemClassification;

    /**
     * Create new instance of item classification controller.
     *
     * @param ItemClassificationRepository itemClassification ItemClassification repository
     */
    public function __construct(ItemClassificationRepository $itemClassification)
    {
        $this->itemClassification = $itemClassification;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ItemClassificationResource::collection(
            $this->itemClassification->paginateWithFilters(request(), request()->per_page, request()->order_by)
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
            'item_type_id'  =>  'required|integer',
            'name'          =>  'required|string|max:255',
            'display_name'  =>  'required|string|max:255',
            'description'   =>  'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->itemClassification->store($request)) {
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
        if (! $itemClassification = $this->itemClassification->findOrFail($id)) {
            return response()->json([
                'message' => 'Resource does not exist'
            ], 400);
        }

        return response()->json([
            'message' => 'Resource successfully retrieve',
            'itemClassification' => $itemClassification
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
            'item_type_id'  =>  'required|integer',
            'name'          =>  'required|string|max:255',
            'display_name'  =>  'required|string|max:255',
            'description'   =>  'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 400);
        }

        if (! $this->itemClassification->update($request, $id)) {
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
        if (! $this->itemClassification->findOrFail($id)->delete()) {
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
        if (! $this->itemClassification->restore($id)) {
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
        if (! $this->itemClassification->forceDestroy($id)) {
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
    public function getAllItemClassifications()
    {
        if (cache()->has('item-classifications')) {
            return response()->json([
                'response'             => true,
                'message'              => 'Resources successfully retrieve.',
                'item_classifications' => cache('item-classifications', 5)
            ], 200);
        }

        if (! $itemClassifications = $this->itemClassification->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resources successfully retrieve.',
            'item_classifications' => $itemClassifications
        ], 200);
    }

    /**
     * Retrieve all resources by using specified item type id.
     *
     * @param  int $id Item Type Id
     * @return \Illuminate\Http\Response
     */
    public function getAllItemClassificationByItemTypeId($id)
    {
        if (cache()->has('item-classifications')) {
            return response()->json([
                'response'             => true,
                'message'              => 'Resources successfully retrieve.',
                'item_classifications' => cache('item-classifications', 5)
            ], 200);
        }

        if (! $itemClassifications = $this->itemClassification->getAllByItemTypeId($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response' => true,
            'message'  => 'Resources successfully retrieve.',
            'item_classifications' => $itemClassifications
        ], 200);
    }
}
