<?php

namespace App\Repositories;

use App\Conversion;

class ConversionRepository extends Repository
{
    /**
     * Create new instance of conversion repository.
     *
     * @param Conversion $conversion Conversion repository.
     */
    public function __construct(Conversion $conversion)
    {
        parent::__construct($conversion);
        $this->conversion = $conversion;
    }
}
