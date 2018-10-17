<?php

namespace App\Repositories;

use App\Branch;

class BranchRepository extends Repository
{
    /**
     * Create new instance of branch repository.
     *
     * @param Branch branch Branch model
     */
    public function __construct(Branch $branch)
    {
        parent::__construct($branch);
        $this->branch = $branch;
    }
}
