<template>
    <div class="sticky-top py-1 background sidenav-container bkdColor">
        <ul class="nav flex-column sidebar-nav">
            <li class="nav-item">
                <span class="nav-link icon-white">
                    <i class="sidebar-icon fas fa-briefcase" style="padding-right: 1.1rem"></i>
                    Business
                    <a href="http://accounting.tradesoft.ph"><i class="icon-white fas fa-calculator float-right"></i></a>
                </span>
            </li>

            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'overview' }">
                    <i class="sidebar-icon fas fa-file-alt" style="padding-right: 1.3rem"></i>
                    Dashboard
                </router-link>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#sales" data-toggle="collapse" aria-expanded="false" aria-controls="sales">
                    <i class="sidebar-icon fas fa-dollar-sign pr-4"></i>
                    Sales
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="sales">
                <ul class="nav ml-3 flex-column nav-sub-menu">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'quotations.index' }">Quotations</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'invoices.index' }">Invoices</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'invoice-payments.index' }">Invoice Payments</router-link>
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
                        <router-link class="nav-link" :to="{ name: 'item-pricelists.index' }">Purchase Item Price Lists</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stocks.index' }">Stocks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-requests.index' }">Stocks Requests</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-transfers.index' }">Stocks Transfers</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'stock-receives.index' }">Stocks Receives</router-link>
                    </li>
                </ul>
            </div>

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
                        <router-link class="nav-link" :to="{ name: 'purchase-orders.index' }">Purchase Orders</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'receive-orders.index' }">Receive Orders</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'bills.index' }">Bills</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'bill-payments.index' }">Bill Payments</router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'contacts.index' }">
                    <i class="sidebar-icon fas fa-user-alt pr-3"></i>
                    Contacts
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style>
.bkdColor{
    background-color: #319c9f;
}
.icon-white{
    color: white;
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
.nav-sub-menu   .nav-item .nav-link {
    margin-left: 30px;
}
.sidebar-icon .fas .fa-dollar-sign .pr-4{
    padding-right: 1.0rem !important
}
</style>
