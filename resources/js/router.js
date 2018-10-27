import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Overview = () => import('./views/Overview');

/**
 * Authentication
 */
const Login = () => import('./views/auth/Login');

/**
 * Branches
 */
const BranchesIndex = () => import('./views/branches/Index');
const BranchesCreate = () => import('./views/branches/Create');
const BranchesView = () => import('./views/branches/View');
const BranchesEdit = () => import('./views/branches/Edit');

/**
 * Contact Types
 */
const ContactTypesIndex = () => import('./views/contact-types/Index');
const ContactTypesCreate = () => import('./views/contact-types/Create');
const ContactTypesEdit = () => import('./views/contact-types/Edit');
const ContactTypesView = () => import('./views/contact-types/View');

/**
 * Contacts
 */
const ContactsIndex = () => import('./views/contacts/Index');
const ContactsCreate = () => import('./views/contacts/Create');
const ContactsEdit = () => import('./views/contacts/Edit');
const ContactsView = () => import('./views/contacts/View');

/**
 * Conversions
 */
const SettingsConversionsIndex = () => import('./views/settings/conversions/Index.vue');
const SettingsPaymentTermsIndex = () => import('./views/settings/payment_terms/Index.vue');

/**
 * Corporations
 */
const CorporationsIndex = () => import('./views/corporations/Index');
const CorporationsCreate = () => import('./views/corporations/Create');
const CorporationsView = () => import('./views/corporations/View');
const CorporationsEdit = () => import('./views/corporations/Edit');
const CorporationsSelect = () => import('./views/corporations/Select');

/**
 * Conversions
 */
const ConversionsIndex = () => import('./views/conversions/Index');
const ConversionsCreate = () => import('./views/conversions/Create');
const ConversionsView = () => import('./views/conversions/View');
const ConversionsEdit = () => import('./views/conversions/Edit');

/**
 * Invoices
 *
 */
const InvoicesIndex = () => import('./views/invoices/Index');
const InvoicesCreate = () => import('./views/invoices/Create');
const InvoicesView = () => import('./views/invoices/View');

/**
 * Items
 *
 */
const ItemsIndex = () => import('./views/items/Index');
const ItemsCreate = () => import('./views/items/Create');
const ItemsView = () => import('./views/items/View');
const ItemsEdit = () => import('./views/items/Edit');

/**
 * Item Classification
 *
 */
const ItemClassificationsIndex = () => import('./views/item-classifications/Index');
const ItemClassificationsCreate = () => import('./views/item-classifications/Create');
const ItemClassificationsView = () => import('./views/item-classifications/View');
const ItemClassificationsEdit = () => import('./views/item-classifications/Edit');

/**
 * Item Pricelist
 *
 */
const ItemPricelistsIndex = () => import('./views/item-price-lists/Index');
const ItemPricelistsCreate = () => import('./views/item-price-lists/Create');
const ItemPricelistsView = () => import('./views/item-price-lists/View');
const ItemPricelistsEdit = () => import('./views/item-price-lists/Edit');

/**
 * Item Types
 *
 */
const ItemTypesIndex = () => import('./views/item-types/Index');
const ItemTypesCreate = () => import('./views/item-types/Create');
const ItemTypesView = () => import('./views/item-types/View');
const ItemTypesEdit = () => import('./views/item-types/Edit');

/**
 * Purchase Orders
 *
 */
const PurchaseOrdersIndex = () => import('./views/purchase-orders/Index');
const PurchaseOrdersCreate = () => import('./views/purchase-orders/Create');
const PurchaseOrdersView = () => import('./views/purchase-orders/View');

/**
 * Settings
 */
const SettingsIndex = () => import('./views/settings/Index.vue');
const SettingsUsersIndex = () => import('./views/settings/users/Index.vue');
const SettingsUnitsIndex = () => import('./views/settings/units/Index.vue');
const SettingsUnitsCreate = () => import('./views/settings/units/Create.vue');
const SettingsUnitsEdit = () => import('./views/settings/units/Edit.vue');
const SettingsUnitsView = () => import('./views/settings/units/View.vue');

/**
 * Stock Requests
 */
const StockRequestsIndex = () => import('./views/stock-requests/Index');
const StockRequestsCreate = () => import('./views/stock-requests/Create');
const StockRequestsView = () => import('./views/stock-requests/View');
const StockRequestsEdit = () => import('./views/stock-requests/Edit');

/**
 * Stock Receives
 */
