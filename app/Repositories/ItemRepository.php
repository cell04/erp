<?php

namespace App\Repositories;

use App\UnitOfMeasurement;
use App\Conversion;
use App\Item;
use Illuminate\Support\Facades\DB;

class ItemRepository extends Repository
{
    protected $conversion;
    protected $purchaseConverter = 1;
    protected $defaultConverter = 1;
    protected $sellingConverter = 1;
    protected $uom;

    /**
     * Create new instance of item repository.
     *
     * @param Item $item Item repository.
     */
    public function __construct(Item $item, Conversion $conversion, UnitOfMeasurement $uom)
    {
        parent::__construct($item);
        $this->item = $item;
        $this->conversion = $conversion;
        $this->uom = $uom;
    }

    public function findOrFail($id)
    {
        return $this->item->with('itemConversions', 'itemComponents')
        ->findOrFail($id);
    }

    public function generateStoreConverters($request)
    {
        $defaultConvertToId = null;
        $sellingConvertToId = null;

        if ($request->item_conversions) {
            foreach ($request->item_conversions as $conversion) {
                if ($request->default_unit_of_measurement_id === $conversion['convertFrom']['id']) {
                    $defaultConvertToId = $conversion['convertTo']['id'];
                    $this->defaultConverter = $this->defaultConverter * ($conversion['from_value'] * $conversion['to_value']);
                } else {
                    if ($defaultConvertToId === $conversion['convertFrom']['id']) {
                        $this->defaultConverter = $this->defaultConverter * ($conversion['from_value'] * $conversion['to_value']);
                    }
                }

                if ($request->selling_unit_of_measurement_id === $conversion['convertFrom']['id']) {
                    $sellingConvertToId = $conversion['convertTo']['id'];
                    $this->sellingConverter = $this->sellingConverter * ($conversion['from_value'] * $conversion['to_value']);
                } else {
                    if ($sellingConvertToId === $conversion['convertFrom']['id']) {
                        $this->sellingConverter = $this->sellingConverter * ($conversion['from_value'] * $conversion['to_value']);
                    }
                }

                $this->purchaseConverter = $this->purchaseConverter * ($conversion['from_value'] * $conversion['to_value']); 
            }
        }

        return true;
    }

