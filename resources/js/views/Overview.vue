<template>
    <div class="mx-md-4 px-0">

            <div class="row">
                <div class="col-12 my-3">
                    <span class="h3">Sales Report </span>
                </div>
            </div>

            <!-- Sales Report by Branch -->
            <div class="row">

                <div class="col-5">
                    <!-- Sales Report by Branch -->
                    <span class="chart-1">
                        <div class="card card-min">
                            <div class="card-body card-mod">
                                <canvas id="sales-report-branch" class="chart"></canvas>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Sales Report by Branch</small>
                            </div>
                        </div>
                    </span>
                </div>

                <div class="col-7">
                    <div class="card card-min">
                        <!-- <div class="card-header">
                            <span class="subcontent-header"> Overview</span>
                        </div> -->
                        <div class="card-body card-mod">
                            <vue-select v-model="selectedBranchWeek" placeholder="Select a Week" @input="changeBranchWeek()" label="Select Week" :options="options"></vue-select>
                            <table class="table table-hover table-sm mt-1">
                                <thead>
                                    <tr>
                                        <th scope="col">Branch</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                    <tr>
                                        <!-- <td>sdas</td>
                                        <td>dasdas</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Sales Report by Type -->
            <div class="row mt-3">
                <div class="col-5">
                    <span class="chart-1">
                        <div class="card">
                            <div class="card-body">
                                <canvas id="sales-report-type" class="chart"></canvas>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Sales Report by Type</small>
                            </div>
                        </div>
                    </span>
                </div>

                <div class="col-7">
                    <div class="card card-min">
                        <div class="card-body card-mod">
                            <vue-select v-model="selectedTypeWeek" placeholder="Select a Week" @input="changeBranchWeek()"  :options="options"></vue-select>
                            <table class="table table-hover table-sm mt-1">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                    <tr>
                                        <!-- <td>sdas</td>
                                        <td>dasdas</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-8 col-sm-6">

                    <!-- Main Content Grid -->
                    <div class="grid">

                        <div class="row mt-3">
                            <!-- Quotations for Approval -->
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        <span class="subcontent-header"> Quotations for Approval</span>
                                    </div>
                                    <span v-if="this.quotationsForApproval && this.quotationsForApproval.length > 0">
                                        <ul class="list-group list-group-flush" :key="quote.id" v-for="quote in this.quotationsForApproval">
                                            <li class="list-group-item">
                                            <router-link :to="{ name: 'quotations.view', params: { id: quote.id } }">{{quote.number}}</router-link>
                                            </li>
                                        </ul>
                                    </span>
                                    <span v-else>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">No Pending Quotation</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <!-- Stock Request for Approval -->
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        <span class="subcontent-header"> Stock Requests for Approval</span>
                                    </div>
                                    <span v-if="this.stockRequests && this.stockRequests.length > 0">
                                        <ul class="list-group list-group-flush" :key="stock.id" v-for="stock in this.stockRequests">
                                            <li class="list-group-item">
                                                <router-link :to="{ name: 'stock-requests.view', params: { id: stock.id } }">{{stock.number}}</router-link>
                                            </li>
                                        </ul>
                                    </span>
                                    <span v-else>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">No Pending Stock Request</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <!-- Sales Report -->
                            <div class="col-6 mt-2">
                                <div class="card">
                                    <div class="card-header">
                                        <span class="subcontent-header"> Stock Transfers for Approval</span>
                                    </div>
                                    <span v-if="this.stockTransfers && this.stockTransfers.length > 0">
                                        <ul class="list-group list-group-flush" :key="stock.id" v-for="stock in this.stockTransfers">
                                            <li class="list-group-item">
                                                <router-link :to="{ name: 'stock-transfers.view', params: { id: stock.id } }">{{stock.number}}</router-link>
                                            </li>
                                        </ul>
                                    </span>
                                    <span v-else>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">No Pendting Stock Transfer</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <!-- Purchase Orders -->
                            <div class="col-6 mt-2">
                                <div class="card">
                                    <div class="card-header">
                                        <span class="subcontent-header"> Purchase Orders for Approval</span>
                                    </div>
                                    <span v-if="this.purchaseOrders && this.purchaseOrders.length > 0">
                                        <ul class="list-group list-group-flush" :key="po.id" v-for="po in this.purchaseOrders">
                                            <li class="list-group-item">
                                                <router-link :to="{ name: 'purchase-orders.view', params: { id: po.id } }">{{po.reference_number}}</router-link>
                                            </li>
                                        </ul>
                                    </span>
                                    <span v-else>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">No Pending Order</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- PO, RO, Profit -->
                        <div class="row mt-3">
                            <div class="col-12">
                                <div class="row">

                                    <!-- Daily PO -->
                                    <div class="col-md-4 col-sm-12">
                                        <div class="card card-min">
                                            <div class="card-body row">
                                                <div class="col-md-12 col-sm-12 text-center  center">
                                                    <span class="display-4">{{todaysPurchaseOrders.length}}</span>
                                                </div>
                                                <!-- <div class="col-md-7 col-sm-12 ">
                                                    <canvas id="chart2" height="200"></canvas>
                                                </div> -->
                                            </div>
                                            <div class="card-footer text-center">
                                                Today's Issued Purchase Order
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Daily RO -->
                                    <div class="col-md-4 col-sm-12">
                                        <div class="card card-min">
                                            <div class="card-body row">
                                                <div class="col-md-12 col-sm-12 text-center  center">
                                                    <span class="display-4">{{todaysReceiveOrders.length}}</span>
                                                </div>
                                                <!-- <div class="col-md-7 col-sm-12 ">
                                                    <canvas id="chart3" height="200"></canvas>
                                                </div> -->
                                            </div>
                                            <div class="card-footer text-center">
                                                Today's Issued Received Order
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Daily Income -->
                                    <div class="col-md-4 col-sm-12">
                                        <div class="card card-min">
                                            <div class="card-body row">
                                                <div class="col-md-12 col-sm-12 text-center  center">
                                                    <span class="display-4">{{this.kFormatter(totalProfit)}}</span>
                                                </div>
                                                <!-- <div class="col-md-7 col-sm-12 ">
                                                    <canvas id="chart4" height="200"></canvas>
                                                </div> -->
                                            </div>
                                            <div class="card-footer text-center">
                                                Today's Profit
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Sales Chart, Purchase Order Comparison  -->
                        <div class="row mt-3">

                            <!-- Weekly, Daily or Monthly Sales Chart -->
                            <!-- <div class="col-6">
                                <div class="p-1 mb-3">
                                    <span class="h5"> Sales Comparison </span>
                               </div>
                                <div class="card">
                                    <div class="card-body">
                                        <canvas id="chart5" height="250"></canvas>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">Last updated 3 mins ago</small>
                                    </div>
                                </div>
                            </div> -->

                            <!-- Weekly Purchase Order Comparison -->
                            <!-- <div class="col-6">
                                <div class="p-1 mb-3">
                                    <span class="h5"> Purchase Comparison </span>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <canvas id="chart6" height="250"></canvas>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">Last updated 3 mins ago</small>
                                    </div>
                                </div>
                            </div> -->

                        </div>
                    </div>

                </div>

                <!-- SubContent -->
                <div class="col-md-4 col-sm-6">

                    <!-- <div class="row mt-2"> -->
                        <!-- Display Top 5 Latest P.O -->
                        <!-- <div class="col-12">
                            <div class="card">
                                <ul class="list-group list-group-flush" :key="po.id" v-for="po in this.purchaseOrders">
                                    <li class="list-group-item">
                                        test
                                    </li>
                                    <li class="list-group-item">
                                        test
                                    </li>
                                    <li class="list-group-item">
                                        test
                                    </li>
                                    <li class="list-group-item">
                                        test
                                    </li>
                                    <li class="list-group-item">
                                        test
                                    </li>
                                </ul>
                            </div>
                        </div> -->
                    <!-- </div> -->

                    <div class="row mt-3">
                        <!-- Display Top 5 Latest P.O -->
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <span class="subcontent-header"> Latest Purchase Orders</span>
                                </div>
                                <span v-if="this.purchaseOrders && this.purchaseOrders.length > 0">
                                    <ul class="list-group list-group-flush" :key="po.id" v-for="po in this.purchaseOrders">
                                        <li class="list-group-item">
                                            <router-link :to="{ name: 'purchase-orders.view', params: { id: po.id } }">{{po.reference_number}}</router-link>
                                        </li>
                                    </ul>
                                </span>
                                <span v-else>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">No Purchase Order Available</li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <!-- Display Top 5 Latest P.O -->
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <span class="subcontent-header"> Latest Quotations</span>
                                </div>
                                <span v-if="this.quotations && this.quotations.length > 0">
                                    <ul class="list-group list-group-flush" :key="quote.id" v-for="quote in this.quotations">
                                        <li class="list-group-item">
                                            <router-link :to="{ name: 'quotations.view', params: { id: quote.id } }">{{quote.number}}</router-link>
                                        </li>
                                    </ul>
                                </span>
                                <span v-else>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">No Quotations Available</li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
