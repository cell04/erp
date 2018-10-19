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
                                        <span class="h3"> Sales Report </span> <small class="text-muted">as of  Jan 7, 2018 6:00 AM</small>
                                        <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <canvas id="chart1" class="chart"></canvas>
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
                                    <div class="col-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-5 text-center align-middle">
                                                        <span class="sub-header">20</span>
                                                    </div>
                                                    <div class="col-7">
                                                        <canvas id="chart2" height="200"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-center">
                                                Purchase Order Issued </div>
                                        </div>
                                    </div>

                                    <!-- Daily RO -->
                                    <div class="col-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-5 text-center align-middle">
                                                        <span class="sub-header">10</span>
                                                    </div>
                                                    <div class="col-7">
                                                        <canvas id="chart3" height="200"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-center">
                                                Recieved Order Issued </div>
                                        </div>
                                    </div>

                                    <!-- Daily Income -->
                                    <div class="col-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-6 text-center align-middle">
                                                        <span class="sub-header">P1.5K</span>
                                                    </div>
                                                    <div class="col-6">
                                                        <canvas id="chart4" height="200"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-center">
                                                Today's Profit </div>
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
                                    <span class="h5"> Weekly Sales Chart </span> <small class="text-muted">as of  Jan 7, 2018 6:00 AM</small>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <canvas id="chart5" height="250"></canvas>
                                    </div>
                                </div>
                            </div>

                            <!-- Weekly Purchase Order Comparison -->
                            <div class="col-6">
                                <div class="p-1 mb-3">
                                    <span class="h5"> Weekly Purchase Order </span> <small class="text-muted">as of  Jan 7, 2018 6:00 AM</small>
                                    <a class="btn btn-primary btn-outline-primary btn-sm float-right" href="#" role="button">View Report</a>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <canvas id="chart6" height="250"></canvas>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <!-- SubContent -->
                <div class="col-3">

                    <div class="row">
                        <!-- Display Top 10 Products -->
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <span class="subcontent-header"> Today's Top Products</span>

                                    <span class="float-right view-all font-center"> <a href="">View All</a> </span>

                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> <span class="float-left">1. &nbsp;</span>Item 1 <span
                                            class="badge badge-secondary float-right">200</span></li>
                                    <li class="list-group-item"> <span class="float-left">2. &nbsp;</span>Food Item 200
                                        <span class="badge badge-secondary float-right">120</span></li>
                                    <li class="list-group-item"> <span class="float-left">3. &nbsp;</span>Acme Item
                                        <span class="badge badge-secondary float-right">80</span></li>
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
                                    <span class="float-right view-all font-center"> <a href="">View All</a> </span>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> <a href="">PO-201810170000000006</a> </li>
                                    <li class="list-group-item"> <a href="">PO-201810170000000006</a> </li>
                                    <li class="list-group-item"> <a href="">PO-201810170000000006</a> </li>
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
    export default {
        mounted () {
            if (this.$store.state.corporation_id == null || undefined ) {
                this.$router.push({ name: 'corporations.select' })
            }

            // Chart 1
            var chart1 = new Chart(
                document.getElementById('chart1'),
                createBasicConfig(
                    'bar',
                    days2,
                    [
                        {
                            label: 'Sales',
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

            // Chart 5
            var chart1 = new Chart(
                document.getElementById('chart5'),
                createBasicConfig(
                    'bar',
                    days2,
                    [
                        {
                            label: 'Sales',
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

            // Chart 6
            var chart6 = new Chart(
                document.getElementById('chart6'),
                createBasicConfig(
                    'bar',
                    days2,
                    [
                        {
                            label: 'Sales',
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
     }


</script>

<style>
    .card {
    /* width: 100%; */
        min-height: 200px;
    }
    .chart {
    /* width: 100%; */
    /* height: 100%; */
    }

    .chart-1 {
    }

    .sub-header {
    font-size: 2.3em;
    }

    .view-all {
    font-size: 0.75em;
    }

    .subcontent-header {
    font-size: 0.8em;
    }
</style>
