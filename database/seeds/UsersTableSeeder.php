<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $today = Carbon::today();
        $roles = array(
            array('name' => 'engineer', 'display_name' => 'Engineer', 'description' => 'Engineer', 'created_at' => $today, 'updated_at' => $today),
            array('name' => 'sales', 'display_name' => 'Sales', 'description' => 'Sales', 'created_at' => $today, 'updated_at' => $today),
            array('name' => 'manager', 'display_name' => 'Manager', 'description' => 'Manager', 'created_at' => $today, 'updated_at' => $today),
            array('name' => 'admin', 'display_name' => 'Admin', 'description' => 'Admin', 'created_at' => $today, 'updated_at' => $today)
        );

        DB::table('roles')->insert($roles);
        DB::table('users')->insert([
            'name'     => 'Admin',
            'email'    => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'mobile_number' => '09090909091',
            'created_at' => $today,
            'updated_at' => $today
        ]);

        DB::table('user_roles')->insert([
            'user_id' => 1,
            'role_id' => 4,
            'created_at' => $today,
            'updated_at' => $today
        ]);

        DB::table('corporation_user')->insert([
            'corporation_id' => 1,
            'user_id' => 1
        ]);
    }
}
