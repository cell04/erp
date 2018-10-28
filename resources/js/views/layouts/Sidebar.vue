<template>
    <div class="sticky-top py-1 mt-3 background sidenav-container">
        <ul class="nav flex-column sidebar-nav">
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
                    Item Price Lists <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="itemPricelist">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-pricelists.create' }">Create New Item Price List</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-pricelists.index' }">View Item Price Lists</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#qoutations" data-toggle="collapse" aria-expanded="false" aria-controls="qoutations">
                    Quotations <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="qoutations">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'quotations.create' }">Create New Qoutation</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'quotations.index' }">View Qoutations</router-link>
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
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.create' }">Create New Purchase Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.index' }">View Purchase Orders</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#receive-orders" data-toggle="collapse" aria-expanded="false" aria-controls="receive-orders">
                    Receive Orders <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="receive-orders">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'receive-orders.create' }">Create New Receive Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'receive-orders.index' }">View Receive Orders</router-link>
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
                        <router-link class="nav-link" :to="{ name: 'invoices.create' }">Create New Invoice</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'invoices.index' }">View Invoices</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#stocks" data-toggle="collapse" aria-expanded="false" aria-controls="stocks">
                    Stocks <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="stocks">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stocks.index' }">View Stocks</router-link>
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
                        <router-link class="nav-link" :to="{ name: 'stock-requests.create' }">Create New Stock Request</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-requests.index' }">View Stock Requests</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#stock-transfers" data-toggle="collapse" aria-expanded="false" aria-controls="stock-transfers">
                    Stock Transfers <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="stock-transfers">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-transfers.create' }">Create New Stock Transfer</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-transfers.index' }">View Stock Transfers</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#stock-receives" data-toggle="collapse" aria-expanded="false" aria-controls="stock-receives">
                    Stock Receives <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="stock-receives">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-receives.create' }">Create New Stock Receive</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-receives.index' }">View Stock Receives</router-link>
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
