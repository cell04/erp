<template>
    <div class="sticky-top py-1 background sidenav-container bkdColor">
        <ul class="nav flex-column sidebar-nav " style="margin-top: -4px;">
            <li class="nav-item">
                <span class="nav-link icon-white mainNavColor">
                    <i class="sidebar-icon fas fa-briefcase" style="padding-right: 1.1rem"></i>
                    <strong>Business</strong>
                    <a href="http://accounting.tradesoft.ph"><i class="icon-white fas fa-calculator float-right pt-1"></i></a>
                </span>
            </li>

            <li class="nav-item link" v-bind:class="isActive(['overview'])">
                <router-link class="nav-link" :to="{ name: 'overview' }">
                    <i class="sidebar-icon fas fa-file-alt" style="padding-right: 1.3rem"></i>
                    Dashboard
                </router-link>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#sales" data-toggle="collapse" :aria-expanded="this.expand.sales" aria-controls="sales" v-bind:class="isActive(this.salesRoute)">
                    <i class="sidebar-icon fas fa-dollar-sign pr-4"></i>
                    Sales
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="sales">
                <ul class="nav ml-3 flex-column nav-sub-menu" v-bind:class="isActive(this.salesRoute)">
                    <li class="nav-item" >
                        <router-link class="nav-link link" :to="{ name: 'quotations.index' }">
                            <span class="sub-content"> <i class="fas fa-caret-right pr-2 "></i> Quotations</span>
                        </router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link class="nav-link link" :to="{ name: 'bid-sheets.index' }">
                            <span class="sub-content"> <i class="fas fa-caret-right pr-2 "></i> Bid Sheets</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'invoices.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Sales Invoices
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'service-invoices.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Service Invoices
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'invoice-payments.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Invoice Payments
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#inventory" data-toggle="collapse" aria-expanded="false" aria-controls="inventory" v-bind:class="isActive(this.inventoryRoute)">
                    <i class="sidebar-icon fas fa-archive pr-3"></i>
                    Inventory
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="inventory">
                <ul class="nav ml-3 flex-column nav-sub-menu" v-bind:class="isActive(this.inventoryRoute)">
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'warehouses.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Warehouses
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'branches.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Branches
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'items.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Items
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'item-pricelists.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Item Price Lists
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'purchase-item-pricelists.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Purchase Item Price Lists
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'stocks.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Stocks
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'stock-requests.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Stocks Requests
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'stock-transfers.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Stocks Transfers
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'stock-receives.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Stocks Receives
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item">
                <a class="nav-link" href="#purchasing" data-toggle="collapse" aria-expanded="false" aria-controls="purchasing" v-bind:class="isActive(this.purchasingRoute)">
                    <i class="sidebar-icon fas fa-shopping-bag pr-3"></i>
                    Purchasing
                    <i class="float-right fas fa-caret-down"></i>
                </a>
            </li>
            <div class="collapse" id="purchasing">
                <ul class="nav ml-3 flex-column nav-sub-menu" v-bind:class="isActive(this.purchasingRoute)">
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'purchase-orders.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Purchase Orders
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'receive-orders.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Received Orders
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'bills.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-2 "></i>
                                Purchase Invoices
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link link" :to="{ name: 'bill-payments.index' }">
                            <span class="sub-content">
                                <i class="fas fa-caret-right pr-1"></i>
                                Purchase Invoice Payments</span>
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <li class="nav-item" v-bind:class="isActive(['contacts'])">
                <router-link class="nav-link link" :to="{ name: 'contacts.index' }">
                    <i class="sidebar-icon fas fa-user-alt pr-3"></i>
                    Contacts
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data () {
            return{
                activeClass:true,
                currentRoute: '',
                // Contains the the routes for the dropdown
                salesRoute: ['quotations', 'bid-sheets','invoices', 'service-invoices', 'invoice-payments'],
                purchasingRoute: ['purchase-orders','receive-orders','bills','bill-payments'],
                inventoryRoute: ['warehouses','branches','items','item-pricelists', 'purchase-item-pricelists','stocks','stock-requests','stock-transfers','stock-receives'],
                expand: {
                    sales: true,
                    inventory:false,
                    purchasing:false,
                }
            }
        },
        methods: {
            isActive( routeArray ){
                let newCurrentRoute = this.currentRoute === 'overview' ? this.currentRoute
                : this.currentRoute.substring(0, this.currentRoute.lastIndexOf('.'))
                let filteredRoute = []
                if( routeArray.filter ){
                    filteredRoute = routeArray.filter( data => {
                     return data === newCurrentRoute
                    })
                }
                // console.log('Filtered Route -> ', routeArray, filteredRoute)
                return ( filteredRoute && filteredRoute.length > 0) ? 'selected' : ''
            }
        },
        watch:{
            $route (to, from){
                this.currentRoute = to.name
            }
        }
    }

</script>

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
.nav-sub-menu .nav-item .nav-link {
    margin-left: -15px;
    font-size: 13px;
}
.sub-content{
    margin-left: 45px;
}
.sidebar-icon .fas .fa-dollar-sign .pr-4{
    padding-right: 1.0rem !important
}
.mainNavColor{
    background: rgb(26, 100, 102);
    background: linear-gradient(90deg, rgba(26, 100, 102,1) 0%, rgba(43, 165, 169,1) 99%);
}
.link:hover{
    background-color: #287e80;
}
.link .fa-caret-right{
    display: none;
}
.router-link-exact-active .fa-caret-right{
    display: inline;
}
.selected, .selected .nav-link{
    background-color: #236d6f;
}
.selected .nav-link {
    background-color: #287e80;
}

</style>
