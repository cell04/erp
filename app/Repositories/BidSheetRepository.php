<?php 

namespace App\Repositories;

use App\BidSheet;
use App\Notifications\SendApprovedBidSheetToCustomer;
use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;

class BidSheetRepository extends Repository
{
    public function __construct(BidSheet $bidSheet)
    {
        parent::__construct($bidSheet);
        $this->bidSheet = $bidSheet;
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            //find quotation
            $bidSheet = $this->bidSheet->findOrFail($id);
            // check if status is equal to 0 = pending
            if ($bidSheet->status == 0) {
                if ($request->status) {
                    // $request->request->add(['approved_by' => auth('api')->user()->id]);
                    $request->request->add(['approved_by' => request()->headers->get('user-id')]);
                }
                //update stock request
                $bidSheet->fill($request->all());
                $bidSheet->save();

                //check if bidSheet is approved
                if ($bidSheet->status == 1 && ! empty($bidSheet->approved_by)) {
                    $bidSheet->contact->notify(new SendApprovedBidSheetToCustomer($bidSheet));
                }

                return $bidSheet;
            }

            return null;
        });
    }

    public function findOrFail($id)
    {
        return $this->bidSheet->with('location', 'user', 'approvedBy', 'contact')
        ->findOrFail($id);
    }

    public function paginateWithFilters(
        $request = null,
        $length = 10,
        $orderBy = 'desc',
        $removePage = true
    ) {
        return $this->bidSheet->filter($request)
            ->with('location', 'user', 'approvedBy', 'contact')
            ->orderBy('created_at', $orderBy)
            ->paginate($length)
            ->withPath(
                $this->bidSheet->createPaginationUrl($request, $removePage)
            );
    }

    // public function all()
    // {
    //     return $this->bidSheet->where('status', 0)
    //     ->get();
    // }  

    public function contactApproval($id, $status)
    {
        return DB::transaction(function () use ($id, $status) {
            //find bidsheet
            $bidSheet = $this->bidSheet->findOrFail($id);
            if ($bidSheet->status == 1) {
                $bidSheet->update(['status' => $status]);
                if ($bidSheet->status == 2) {       

                    return array('quotation' => $bidSheet, 'message' => 'BidSheet Approved');
                }

                return array('quotation' => $bidSheet, 'message' => 'BidSheet Cancelled');
            }

            return array('quotation' => $bidSheet, 'message' => 'BidSheet is already Managed');
        });
    }
}