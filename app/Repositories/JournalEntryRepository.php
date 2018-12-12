<?php

namespace App\Repositories;

use App\JournalEntry;

class JournalEntryRepository extends Repository
{
    /**
     * Create new instance of journalEntry repository.
     *
     * @param JournalEntry journalEntry JournalEntry model
     */
    public function __construct(JournalEntry $journalEntry)
    {
        parent::__construct($journalEntry);
        $this->journalEntry = $journalEntry;
    }

    /**
     * Create pagination for the resources.
     *
     * @param  integer $length
     * @return array json object
     */
    public function paginate($length = 10)
    {
        return $this->journalEntry->where('corporation_id', request()->headers->get('CORPORATION-ID'))
            ->paginate($length);
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  $id int
     * @return boolean
     */
    public function storeJournalEntries($request, $id)
    {
        foreach ($request->debits as $debit) {
            $data = [
                'journal_id'     => $id,
                'account_id'     => $debit['account_id'],
                'cost_center_id' => $debit['cost_center_id'],
                'type'           => $debit['type'],
                'amount'         => $debit['amount']
            ];

            $this->journalEntry->create($data);
        }

        foreach ($request->credits as $credit) {
            $data = [
                'journal_id'     => $id,
                'account_id'     => $credit['account_id'],
                'cost_center_id' => $credit['cost_center_id'],
                'type'           => $credit['type'],
                'amount'         => $credit['amount']
            ];

            $this->journalEntry->create($data);
        }

        return true;
    }
}
