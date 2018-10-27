<template>
    <div class="card">
        <div class="card-header">
            Stock Requests / Create New Stock Request
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewStockRequest">
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label>Stock Request Number</label>
                            <input type="text" class="form-control" v-model="number" required>
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
                    <br />
                    <table class="table table-hover table-sm">
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
                            <tr :key="index" v-for="(stock_request_item, index) in stock_request_items">
                                <td>{{ stock_request_item.item.stock_keeping_unit }}</td>
                                <td>
                                 <vue-select v-model="stock_request_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                             </td>
                             <td><input class="form-control" v-model.number="stock_request_item.quantity"> </td>
                             <td>{{ stock_request_item.unitOfMeasurement }}</td>
                             <td>
                                <button type="button" class="btn btn-danger btn-sm" @click="removeItem">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                    <button type="button" class="btn btn-primary btn-sm" @click="addItem">Add Item</button>
                </table>

                <button type="submit" class="btn btn-success btn-sm mt-5">Create New Stock Request</button>
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
                warehouses: [],
                fromWarehouse: null,
                toWarehouse: null,
                branches: [],
                fromBranch: null,
                toBranch: null,
                items: null,
                number: null,
                stock_requestable_from_id : null,
                stock_requestable_from_type: null,
                stock_requestable_to_id: null,
                stock_requestable_to_type: null,
                stock_request_items: []
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

            let promiseItems = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    this.items = res.data.items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([promiseBranches, promiseWarehouses, promiseItems]).then(() => {
                this.ifReady = true;
                this.addItem();
            });
        },
        methods: {
            selectFromBranch() {
                this.stock_requestable_from_id = this.fromBranch.id;
                this.stock_requestable_from_type = "App\\Branch";
            },
            selectFromWarehouse() {
                this.stock_requestable_from_id = this.fromWarehouse.id;
                this.stock_requestable_from_type = "App\\Warehouse";
            },
            selectToBranch() {
                this.stock_requestable_to_id = this.toBranch.id;
                this.stock_requestable_to_type =" App\\Branch";
            },
            selectToWarehouse() {
                this.stock_requestable_to_id = this.toWarehouse.id;
                this.stock_requestable_to_type = "App\\Warehouse";
            },
            selectItem(index) {
                if (this.stock_request_items[index].item instanceof Object) {
                    this.stock_request_items[index].item_id = this.stock_request_items[index].item.id;
                    this.stock_request_items[index].unitOfMeasurement = this.stock_request_items[index].item.default_unit_of_measurement.name;
                    this.stock_request_items[index].unit_of_measurement_id = this.stock_request_items[index].item.default_unit_of_measurement.id;
                }
            },
            addItem() {
                this.stock_request_items.push({
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
                this.stock_request_items.splice(index,1)
            },
            createNewStockRequest() {
                this.ifReady = false;

                const stockRequestItem = [];

                this.stock_request_items.forEach(stock_request_item => {
                    stockRequestItem.push({
                        item_id: stock_request_item.item_id,
                        quantity: stock_request_item.quantity,
                        unit_of_measurement_id: stock_request_item.unit_of_measurement_id,
                    });
                });
                
                const formData = {
                    number: this.number,
                    stock_requestable_from_id: this.stock_requestable_from_id,
                    stock_requestable_from_type: this.stock_requestable_from_type,
                    stock_requestable_to_id: this.stock_requestable_to_id,
                    stock_requestable_to_type: this.stock_requestable_to_type,
                    stock_request_items: stockRequestItem
                }

                axios.post("/api/stock-requests", formData).then(res => {
                    this.$router.push({ name: "stock-requests.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create stock request`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
