<?php

use App\CashAccount;
use App\InventoryReceiveNotBilledAccount;
use App\InventoryReturnNotCreditedAccount;
use App\PayableAccount;
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

        InventoryReturnNotCreditedAccount::create([
            'account_id' => 1,
            'corporation_id' => 1
        ]);

        InventoryReceiveNotBilledAccount::create([
            'account_id' => 1,
            'corporation_id' => 1
        ]);

        PayableAccount::create([
            'account_id' => 1,
            'corporation_id' => 1
        ]);

        CashAccount::create([
            'account_id' => 1,
            'corporation_id' => 1
        ]);
    }
}