    public function generateUpdateConverters($request)
    {
        $defaultConvertToId = null;
        $sellingConvertToId = null;

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

                if ($request->selling_unit_of_measurement_id === $conversion['conversion']['convert_from']['id']) {
                    $sellingConvertToId = $conversion['conversion']['convert_to']['id'];                    
                    $this->sellingConverter = $this->sellingConverter * ($conversion['conversion']['from_value'] * $conversion['conversion']['to_value']);
                } else {
                    if ($sellingConvertToId === $conversion['conversion']['convert_from']['id']) {
                        $this->sellingConverter = $this->sellingConverter * ($conversion['conversion']['from_value'] * $conversion['conversion']['to_value']);
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
            // return $request->all();
            $this->generateStoreConverters($request);

            $request->request->replace([
                'asset_account_id'    => 11,
                'cogs_account_id'     => 9,
                'sales_account_id'    => 6,
                'expense_account_id'  => 8,
                'purchase_converter'  => $this->purchaseConverter,
                'default_converter'   => $this->defaultConverter,
                'selling_converter'   => $this->sellingConverter
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

    public function withoutComponents()
    {
        return $this->item->where('with_component', 'no')
        ->get();
    }

    public function getConversions($uom)
    {
        $i = 0;
        $data = [];
        $unit = $this->uom->findOrFail($uom);

        $conversions = $this->getUnitWithConversion($unit);
        $availableUOM = $this->avaliableUnitBaseonSellingUOM($conversions);

        return [
            'conversions' => $conversions,
            'availableUOM' => $availableUOM
        ];
    }

    public function avaliableUnitBaseonSellingUOM($conversions)
    {
        $i = 0;
        $ids = [];
        if (count($conversions)) {
            foreach ($conversions as $conversion) {
                $ids[$i++] = $conversion['convert_from']->id;
                $ids[$i++] = $conversion['convert_to']->id;
            }
        }
        return $this->uom->whereIn('id', $ids)
        ->orderBy('name')
        ->get();
    }

    public function getUnitWithConversion($unit) 
    {
        $data = [];
        $i = 0;

        if ($unit->fromConversions) {
            foreach ($unit->fromConversions as $conversion) {
                $data[$i++] = array(
                    'id' => $conversion->id,
                    'name' => $conversion->from_value .' ' . $conversion->convertFrom->name . ' - ' . $conversion->to_value . ' ' . $conversion->convertTo->name,
                    'convert_from' => $conversion->convertFrom,
                    'from_value' => $conversion->from_value,
                    'convert_to' => $conversion->convertTo,
                    'to_value' =>   $conversion->to_value
                );

                if (count($conversion->convertTo->fromConversions)) {
                    foreach ($conversion->convertTo->fromConversions as $firstLayer) {
                        $data[$i++] = array(
                            'id' => $firstLayer->id,
                            'name' => $firstLayer->from_value .' ' . $firstLayer->convertFrom->name . ' - ' . $firstLayer->to_value . ' ' . $firstLayer->convertTo->name,
                            'convert_from' => $firstLayer->convertFrom,
                            'from_value' => $firstLayer->from_value,
                            'convert_to' => $firstLayer->convertTo,
                            'to_value' =>   $firstLayer->to_value
                        );
                        if (count($firstLayer->convertTo->fromConversions)) {
                            foreach ($conversion->convertTo->fromConversions as $secondLayer) {
                                $data[$i++] = array(
                                    'id' => $secondLayer->id,
                                    'name' => $secondLayer->from_value .' ' . $secondLayer->convertFrom->name . ' - ' . $secondLayer->to_value . ' ' . $secondLayer->convertTo->name,
                                    'convert_from' => $secondLayer->convertFrom,
                                    'from_value' => $secondLayer->from_value,
                                    'convert_to' => $secondLayer->convertTo,
                                    'to_value' =>   $secondLayer->to_value
                                );
                                if (count($secondLayer->convertTo->fromConversions)) {
                                    foreach ($secondLayer->convertTo->fromConversions as $thirdLayer) {
                                        if (count($thirdLayer->convertTo->fromConversions)) {
                                            $data[$i++] = array(
                                                'id' => $thirdLayer->id,
                                                'name' => $thirdLayer->from_value .' ' . $thirdLayer->convertFrom->name . ' - ' . $thirdLayer->to_value . ' ' . $thirdLayer->convertTo->name,
                                                'convert_from' => $thirdLayer->convertFrom,
                                                'from_value' => $thirdLayer->from_value,
                                                'convert_to' => $thirdLayer->convertTo,
                                                'to_value' =>   $thirdLayer->to_value
                                            );

                                            foreach ($thirdLayer->convertTo->fromConversions as $fourthLayer) { 
                                                $data[$i++] = array(
                                                    'id' => $fourthLayer->id,
                                                    'name' => $fourthLayer->from_value .' ' . $fourthLayer->convertFrom->name . ' - ' . $fourthLayer->to_value . ' ' . $fourthLayer->convertTo->name,
                                                    'convert_from' => $fourthLayer->convertFrom,
                                                    'from_value' => $fourthLayer->from_value,
                                                    'convert_to' => $fourthLayer->convertTo,
                                                    'to_value' =>   $fourthLayer->to_value
                                                );
                                                if (count($thirdLayer->convertTo->fromConversions)) {
                                                    foreach ($fourthLayer->convertTo->fromConversions as $fifthLayer) { 
                                                        $data[$i++] = array(
                                                            'id' => $fifthLayer->id,
                                                            'name' => $fifthLayer->from_value .' ' . $fifthLayer->convertFrom->name . ' - ' . $fifthLayer->to_value . ' ' . $fifthLayer->convertTo->name,
                                                            'convert_from' => $fifthLayer->convertFrom,
                                                            'from_value' => $fifthLayer->from_value,
                                                            'convert_to' => $fifthLayer->convertTo,
                                                            'to_value' =>   $fifthLayer->to_value
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } 
                            }
                        }
                    }
                }
            }
        }

        if ($unit->toConversions) {
            foreach ($unit->toConversions as $conversion) {
                $data[$i++] = array(
                    'id' => $conversion->id,
                    'name' => $conversion->from_value .' ' . $conversion->convertFrom->name . ' - ' . $conversion->to_value . ' ' . $conversion->convertTo->name,
                    'convert_from' => $conversion->convertFrom,
                    'from_value' => $conversion->from_value,
                    'convert_to' => $conversion->convertTo,
                    'to_value' =>   $conversion->to_value
                );
                if (count($conversion->convertFrom->toConversions)) {
                    foreach ($conversion->convertFrom->toConversions as $firstLayer) { 
                        $data[$i++] = array(
                            'id' => $firstLayer->id,
                            'name' => $firstLayer->from_value .' ' . $firstLayer->convertFrom->name . ' - ' . $firstLayer->to_value . ' ' . $firstLayer->convertTo->name,
                            'convert_from' => $firstLayer->convertFrom,
                            'from_value' => $firstLayer->from_value,
                            'convert_to' => $firstLayer->convertTo,
                            'to_value' =>   $firstLayer->to_value
                        );
                        if (count($firstLayer->convertFrom->toConversions)) {
                            foreach ($firstLayer->convertFrom->toConversions as $secondLayer) {
                                $data[$i++] = array(
                                    'id' => $secondLayer->id,
                                    'name' => $secondLayer->from_value .' ' . $secondLayer->convertFrom->name . ' - ' . $secondLayer->to_value . ' ' . $secondLayer->convertTo->name,
                                    'convert_from' => $secondLayer->convertFrom,
                                    'from_value' => $secondLayer->from_value,
                                    'convert_to' => $secondLayer->convertTo,
                                    'to_value' =>   $secondLayer->to_value
                                );
                                if (count($secondLayer->convertFrom->toConversions)) {
                                    foreach ($secondLayer->convertFrom->toConversions as $thirdLayer) {
                                        $data[$i++] = array(
                                            'id' => $thirdLayer->id,
                                            'name' => $thirdLayer->from_value .' ' . $thirdLayer->convertFrom->name . ' - ' . $thirdLayer->to_value . ' ' . $thirdLayer->convertTo->name,
                                            'convert_from' => $thirdLayer->convertFrom,
                                            'from_value' => $thirdLayer->from_value,
                                            'convert_to' => $thirdLayer->convertTo,
                                            'to_value' =>   $thirdLayer->to_value
                                        );
                                        if (count($thirdLayer->convertFrom->toConversions)) {
                                            foreach ($thirdLayer->convertFrom->toConversions as $fourthLayer) {
                                                $data[$i++] = array(
                                                    'id' => $fourthLayer->id,
                                                    'name' => $fourthLayer->from_value .' ' . $fourthLayer->convertFrom->name . ' - ' . $fourthLayer->to_value . ' ' . $fourthLayer->convertTo->name,
                                                    'convert_from' => $fourthLayer->convertFrom,
                                                    'from_value' => $fourthLayer->from_value,
                                                    'convert_to' => $fourthLayer->convertTo,
                                                    'to_value' =>   $fourthLayer->to_value
                                                );
                                                if (count($fourthLayer->convertFrom->toConversions)) {
                                                    foreach ($fourthLayer->convertFrom->toConversions as $fifthLayer) {
                                                        $data[$i++] = array(
                                                            'id' => $fifthLayer->id,
                                                            'name' => $fifthLayer->from_value .' ' . $fifthLayer->convertFrom->name . ' - ' . $fifthLayer->to_value . ' ' . $fifthLayer->convertTo->name,
                                                            'convert_from' => $fifthLayer->convertFrom,
                                                            'from_value' => $fifthLayer->from_value,
                                                            'convert_to' => $fifthLayer->convertTo,
                                                            'to_value' =>   $fifthLayer->to_value
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }   

        return collect($data)->unique('id')->values()->all();
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {

            // return $request->all();
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
}
