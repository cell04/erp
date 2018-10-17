<?php

namespace App\Repositories;

use App\ItemPricelist;

class ItemPricelistRepository extends Repository
{
    /**
     * Create new instance of item pricelist repository.
     *
     * @param ItemPricelist $itemPricelist ItemPricelist repository.
     */
    public function __construct(ItemPricelist $itemPricelist)
    {
        parent::__construct($itemPricelist);
        $this->itemPricelist = $itemPricelist;
    }
}
