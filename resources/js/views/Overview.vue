<template>
    <div class="mx-md-4">
            <div class="row">
                <div class="col-9">

                    <!-- Main Content Grid -->
                    <div class="grid">

                        <!-- Customer Traffic -->
                        <div class="row">
                            <div class="col-12">
                                <span class="chart-1">
                                    <div class="p-1 mb-3">
                                        <span class="h3"> Sales Report </span>
                                        <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <canvas id="chart1" class="chart"></canvas>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">Last updated 3 mins ago</small>
                                        </div>
                                    </div>
                                </span>
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
                                                <div class="col-md-5 col-sm-12 text-center  center">
                                                    <span class="display-4">100</span>
                                                </div>
                                                <div class="col-md-7 col-sm-12 ">
                                                    <canvas id="chart2" height="200"></canvas>
                                                </div>
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
                                                <div class="col-md-5 col-sm-12 text-center  center">
                                                    <span class="display-4 ">2</span>
                                                </div>
                                                <div class="col-md-7 col-sm-12 ">
                                                    <canvas id="chart3" height="200"></canvas>
                                                </div>
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
                                                <div class="col-md-5 col-sm-12 text-center  center">
                                                    <span class="display-4">2.5K</span>
                                                </div>
                                                <div class="col-md-7 col-sm-12 ">
                                                    <canvas id="chart4" height="200"></canvas>
                                                </div>
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
                            <div class="col-6">
                                <div class="p-1 mb-3">
                                    <span class="h5"> Sales Comparison </span>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <canvas id="chart5" height="250"></canvas>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">Last updated 3 mins ago</small>
                                    </div>
                                </div>
                            </div>

                            <!-- Weekly Purchase Order Comparison -->
                            <div class="col-6">
                                <div class="p-1 mb-3">
                                    <span class="h5"> Purchase Comparison </span>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <canvas id="chart6" height="250"></canvas>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">Last updated 3 mins ago</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <!-- SubContent -->
                <div class="col-3">

                    <div class="row">
                        <!-- Change Corporation -->
                        <div class="col-12">
                            <div class="card">
                                <router-link :to="{ name: 'corporations.select' }">
                                    <a class="btn btn-primary btn-lg btn-block active" role="button" aria-pressed="false">Switch Corporation</a>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <!-- Display Top 10 Products -->
                        <div class="col-12">
                            <div class="card ">
                                <div class="card-header">
                                    <span class="subcontent-header"> Today's Top Products</span>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <ul class="list-group list-group-flush">

                                    <li class="list-group-item"> <span class="float-left">
                                        1. &nbsp;</span>Item 1
                                        <span class="badge badge-secondary float-right">200</span>
                                    </li>
                                    <li class="list-group-item"> <span class="float-left">
                                        2. &nbsp;</span>Acme 2000
                                        <span class="badge badge-secondary float-right">100</span>
                                    </li>
                                    <li class="list-group-item"> <span class="float-left">
                                        3. &nbsp;</span>Product 100
                                        <span class="badge badge-secondary float-right">30</span>
                                    </li>
                                    <li class="list-group-item"> <span class="float-left">
                                        4. &nbsp;</span>Sample 600
                                        <span class="badge badge-secondary float-right">20</span>
                                    </li>
                                    <li class="list-group-item"> <span class="float-left">
                                        5. &nbsp;</span>Item 500
                                        <span class="badge badge-secondary float-right">10</span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <!-- Display Top 5 Latest P.O -->
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <span class="subcontent-header"> Latest Purchase Orders</span>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> <a href="">PO-201810170000000006</a> </li>
                                    <li class="list-group-item"> <a href="">PO-201810170000000007</a> </li>
                                    <li class="list-group-item"> <a href="">PO-201810170000000008</a> </li>
                                    <li class="list-group-item"> <a href="">PO-201810170000000007</a> </li>
                                    <li class="list-group-item"> <a href="">PO-201810170000000007</a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <!-- Display Top 5 Latest P.O -->
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <span class="subcontent-header"> Latest Received Orders</span>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> <a href="">RO-201810170000000006</a> </li>
                                    <li class="list-group-item"> <a href="">RO-201810170000000007</a> </li>
                                    <li class="list-group-item"> <a href="">RO-201810170000000008</a> </li>
                                    <li class="list-group-item"> <a href="">RO-201810170000000008</a> </li>
                                    <li class="list-group-item"> <a href="">RO-201810170000000008</a> </li>
                                </ul>
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

    const days2 = [
    'Dec 31',
    'Jan 1',
    'Jan 2',
    'Jan 3',
    'Jan 4',
    'Jan 5',
    'Jan 6',
    'Jan 7',
    'Jan 8',
    ];
    const traffic2 = [200, 25, 400, 38, 309, 275, 484, 111, 232, 345];

    const bkdColors = [
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
    ];

    const generateChart = ( chartType, chartElement , chartLabel, chartData ) => {
        return new Chart(
            chartElement,
            createBasicConfig(
                chartType,
                chartLabel,
                [
                    {
                        label: 'Sales',
                        data: chartData,
                        backgroundColor: bkdColors,
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
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
                }
            )
        );
    }
    export default {
        data() {
            return {
                ifReady: false,
                chart: '',
                salesReportChart: '',
                todaysPurchaseOrderChart:'',
                todaysReceivedOrderChart:'',
                todaysProfitChart:'',
                salesComparisonChart:'',
                purchaseComparisonChart:''
            };
        },
        mounted () {
            if (this.$store.state.corporation_id == null || undefined ) {
                this.$router.push({ name: 'corporations.select' })
            }

            let promise = new Promise((resolve, reject) => {
                axios.get('/api/statistics/test-payload').then(res => {
                    const response = res.data.payload
                    const labels = response.map( data => data.date)
                    const data = response.map( data => data.data)
                    this.salesReportChart = generateChart('bar', 'chart1', labels, data)

                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });

            // Chart 2
            var chart2 = new Chart(
                document.getElementById('chart2'),
                createBasicConfig(
                    'line',
                    days2,
                    [
                    {
                        data: traffic2,
                        backgroundColor: bkdColors,
                        borderColor: [
                        'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
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
                        },
                        ],
                    },
                    }
                )
            );

             // Chart 3
            var chart3 = new Chart(
                document.getElementById('chart3'),
                createBasicConfig(
                    'line',
                    days2,
                    [
                    {
                        data: traffic2,
                        backgroundColor: bkdColors,
                        borderColor: [
                        'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
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
                        },
                        ],
                    },
                    }
                )
            );

             // Chart 4
            var chart4 = new Chart(
                document.getElementById('chart4'),
                createBasicConfig(
                    'line',
                    days2,
                    [
                    {
                        data: traffic2,
                        backgroundColor: bkdColors,
                        borderColor: [
                         'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
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
                        },
                        ],
                    },
                    }
                )
            );

            const chartlabel5 = ['Week No. 1', 'Week No. 2', 'Week No. 4'];
            const chartdata5 = [200, 25, 400, 38];

            // Chart 5
            var chart1 = new Chart(
                document.getElementById('chart5'),
                createBasicConfig(
                    'bar',
                    chartlabel5,
                    [
                        {
                            label: 'Sales',
                            data: chartdata5,
                            backgroundColor: bkdColors,
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(54, 162, 235, 1)',
                            ],
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
                    }
                )
            );

            let chartLabel6 = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            let chartData6 = [
                {
                    label: 'January',
                    fillColor: 'blue',
                    data: [3, 7, 4, 6],
                    backgroundColor: bkdColors,
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                },
                {
                    label: 'February',
                    fillColor: 'red',
                    data: [4, 3, 5, 7],
                    backgroundColor: bkdColors,
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                },
                {
                    label: 'March',
                    fillColor: 'green',
                    data: [7, 2, 6, 9],
                    backgroundColor: bkdColors,
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                },
            ];

            // Chart 6
            var chart6 = new Chart(
            document.getElementById('chart6'),
            createBasicConfig('bar', chartLabel6, chartData6, {
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
            );
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
</style>
