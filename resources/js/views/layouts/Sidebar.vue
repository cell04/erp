<template>
    <div class="sticky-top">
        <ul class="nav flex-column background py-1 mt-3 sidebar-nav">
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'overview' }">
                    Dashboard
                </router-link>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#corporations" data-toggle="collapse" aria-expanded="false" aria-controls="corporations">
                    Corporations <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="corporations">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'corporations.create' }">Create New Corporation</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'corporations.index' }">View Corporations</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#warehouses" data-toggle="collapse" aria-expanded="false" aria-controls="warehouses">
                    Warehouses <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="warehouses">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'warehouses.create' }">Create New Warehouse</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'warehouses.index' }">View Warehouses</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#branches" data-toggle="collapse" aria-expanded="false" aria-controls="branches">
                    Branches <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="branches">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'branches.create' }">Create New Branch</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'branches.index' }">View Branches</router-link>
                    </li>
                </ul>
            </div>
            
            <li class="nav-item">
                <a class="nav-link" href="#stock-requests" data-toggle="collapse" aria-expanded="false" aria-controls="stock-requests">
                    Stock Requests <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="stock-requests">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-requests.index' }">View Stock Requests</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#contact-types" data-toggle="collapse" aria-expanded="false" aria-controls="contact-types">
                    Contact Type <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="contact-types">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contact-types.create' }">Create New Contact Type</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contact-types.index' }">View Contact Types</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#contacts" data-toggle="collapse" aria-expanded="false" aria-controls="contacts">
                    Contacts <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="contacts">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contacts.create' }">Create New Contact</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contacts.index' }">View Contacts</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#item-types" data-toggle="collapse" aria-expanded="false" aria-controls="item-types">
                    Item Types <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="item-types">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-types.create' }">Create New Item Type</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-types.index' }">View Item Types</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#item-classifications" data-toggle="collapse" aria-expanded="false" aria-controls="item-classifications">
                    Item Classifications <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="item-classifications">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-classifications.create' }">Create New Item Classification</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-classifications.index' }">View Item Classifications</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#unit-of-measurements" data-toggle="collapse" aria-expanded="false" aria-controls="unit-of-measurements">
                    Unit of Measurements <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="unit-of-measurements">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'unit-of-measurements.create' }">Create New Unit of Measurement</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'unit-of-measurements.index' }">View Unit of Measurements</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#items" data-toggle="collapse" aria-expanded="false" aria-controls="items">
                    Items <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="items">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'items.create' }">Create New Item</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'items.index' }">View Items</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#itemPricelist" data-toggle="collapse" aria-expanded="false" aria-controls="itemPricelist">
                    Item Pricelists <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="itemPricelist">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-pricelists.create' }">Create New Item Pricelist</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-pricelists.index' }">View Item Pricelists</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#purchase-orders" data-toggle="collapse" aria-expanded="false" aria-controls="purchase-orders">
                    Purchase Orders <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="purchase-orders">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.create' }">Add Purchase Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.index' }">View Purchase Orders</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#receive-orders" data-toggle="collapse" aria-expanded="false" aria-controls="receive-orders">
                    Received Orders <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="receive-orders">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.create' }">Add Received Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'receive-orders.index' }">View Received Orders</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#invoices" data-toggle="collapse" aria-expanded="false" aria-controls="invoices">
                    Invoices <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="invoices">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'invoices.create' }">Add New Invoice</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'invoices.index' }">View Invoices</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#conversions" data-toggle="collapse" aria-expanded="false" aria-controls="conversions">
                    Conversions <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="conversions">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'conversions.create' }">Create New Conversion</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'conversions.index' }">View Conversions</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#users" data-toggle="collapse" aria-expanded="false" aria-controls="users">
                    Users <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="users">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'users.create' }">Create New User</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'users.index' }">View Users</router-link>
                    </li>
                </ul>
            </div>
        </ul>
    </div>
</template>

<script>
export default {};
</script>
