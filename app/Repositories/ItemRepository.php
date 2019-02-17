<?php

namespace App\Repositories;

use App\Conversion;
use App\Item;
use Illuminate\Support\Facades\DB;

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

    public function findOrFail($id)
    {
        return $this->item->with('itemConversions')
        ->findOrFail($id);
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $request->request->add([
                'asset_account_id'    => 11,
                'cogs_account_id'     => 9,
                'sales_account_id'    => 6,
                'expense_account_id'  => 8
            ]);
            
            $item = $this->item->create($request->all());
            $item->itemConversions()->createMany($request->item_conversions);

            return $item;
        });
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
                    'name' => $conversion->from_value .' ' . $conversion->convertFrom->name . ' - ' . $conversion->to_value . ' ' . $conversion->convertTo->name,
                    'convert_from' => $conversion->convertFrom,
                    'from_value' => $conversion->from_value,
                    'convert_to' => $conversion->convertTo,
                    'to_value' =>   $conversion->to_value
                );
            }
        }

        return $data;
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            $item = $this->item->findOrFail($id);
            $item->fill($request->all());
            $item->save();
            $item->itemConversions()->delete();

            return $item->itemConversions()->createMany($request->item_conversions);
        });
    }
}
