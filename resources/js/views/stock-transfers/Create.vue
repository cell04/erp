<template>
    <div class="card">
        <div class="card-header">
            Stock Transfers / Create New Stock Transfer
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewStockRequest">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Stock Request Number</label>
                            <vue-select v-model="stockRequest" @input="selectStockRequest()" label="number" :options="stockRequests"></vue-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Stock Transfer Number</label>
                            <input type="text" class="form-control" v-model="number" autocomplete="off" maxlength="255" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>From</label>
                            <br>
                            <div class="form-check form-check-inline">
                                <input type="radio" v-model="from_selected_radio_button" value="warehouse">
                                <label class="form-check-label" for="inlineRadio1">&nbsp; Warehouse</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input type="radio" v-model="from_selected_radio_button" value="branch">
                                <label class="form-check-label" for="inlineRadio2">&nbsp; Branch</label>
                            </div>
                            <vue-select v-model="fromWarehouse" @input="selectFromWarehouse()" label="name" :options="warehouses" v-show="from_selected_radio_button === 'warehouse'"></vue-select>
                            <vue-select v-model="fromBranch" @input="selectFromBranch()" label="name" :options="branches" v-show="from_selected_radio_button === 'branch'"></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>To</label>
                            <br>
                            <div class="form-check form-check-inline">
                                <input type="radio" v-model="to_selected_radio_button" value="warehouse">
                                <label class="form-check-label" for="inlineRadio1">&nbsp; Warehouse</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input type="radio" v-model="to_selected_radio_button" value="branch">
                                <label class="form-check-label" for="inlineRadio2">&nbsp; Branch</label>
                            </div>
                            <vue-select v-model="toWarehouse" @input="selectToWarehouse()" label="name" :options="warehouses" v-show="to_selected_radio_button === 'warehouse'"></vue-select>
                            <vue-select v-model="toBranch" @input="selectToBranch()" label="name" :options="branches" v-show="to_selected_radio_button === 'branch'"></vue-select>
                        </div>
                    </div>

                    <br>

                    <table class="table table-hover table-sm">
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
                        <button type="button" class="btn btn-primary btn-sm" @click="addItem">Add Item</button>
                    </table>

                    <button type="submit" class="btn btn-success btn-sm mt-5">Create New Stock Transfer</button>
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
                fromWarehouse: null,
                toWarehouse: null,
                branches: [],
                fromBranch: null,
                toBranch: null,
                items: [],
                from_selected_radio_button: "",
                to_selected_radio_button: "",
                stockRequests: [],
                stockRequest: null,
                stock_request_id: null,
                number: null,
                stock_transferable_from_id : null,
                stock_transferable_from_type: null,
                stock_transferable_to_id: null,
                stock_transferable_to_type: null,
                stock_transfer_items: []
            };
        },

        mounted() {
            let promiseStockRequests = new Promise((resolve, reject) => {
                axios.get("/api/stock-requests/get-all-stock-requests").then(res => {
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
            selectStockRequest() {
                this.stock_request_id = this.stockRequest.id;

                let promiseStockRequest = new Promise((resolve, reject) => {
                    axios.get("/api/stock-requests/" + this.stockRequest.id).then(res => {
                        this.items = res.data.stockRequest.stock_request_items;

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
            selectFromBranch() {
                this.stock_transferable_from_id = this.fromBranch.id;
                this.stock_transferable_from_type = "App\\Branch";
            },
            selectFromWarehouse() {
                this.stock_transferable_from_id = this.fromWarehouse.id;
                this.stock_transferable_from_type = "App\\Warehouse";
            },
            selectToBranch() {
                this.stock_transferable_to_id = this.toBranch.id;
                this.stock_transferable_to_type =" App\\Branch";
            },
            selectToWarehouse() {
                this.stock_transferable_to_id = this.toWarehouse.id;
                this.stock_transferable_to_type = "App\\Warehouse";
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
                    stock_transfer_items: stockTransferItems
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
