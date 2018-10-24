<?php

use Illuminate\Database\Seeder;

class CorporationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Corporation::class, 1)->create();
    }
}
