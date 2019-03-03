<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">STOCK REQUEST</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewStockRequests">Stock Requests</a>
                    <a class="text-secondary"> / View Stock Request</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <div v-if="stockRequest.status === 0">
                            <h5>
                                Stock Request Details
                                <span class="badge badge-secondary badge-info">Pending</span>
                            </h5>
                        </div>
                        <div v-else-if="stockRequest.status === 1">
                            <h5>
                                Stock Request Details
                                <span class="badge badge-secondary badge-success">Approved</span>
                            </h5>
                        </div>
                        <div v-else>
                            <h5>
                                Stock Request Details
                                <span class="badge badge-secondary badge-danger">Cancelled</span>
                            </h5>
                        </div>
                        <fieldset>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Stock Request #</label>
                                        <input type="text" class="form-control" v-model="stockRequest.number" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Created By</label>
                                        <input type="text" class="form-control" v-model="stockRequest.user.name" id="name" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Requested From</label>
                                        <input type="text" class="form-control" v-model="stockRequest.stock_requestable_from.name" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Requested To</label>
                                        <input type="text" class="form-control" v-model="stockRequest.stock_requestable_to.name" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="stockRequest.status === 1">
                                    <div class="form-group">
                                        <label>Approved By</label>
                                        <input type="text" class="form-control" v-model="stockRequest.approve_by.name" id="name" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="stockRequest.status === 1">
                                    <div class="form-group">
                                        <label>Approved Date</label>
                                        <input type="text" class="form-control" v-model="stockRequest.updated_at" readonly>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <br>
                        <h6>
                            <u>Stock Request Items</u>
                        </h6>
                        <br>

                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">UOM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="index" v-for="(stockRequestItem, index) in stockRequestItems">
                                    <td>{{ stockRequestItem.item.stock_keeping_unit }}</td>
                                    <td>{{ stockRequestItem.item.name }}</td>
                                    <td>{{ stockRequestItem.quantity }}</td>
                                    <td>{{ stockRequestItem.unit_of_measurement.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />

                        <div class="clearfix">
                            <div class="float-left">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewStockRequests"><i class="fas fa-chevron-left"></i> Back</button>
                                <!-- <button type="button" class="btn btn-success btn-sm" @click.prevent.default="editStockRequest"><i class="fas fa-edit"></i> Edit</button> -->
                                <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteStockRequestModal"><i class="fas fa-trash-alt"></i> Delete</button>
                            </div>
                            <div class="float-right">
                                <button class="btn btn-success btn-sm" v-if="stockRequest.status === 0" @click.prevent.default="openApproveStockRequestModal"><i class="fas fa-thumbs-up"></i> Approve</button>
                                <button class="btn btn-danger btn-sm" v-if="stockRequest.status === 0" @click.prevent.default="openCancelStockRequestModal"><i class="fas fa-thumbs-down"></i> Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Delete Modal -->
            <div class="modal fade" id="deleteStockRequestModal" tabindex="-1" role="dialog" aria-labelledby="deleteStockRequestTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Stock Request?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this Stock Request? <br><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteStockRequest">Confirm Delete</button>
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Approve Modal -->
            <div class="modal fade" id="approveStockRequestModal" tabindex="-1" role="dialog" aria-labelledby="approveStockRequestTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">You're about to approve this Stock Request?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to approve this Stock Request? <br><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success btn-sm" @click.prevent.default="approveStockRequest">Confirm Approve</button>
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cancel Modal -->
            <div class="modal fade" id="cancelStockRequestModal" tabindex="-1" role="dialog" aria-labelledby="cancelStockRequestTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">You're about to cancel this Stock Request?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to cancel this Stock Request? <br><br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="cancelStockRequest">Confirm Cancel</button>
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                stockRequest: '',
                stockRequestItems: []
            };
        },

        mounted() {
            // console.log(JSON.parse(localStorage.getItem('user')));
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/stock-requests/" + this.$route.params.id).then(res => {
                    this.stockRequest = res.data.stockRequest;

                    let status = {
                        0: 'Pending',
                        1: 'Approved',
                        2: 'Cancelled'
                    };

                    this.stockRequest.statusName = status[this.stockRequest.status];
                    this.stockRequestItems = res.data.stockRequest.stock_request_items;

                    resolve();
                }).catch(err => {
                    console.log(err);
                    alert("Please report to the devs");
                    reject();
                    this.ifReady = true;
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewStockRequests() {
                this.$router.push({ name: "stock-requests.index" });
            },
            editStockRequest() {
                this.$router.push({
                    name: 'stock-requests.edit',
                    params: { id: this.stockRequest.id }
                });
            },
            openDeleteStockRequestModal() {
                $('#deleteStockRequestModal').modal('show');
            },
            deleteStockRequest() {
                $('#deleteStockRequestModal').modal('hide');

                axios.delete('/api/stock-requests/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'stock-requests.index' });
                }).catch(err => {
                    alert("Error!");
                    console.log(err);
                });
            },
            openApproveStockRequestModal() {
                $('#approveStockRequestModal').modal('show');
            },
            approveStockRequest() {
                this.ifReady = false;
                $('#approveStockRequestModal').modal('hide');

                axios.post("/api/stock-requests/" + this.$route.params.id + "/approve").then(res => {
                    this.stockRequest.approve_by = JSON.parse(localStorage.getItem('user'));
                    this.stockRequest.statusName = "Approved";
                    this.stockRequest.status = 1;
                    this.ifReady = true;
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't can't approve stock request`);
                });
            },
            openCancelStockRequestModal() {
                $('#cancelStockRequestModal').modal('show');
            },
            cancelStockRequest() {
                this.ifReady = false;
                $('#cancelStockRequestModal').modal('hide');

                axios.post("/api/stock-requests/" + this.$route.params.id + "/cancel").then(res => {
                    this.stockRequest.statusName = "Cancelled";
                    this.stockRequest.status = 2;
                    this.ifReady = true;
                }) .catch(err => {
                    console.log(err);
                    alert(`Error! Can't can't cancel stock request`);
                });
            }
        }
    };
</script>
