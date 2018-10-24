<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CorporationsTableSeeder::class);
        $this->call(WarehousesTableSeeder::class);
        $this->call(BranchesTableSeeder::class);
    }
}
