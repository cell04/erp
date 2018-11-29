<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">STOCK TRANSFER</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewStockTransfers">Stock Transfers</a>
                    <a class="text-secondary"> / View Stock Transfer</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <div v-if="stockTransfer.status === 0">
                            <h5>
                                Stock Transfer Details
                                <span class="badge badge-secondary badge-info">Transferring</span>
                            </h5>
                        </div>
                        <div v-else-if="stockTransfer.status === 1">
                            <h5>
                                Stock Transfer Details
                                <span class="badge badge-secondary badge-success">Transferred</span>
                            </h5>
                        </div>
                        <fieldset disabled>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="name">Stock Tranfer #</label>
                                    <input type="text" class="form-control" v-model="stockTransfer.number">
                                </div>
                                <div class="col-md-6">
                                    <label for="name">Tranfer Date</label>
                                    <input type="text" class="form-control" v-model="stockTransfer.stock_transfered_date">
                                </div>
                                <div class="col-md-6">
                                    <label for="name">Transfer From</label>
                                    <input type="text" class="form-control" v-model="stockTransfer.stock_transferable_from.name">
                                </div>
                                <div class="col-md-6">
                                    <label for="name">Transfer To</label>
                                    <input type="text" class="form-control" v-model="stockTransfer.stock_transferable_to.name">
                                </div>
                            </div>
                        </fieldset>

                        <br>
                        <h6>
                            <u>Stock Transfer Items</u>
                        </h6>
                        <br>

                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Stock Keeping Unit</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">UOM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="stockTransferItem in stockTransferItems">
                                    <td>{{ stockTransferItem.item.stock_keeping_unit }}</td>
                                    <td>{{ stockTransferItem.item.name }}</td>
                                    <td>{{ stockTransferItem.quantity }}</td>
                                    <td>{{ stockTransferItem.unit_of_measurement.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br><br>
                        <div class="clearfix">
                            <div class="float-left">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewStockTransfers"><i class="fas fa-chevron-left"></i> Back</button>
                            </div>
                            <div class="float-right">
                                <button class="btn btn-success btn-sm" v-if="stockTransfer.status === 0" @click.prevent.default="openApproveStockTransferModal"><i class="fas fa-thumbs-up"></i> Approve</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>

                <!-- Transferred Modal -->
                <div class="modal fade" id="approveStockTransferModal" tabindex="-1" role="dialog" aria-labelledby="approveStockTransferTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">You're about to approve this Stock Transfer?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to approve this Stock Tranfer? <br><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success btn-sm" @click.prevent.default="approveStockTransfer">Confirm Transfer</button>
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                stockTransfer: null,
                stockTransferItems: []
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/stock-transfers/" + this.$route.params.id).then(res => {
                    this.stockTransfer = res.data.stockTransfer;
                    this.stockTransferItems = this.stockTransfer.stock_transfer_items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewStockTransfers() {
                this.$router.push({ name: "stock-transfers.index" }); 
            },
            openApproveStockTransferModal() {
                $('#approveStockTransferModal').modal('show');
            },
            approveStockTransfer() {
                this.ifReady = false;
                $('#approveStockTransferModal').modal('hide');

                axios.post("/api/stock-transfers/" + this.stockTransfer.id + "/transferred").then(res => {
                    // console.log(res.data);
                    this.stockTransfer.status = 1;
                    this.ifReady = true;
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't can't cancel stock request`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
