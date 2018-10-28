<?php

// Auth
Route::post('/auth/login', 'AuthController@login');
Route::post('/auth/logout', 'AuthController@logout');
Route::get('/auth/user', 'AuthController@user');

Route::group(['middleware' => 'auth:api'], function () {
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
    Route::resource('invoices', 'InvoicesController', [
        'only' => [
            'index', 'store', 'show', 'update', 'destroy'
        ]
    ]);

    // Invoice Payments
    Route::match(['put', 'patch'], 'invoice-payments/{invoicePayment}/restore', 'InvoicePaymentsController@restore');
    Route::delete('invoice-payments/{invoicePayment}/force-delete', 'InvoicePaymentsController@forceDestroy');
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
