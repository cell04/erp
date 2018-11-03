<?php

use Illuminate\Database\Seeder;

class ModeOfPaymentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mode_of_payments')->insert([
            'name'        => 'Cash',
            'description' => 'Cash Payment'
        ]);

        DB::table('mode_of_payments')->insert([
            'name'        => 'Check',
            'description' => 'Check Payment'
        ]);
    }
}
