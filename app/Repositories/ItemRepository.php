<?php

namespace App\Repositories;

use App\Item;

class ItemRepository extends Repository
{
    /**
     * Create new instance of item repository.
     *
     * @param Item $item Item repository.
     */
    public function __construct(Item $item)
    {
        parent::__construct($item);
        $this->item = $item;
    }

    public function store($request)
    {
        $request->request->add([
            'asset_account_id'    => 11,
            'cogs_account_id'     => 9,
            'sales_account_id'    => 6,
            'expense_account_id'  => 8
        ]);
        
        return $this->model->create($request->all());
    }
}
