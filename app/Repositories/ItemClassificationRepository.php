<?php

namespace App\Repositories;

use App\ItemClassification;

class ItemClassificationRepository extends Repository
{
    /**
     * Create new instance of item classification repository.
     *
     * @param ItemClassification $itemClassification ItemClassification repository.
     */
    public function __construct(ItemClassification $itemClassification)
    {
        parent::__construct($itemClassification);
        $this->itemClassification = $itemClassification;
    }
}
