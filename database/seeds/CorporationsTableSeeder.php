<?php

use App\CashAccount;
use App\InventoryReceiveNotBilledAccount;
use App\InventoryReturnNotCreditedAccount;
use App\PayableAccount;
use Carbon\Carbon;
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
        $now = Carbon::now();

        $account[0]  =  ['id' => 1,      'name' => 'Gift Check Discount',                    'description' => 'Gift Check Discount',             'code' => '101', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[1]  =  ['id' => 2,      'name' => 'SC/PWD Discount',                        'description' => 'SC/PWD Discount',                 'code' => '101', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[2]  =  ['id' => 3,      'name' => 'Expense',                                'description' => 'Expense',                         'code' => '102', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[3]  =  ['id' => 4,      'name' => 'Inventory Received Not Billed',          'description' => 'Inventory Received Not Billed',   'code' => '103', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[4]  =  ['id' => 5,      'name' => 'Cash',                                   'description' => 'Cash',                            'code' => '104', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[5]  =  ['id' => 6,      'name' => 'Sales',                                  'description' => 'Sales',                           'code' => '105', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[6]  =  ['id' => 7,      'name' => 'Inventory Received Not Credited',        'description' => 'Inventory Received Not Billed',   'code' => '106', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[7]  =  ['id' => 8,      'name' => 'Expense Adjustment',                     'description' => 'Expense Adjustment',              'code' => '107', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[8]  =  ['id' => 9,      'name' => 'Cost Of Good Sold',                      'description' => 'Cost Of Good Sold',               'code' => '108', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[9]  =  ['id' => 10,     'name' => 'Petty Cash Fund',                        'description' => 'Petty Cash Fund',                 'code' => '109', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[10] =  ['id' => 11,     'name' => 'Inventory',                              'description' => 'Inventory',                       'code' => '110', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[11] =  ['id' => 12,     'name' => 'Output Vat',                             'description' => 'Output Vat',                      'code' => '111', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[12] =  ['id' => 13,     'name' => 'Purchase Discount',                      'description' => 'Purchase Discount',               'code' => '112', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[13] =  ['id' => 14,     'name' => 'Accounts Payable',                       'description' => 'Account Payable',                 'code' => '113', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[14] =  ['id' => 15,     'name' => 'Sales Discount',                         'description' => 'Discount',                        'code' => '114', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[15] =  ['id' => 16,     'name' => 'Accounts Receivable',                    'description' => 'Accounts Receivable',             'code' => '115', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[16] =  ['id' => 17,     'name' => 'CIB',                                    'description' => 'CIB',                             'code' => '116', 'sub_account_of' => rand(1, 17), 'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        
        Account::insert($account);

        InventoryReturnNotCreditedAccount::create([
            'account_id' => 7,
            'corporation_id' => 1
        ]);

        InventoryReceiveNotBilledAccount::create([
            'account_id' => 4,
            'corporation_id' => 1
        ]);

        PayableAccount::create([
            'account_id' => 14,
            'corporation_id' => 1
        ]);

        CashAccount::create([
            'account_id' => 5,
            'corporation_id' => 1
        ]);
    }
}
