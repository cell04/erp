<template>
    <div class="card">
        <div class="card-header">
            <b>Stock Receive / Create New Stock Receive</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewStockRequest">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Stock Transfer</label>
                            <vue-select v-model="stockTransfersData" @input="selectStockTransfers()" label="number" :options="stockTransfers" required></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Stock Receive #</label>
                            <input type="text" class="form-control" v-model="number" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>From</label>
                            <input type="text" class="form-control" v-model="st_stock_transferable_from_name" readonly>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>To</label>
                            <input type="text" class="form-control" v-model="st_stock_transferable_to_name" readonly>
                        </div>
                        

                    </div>

                    <br />
                    <!-- <table class="table table-hover table-sm">
                        <caption>
                            <div class="row">
                                <div class="col-md-3">
                                </div>
                            </div>
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="index" v-for="(stock_receive_item, index) in stock_receive_items">
                                <td>{{ stock_receive_item.item.stock_keeping_unit }}</td>
                                <td>
                                 <vue-select v-model="stock_receive_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                             </td>
                             <td><input class="form-control" v-model.number="stock_receive_item.quantity"> </td>
                             <td>{{ stock_receive_item.unitOfMeasurement }}</td>
                             <td>
                                <button type="button" class="btn btn-danger btn-sm" @click="removeItem">Remove</button>
                            </td>
                        </tr>
                        </tbody>
                        <button type="button" class="btn btn-primary btn-sm" @click="addItem">Add Item</button>
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
                            <tr :key="item.id" v-for="(item) in stockReceiveData">
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
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewSRec"><i class="fas fa-chevron-left"></i> Back</button>
                        <!-- <button type="button" class="btn btn-outline-success btn-sm" @click="addItem"><i class="fas fa-plus-circle"></i> Add Item</button> -->
                        <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Stock Receive</button>
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
                from_selected_radio_button: "",
                to_selected_radio_button: "",
                stockTransfersData: null,
                stockTransfers: [],
                warehouses: [],
                fromWarehouse: null,
                toWarehouse: null,
                branches: [],
                fromBranch: null,
                toBranch: null,
                items: null,
                number: null,
                stock_receivable_from_id : null,
                stock_receivable_from_type: null,
                stock_receivable_to_id: null,
                stock_receivable_to_type: null,
                stock_receive_items: [],
                stock_transfer_id: "",
                stockReceiveData: [],
                st_stock_transferable_from_id: "",
                st_stock_transferable_to_id: "",
                st_stock_transferable_from_name: "",
                st_stock_transferable_to_name: "",
                st_stock_transferable_from_type: "",
                st_stock_transferable_to_type: ""
            };
        },

        mounted() {
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

            let promiseStockTransfer = new Promise((resolve, reject) => {
                axios.get("/api/stock-transfers/get-all-stock-transfers/").then(res => {
                    // console.log('Stock Transfer: ' + JSON.stringify(res.data.stock_transfers));
                    this.stockTransfers = res.data.stock_transfers;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseItems = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    this.items = res.data.items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([promiseBranches, promiseWarehouses, promiseStockTransfer, promiseItems]).then(() => {
                this.ifReady = true;
                this.addItem();
            });
        },
        methods: {
            viewSRec() {
                this.$router.push({ name: 'stock-receives.index' });
            },

            getStockReceiveData(id) {
                axios.get("/api/stock-transfers/" + id).then(res => {
                    // console.log('Stock Transfer Data: ' + JSON.stringify(res.data.stockTransfer));
                    this.stockReceiveData = res.data.stockTransfer.stock_transfer_items;
                    this.st_stock_transferable_from_id = res.data.stockTransfer.stock_transferable_from_id;
                    this.st_stock_transferable_to_id = res.data.stockTransfer.stock_transferable_to_id;
                    this.st_stock_transferable_from_name = res.data.stockTransfer.stock_transferable_from.name;
                    this.st_stock_transferable_to_name = res.data.stockTransfer.stock_transferable_to.name;
                    this.st_stock_transferable_from_type = res.data.stockTransfer.stock_transferable_from_type;
                    this.st_stock_transferable_to_type = res.data.stockTransfer.stock_transferable_to_type;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            selectStockTransfers() {
                this.stock_transfer_id = this.stockTransfersData.id;
                console.log('SR: ' + this.stock_transfer_id);
                this.getStockReceiveData(this.stock_transfer_id);
            },

            selectItem(index) {
                if (this.stock_receive_items[index].item instanceof Object) {
                    this.stock_receive_items[index].item_id = this.stock_receive_items[index].item.id;
                    this.stock_receive_items[index].unitOfMeasurement = this.stock_receive_items[index].item.default_unit_of_measurement.name;
                    this.stock_receive_items[index].unit_of_measurement_id = this.stock_receive_items[index].item.default_unit_of_measurement.id;
                }
            },
            addItem() {
                this.stock_receive_items.push({
                    stock_keeping_unit: '',
                    item: '',
                    item_id: '',
                    quantity: '',
                    unitOfMeasurements: [],
                    unitOfMeasurement: '',
                    unit_of_measurement_id: ''
                });
            },
            removeItem(index) {
                this.stock_receive_items.splice(index,1)
            },
            createNewStockRequest() {
                this.ifReady = false;

                const stockReceiveItem = [];

                this.stock_receive_items.forEach(stock_request_item => {
                    stockReceiveItem.push({
                        item_id: stock_request_item.item_id,
                        quantity: stock_request_item.quantity,
                        unit_of_measurement_id: stock_request_item.unit_of_measurement_id,
                    });
                });
                
                const formData = {
                    number: this.number,
                    stock_receivable_from_id: this.st_stock_transferable_from_id,
                    stock_receivable_from_type: this.st_stock_transferable_from_type,
                    stock_receivable_to_id: this.st_stock_transferable_to_id,
                    stock_receivable_to_type: this.st_stock_transferable_to_type,
                    stock_receive_items: this.stockReceiveData,
                    stock_transfer_id: this.stock_transfer_id
                }

                axios.post("/api/stock-receives", formData).then(res => {
                    this.$router.push({ name: "stock-receives.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create stock receive`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
