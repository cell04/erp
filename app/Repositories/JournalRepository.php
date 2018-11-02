<?php

namespace App\Repositories;

use App\Journal;

class JournalRepository extends Repository
{
    /**
     * Journal statuses.
     *
     * @var array
     */
    private $status = [
        1 => 'Active',
        2 => 'Locked',
        3 => 'Cancelled'
    ];

    /**
     * Journal entry repository.
     *
     * @var App\Repositories\JournalEntryRepository
     */
    protected $journalEntry;

    /**
     * Create new instance of journal repository.
     *
     * @param Journal journal Journal model
     */
    public function __construct(Journal $journal, JournalEntryRepository $journalEntry)
    {
        parent::__construct($journal);
        $this->journal = $journal;
        $this->journalEntry = $journalEntry;
    }

    /**
     * Find the resource using the specified id or else fail.
     *
     * @param  int $id
     * @return json object
     */
    public function findOrFail($id)
    {
        return $this->journal->with([
            'journalEntries' => function ($query) {
                $query->with('costCenter', 'account');
            },
            'contact'
        ])->findOrFail($id);
    }

    /**
     * Create pagination and filter using specified resource.
     *
     * @param  int $length [description]
     * @param  string $status [description]
     * @return array json object
     */
    public function paginateAndFilter($length = 10, $status = 'all')
    {
        if ($status == 1 || $status == 2 || $status == 3 || $status == 4) {
            return $this->journal->where('status', $status)
                ->with('user', 'contact')
                ->where('corporation_id', request()->headers->get('CORPORATION-ID'))
                ->paginate($length);
        }

        return $this->journal->with('user', 'contact')
            ->where('corporation_id', request()->headers->get('CORPORATION-ID'))
            ->paginate($length);
    }

    /**
     * Create pagination for the resources.
     *
     * @param  integer $length
     * @return array json object
     */
    public function paginate($length = 10)
    {
        return $this->journal->with('user', 'contact')
            ->where('corporation_id', request()->headers->get('CORPORATION-ID'))
            ->paginate($length);
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return boolean
     */
    public function store($request)
    {
        $data = [
            'contact_id'       => $request->contact_id,
            'reference_number' => $request->reference_number,
            'memo'             => $request->memo,
            'amount'           => $request->amount,
            'posting_period'   => $request->posting_period
        ];

        $id = $this->journal->create($data)->id;
        return $this->journalEntry->storeJournalEntries($request, $id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return boolean
     */
    public function update($request, $id)
    {
        return $this->journalEntry->storeJournalEntries($request, $request->journal_id);
    }

    /**
     * Update journal status to locked using specified id.
     *
     * @param  int $id
     * @return boolean
     */
    public function lock($id)
    {
        return $this->journal->where('id', $id)->update([
            'status' => 2
        ]);
    }

    /**
     * Update journal status to verified using specified id.
     *
     * @param  int $id
     * @return boolean
     */
    public function cancel($id)
    {
        return $this->journal->where('id', $id)->update([
            'status' => 3
        ]);
    }
}
