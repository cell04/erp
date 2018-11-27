<?php

namespace App\Repositories;

use App\Account;
use App\Corporation;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CorporationRepository extends Repository
{
    /**
     * Create new instance of corporation repository.
     *
     * @param Corporation corporation Corporation model
     */
    public function __construct(Corporation $corporation)
    {
        parent::__construct($corporation);
        $this->corporation = $corporation;
    }

    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $corporation = $this->corporation->create($request->all());

            return $this->generateAccounts($corporation);
        });
    }

    public function generateAccounts($corporation)
    {
        $gcDiscount = $corporation->accounts()->create([
            'account_type_id' => 14,    
            'name' => 'Gift Check Discount',                    
            'description' => 'Gift Check Discount',             
            'code' => '100',
        ]);

        $pwdDiscount = $corporation->accounts()->create([
            'account_type_id' => 14,    
            'name' => 'SC/PWD Discount',                        
            'description' => 'SC/PWD Discount',                 
            'code' => '101',
        ]);

        $expense = $corporation->accounts()->create([
            'account_type_id' => 13,    
            'name' => 'Expense',                                
            'description' => 'Expense',                         
            'code' => '102',
        ]);

        $irnb = $corporation->accounts()->create([
            'account_type_id' => 6,     
            'name' => 'Inventory Received Not Billed',          
            'description' => 'Inventory Received Not Billed',   
            'code' => '103',
        ]);

        $cash = $corporation->accounts()->create([
            'account_type_id' => 3,     
            'name' => 'Cash',                                   
            'description' => 'Cash',                           
            'code' => '104',
        ]);

        $sales = $corporation->accounts()->create([
            'account_type_id' => 11,    
            'name' => 'Sales',                                  
            'description' => 'Sales',                           
            'code' => '105',
        ]);

        $irnc = $corporation->accounts()->create([
            'account_type_id' => 6,     
            'name' => 'Inventory Received Not Credited',       
            'description' => 'Inventory Received Not Billed',   
            'code' => '106',
        ]);

        $adjustment = $corporation->accounts()->create([
            'account_type_id' => 13,    
            'name' => 'Expense Adjustment',                     
            'description' => 'Expense Adjustment',              
            'code' => '107',
        ]);

        $cogs = $corporation->accounts()->create([
            'account_type_id' => 14,    
            'name' => 'Cost Of Good Sold',                      
            'description' => 'Cost Of Good Sold',               
            'code' => '108',
        ]);

        $pettyCash = $corporation->accounts()->create([
            'account_type_id' => 3,     
            'name' => 'Petty Cash Fund',                        
            'description' => 'Petty Cash Fund',                 
            'code' => '109',
        ]);

        $inventory = $corporation->accounts()->create([
            'account_type_id' => 2,     
            'name' => 'Inventory',                              
            'description' => 'Inventory',                       
            'code' => '110',
        ]);

        $outputVat = $corporation->accounts()->create([        
            'account_type_id' => 7,     
            'name' => 'Output Vat',                             
            'description' => 'Output Vat',                      
            'code' => '111'
        ]);

        $poDiscount = $corporation->accounts()->create([        
            'account_type_id' => 2,     
            'name' => 'Purchase Discount',                      
            'description' => 'Purchase Discount',               
            'code' => '112',
        ]);

        $accountPayable = $corporation->accounts()->create([        
            'account_type_id' => 8,     
            'name' => 'Accounts Payable',                       
            'description' => 'Account Payable',                 
            'code' => '113'
        ]);

        $salesDiscount = $corporation->accounts()->create([        
            'account_type_id' => 14,    
            'name' => 'Sales Discount',                         
            'description' => 'Discount',                       
            'code' => '114'
        ]);

        $receivable = $corporation->accounts()->create([        
            'account_type_id' => 2,     
            'name' => 'Accounts Receivable',                    
            'description' => 'Accounts Receivable',             
            'code' => '115',
        ]);

        $receivable = $corporation->accounts()->create([        
            'account_type_id' => 2,     
            'name' => 'CIB',                                    
            'description' => 'CIB',                             
            'code' => '116'
        ]);

        $corporation->inventoryReceiveNotBilledAccount()->create([
            'account_id' => $irnb->id
        ]);
        
        $corporation->payableAccount()->create([
            'account_id' => $accountPayable->id
        ]);

        $corporation->cashAccount()->create([
            'account_id' => $cash->id
        ]);
        
        $corporation->inventoryReturnNotCreditedAccount()->create([
            'account_id' => $irnc->id
        ]);

        // $contactTypes = array(
        //     array('name' => 'customer', 'display_name' => 'Customer', 'description' => 'Customer description'),
        //     array('name' => 'supplier', 'display_name' => 'Supplier', 'description' => 'Supplier description'),
        //     array('name' => 'employee', 'display_name' => 'Employee', 'description' => 'Employee description')
        // );

        // $corporation->contactTypes()->createMany($contactTypes);

        return true;
    }
}
