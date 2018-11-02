<template>
    <div class="card">
        <div class="card-header">
            <b>Stock Transfers / Create New Stock Transfer</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewStockRequest">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Stock Request Number</label>
                            <vue-select v-model="stockRequest" @input="selectStockRequest()" label="number" :options="stockRequests" required></vue-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Stock Transfer #</label>
                            <input type="text" class="form-control" v-model="number" autocomplete="off" maxlength="255" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Transfer From</label>
                            <input type="text" class="form-control" v-model="from" autocomplete="off" maxlength="255" required disabled>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Transfer To</label>
                            <input type="text" class="form-control" v-model="to" autocomplete="off" maxlength="255" required disabled>
                        </div>
                    </div>

                    <br>
                    <h6><u>Stock Transfer Items</u></h6>
                    <br>

                    <!-- <table class="table table-hover table-sm">
                        <caption>
                            <div class="row">
                                <div class="col-md-3">
                                </div>
                            </div>
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Stock Keeping Unit</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit Of Measurement</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(stock_transfer_item, index) in stock_transfer_items">
                                <td>{{ stock_transfer_item.stock_keeping_unit }}</td>
                                <td>
                                    <vue-select v-model="stock_transfer_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                                </td>
                                <td><input class="form-control" v-model.number="stock_transfer_item.quantity"> </td>
                                <td>
                                    {{ stock_transfer_item.unitOfMeasurement }}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" @click="deleteRow">Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col">UOM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item) in stockRequestItems">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br>

                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewSTrans"><i class="fas fa-chevron-left"></i> Back</button>
                        <!-- <button type="button" class="btn btn-outline-success btn-sm" @click="addItem"><i class="fas fa-plus-circle"></i> Add Item</button> -->
                        <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Stock Transfer</button>
                    </div>

                </form>
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
                warehouses: [],
                branches: [],
                from: null,
                to: null,
                items: [],
                stockRequests: [],
                stockRequest: null,
                stock_request_id: null,
                number: null,
                stock_transferable_from_id : null,
                stock_transferable_from_type: null,
                stock_transferable_to_id: null,
                stock_transferable_to_type: null,
                stock_transfer_items: [],
                stockRequestItems: []
            };
        },

        mounted() {
            let promiseStockRequests = new Promise((resolve, reject) => {
                axios.get("/api/stock-requests/get-all-stock-requests").then(res => {
                    // console.log('SR: ' + JSON.stringify(res.data.stock_requests));
                    this.stockRequests = res.data.stock_requests;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseBranches = new Promise((resolve, reject) => {
                axios.get("/api/branches/get-all-branches/").then(res => {
                    this.branches = res.data.branches;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseWarehouses = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses/").then(res => {
                    this.warehouses = res.data.warehouses;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([promiseBranches, promiseWarehouses]).then(() => {
                this.ifReady = true;
                this.addItem();
            });
        },

        methods: {
            viewSTrans() {
                this.$router.push({ name: 'stock-transfer.index' });
            },

            selectStockRequest() {
                this.stock_request_id = this.stockRequest.id;

                this.stock_transferable_from_id = this.stockRequest.stock_requestable_from_id;
                this.stock_transferable_from_type = this.stockRequest.stock_requestable_from_type;

                this.stock_transferable_to_id = this.stockRequest.stock_requestable_to_id;
                this.stock_transferable_to_type = this.stockRequest.stock_requestable_to_type;

                this.from = this.stockRequest.stock_requestable_from.name;
                this.to = this.stockRequest.stock_requestable_to.name;

                let promiseStockRequest = new Promise((resolve, reject) => {
                    axios.get("/api/stock-requests/" + this.stockRequest.id).then(res => {
                        this.items = res.data.stockRequest.stock_request_items;
                        this.stockRequestItems =  res.data.stockRequest.stock_request_items;
                        this.items.map(item => {
                            item.name = item.item.name;
                        });

                        if (this.items.length > 0) {
                            this.isTableReady = true;
                            resolve();
                        }
                    }).catch(err => {
                        console.log(err);
                        reject();
                    });
                });
            },
            selectItem(index) {
                if (this.stock_transfer_items[index].item instanceof Object) {
                    this.stock_transfer_items[index].stock_keeping_unit     = this.stock_transfer_items[index].item.item.stock_keeping_unit;
                    this.stock_transfer_items[index].item_id                = this.stock_transfer_items[index].item.id;
                    this.stock_transfer_items[index].quantity               = this.stock_transfer_items[index].item.quantity;
                    this.stock_transfer_items[index].unitOfMeasurement      = this.stock_transfer_items[index].item.unit_of_measurement.name;
                    this.stock_transfer_items[index].unit_of_measurement_id = this.stock_transfer_items[index].item.unit_of_measurement_id;
                }
            },
            addItem() {
                this.stock_transfer_items.push({
                    stock_keeping_unit: '',
                    item: '',
                    item_id: '',
                    quantity: '',
                    unitOfMeasurements: [],
                    unitOfMeasurement: '',
                    unit_of_measurement_id: ''
                });
            },
            deleteRow(index) {
                this.stock_transfer_items.splice(index,1)
            },
            createNewStockRequest() {
                this.ifReady = false;

                let stockTransferItems = [];

                this.stock_transfer_items.forEach(stock_transfer_item => {
                    stockTransferItems.push({
                        item_id: stock_transfer_item.item_id,
                        quantity: stock_transfer_item.quantity,
                        unit_of_measurement_id: stock_transfer_item.unit_of_measurement_id
                    });
                });

                const formData = {
                    stock_request_id: this.stock_request_id,
                    stock_transferable_from_id: this.stock_transferable_from_id,
                    stock_transferable_from_type: this.stock_transferable_from_type,
                    stock_transferable_to_id: this.stock_transferable_to_id,
                    stock_transferable_to_type: this.stock_transferable_to_type,
                    number: this.number,
                    stock_transfer_items: this.stockRequestItems
                };

                axios.post("/api/stock-transfers", formData).then(res => {
                    this.$router.push({ name: "stock-transfers.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create stock transfer`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
