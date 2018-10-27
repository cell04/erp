<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('contact_types')->insert([
            'corporation_id' => 1,
            'name'           => 'customer',
            'display_name'   => 'Customer',
            'description'    => 'Customer description'
        ]);

        DB::table('contact_types')->insert([
            'corporation_id' => 1,
            'name'           => 'supplier',
            'display_name'   => 'Supplier',
            'description'    => 'Supplier description'
        ]);

        DB::table('contact_types')->insert([
            'corporation_id' => 1,
            'name'           => 'employee',
            'display_name'   => 'Employee',
            'description'    => 'Employee description'
        ]);
    }
}
