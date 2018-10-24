<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemClassificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_classifications')->insert([
            'corporation_id' => 1,
            'item_type_id'   => 1,
            'name'           => 'grain',
            'display_name'   => 'Grain',
            'description'    => 'Grain description'
        ]);

        DB::table('item_classifications')->insert([
            'corporation_id' => 1,
            'item_type_id'   => 2,
            'name'           => 'caffeine drink',
            'display_name'   => 'Caffeine Drink',
            'description'    => 'Caffeine Drink description'
        ]);

        DB::table('item_classifications')->insert([
            'corporation_id' => 1,
            'item_type_id'   => 2,
            'name'           => 'carbonated drink',
            'display_name'   => 'Carbonated Drink',
            'description'    => 'Carbonated drink description'
        ]);
    }
}
