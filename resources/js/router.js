import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Overview = () => import('./views/Overview');

/**
 * Branches
 */
const BranchesIndex = () => import('./views/branches/Index');
const BranchesCreate = () => import('./views/branches/Create');
const BranchesView = () => import('./views/branches/View');
const BranchesEdit = () => import('./views/branches/Edit');

/**
 * Categories
 */
const CategoriesIndex = () => import('./views/categories/Index');
const CategoriesCreate = () => import('./views/categories/Create');
const CategoriesView = () => import('./views/categories/View');
const CategoriesEdit = () => import('./views/categories/Edit');

/**
 * Contacts
 *
 */
const ContactsIndex = () => import('./views/contacts/Index');
const ContactsCreate = () => import('./views/contacts/Create');
const ContactsEdit = () => import('./views/contacts/Edit');
const ContactsView = () => import('./views/contacts/View');

/**
 * Types
 */
const TypesIndex = () => import('./views/types/Index');
const TypesCreate = () => import('./views/types/Create');
const TypesView = () => import('./views/types/View');
const TypesEdit = () => import('./views/types/Edit');

/**
 * Warehouses
 */
const WarehousesIndex = () => import('./views/warehouses/Index');
const WarehousesCreate = () => import('./views/warehouses/Create');
const WarehousesView = () => import('./views/warehouses/View');
const WarehousesEdit = () => import('./views/warehouses/Edit');

/**
 * Users
 */
const UsersIndex = () => import('./views/users/Index');
const UsersCreate = () => import('./views/users/Create');
const UsersView = () => import('./views/users/View');
const UsersEdit = () => import('./views/users/Edit');

/**
 * Settings
 */
const SettingsIndex = () => import('./views/settings/Index.vue');
const SettingsUsersIndex = () => import('./views/settings/users/Index.vue');
const SettingsUnitsIndex = () => import('./views/settings/units/Index.vue');
const SettingsConversionsIndex = () => import('./views/settings/conversions/Index.vue');
const SettingsPaymentTermsIndex = () => import('./views/settings/payment_terms/Index.vue');

/**
 * Authentication
 */
const Login = () => import('./views/auth/Login');

/**
 * Corporations
 *
 */
const CorporationsIndex = () => import('./views/corporations/Index');
const CorporationsCreate = () => import('./views/corporations/Create');
const CorporationsView = () => import('./views/corporations/View');
const CorporationsEdit = () => import('./views/corporations/Edit');
const CorporationsSelect = () => import('./views/corporations/Select');

/**
 * Item Pricelist
 *
 */
const ItemPricelistsIndex = () => import('./views/item-pricelists/Index');
const ItemPricelistsCreate = () => import('./views/item-pricelists/Create');

/**
 * Item Classification
 *
 */
const ItemClassificationsIndex = () => import('./views/item-classifications/Index');
const ItemClassificationsCreate = () => import('./views/item-classifications/Create');
const ItemClassificationsView = () => import('./views/item-classifications/View');

/**
 * Item Types
 *
 */
const ItemTypesIndex = () => import('./views/item-types/Index');
const ItemTypesCreate = () => import('./views/item-types/Create');
const ItemTypesView = () => import('./views/item-types/View');
const ItemTypesEdit = () => import('./views/item-types/Edit');

/**
 * Items
 *
 */
const ItemsIndex = () => import('./views/items/Index');
const ItemsCreate = () => import('./views/items/Create');
const ItemsView = () => import('./views/items/View');

/**
 * General Items
 *
 */
const GeneralItemsIndex = () => import('./views/general-items/Index');
const GeneralItemsCreate = () => import('./views/general-items/Create');

/**
 * Purchase Orders
 *
 */
const PurchaseOrdersIndex = () => import('./views/purchase-orders/Index');
const PurchaseOrdersCreate = () => import('./views/purchase-orders/Create');
const PurchaseOrdersView = () => import('./views/purchase-orders/View');

/**
 * Bills
 *
 */
const BillsIndex = () => import('./views/bills/Index');
const BillsCreate = () => import('./views/bills/Create');
const BillsView = () => import('./views/bills/View');

/**
 * Receive Orders
 *
 */
