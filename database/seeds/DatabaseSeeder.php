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
        $this->call(ContactTypesTableSeeder::class);
        $this->call(ContactsTableSeeder::class);
        $this->call(ItemTypesTableSeeder::class);
        $this->call(ItemClassificationsTableSeeder::class);
        $this->call(UnitOfMeasurementsTableSeeder::class);
        $this->call(ItemsTableSeeder::class);
        $this->call(ItemPricelistsTableSeeder::class);
    }
}
