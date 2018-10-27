<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stocks')->insert([
            'corporation_id'         => 1,
            'stockable_id'           => 1,
            'stockable_type'         => 'App\Warehouse',
            'item_id'                => 1,
            'quantity'               => rand(1000, 10000),
            'unit_of_measurement_id' => 1
        ]);

        DB::table('stocks')->insert([
            'corporation_id'         => 1,
            'stockable_id'           => 1,
            'stockable_type'         => 'App\Warehouse',
            'item_id'                => 2,
            'quantity'               => rand(1000, 10000),
            'unit_of_measurement_id' => 1
        ]);

        DB::table('stocks')->insert([
            'corporation_id'         => 1,
            'stockable_id'           => 1,
            'stockable_type'         => 'App\Warehouse',
            'item_id'                => 3,
            'quantity'               => rand(500, 1500),
            'unit_of_measurement_id' => 3
        ]);

        DB::table('stocks')->insert([
            'corporation_id'         => 1,
            'stockable_id'           => 1,
            'stockable_type'         => 'App\Warehouse',
            'item_id'                => 4,
            'quantity'               => rand(500, 1500),
            'unit_of_measurement_id' => 3
        ]);
    }
}
