<template>
    <div class="sticky-top">
        <ul class="nav flex-column background py-1 mt-3 sidebar-nav">
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'overview' }">
                    Dashboard
                </router-link>
            </li>

            <!-- <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'overview' }">Overview</router-link>
            </li> -->

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
                <a class="nav-link" href="#types" data-toggle="collapse" aria-expanded="false" aria-controls="types">
                    Item Types <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="types">
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
                <a class="nav-link" href="#itemClass" data-toggle="collapse" aria-expanded="false" aria-controls="itemClass">
                    Item Classifications <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="itemClass">
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
                <a class="nav-link" href="#purchaseOrder" data-toggle="collapse" aria-expanded="false" aria-controls="purchaseOrder">
                    Purchase Orders <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="purchaseOrder">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.create' }">Add Purchase Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.index' }">View Purchase Order</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#receivedOrder" data-toggle="collapse" aria-expanded="false" aria-controls="corporations">
                    Recieved Orders <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="receivedOrder">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.create' }">Add Received Order</router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'receive-orders.index' }">View Received Order</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#bills" data-toggle="collapse" aria-expanded="false" aria-controls="corporations">
                    <!-- <i class="fas fa-box mr-2"></i> -->
                    Bills <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="bills">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'bills.index' }">View Bills</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'bills.create' }">Add Bills</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#purchasing" data-toggle="collapse" aria-expanded="false" aria-controls="corporations">
                    <!-- <i class="fas fa-shopping-cart mr-2"></i> -->
                    Purchasing <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="purchasing">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: '' }">Vendor Credits</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: '' }">Applied Vendor Credits</router-link>
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
            <li class="nav-item">
                <a class="nav-link" href="#categories" data-toggle="collapse" aria-expanded="false" aria-controls="categories">
                    Categories <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="categories">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'categories.create' }">Create New Category</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'categories.index' }">View Categories</router-link>
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
        </ul>
    </div>
</template>

<script>
export default {};
</script>
