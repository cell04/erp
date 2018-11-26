<?php

// Auth
Route::post('/auth/login', 'AuthController@apiLogin');
Route::post('/auth/logout', 'AuthController@apiLogout');
Route::get('/auth/user', 'AuthController@user');
Route::get('/quotations/{quotation}/contact-approvals/{status}', 'QuotationsController@contactApproval');
Route::get('/bid-sheets/{bidSheet}/contact-approvals/{status}', 'BidSheetsController@contactApproval');

Route::group(['middleware' => ['api', 'corporation.default.account']], function () {
    Route::post('test', function () {
        return cache(auth('api')->user()->id . ' accounting.auth');
    });

    // Audit Trails
    Route::match(['put', 'patch'], 'audit-trails/{auditTrail}/restore', 'AuditTrailsController@restore');
    Route::delete('audit-trails/{auditTrail}/force-delete', 'AuditTrailsController@forceDestroy');
    Route::resource('audit-trails', 'AuditTrailsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Branches
    Route::match(['put', 'patch'], 'branches/{contact}/restore', 'BranchesController@restore');
    Route::delete('branches/{contact}/force-delete', 'BranchesController@forceDestroy');
    Route::get('branches/get-all-branches', 'BranchesController@getAllBranches');
    Route::resource('branches', 'BranchesController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Contacts
    Route::match(['put', 'patch'], 'contacts/{contact}/restore', 'ContactsController@restore');
    Route::delete('contacts/{contact}/force-delete', 'ContactsController@forceDestroy');
    Route::get('contacts/get-all-contacts', 'ContactsController@getAllContacts');
    Route::resource('contacts', 'ContactsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Contact Types
    Route::match(['put', 'patch'], 'contacts-type/{contactType}/restore', 'ContactTypesController@restore');
    Route::delete('contacts-type/{contactType}/force-delete', 'ContactTypesController@forceDestroy');
    Route::get('contacts-type/get-all-contacts-type', 'ContactTypesController@getAllContactTypes');
    Route::resource('contact-types', 'ContactTypesController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Conversions
    Route::match(['put', 'patch'], 'conversions/{conversion}/restore', 'ConversionsController@restore');
    Route::delete('conversions/{conversion}/force-delete', 'ConversionsController@forceDestroy');
    Route::get('conversions/get-all-conversions', 'ConversionsController@getAllConversions');
    Route::resource('conversions', 'ConversionsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Corporations
    Route::match(['put', 'patch'], 'corporations/{corporation}/restore', 'CorporationsController@restore');
    Route::delete('corporations/{corporation}/force-delete', 'CorporationsController@forceDestroy');
    Route::get('corporations/get-all-corporations', 'CorporationsController@getAllCorporations');
    Route::resource('corporations', 'CorporationsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Invoice Items
    Route::match(['put', 'patch'], 'invoice-items/{invoiceItem}/restore', 'InvoiceItemsController@restore');
    Route::delete('invoice-items/{invoiceItem}/force-delete', 'InvoiceItemsController@forceDestroy');
    Route::resource('invoice-items', 'InvoiceItemsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Invoices
    Route::match(['put', 'patch'], 'invoices/{invoice}/restore', 'InvoicesController@restore');
    Route::delete('invoices/{invoice}/force-delete', 'InvoicesController@forceDestroy');
    Route::get('invoices/get-all-invoices/', 'InvoicesController@getAllIvoices');
    Route::resource('invoices', 'InvoicesController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Invoice Payments
    Route::match(['put', 'patch'], 'invoice-payments/{invoicePayment}/restore', 'InvoicePaymentsController@restore');
    Route::delete('invoice-payments/{invoicePayment}/force-delete', 'InvoicePaymentsController@forceDestroy');
    Route::get('invoice-payments/get-all-invoice-payments/', 'InvoicePaymentsController@getAllIvoicePayment');
    Route::resource('invoice-payments', 'InvoicePaymentsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Item Classifications
    Route::match(['put', 'patch'], 'item-classifications/{itemClassification}/restore', 'ItemClassificationsController@restore');
    Route::delete('item-classifications/{itemClassification}/force-delete', 'ItemClassificationsController@forceDestroy');
    Route::get('item-classifications/get-all-item-classifications', 'ItemClassificationsController@getAllItemClassifications');
    Route::post('item-classifications/get-all-item-classifications-by-item-type-id', 'ItemClassificationsController@getAllItemClassificationByItemTypeId');
    Route::resource('item-classifications', 'ItemClassificationsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Item Pricelists
    Route::match(['put', 'patch'], 'item-pricelists/{itemPricelist}/restore', 'ItemPricelistsController@restore');
    Route::delete('item-pricelists/{itemPricelist}/force-delete', 'ItemPricelistsController@forceDestroy');
    Route::get('item-pricelists/get-item-pricelists/{item}', 'ItemPricelistsController@getItemPricelists');
    Route::resource('item-pricelists', 'ItemPricelistsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Items
    Route::match(['put', 'patch'], 'items/{item}/restore', 'ItemsController@restore');
    Route::delete('items/{item}/force-delete', 'ItemsController@forceDestroy');
    Route::get('items/get-all-items', 'ItemsController@getAllItems');
    Route::resource('items', 'ItemsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Item Types
    Route::match(['put', 'patch'], 'item-types/{itemType}/restore', 'ItemTypesController@restore');
    Route::delete('item-types/{itemType}/force-delete', 'ItemTypesController@forceDestroy');
    Route::get('item-types/get-all-item-types', 'ItemTypesController@getAllItemTypes');
    Route::resource('item-types', 'ItemTypesController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Purchase Order Items
    Route::match(['put', 'patch'], 'purchase-order-items/{purchaseOrderItem}/restore', 'PurchaseOrderItemsController@restore');
    Route::delete('purchase-order-items/{purchaseOrderItem}/force-delete', 'PurchaseOrderItemsController@forceDestroy');
    Route::resource('purchase-order-items', 'PurchaseOrderItemsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Purchase Orders
    Route::match(['put', 'patch'], 'purchase-orders/{purchaseOrder}/restore', 'PurchaseOrdersController@restore');
    Route::delete('purchase-orders/{purchaseOrder}/force-delete', 'PurchaseOrdersController@forceDestroy');
    Route::get('purchase-orders/get-all-purchase-orders', 'PurchaseOrdersController@getAllPurchaseOrder');
    Route::resource('purchase-orders', 'PurchaseOrdersController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Receive Order Items
    Route::match(['put', 'patch'], 'receive-order-items/{receiveOrderItem}/restore', 'ReceiveOrderItemsController@restore');
    Route::delete('receive-order-items/{receiveOrderItem}/force-delete', 'ReceiveOrderItemsController@forceDestroy');
    Route::resource('receive-order-items', 'ReceiveOrderItemsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Receive Orders
    Route::match(['put', 'patch'], 'receive-orders/{receiveOrder}/restore', 'ReceiveOrdersController@restore');
    Route::delete('receive-orders/{receiveOrder}/force-delete', 'ReceiveOrdersController@forceDestroy');
    Route::get('receive-orders/get-all-receive-orders', 'ReceiveOrdersController@getAllReceiveOrder');
    Route::resource('receive-orders', 'ReceiveOrdersController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Stocks
    Route::match(['put', 'patch'], 'stocks/{stock}/restore', 'StocksController@restore');
    Route::delete('stocks/{stock}/force-delete', 'StocksController@forceDestroy');
    Route::get('stocks/get-all-stocks', 'StocksController@getAllStock');
    //locationType = branch || warehouse --- get stocks item per location type
    Route::get('stocks/get-all-stocks/{locationType}', 'StocksController@getAllStockPerLocationType');
    Route::get('stocks/{item}/get-all-stocks-of-item', 'StocksController@getAllStocksOfItem');
    Route::resource('stocks', 'StocksController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Unit Of Measurements
    Route::match(['put', 'patch'], 'unit-of-measurements/{unitOfMeasurement}/restore', 'UnitOfMeasurementsController@restore');
    Route::delete('unit-of-measurements/{unitOfMeasurement}/force-delete', 'UnitOfMeasurementsController@forceDestroy');
    Route::get('unit-of-measurements/get-all-unit-of-measurements', 'UnitOfMeasurementsController@getAllUnitOfMeasurements');
    Route::resource('unit-of-measurements', 'UnitOfMeasurementsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Warehouses
    Route::match(['put', 'patch'], 'warehouses/{warehouse}/restore', 'WarehousesController@restore');
    Route::delete('warehouses/{warehouse}/force-delete', 'WarehousesController@forceDestroy');
    Route::get('warehouses/get-all-warehouses', 'WarehousesController@getAllWarehouses');
    Route::resource('warehouses', 'WarehousesController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Stock Requests
    Route::match(['put', 'patch'], 'stock-requests/{stockRequest}/restore', 'StockRequestsController@restore');
    Route::delete('stock-requests/{stockRequest}/force-delete', 'StockRequestsController@forceDestroy');
    Route::get('stock-requests/get-all-stock-requests', 'StockRequestsController@getAllStockRequests');
    Route::get('stock-requests/get-all-unapproved-stock-requests', 'StockRequestsController@getAllUnapprovedStockReuests');
    Route::post('stock-requests/{stockRequest}/approve', 'StockRequestsController@approve');
    Route::post('stock-requests/{stockRequest}/cancel', 'StockRequestsController@cancel');
    Route::resource('stock-requests', 'StockRequestsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Stock Transfers
    Route::match(['put', 'patch'], 'stock-transfers/{stockTransfer}/restore', 'StockTransfersController@restore');
    Route::delete('stock-transfers/{stockTransfer}/force-delete', 'StockTransfersController@forceDestroy');
    Route::get('stock-transfers/get-all-stock-transfers', 'StockTransfersController@getAllStockTransfers');
    Route::post('stock-transfers/{stockTransfer}/transferred', 'StockTransfersController@transferred');
    Route::resource('stock-transfers', 'StockTransfersController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Stock Receives
    Route::match(['put', 'patch'], 'stock-receives/{stock-receive}/restore', 'StockReceivesController@restore');
    Route::delete('stock-receives/{stock-receive}/force-delete', 'StockReceivesController@forceDestroy');
    Route::get('stock-receives/get-all-stock-receives', 'StockReceivesController@getAllStockReceives');
    Route::resource('stock-receives', 'StockReceivesController', [
        'only' => [
            'index', 'store', 'show', 'destroy'
        ]
    ]);

    // Quotations
    Route::match(['put', 'patch'], 'quotations/{quotation}/restore', 'QuotationsController@restore');
    Route::delete('quotations/{quotation}/force-delete', 'QuotationsController@forceDestroy');
    Route::get('quotations/get-all-quotations', 'QuotationsController@getAllQuotations');
    Route::resource('quotations', 'QuotationsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Bid Sheets
    Route::match(['put', 'patch'], 'bid-sheets/{bid-sheet}/restore', 'BidSheetsController@restore');
    Route::delete('bid-sheets/{bid-sheet}/force-delete', 'BidSheetsController@forceDestroy');
    Route::get('bid-sheets/get-all-bid-sheets', 'BidSheetsController@getAllBidSheets');
    Route::resource('bid-sheets', 'BidSheetsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Bills
    Route::match(['put', 'patch'], 'bills/{bill}/restore', 'BillsController@restore');
    Route::delete('bills/{bill}/force-delete', 'BillsController@forceDestroy');
    Route::get('bills/get-all-bills', 'BillsController@getAllBills');
    Route::resource('bills', 'BillsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Bill Payments
    Route::match(['put', 'patch'], 'bill-payments/{bill-payment}/restore', 'BillPaymentsController@restore');
    Route::delete('bill-payments/{bill-payment}/force-delete', 'BillPaymentsController@forceDestroy');
    Route::get('bill-payments/get-all-bill-payments', 'BillPaymentsController@getAllBillPayments');
    Route::resource('bill-payments', 'BillPaymentsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Inventory Receive Not Billed Account
    Route::match(['put', 'patch'], 'inventory-receive-not-billed/{inventory-receive-not-billed}/restore', 'InventoryReceiveNotBilledAccountsController@restore');
    Route::delete('inventory-receive-not-billed/{inventory-receive-not-billed}/force-delete', 'InventoryReceiveNotBilledAccountsController@forceDestroy');
    Route::get('inventory-receive-not-billed/get-all-inventory-receive-not-billed', 'InventoryReceiveNotBilledAccountsController@getAllInventoryReceiveNotBilledAccounts');
    Route::resource('inventory-receive-not-billed', 'InventoryReceiveNotBilledAccountsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Inventory Receive Not Billed Account
    Route::match(['put', 'patch'], 'inventory-return-not-credited/{inventory-return-not-credited}/restore', 'InventoryReturnNotCreditedAccountsController@restore');
    Route::delete('inventory-return-not-credited/{inventory-return-not-credited}/force-delete', 'InventoryReturnNotCreditedAccountsController@forceDestroy');
    Route::get('inventory-return-not-credited/get-all-inventory-return-not-credited', 'InventoryReturnNotCreditedAccountsController@getAllInventoryReturnNotCreditedAccounts');
    Route::resource('inventory-return-not-credited', 'InventoryReturnNotCreditedAccountsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Account Payable
    Route::match(['put', 'patch'], 'account-payables/{account-payable}/restore', 'PayableAccountsController@restore');
    Route::delete('account-payables/{account-payable}/force-delete', 'PayableAccountsController@forceDestroy');
    Route::get('account-payables/get-all-account-payable', 'PayableAccountsController@getAllPayableAccounts');
    Route::resource('account-payables', 'PayableAccountsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Account Payable
    Route::match(['put', 'patch'], 'cash/{cash}/restore', 'CashAccountsController@restore');
    Route::delete('cash/{cash}/force-delete', 'CashAccountsController@forceDestroy');
    Route::get('cash/get-all-cash', 'CashAccountsController@getAllCashAccounts');
    Route::resource('cash', 'CashAccountsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Mode Of Payments
    Route::match(['put', 'patch'], 'mode-of-payments/{mode-of-payment}/restore', 'ModeOfPaymentsController@restore');
    Route::delete('mode-of-payments/{mode-of-payment}/force-delete', 'ModeOfPaymentsController@forceDestroy');
    Route::get('mode-of-payments/get-all-mode-of-payments', 'ModeOfPaymentsController@getAllModeOfPayment');
    Route::resource('mode-of-payments', 'ModeOfPaymentsController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Cost Centers
    Route::get('cost-centers/get-all-cost-centers', 'CostCentersController@getAllCostCenter');
    Route::resource('cost-centers', 'CostCentersController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Users
    Route::match(['put', 'patch'], 'users/{user}/restore', 'UsersController@restore');
    Route::delete('users/{user}/force-delete', 'UsersController@forceDestroy');
    Route::resource('users', 'UsersController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    //Stats
    Route::get('statistics/test-payload', 'DashboardController@testPayload');
    Route::get('statistics/settings', 'StatisticController@returnSettings');
});