const StockReceivesIndex = () => import('./views/stock-receives/Index');
const StockReceivesCreate = () => import('./views/stock-receives/Create');
const StockReceivesView = () => import('./views/stock-receives/View');

/**
 * Stock Transfers
 */
const StockTransfersIndex = () => import('./views/stock-transfers/Index');
const StockTransfersCreate = () => import('./views/stock-transfers/Create');
const StockTransfersView = () => import('./views/stock-transfers/View');

/**
 * Receive Orders
 *
 */
const ReceiveOrdersIndex = () => import('./views/receive-orders/Index');
const ReceiveOrdersCreate = () => import('./views/receive-orders/Create');
const ReceiveOrdersReceive = () => import('./views/receive-orders/Receive.vue');
const ReceiveOrdersView = () => import('./views/receive-orders/View');

/**
 * Unit of Measurements
 */
const UnitOfMeasurementsIndex = () => import('./views/unit-of-measurements/Index');
const UnitOfMeasurementsCreate = () => import('./views/unit-of-measurements/Create');
const UnitOfMeasurementsView = () => import('./views/unit-of-measurements/View');
const UnitOfMeasurementsEdit = () => import('./views/unit-of-measurements/Edit');

/**
 * Users
 */
const UsersIndex = () => import('./views/users/Index');
const UsersCreate = () => import('./views/users/Create');
const UsersView = () => import('./views/users/View');
const UsersEdit = () => import('./views/users/Edit');

/**
 * Warehouses
 */