const ReceiveOrdersIndex = () => import('./views/receive-orders/Index');
const ReceiveOrdersCreate = () => import('./views/receive-orders/Create');
const ReceiveOrdersView = () => import('./views/receive-orders/View');

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'overview', component: Overview },

        // settings
        { path: '/settings', name: 'settings.index', component: SettingsIndex },
        { path: '/settings/users', name: 'settings.users', component: SettingsUsersIndex },
        { path: '/settings/units', name: 'settings.units', component: SettingsUnitsIndex },
        { path: '/settings/conversions', name: 'settings.conversions', component: SettingsConversionsIndex },
        { path: '/settings/payment_terms', name: 'settings.paymentTerms', component: SettingsPaymentTermsIndex },

        // authentication
        { path: '/auth/login', name: 'auth.login', component: Login, meta: { requiresVisitor: true } },

        // Contacts
        { path: '/contacts', name: 'contacts.index', component: ContactsIndex },
        { path: '/contacts/create', name: 'contacts.create', component: ContactsCreate },
        { path: '/contacts/:id', name: 'contacts.view', component: ContactsView },
        { path: '/contacts/:id/edit', name: 'contacts.edit', component: ContactsEdit },

        // Users
        { path: '/users', name: 'users.index', component: UsersIndex },
        { path: '/users/create', name: 'users.create', component: UsersCreate },
        { path: '/users/:id', name: 'users.view', component: UsersView },
        { path: '/users/:id/edit', name: 'users.edit', component: UsersEdit },

        // corporation
        { path: '/corporations/select', name: 'corporations.select', component: CorporationsSelect, },
        { path: '/corporations', name: 'corporations.index', component: CorporationsIndex },
        { path: '/corporations/create', name: 'corporations.create', component: CorporationsCreate },
        { path: '/corporations/:id', name: 'corporations.view', component: CorporationsView },
        { path: '/corporations/:id/edit', name: 'corporations.edit', component: CorporationsEdit },

        // item pricelists
        { path: '/item-pricelists', name: 'item-pricelists.index', component: ItemPricelistsIndex },
        { path: '/item-pricelists/create', name: 'item-pricelists.create', component: ItemPricelistsCreate },

        // item classification
        { path: '/item-classifications', name: 'item-classifications.index', component: ItemClassificationsIndex },
        { path: '/item-classifications/create', name: 'item-classifications.create', component: ItemClassificationsCreate },
        { path: '/item-classifications/:id', name: 'item-classifications.view', component: ItemClassificationsView },

        // item types
        { path: '/item-types', name: 'item-types.index', component: ItemTypesIndex },
        { path: '/item-types/create', name: 'item-types.create', component: ItemTypesCreate },
        { path: '/item-types/:id', name: 'item-types.view', component: ItemTypesView },
        { path: '/item-types/:id/edit', name: 'item-types.edit', component: ItemTypesEdit },

        // items
        { path: '/items', name: 'items.index', component: ItemsIndex },
        { path: '/items/create', name: 'items.create', component: ItemsCreate },
        { path: '/items/:id', name: 'items.view', component: ItemsView },

        // item types
        { path: '/general-items', name: 'general-items.index', component: GeneralItemsIndex },
        { path: '/general-items/create', name: 'general-items.create', component: GeneralItemsCreate },

        // purchase-orders
        { path: '/purchase-orders', name: 'purchase-orders.index', component: PurchaseOrdersIndex },
        { path: '/purchase-orders/create', name: 'purchase-orders.create', component: PurchaseOrdersCreate },
        { path: '/purchase-orders/:id', name: 'purchase-orders.view', component: PurchaseOrdersView },

        // bills
        { path: '/bills', name: 'bills.index', component: BillsIndex },
        { path: '/bills/create', name: 'bills.create', component: BillsCreate },
        { path: '/bills/:id', name: 'bills.view', component: BillsView },

        // receive orders
        { path: '/received-orders', name: 'receive-orders.index', component: ReceiveOrdersIndex },
        { path: '/purchase-orders/:po_id/receive/create', name: 'receive-orders.create', component: ReceiveOrdersCreate },
        { path: '/received-orders/:id', name: 'receive-orders.view', component: ReceiveOrdersView },

        // branches
        { path: '/branches', name: 'branches.index', component: BranchesIndex },
        { path: '/branches/create', name: 'branches.create', component: BranchesCreate },
        { path: '/branches/:id', name: 'branches.view', component: BranchesView },
        { path: '/branches/:id/edit', name: 'branches.edit', component: BranchesEdit },

        // categories
        { path: '/categories', name: 'categories.index', component: CategoriesIndex },
        { path: '/categories/create', name: 'categories.create', component: CategoriesCreate },
        { path: '/categories/:id', name: 'categories.view', component: CategoriesView },
        { path: '/categories/:id/edit', name: 'categories.edit', component: CategoriesEdit },

        // types
        { path: '/types', name: 'types.index', component: TypesIndex },
        { path: '/types/create', name: 'types.create', component: TypesCreate },
        { path: '/types/:id', name: 'types.view', component: TypesView },
        { path: '/types/:id/edit', name: 'types.edit', component: TypesEdit },

        // warehouses
        { path: '/warehouses', name: 'warehouses.index', component: WarehousesIndex },
        { path: '/warehouses/create', name: 'warehouses.create', component: WarehousesCreate },
        { path: '/warehouses/:id', name: 'warehouses.view', component: WarehousesView },
        { path: '/warehouses/:id/edit', name: 'warehouses.edit', component: WarehousesEdit },
    ],
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
