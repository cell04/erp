<?php

use App\CashAccount;
use App\InventoryReceiveNotBilledAccount;
use App\InventoryReturnNotCreditedAccount;
use App\PayableAccount;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorporationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('account_types')->insert([
            'type'        => 1,
            'name'        => 'Other Asset',
            'description' => 'Other asset'
        ]);

        DB::table('account_types')->insert([
            'type'        => 1,
            'name'        => 'Other Current Asset',
            'description' => 'Other current asset'
        ]);

        DB::table('account_types')->insert([
            'type'        => 1,
            'name'        => 'Cash',
            'description' => 'Cash'
        ]);

        DB::table('account_types')->insert([
            'type'        => 1,
            'name'        => 'Bank',
            'description' => 'Bank'
        ]);

        DB::table('account_types')->insert([
            'type'        => 1,
            'name'        => 'Fixed Asset',
            'description' => 'Fixed asset'
        ]);

        DB::table('account_types')->insert([
            'type'        => 1,
            'name'        => 'Stock',
            'description' => 'Stock'
        ]);

        DB::table('account_types')->insert([
            'type'        => 2,
            'name'        => 'Other Current Liability',
            'description' => 'Other current liability'
        ]);

        DB::table('account_types')->insert([
            'type'        => 2,
            'name'        => 'Credit Card',
            'description' => 'Credit card'
        ]);

        DB::table('account_types')->insert([
            'type'        => 2,
            'name'        => 'Long Term Liability',
            'description' => 'Long term liability'
        ]);

        DB::table('account_types')->insert([
            'type'        => 3,
            'name'        => 'Equity',
            'description' => 'Equity'
        ]);

        DB::table('account_types')->insert([
            'type'        => 4,
            'name'        => 'Income',
            'description' => 'Income'
        ]);

        DB::table('account_types')->insert([
            'type'        => 4,
            'name'        => 'Ohter Income',
            'description' => 'Ohter income'
        ]);

        DB::table('account_types')->insert([
            'type'        => 5,
            'name'        => 'Expense',
            'description' => 'Expense'
        ]);

        DB::table('account_types')->insert([
            'type'        => 5,
            'name'        => 'Cost of Goods Sold',
            'description' => 'Cost of goods sold'
        ]);

        DB::table('account_types')->insert([
            'type'        => 5,
            'name'        => 'Other Expense',
            'description' => 'Other expense'
        ]);

        factory(App\Corporation::class, 1)->create();
        $now = Carbon::now();

        $account[0]  =  ['id' => 1,      'account_type_id' => 14,    'name' => 'Gift Check Discount',                    'description' => 'Gift Check Discount',             'code' => '100',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[1]  =  ['id' => 2,      'account_type_id' => 14,    'name' => 'SC/PWD Discount',                        'description' => 'SC/PWD Discount',                 'code' => '101',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[2]  =  ['id' => 3,      'account_type_id' => 13,    'name' => 'Expense',                                'description' => 'Expense',                         'code' => '102',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[3]  =  ['id' => 4,      'account_type_id' => 6,     'name' => 'Inventory Received Not Billed',          'description' => 'Inventory Received Not Billed',   'code' => '103',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[4]  =  ['id' => 5,      'account_type_id' => 3,     'name' => 'Cash',                                   'description' => 'Cash',                            'code' => '104',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[5]  =  ['id' => 6,      'account_type_id' => 11,    'name' => 'Sales',                                  'description' => 'Sales',                           'code' => '105',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[6]  =  ['id' => 7,      'account_type_id' => 6,     'name' => 'Inventory Received Not Credited',        'description' => 'Inventory Received Not Billed',   'code' => '106',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[7]  =  ['id' => 8,      'account_type_id' => 13,    'name' => 'Expense Adjustment',                     'description' => 'Expense Adjustment',              'code' => '107',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[8]  =  ['id' => 9,      'account_type_id' => 14,    'name' => 'Cost Of Good Sold',                      'description' => 'Cost Of Good Sold',               'code' => '108',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[9]  =  ['id' => 10,     'account_type_id' => 3,     'name' => 'Petty Cash Fund',                        'description' => 'Petty Cash Fund',                 'code' => '109',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[10] =  ['id' => 11,     'account_type_id' => 2,     'name' => 'Inventory',                              'description' => 'Inventory',                       'code' => '110',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[11] =  ['id' => 12,     'account_type_id' => 7,     'name' => 'Output Vat',                             'description' => 'Output Vat',                      'code' => '111',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[12] =  ['id' => 13,     'account_type_id' => 2,     'name' => 'Purchase Discount',                      'description' => 'Purchase Discount',               'code' => '112',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[13] =  ['id' => 14,     'account_type_id' => 8,     'name' => 'Accounts Payable',                       'description' => 'Account Payable',                 'code' => '113',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[14] =  ['id' => 15,     'account_type_id' => 14,    'name' => 'Sales Discount',                         'description' => 'Discount',                        'code' => '114',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[15] =  ['id' => 16,     'account_type_id' => 2,     'name' => 'Accounts Receivable',                    'description' => 'Accounts Receivable',             'code' => '115',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        $account[16] =  ['id' => 17,     'account_type_id' => 2,     'name' => 'CIB',                                    'description' => 'CIB',                             'code' => '116',  'created_at' => $now, 'updated_at' => $now,   'corporation_id' => 1 ];
        
        DB::table('accounts')->insert($account);

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
