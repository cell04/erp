<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\JournalResource;
use App\Repositories\JournalRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JournalsController extends Controller
{
    /**
     * Journal repository.
     *
     * @var App\Repositories\JournalRepository
     */
    protected $journal;
    
    /**
     * Create new instance of journal controller.
     *
     * @param JournalRepository journal Journal repository
     */
    public function __construct(JournalRepository $journal)
    {
        $this->journal = $journal;
        $this->middleware('check.corporation')->only('store');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! $data = JournalResource::collection($this->journal->paginateAndFilter(request()->per_page, request()->status))) {
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
            'contact_id'        => 'required|integer',
            'reference_number'  => 'required',
            'memo'              => 'required',
            'amount'            => 'required|integer',
            'posting_period'    => 'required'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }
    
        if (! $this->journal->store($request)) {
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
        if (! $journal = $this->journal->findOrFail($id)) {
            return response()->json([
                'response' => false,
                'message'  => 'Resource does not exist.'
            ], 400);
        }
    
        return response()->json([
            'response' => true,
            'message'  => 'Resource successfully retrieve.',
            'journal'  => $journal
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
            'journal_id' => 'required|integer'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'response' => false,
                'message'  => 'Validation failed.',
                'errors'   => $validator->errors()
            ], 400);
        }
    
        if (! $this->journal->update($request, $id)) {
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
        if (! $this->journal->findOrFail($id)->delete()) {
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
        if (! $this->journal->restore($id)) {
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
        if (! $this->journal->forceDestroy($id)) {
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
     * Update journal status to locked using specified id.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function lock($id)
    {
        if (! $this->journal->lock($id)) {
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
     * Update journal status to verified using specified id.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function cancel($id)
    {
        if (! $this->journal->cancel($id)) {
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
