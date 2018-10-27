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
                        <input type="text" class="form-control" v-model="stockTransfer">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="name">Transfer From</label>
                            <input type="text" class="form-control" v-model="stockTransfer.stock_transferable_from.name">
                        </div>
                        <div class="col-md-6">
                            <label for="name">Transfer To</label>
                            <input type="text" class="form-control" v-model="stockTransfer.stock_transferable_to.namer">
                        </div>
                    </div>
                </fieldset>
                <br />
                <!-- <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Stock Keeping Unit</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">UOM</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="item.id" v-for="item in purchase_items">
                            <td>{{ item.item.SKU }}</td>
                            <td>{{ item.item.name }}</td>
                            <td>{{ item.item.description }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.unit.name }}</td>
                            <td>{{ item.unit_price }}</td>
                            <td>{{ item.amount }}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <b>Total</b>
                            </td>
                            <td>{{order.amount}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table> -->
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
                stockTransfer: []
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/stock-transfers/" + this.$route.params.id).then(res => {
                    this.stockTransfer = res.data.stockTransfer;
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
