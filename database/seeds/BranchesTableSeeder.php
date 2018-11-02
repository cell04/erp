<?php

use App\CostCenter;
use Illuminate\Database\Seeder;

class BranchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Branch::class, 1)->create();

        CostCenter::create([
            'corporation_id' => 1, 
            'cost_centable_id' => 1, 
            'cost_centable_type' => 'App\\Branch',
        ]);
    }
}