const WarehousesIndex = () => import('./views/warehouses/Index');
const WarehousesCreate = () => import('./views/warehouses/Create');
const WarehousesView = () => import('./views/warehouses/View');
const WarehousesEdit = () => import('./views/warehouses/Edit');

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'overview', component: Overview },

        // Authentication
        { path: '/auth/login', name: 'auth.login', component: Login, meta: { requiresVisitor: true }},

        // Branches
        { path: '/branches', name: 'branches.index', component: BranchesIndex },
        { path: '/branches/create', name: 'branches.create', component: BranchesCreate },
        { path: '/branches/:id', name: 'branches.view', component: BranchesView },
        { path: '/branches/:id/edit', name: 'branches.edit', component: BranchesEdit },

        // Contacts
        { path: '/contacts', name: 'contacts.index', component: ContactsIndex },
        { path: '/contacts/create', name: 'contacts.create', component: ContactsCreate },
        { path: '/contacts/:id', name: 'contacts.view', component: ContactsView },
        { path: '/contacts/:id/edit', name: 'contacts.edit', component: ContactsEdit },

        // Contact Types
        { path: '/contact-types', name: 'contact-types.index', component: ContactTypesIndex },
        { path: '/contact-types/create', name: 'contact-types.create', component: ContactTypesCreate },
        { path: '/contact-types/:id', name: 'contact-types.view', component: ContactTypesView },
        { path: '/contact-types/:id/edit', name: 'contact-types.edit', component: ContactTypesEdit },

        // Corporations
        { path: '/corporations/select', name: 'corporations.select', component: CorporationsSelect },
        { path: '/corporations', name: 'corporations.index', component: CorporationsIndex },
        { path: '/corporations/create', name: 'corporations.create', component: CorporationsCreate },
        { path: '/corporations/:id', name: 'corporations.view', component: CorporationsView },
        { path: '/corporations/:id/edit', name: 'corporations.edit', component: CorporationsEdit },

        // Conversions
        { path: '/conversions', name: 'conversions.index', component: ConversionsIndex },
        { path: '/conversions/create', name: 'conversions.create', component: ConversionsCreate },
        { path: '/conversions/:id', name: 'conversions.view', component: ConversionsView },
        { path: '/conversions/:id/edit', name: 'conversions.edit', component: ConversionsEdit },

        // Invoices
        { path: '/invoices', name: 'invoices.index', component: InvoicesIndex },
        { path: '/invoices/create', name: 'invoices.create', component: InvoicesCreate },
        { path: '/invoices/:id', name: 'invoices.view', component: InvoicesView },

        // Items
        { path: '/items', name: 'items.index', component: ItemsIndex },
        { path: '/items/create', name: 'items.create', component: ItemsCreate },
        { path: '/items/:id', name: 'items.view', component: ItemsView },
        { path: '/items/:id/edit', name: 'items.edit', component: ItemsEdit },

        // Item Classification
        { path: '/item-classifications', name: 'item-classifications.index', component: ItemClassificationsIndex },
        { path: '/item-classifications/create', name: 'item-classifications.create', component: ItemClassificationsCreate },
        { path: '/item-classifications/:id', name: 'item-classifications.view', component: ItemClassificationsView },
        { path: '/item-classifications/:id/edit', name: 'item-classifications.edit', component: ItemClassificationsEdit },

        // Item Pricelists
        { path: '/item-pricelists', name: 'item-pricelists.index', component: ItemPricelistsIndex },
        { path: '/item-pricelists/create', name: 'item-pricelists.create', component: ItemPricelistsCreate },
        { path: '/item-pricelists/:id', name: 'item-pricelists.view', component: ItemPricelistsView },
        { path: '/item-pricelists/:id/edit', name: 'item-pricelists.edit', component: ItemPricelistsEdit },

        // Item Types
        { path: '/item-types', name: 'item-types.index', component: ItemTypesIndex },
        { path: '/item-types/create', name: 'item-types.create', component: ItemTypesCreate },
        { path: '/item-types/:id', name: 'item-types.view', component: ItemTypesView },
        { path: '/item-types/:id/edit', name: 'item-types.edit', component: ItemTypesEdit },

        // Purchase Orders
        { path: '/purchase-orders', name: 'purchase-orders.index', component: PurchaseOrdersIndex },
        { path: '/purchase-orders/create', name: 'purchase-orders.create', component: PurchaseOrdersCreate },
        { path: '/purchase-orders/:id', name: 'purchase-orders.view', component: PurchaseOrdersView },

        // Receive Orders
        { path: '/received-orders', name: 'receive-orders.index', component: ReceiveOrdersIndex },
        { path: '/received-orders/:id', name: 'receive-orders.receive', component: ReceiveOrdersReceive },
        { path: '/received-orders/create', name: 'receive-orders.create', component: ReceiveOrdersCreate },
        { path: '/received-orders/:id', name: 'receive-orders.view', component: ReceiveOrdersView },

        // Settings
        { path: '/settings', name: 'settings.index', component: SettingsIndex },

        // Stock Requests
        { path: '/stock-requests', name: 'stock-requests.index', component: StockRequestsIndex },
        { path: '/stock-requests/create', name: 'stock-requests.create', component: StockRequestsCreate },
        { path: '/stock-requests/:id', name: 'stock-requests.view', component: StockRequestsView },
        { path: '/stock-requests/:id/edit', name: 'stock-requests.edit', component: StockRequestsEdit },

        // Stock Receives
        { path: '/stock-receives', name: 'stock-receives.index', component: StockReceivesIndex },
        { path: '/stock-receives/create', name: 'stock-receives.create', component: StockReceivesCreate },
        { path: '/stock-receives/:id', name: 'stock-receives.view', component: StockReceivesView },

        // Stock Transfers
        { path: '/stock-transfers', name: 'stock-transfers.index', component: StockTransfersIndex },
        { path: '/stock-transfers/create', name: 'stock-transfers.create', component: StockTransfersCreate },
        { path: '/stock-transfers/:id', name: 'stock-transfers.view', component: StockTransfersView },

        // Unit of Measurements
        { path: '/unit-of-measurements', name: 'unit-of-measurements.index', component: UnitOfMeasurementsIndex },
        { path: '/unit-of-measurements/create', name: 'unit-of-measurements.create', component: UnitOfMeasurementsCreate },
        { path: '/unit-of-measurements/:id', name: 'unit-of-measurements.view', component: UnitOfMeasurementsView },
        { path: '/unit-of-measurements/:id/edit', name: 'unit-of-measurements.edit', component: UnitOfMeasurementsEdit },

        // Users
        { path: '/users', name: 'users.index', component: UsersIndex },
        { path: '/users/create', name: 'users.create', component: UsersCreate },
        { path: '/users/:id', name: 'users.view', component: UsersView },
        { path: '/users/:id/edit', name: 'users.edit', component: UsersEdit },

        // warehouses
        { path: '/warehouses', name: 'warehouses.index', component: WarehousesIndex },
        { path: '/warehouses/create', name: 'warehouses.create', component: WarehousesCreate },
        { path: '/warehouses/:id', name: 'warehouses.view', component: WarehousesView },
        { path: '/warehouses/:id/edit', name: 'warehouses.edit', component: WarehousesEdit }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (! auth.loggedIn()) {
//             next({
//                 path: '/login'
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;
