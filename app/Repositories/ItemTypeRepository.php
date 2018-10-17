<?php

namespace App\Repositories;

use App\ItemType;

class ItemTypeRepository extends Repository
{
    /**
     * Create new instance of item type repository.
     *
     * @param ItemType $itemType ItemType repository.
     */
    public function __construct(ItemType $itemType)
    {
        parent::__construct($itemType);
        $this->itemType = $itemType;
    }
}
