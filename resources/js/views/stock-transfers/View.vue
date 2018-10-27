<template>
    <div class="card">
        <div class="card-header">
            Stock Transfers / View Stock Transfer
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <fieldset disabled>
                    <div class="form-group">
                        <label for="name">Stock Tranfer Number</label>
                        <input type="text" class="form-control" v-model="stockTransfer.number">
                    </div>
                    <div class="row">
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
                <br />
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Stock Keeping Unit</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Of Measurement</th>
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
                <button type="button" class="btn btn-info btn-sm" @click.prevent="viewStockTransfers">Back</button>
            </div>
            <div v-else>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
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
            }
        }
    };
</script>
