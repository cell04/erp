<template>
    <!-- just add bkdColor to main class -->
    <div class="sticky-top py-1 mt-3 background sidenav-container bkdColor">
        <ul class="nav flex-column sidebar-nav">

            <li class="nav-item">
                <a  class="nav-link">
                    <i class="sidebar-icon fas fa-briefcase pr-3"></i>
                    Business
                </a>

            </li>

            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'overview' }">
                    <i class="sidebar-icon fas fa-file-alt pr-3"></i>
                    Dashboard
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'contacts.index' }">
                    <i class="sidebar-icon fas fa-user-alt pr-3"></i>
                    Contacts
                </router-link>
            </li>


            <li class="nav-item">
                <a class="nav-link" href="#purchasing" data-toggle="collapse" aria-expanded="false" aria-controls="purchasing">
                    <i class="sidebar-icon fas fa-shopping-bag pr-3"></i>
                    Purchasing
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="purchasing">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.index' }">Purchasing Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'invoices.index' }">Invoice</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: '' }">Goods Receipt</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#inventory" data-toggle="collapse" aria-expanded="false" aria-controls="inventory">
                    <i class="sidebar-icon fas fa-archive pr-3"></i>
                    Inventory
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="inventory">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'warehouses.index' }">Warehouses</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'branches.index' }">Branches</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'items.index' }">Items</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'item-pricelists.index' }">Item Price List</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#sales" data-toggle="collapse" aria-expanded="false" aria-controls="sales">
                    <i class="sidebar-icon fas fa-dollar-sign pr-3"></i>
                    Sales
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="sales">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contacts.create' }">Module # 1</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contacts.create' }">Module # 2</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contacts.create' }">Module # 3</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'contacts.create' }">Module # 4</router-link>
                    </li>
                </ul>
            </div>

        </ul>
    </div>
</template>

<style>
    .bkdColor{
        background-color: #319c9f;
    }
    .sidebar-nav li > a.nav-link{
        color: white;
    }
    .sidenav-container{
        /* margin-left: -16px; */
        overflow-y: hidden;
    }
    .sidebar-icon{
        font-size: 1em;
    }
    .nav-link .router-link-exact-active{
        background-color: #236d6f;
    }
</style>
