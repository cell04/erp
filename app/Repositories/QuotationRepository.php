<?php

namespace App\Repositories;

use App\Contact;
use App\Contracts\RepositoryInterface;
use App\Journal;
use App\Notifications\NewQuotationNotification;
use App\Notifications\QuotationApproval;
use App\Quotation;
use App\Repositories\Repository;
use App\Repositories\InvoiceRepository;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class QuotationRepository extends Repository
{
    protected $contact;
    protected $invoice;
    protected $user;

    public function __construct(Quotation $quotation, Contact $contact, InvoiceRepository $invoice, User $user)
    {
        parent::__construct($quotation);
        $this->quotation = $quotation;
        $this->contact = $contact;
        $this->invoice = $invoice;
        $this->user = $user;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $quotation = $this->quotation->create($request->all());
            $quotation->quotationItems()->createMany($request->quotation_items);
            $user = $this->user->whereHas('userRole', function ($query) {
                $query->whereHas('role', function($query) {
                    $query->where('name', 'like', "%admin%");
                });
            })->get();

            Notification::send($user, new NewQuotationNotification($quotation));

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
                    // $request->request->add(['approved_by' => session('user-id')]);
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
                $query->with('item', 'unitOfMeasurement');
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
                    $this->deductStocksQuantity($quotation);
                    if ($quotation->contact->payment_term == 2) {
                        $invoice = $quotation->invoices()->create($quotation->toArray());
                        $invoice->invoiceItems()->createMany($quotation->quotationItems->toArray());
                        $this->invoice->generateQuotationEntries($invoice);
                    }

                    return array('quotation' => $quotation, 'message' => 'Quotation Approved');
                }

                return array('quotation' => $quotation, 'message' => 'Quotation Cancelled');
            }

            return array('quotation' => $quotation, 'message' => 'Quotation is already Managed');
        });
    }

    public function deductStocksQuantity($quotation)
    {
        foreach ($quotation->quotationItems as $quotationItem) {
            $stocks = $quotation->quotable->stocks()->where('item_id', $quotationItem->item_id)->get();
            $itemQuantity = $quotationItem->quantity;
            foreach ($stocks as $stock) {
                if ($stock->item_id == $quotationItem->item_id) {
                    if ($stock->quantity > 0) {
                        if ($stock->quantity >= $itemQuantity) {
                            $stock->decrement('quantity', $itemQuantity);
                            $itemQuantity = 0;
                        } else {
                            if ($itemQuantity > $stock->quantity) {
                                $stock->decrement('quantity', $stock->quantity);
                                $itemQuantity = $itemQuantity - $stock->quantity;
                            }
                        }
                    }
                }
            }   
        }

        return true;   
    }
}
