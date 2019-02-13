<?php

namespace App\Repositories;

use App\Item;
use App\Conversion;

class ItemRepository extends Repository
{
    protected $conversion;

    /**
     * Create new instance of item repository.
     *
     * @param Item $item Item repository.
     */
    public function __construct(Item $item, Conversion $conversion)
    {
        parent::__construct($item);
        $this->item = $item;
        $this->conversion = $conversion;
    }

    public function store($request)
    {
        $request->request->add([
            'asset_account_id'    => 11,
            'cogs_account_id'     => 9,
            'sales_account_id'    => 6,
            'expense_account_id'  => 8
        ]);
        
        return $this->item->create($request->all());
    }

    public function getConversions($from, $to)
    {
        $i = 0;
        $data = [];
        $conversions = $this->conversion->where([
            ['unit_of_measurement_from_id', $from], 
            ['unit_of_measurement_to_id', $to]
        ])->get();

        if ($conversions) {
            foreach ($conversions as $conversion) {
                $data[$i++] = array(
                    'id' => $conversion->id,
                    'name' => $conversion->convertFrom->name . ' - ' . $conversion->convertTo->name
                );
            }
        }

        return $data;
    }
}