</template>

<script>
    const createBasicConfig = (type, labels, datasets, options) => {
        return {
            type: type,
            data: {
            labels: labels,
            datasets: datasets,
            },
            options: options,
        };
    };

    const generateChart = ( chartElement, chartOptions ) => ( chartElement && chartOptions ) ? new Chart( chartElement, chartOptions) :  new Chart()
    const convertToDate = strDate => new Date(strDate).toDateString()

    export default {
        data() {
            return {
                selectedBranchWeek:'',
                selectedTypeWeek:'',
                ifReady: false,
                chart: '',
                salesReportChart: '',
                todaysPurchaseOrderChart:'',
                todaysReceivedOrderChart:'',
                todaysProfitChart:'',
                salesComparisonChart:'',
                purchaseComparisonChart:'',
                dateToday: new Date(),
                quotations:[],
                quotationsForApproval:[],
                todaysQuotations:[],
                invoices:[],
                purchaseOrders:[],
                todaysPurchaseOrders:[],
                bills:[],
                todaysReceiveOrders:[],
                receiveOrder:[],
                todaysStockRequests:[],
                stockRequests:[],
                invoicePayment: '',
                stockRequest:[],
                stockTransfers:[],
                options: [
                    'Week 1',
                    'Week 2',
                    'Week 3',
                    'Week 4'
                ],
                totalProfit:0,
            };
        },

        methods: {
            changeBranchWeek(){
                //console.log(this.selectedBranchWeek)
            },
            changeTypeWeek(){
                //console.log(this.selectedTypeWeek)
            },
            kFormatter(num) {
                return num > 999 ? (num/1000).toFixed(1) + 'K' : num
            }
        },
        mounted () {

            //console.clear();
            const getAllQuotations = () => {
                axios.get('/api/quotations/get-all-quotations').then( res => {
                    const allQuotations = res.data.quotations
                    //console.groupCollapsed('Quotation Request')

                    const log = JSON.stringify(allQuotations)
                    //console.log('All Quotation', JSON.parse(log));

                    this.quotations = allQuotations ? allQuotations.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)) : []

                    const issuedQuotations = this.quotationsForApproval = allQuotations.filter( quo => quo.status === 0)

                    this.todaysQuotations = allQuotations
                    .filter( quo => (quo.status === 0) && ( new Date(quo.created_at).getDate() === this.dateToday.getDate() ))

                    //console.log('Issued Quotations',issuedQuotations)
                    //console.groupEnd()

                }).catch( error => console.error(error))
            }

            const getAllInvoices = () => {
                axios.get('/api/invoices/get-all-invoices').then( res => {
                    //console.groupCollapsed('Invoice Request')
                        const allInvoices = res.data.invoices.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
                        //console.log('All Invoices ->',allInvoices)
                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            const getTotalProfit = ( array ) =>{
                let tempAmount = 0
                const finalAmount =  array.reduce( (prev,curr) => {
                    let prevAmount = prev.amount ? prev.amount : 0
                    let currAmount = curr.amount ? curr.amount : 0
                    return parseInt(prevAmount) + parseInt(currAmount)
                })
                return finalAmount ? finalAmount + 10000: 0
            }

            const getAllInvoicePayments = () => {
                axios.get('/api/invoice-payments/get-all-invoice-payments').then( res => {
                    //console.groupCollapsed('Invoice Payments')
                        const allInvoices = res.data.invoice_payments
                        this.invoices = allInvoices ? allInvoices.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)) : []
                        //console.log('All Invoices ->',JSON.parse(JSON.stringify({res:allInvoices})))

                        const testData = JSON.parse(JSON.stringify({res:allInvoices}))

                        this.totalProfit = getTotalProfit(this.invoices)
                        //console.log('Total Profit ->', this.totalProfit)
                        this.total

                        // Separate by Month
                        const monthData = testData.res.filter( data => new Date(data.created_at).getMonth() === new Date().getMonth() )
                        //console.log('Month Data ->', monthData)

                        //Sort Month by first to last
                        const sortedMonthData = monthData.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));

                        Date.prototype.getWeekNumber = function(){
                            var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
                            var dayNum = d.getUTCDay() || 7;
                            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
                            var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
                            return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
                        };

                        // Separate Month Data to Week Data
                        let weekData = [ [], [], [], []]
                        let tempData = []

                        function weekOfMonth(m) {
                            return m.week() - moment(m).startOf('month').week() + 1;
                        }

                        sortedMonthData.map( data => {
                            const weeknumber = weekOfMonth(moment(data.created_at))
                            weekData[weeknumber-1].push( data )
                        })


                        //console.log('Week Data ->', weekData)

                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            const createTypeChartData = (weekdata) => {

                let chartSampleData = [
                {
                    label: '',
                    data: weekdata[0],
                    backgroundColor: 'rgba(54, 162, 235, 0.3)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                },
                {
                    label: 'Type 2',
                    data: [4, 3, 5, 7],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                },
                {
                    label: 'Type 3',
                    data: [7, 2, 6, 9],
                    backgroundColor: 'rgba(54, 162, 235, 0.9)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                },
                {
                    label: 'Type 4',
                    data: [7, 2, 6, 9],
                    backgroundColor: 'rgba(54, 162, 235, 0.9)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                },
            ];

            }

            const getAllPurchaseOrders = () => {
                axios.get('/api/purchase-orders/get-all-purchase-orders').then( res => {
                    //console.groupCollapsed('Purchase Orders')
                        const allPurchaseOrders = res.data.purchase_orders
                        //console.log('All Purchase Orders ->',JSON.parse(JSON.stringify({res:res.data.purchase_orders})))
                        const issuedReceiveOrders = allPurchaseOrders.filter( data => data.status === 0)
                        //console.log('Issued Purchase Orders ->', allPurchaseOrders)
                        this.todaysPurchaseOrders = allPurchaseOrders.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
                        this.purchaseOrders = this.todaysPurchaseOrders.filter( (val, i) => i < 10)
                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            const getAllReceiveOrder = () => {
                axios.get('/api/receive-orders/get-all-receive-orders').then( res => {
                    //console.groupCollapsed('Receive Orders')
                        const allReceiveOrders = res.data.receive_orders
                        //console.log('All receive Orders ->', allReceiveOrders)
                        this.todaysReceiveOrders = allReceiveOrders ? allReceiveOrders.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)): []
                        this.purchaseOrders = this.todaysPurchaseOrders.filter( (val, i) => i < 10)
                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            const getAllStockTransfer = () => {
                axios.get('/api/stock-transfers/get-all-stock-transfers').then( res => {
                    //console.group('Stock Transfer')
                        const allStockTransfer = res.data.stock_transfers
                        //console.log('All Stock Transfers ->',JSON.parse(JSON.stringify({res:allStockTransfer})))
                        const stockTransferApproval = allStockTransfer.filter( data => data.status === 0)
                        this.stockTransfers = stockTransferApproval ? stockTransferApproval.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)): []
                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            const getAllStockRequest = () => {
                axios.get('/api/stock-requests/get-all-unapproved-stock-requests').then( res => {
                    //console.groupCollapsed('Stock Requests')
                        const allStockRequests = res.data.stock_requests
                        const log =  JSON.stringify( {stock_request: allStockRequests})
                        //console.log('All Stock Requests ->',JSON.parse(log))
                        this.stockRequests = allStockRequests ? allStockRequests.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)) : []
                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            const getAllBills = () => {
                axios.get('/api/bill-payments/get-all-bill-payments').then( res => {
                    //console.groupCollapsed('Bills Payment')
                        const allBills = {bills: res.data.bills_payments}
                        const log =  JSON.stringify(allBills)
                        //console.log('All Bills ->',JSON.parse(log))
                        // this.bills = allBills.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));
                    //console.groupEnd()
                }).catch( error => console.error(error))
            }

            getAllQuotations()
            getAllInvoices()
            getAllPurchaseOrders()
            getAllBills()
            getAllReceiveOrder()
            getAllInvoicePayments()
            getAllStockRequest()
            getAllStockTransfer()

            //console.log('Data Today ->', this.dateToday)

            if (this.$store.state.corporation_id == null || undefined ) {
                this.$router.push({ name: 'corporations.select' })
            }

            let chartSampleLabel = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            let chartSampleData = [
                // {
                //     label: 'Type 1',
                //     data: [3, 7, 4, 6],
                //     backgroundColor: 'rgba(54, 162, 235, 0.3)',
                //     borderColor: 'rgba(54, 162, 235, 1)',
                // },
                // {
                //     label: 'Type 2',
                //     data: [4, 3, 5, 7],
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     borderColor: 'rgba(54, 162, 235, 1)',
                // },
                // {
                //     label: 'Type 3',
                //     data: [7, 2, 6, 9],
                //     backgroundColor: 'rgba(54, 162, 235, 0.9)',
                //     borderColor: 'rgba(54, 162, 235, 1)',
                // },
            ];
            const options3 = createBasicConfig(
            'bar',
            chartSampleLabel,
            chartSampleData, {
                scales: {
                yAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                    },
                    },
                ],
                },
            })
            generateChart('sales-report-branch', options3)
            generateChart('sales-report-type', options3)



            let promise = new Promise((resolve, reject) => {
                axios.get('/api/statistics/test-payload').then(res => {
                    const response = res.data.payload
                    const labels = response.map( data => convertToDate(data.date))
                    const data = response.map( data => data.data)
                    const options = createBasicConfig( 'bar', labels,
                    [
                        {
                            label: 'Sales',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            lineTension: 0,
                        },
                    ],
                    {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    })

                    const options2 = createBasicConfig( 'line', labels,
                    [
                        {
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            lineTension: 0,
                            fill: false,
                        },
                    ],
                    {
                        legend: {
                                display: false,
                        },
                        scales: {
                            yAxes: [
                                {
                                    display: false,
                                    gridLines: {
                                    display: false,
                                    },
                                    ticks: {
                                    beginAtZero: true,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    display: false,
                                }
                            ],
                        },
                    })

                    let chartSampleLabel = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                    let chartSampleData = [
                        {
                            label: 'Type 1',
                            data: [3, 7, 4, 6],
                            backgroundColor: 'rgba(54, 162, 235, 0.3)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                        },
                        {
                            label: 'Type 2',
                            data: [4, 3, 5, 7],
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                        },
                        {
                            label: 'Type 3',
                            data: [7, 2, 6, 9],
                            backgroundColor: 'rgba(54, 162, 235, 0.9)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                        },
                    ];

                    const options3 = createBasicConfig('bar', chartSampleLabel, chartSampleData, {
                        scales: {
                        yAxes: [
                            {
                            ticks: {
                                beginAtZero: true,
                            },
                            },
                        ],
                        },
                    })

                    this.salesReportChart = generateChart('chart1', options3)
                    // this.todaysPurchaseOrderChart = generateChart('chart2', options2)
                    // this.todaysReceivedOrderChart = generateChart('chart3', options2)
                    // this.todaysProfitChart = generateChart('chart4', options2)
                    this.salesComparisonChart = generateChart('chart5', options)
                    this.purchaseComparisonChart = generateChart('chart6', options3)
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        }
     }


</script>

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-min {
        min-height: 200px;
    }
    .card-mod{
        padding-top:10px;
    }
</style>
