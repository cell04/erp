<?php

namespace App\Repositories;

use App\Repositories\UnitOfMeasurementRepository;
use App\Conversion;
use App\Item;
use App\ItemConversion;
use Illuminate\Support\Facades\DB;

class ItemRepository extends Repository
{
    protected $conversion;
    protected $purchaseConverter = 1;
    protected $defaultConverter = 1;
    protected $uom;
    protected $itemConversion;
    protected $quantity = 1;

    /**
     * Create new instance of item repository.
     *
     * @param Item $item Item repository.
     */
    public function __construct(Item $item, Conversion $conversion, UnitOfMeasurementRepository $uom, ItemConversion $itemConversion)
    {
        parent::__construct($item);
        $this->item = $item;
        $this->conversion = $conversion;
        $this->uom = $uom;
        $this->itemConversion = $itemConversion;
    }

    public function findOrFail($id)
    {
        return $this->item->with('itemConversions', 'itemComponents')
        ->findOrFail($id);
    }

    public function generateStoreConverters($request)
    {
        $defaultConvertToId = null;
        $defaultConversions = $this->getDefaultConversion($request->purchase_unit_of_measurement_id, $request->default_unit_of_measurement_id);

        if ($request->item_conversions) {
            foreach ($request->item_conversions as $conversion) {
                if ($conversion['module'] === 1) {

                    foreach ($defaultConversions as $default) {
                        if ($default->id === $conversion['conversion_id']) {
                            $this->defaultConverter = $this->defaultConverter * ($conversion['from_value'] * $conversion['to_value']);
                        }
                    }

                    $this->purchaseConverter = $this->purchaseConverter * ($conversion['from_value'] * $conversion['to_value']);
                } 
            }
        }

        return true;
    }

    public function getDefaultConversion($purchaseUOM, $defaultUOM)
    {
        $i = 0;

        foreach ($this->uom->allWithTheSameBaseUnit($defaultUOM) as $unit) {
            if ($purchaseUOM != $unit->id && $defaultUOM != $unit->id) {
                $availableUOM[$i++] = $unit->id; 
            }
        };

        return $this->conversion->whereHas('convertFrom', function($query) use ($defaultUOM) {
            $query->where('id', $defaultUOM);
        })->orWhereHas('convertTo', function ($query) use ($availableUOM) {
            $query->whereIn('id', $availableUOM);
        })->get();
    }

    public function generateUpdateConverters($request)
    {
        $defaultConvertToId = null;

        if ($request->item_conversions) {
            foreach ($request->item_conversions as $conversion) {
                if ($request->default_unit_of_measurement_id === $conversion['conversion']['convert_from']['id']) {
                    $defaultConvertToId = $conversion['conversion']['convert_to']['id'];
                    $this->defaultConverter = $this->defaultConverter * ($conversion['conversion']['from_value'] * $conversion['conversion']['to_value']);
                } else {
                    if ($defaultConvertToId === $conversion['conversion']['convert_from']['id']) {
                        $this->defaultConverter = $this->defaultConverter * ($conversion['conversion']['from_value'] * $conversion['conversion']['to_value']);
                    }
                }

                $this->purchaseConverter = $this->purchaseConverter * ($conversion['conversion']['from_value'] * $conversion['conversion']['to_value']); 
            }
        }

        return true;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {

            $this->generateStoreConverters($request);

            $request->request->add([
                'asset_account_id'    => 11,
                'cogs_account_id'     => 9,
                'sales_account_id'    => 6,
                'expense_account_id'  => 8,
                'purchase_converter'  => $this->purchaseConverter,
                'default_converter'   => $this->defaultConverter,
                'default_conversions' => $this->getDefaultConversion($request->purchase_unit_of_measurement_id, $request->default_unit_of_measurement_id)
            ]);

            $item = $this->item->create($request->all());

            if ($request->item_conversions) {
                $item->itemConversions()->createMany($request->item_conversions);
            }

            if ($request->item_components) {
                $item->itemComponents()->createMany($request->item_components);
            }

            return $item;
        });
    }

    public function getTotalComponentValue($request)
    {
        $i = 0;
        $uom = [];

        foreach ($this->uom->allWithTheSameBaseUnit($request->unit_of_measurement_id) as $unit) {
            $uom[$i++] = $unit->id;     
        }

        $conversions = $this->conversion->where('unit_of_measurement_from_id', $request->unit_of_measurement_id)
        ->whereIn('unit_of_measurement_to_id', $uom)
        ->whereHas('itemConversions', function($query) use ($request) {
            $query->where('module', 2)
            ->where('item_id', $request->item_id);
        })->get();

        if (!empty($conversions)) {
            foreach ($conversions as $conversion) {
                $this->quantity = $this->quantity * ($conversion->from_value * $conversion->to_value);
            }
        }

        return $this->quantity;
    }

    public function withoutComponents()
    {
        return $this->item->where('with_component', 'no')
        ->get();
    }

    public function getConversions($uom)
    {
        $availableUOM = $this->uom->allWithTheSameBaseUnit($uom);

        return [
            'availableUOM' => $availableUOM,
            'conversions' => $this->getUnitWithConversion($availableUOM)
        ];
    }

    public function getUnitWithConversion($availableUOM)
    {
        $i = 0;
        $returnData = null;

        foreach ($availableUOM as $uom) {
            $id[$i++] = $uom->id;
        }

        $i = 0;

        $conversions = $this->conversion->whereHas('convertFrom', function($query) use ($id) {
            $query->whereIn('id', $id);
        })->orWhereHas('convertTo', function($query) use ($id) {
            $query->whereIn('id', $id);
        })->get();  

        if (! empty($conversions)) {
            foreach ($conversions as $conversion) {
                $returnData[$i++] = [
                    'id' => $conversion->id,
                    'name' => $conversion->from_value .' ' . $conversion->convertFrom->name . ' - ' . $conversion->to_value . ' ' . $conversion->convertTo->name,
                    'convert_from' => $conversion->convertFrom,
                    'from_value' => $conversion->from_value,
                    'convert_to' => $conversion->convertTo,
                    'to_value' =>   $conversion->to_value
                ]; 
            }
        }

        return $returnData;
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {

            $this->generateUpdateConverters($request);

            $request->request->add([
                'purchase_converter'  => $this->purchaseConverter,
                'default_converter'   => $this->defaultConverter,
                'selling_converter'   => $this->sellingConverter
            ]);

            $item = $this->item->findOrFail($id);
            $item->fill($request->all());
            $item->save();

            if ($request->item_conversions) {
                $item->itemConversions()->delete();
                $item->itemConversions()->createMany($request->item_conversions);
            }

            if ($request->item_components) {
                $item->itemComponents()->delete();
                $item->itemComponents()->createMany($request->item_components);
            }

            return $item;
        });
    }

    public function getRecipeUnitListPerItem($item)
    {
        $i = 0;
        $unitId = [];

        $conversions = $this->itemConversion->where('module', 2)
        ->where('item_id', $item)
        ->get();

        if (count($conversions)) {
            foreach ($conversions as $conversion) {
                $unitId[$i++] = $conversion->conversion->convertFrom->id;
                $unitId[$i++] = $conversion->conversion->convertTo->id;
            }
        }

        return $this->uom->whereIn('id', $unitId);
    }
}
