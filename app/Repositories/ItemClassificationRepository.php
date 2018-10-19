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

    /**
     * Retrieve all resources by using specified item type id.
     *
     * @param  int $id Item Type Id
     * @return array object
     */
    public function getAllByItemTypeId($id)
    {
        return $this->itemClassification->where('item_type_id', $id)->get();
    }
}
