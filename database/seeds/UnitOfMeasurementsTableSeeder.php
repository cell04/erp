<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitOfMeasurementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('unit_of_measurements')->create([
            'corporation_id' => 1,
            'name'           => 'grams',
            'abbreviation'   => 'g',
            'default_value'  => 'yes'
        ]);

        DB::table('unit_of_measurements')->create([
            'corporation_id' => 1,
            'name'           => 'kilograms',
            'abbreviation'   => 'kg',
            'default_value'  => 'no'
        ]);

        DB::table('unit_of_measurements')->create([
            'corporation_id' => 1,
            'name'           => 'liters',
            'abbreviation'   => 'l',
            'default_value'  => 'no'
        ]);

        DB::table('unit_of_measurements')->create([
            'corporation_id' => 1,
            'name'           => 'milliliters',
            'abbreviation'   => 'ml',
            'default_value'  => 'yes'
        ]);

        DB::table('conversions')->create([
            'corporation_id'                => 1,
            'unit_of_measurement_from_id'   => 2,
            'from_value'                    => 1,
            'unit_of_measurement_to_id'     => 1,
            'to_value'                      => 1000
        ]);

        DB::table('conversions')->create([
            'corporation_id'                => 1,
            'unit_of_measurement_from_id'   => 3,
            'from_value'                    => 1,
            'unit_of_measurement_to_id'     => 4,
            'to_value'                      => 1000
        ]);
    }
}
