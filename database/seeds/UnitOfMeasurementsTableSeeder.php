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
        DB::table('unit_of_measurements')->insert([
            'corporation_id' => 1,
            'name'           => 'grams',
            'abbreviation'   => 'g'
        ]);

        DB::table('unit_of_measurements')->insert([
            'corporation_id' => 1,
            'name'           => 'kilograms',
            'abbreviation'   => 'kg'
        ]);

        DB::table('unit_of_measurements')->insert([
            'corporation_id' => 1,
            'name'           => 'liters',
            'abbreviation'   => 'l'
        ]);

        DB::table('unit_of_measurements')->insert([
            'corporation_id' => 1,
            'name'           => 'milliliters',
            'abbreviation'   => 'ml'
        ]);
    }
}
