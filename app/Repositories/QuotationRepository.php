<?php

namespace App\Repositories;

use App\Contracts\RepositoryInterface;
use App\Quotation;
use App\Contact;
use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use App\Notifications\QuotationApproval;

class QuotationRepository extends Repository
{
    private $contact;

    public function __construct(Quotation $quotation, Contact $contact)
    {
        parent::__construct($quotation);
        $this->quotation = $quotation;
        $this->contact = $contact;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $quotation = $this->quotation->create($request->all());
            $quotation->quotationItems()->createMany($request->quotation_items);
            return  $quotation;
        });
    }

    public function all()
    {
        return $this->quotation->with('contact', 'corporation', 'approvedBy', 'user')
        ->get();
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->quotation->with('contact', 'corporation', 'approvedBy', 'user')
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
                if ($request->status) {
                    $request->request->add(['approved_by' => auth('api')->user()->id]);
                }
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

                //check if quotation is approved
                if ($quotation->status == 1 && ! empty($quotation->approved_by)) {
                    //send email notification to quotation contact
                    $contact = $this->contact->find($quotation->contact_id);
                    $contact->notify(new QuotationApproval($quotation));
                }

                return $quotation;
            }

            return null;
        });
    }

    public function findOrFail($id)
    {
        return  $this->quotation->with([
            'contact',
            'corporation',
            'approvedBy',
            'user',
            'quotationItems' => function ($query) {
                $query->with('item', 'unitOfMeasurement', 'itemPricelist');
            }
        ])->findOrFail($id);
    }

    public function contactApproval($id, $status)
    {
        return DB::transaction(function () use ($id, $status) {
            //find quotation
            $quotation = $this->quotation->findOrFail($id);
            if ($quotation->status == 1) {
                $quotation->update(['status' => $status]);
                if ($quotation->status == 2) {
                    return array('quotation' => $quotation, 'message' => 'Quotation Approved');
                }

                return array('quotation' => $quotation, 'message' => 'Quotation Cancelled');
            }

            return array('quotation' => $quotation, 'message' => 'Quotation is already Managed');
        });
    }
}
