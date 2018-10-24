<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_types')->insert([
            'corporation_id' => 1,
            'name'           => 'food',
            'display_name'   => 'Food'
            'description'    => 'Food description'
        ]);
    }
}
