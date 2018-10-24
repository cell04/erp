<?php

use Illuminate\Database\Seeder;

class ItemPricelistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_pricelists')->insert([
            'corporation_id' => 1,
            'item_id'        => 1,
            'price'          => rand(50, 200)
        ]);

        DB::table('item_pricelists')->insert([
            'corporation_id' => 1,
            'item_id'        => 2,
            'price'          => rand(50, 200)
        ]);

        DB::table('item_pricelists')->insert([
            'corporation_id' => 1,
            'item_id'        => 3,
            'price'          => rand(50, 200)
        ]);

        DB::table('item_pricelists')->insert([
            'corporation_id' => 1,
            'item_id'        => 4,
            'price'          => rand(50, 200)
        ]);
    }
}
