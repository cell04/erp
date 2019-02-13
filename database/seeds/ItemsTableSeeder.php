<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'corporation_id'                 => 1,
            'item_type_id'                   => 1,
            'item_classification_id'         => 1,
            'name'                           => 'Oats',
            'description'                    => 'Oats description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 1,
            'purchase_unit_of_measurement_id'=> 1,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8
         ]);

        DB::table('items')->insert([
            'corporation_id'                 => 1,
            'item_type_id'                   => 1,
            'item_classification_id'         => 1,
            'name'                           => 'Rice',
            'description'                    => 'Rice description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 1,
            'purchase_unit_of_measurement_id'=> 1,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8
        ]);

        DB::table('items')->insert([
            'corporation_id'                 => 1,
            'item_type_id'                   => 2,
            'item_classification_id'         => 3,
            'name'                           => 'Coca-cola',
            'description'                    => 'Coca-cola description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 4,
            'purchase_unit_of_measurement_id'=> 4,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8
        ]);

        DB::table('items')->insert([
            'corporation_id'                 => 1,
            'item_type_id'                   => 2,
            'item_classification_id'         => 3,
            'name'                           => 'Mountain Dew',
            'description'                    => 'Mountain dew description',
            'stock_keeping_unit'             => rand(10000, 99999),
            'default_unit_of_measurement_id' => 4,
            'purchase_unit_of_measurement_id'=> 4,
            'asset_account_id'               => 11,
            'cogs_account_id'                => 9,
            'sales_account_id'               => 6,
            'expense_account_id'             => 8
        ]);
    }
}
