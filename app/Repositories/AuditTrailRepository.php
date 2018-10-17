<?php

namespace App\Repositories;

use App\AuditTrail;

class AuditTrailRepository extends Repository
{
    /**
     * Create new instance of audit trail repository.
     *
     * @param AuditTrail $auditTrail AuditTrail repository.
     */
    public function __construct(AuditTrail $auditTrail)
    {
        parent::__construct($auditTrail);
        $this->auditTrail = $auditTrail;
    }
}
