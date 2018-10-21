<?php

namespace App\Repositories;

use App\Branch;
use App\Contact;
use App\ContactType;
use App\Conversion;
use App\Corporation;
use App\Invoice;
use App\InvoiceItem;
use App\Item;
use App\ItemClassification;
use App\ItemPricelit;
use App\ItemType;
use App\Permission;
use App\PurchaseOrder;
use App\PurchaseOrderItem;
use App\ReceiveOrder;
use App\ReceiveOrderItem;
use App\Role;
use App\Stock;
use App\UnitOfMeasurement;
use App\User;
use App\UserRole;
use App\UserRolePermission;
use App\Warehouse;


class DashboardRepository extends Repository
{
    // All functions here

    public function testPayload()
    {
        return 
            [
                ['date' => '01/02/2018', data => 10],
                ['date' => '01/02/2018', data => 15],
                ['date' => '01/03/2018', data => 15],
                ['date' => '01/04/2018', data => 20],
                ['date' => '01/05/2018', data => 25],
                ['date' => '01/06/2018', data => 17],
                ['date' => '01/07/2018', data => 5]
            ];
    }
}
