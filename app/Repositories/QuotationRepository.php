<?php 

namespace App\Repositories;

use App\Contracts\RepositoryInterface;
use App\Quotation;
use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;

class QuotationRepository extends Repository
{
    public function __construct(Quotation $quotation)
    {
        parent::__construct($quotation);
        $this->quotation = $quotation;
    } 

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            // store stock request 
            $quotation = $this->quotation->create($request->all());
            //store stock request items
            $quotation->quotationItems()->createMany($request->quotation_items);

            return  $quotation;
        });
    } 

    public function all()
    {
        return $this->quotation->with('contact', 'corporation', 'approveBy', 'user')
        )->get();
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->quotation->with('contact', 'corporation', 'approveBy', 'user')
            ->filter($request)
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->quotation->createPaginationUrl($request, $removePage)
            );
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) { 
            //find quotation
            $quotation = $this->quotation->findOrFail($id);
            // check if status is equal to 0 = pending
            if ($quotation->status == 0) {
                $request->request->add(['approve_by' => auth('api')->user()->id]);         
                //update stock request
                $quotation->fill($request->all());
                $quotation->save();

                // check if stock request items is exist
                if ($request->has('quotation_items')) {
                    //soft delete the stock request items where not in the stock request items array
                    $quotation->quotationItems()->delete();
                    //create new stock request items
                    $quotation->quotationItems()->createMany($request->quotation_items);
                }

                return $quotation;
            }

            return null;
        });
    }
}