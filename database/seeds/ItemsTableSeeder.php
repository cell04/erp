<?php

use Illuminate\Database\Seeder;
use App\Item;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item = Item::create([
            'corporation_id'                 => 1,
            'item_type_id'                   => 1,
            'item_classification_id'         => 1,
            'name'                           => 'Oats',
            'description'                    => 'Oats description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 1,
            'default_converter'              => 1,
            'purchase_unit_of_measurement_id'=> 2,
            'purchase_converter'             => 1000,
            'selling_unit_of_measurement_id' => 1,
            'selling_converter'              => 1,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8,
            'with_component'                 => 'no'
         ]);

        $item->itemConversions()->createMany([
            ['corporation_id' => 1, 'conversion_id' => 1, 'module' => 1]
        ]);

        $item = Item::create([
            'corporation_id'                 => 1,
            'item_type_id'                   => 1,
            'item_classification_id'         => 1,
            'name'                           => 'Rice',
            'description'                    => 'Rice description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 1,
            'default_converter'              => 1,
            'purchase_unit_of_measurement_id'=> 2,
            'purchase_converter'             => 1000,
            'selling_unit_of_measurement_id' => 1,
            'selling_converter'              => 1,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8,
            'with_component'                 => 'no'
        ]);

        $item->itemConversions()->createMany([
            ['corporation_id' => 1, 'conversion_id' => 1, 'module' => 1]
        ]);

        $item = Item::create([
            'corporation_id'                 => 1,
            'item_type_id'                   => 2,
            'item_classification_id'         => 3,
            'name'                           => 'Coca-cola',
            'description'                    => 'Coca-cola description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 4,
            'default_converter'              => 1,
            'purchase_unit_of_measurement_id'=> 3,
            'purchase_converter'             => 1000,
            'selling_unit_of_measurement_id' => 4,
            'selling_converter'              => 1,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8,
            'with_component'                 => 'no'
        ]);

        $item->itemConversions()->createMany([
            ['corporation_id' => 1, 'conversion_id' => 2, 'module' => 1]
        ]);

        $item = Item::create([
            'corporation_id'                 => 1,
            'item_type_id'                   => 2,
            'item_classification_id'         => 3,
            'name'                           => 'Mountain Dew',
            'description'                    => 'Mountain dew description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 4,
            'default_converter'              => 1,
            'purchase_unit_of_measurement_id'=> 3,
            'purchase_converter'             => 1000,
            'selling_unit_of_measurement_id' => 4,
            'selling_converter'              => 1,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8,
            'with_component'                 => 'no'
        ]);

        $item->itemConversions()->createMany([
            ['corporation_id' => 1, 'conversion_id' => 2, 'module' => 1]
        ]);
    }
}
