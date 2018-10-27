<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}}s / Create New {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewStockRequest">

                        <div class="row">

                            <div class="col-md-6 form-group">
                                <label>Number</label>
                                <input type="text" class="form-control" v-model="number" required>
                            </div>
                            <div class="col-md-6 form-group"></div>

                            <div class="col-md-6 form-group">
                                <label>From</label>
                                <br>
                                <div class="form-check form-check-inline">
                                    <input type="radio" v-model="from_selected_radio_button" value="warehouse" v-on:click="clearFrom">
                                    <label class="form-check-label" for="inlineRadio1">&nbsp; Warehouse</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input type="radio" v-model="from_selected_radio_button" value="branch" v-on:click="clearFrom">
                                    <label class="form-check-label" for="inlineRadio2">&nbsp; Branch</label>
                                </div>
                                <vue-select class="mb-2" v-model="warehouseDataFrom" @input="selectWarehouseFrom(warehouseDataFrom.id)" label="name" :options="warehousesFrom" v-show="from_selected_radio_button === 'warehouse'"></vue-select>
                                <vue-select class="mb-2" v-model="branchDataFrom" @input="selectBranchFrom(branchDataFrom.id)" label="name" :options="branchesFrom" v-show="from_selected_radio_button === 'branch'"></vue-select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>To</label>
                                <br>
                                <div class="form-check form-check-inline">
                                    <input type="radio" v-model="to_selected_radio_button" value="warehouse" v-on:click="clearTo">
                                    <label class="form-check-label" for="inlineRadio1">&nbsp; Warehouse</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input type="radio" v-model="to_selected_radio_button" value="branch" v-on:click="clearTo">
                                    <label class="form-check-label" for="inlineRadio2">&nbsp; Branch</label>
                                </div>
                                <vue-select class="mb-2" v-model="warehouseDataTo" @input="selectWarehouseTo(warehouseDataTo.id)" label="name" :options="warehousesTo" v-show="to_selected_radio_button === 'warehouse'"></vue-select>
                                <vue-select class="mb-2" v-model="branchDataTo" @input="selectBranchTo(branchDataTo.id)" label="name" :options="branchesTo" v-show="to_selected_radio_button === 'branch'"></vue-select>
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
                                <tr :key="item.id" v-for="(item, key) in stock_request_items">
                                    <td>{{ item.sku }}</td>
                                    <td>
                                        <!-- <vue-select v-model="itemData" @input="selectItem()" label="name" :options="stock_request_items"></vue-select> -->
                                        <select class="form-control" v-model="item.item_id" v-on:change="onSelectItem(item.item_id, key)">
                                            <option value="" disabled hidden>Select Item</option>
                                            <option :key="item.id" v-for="item in itemsList" v-bind:value="item.id">{{ item.name }}</option>
                                        </select>
                                    </td>
                                    <td><input class="form-control" v-model.number="item.quantity"> </td>
                                    <td>{{ item.unit_of_measurement_name }}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm" @click="deleteRow">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                            <button type="button" class="btn btn-primary btn-sm" @click="addRow">Add Row</button>
                        </table>

                        <button type="submit" class="btn btn-success btn-sm mt-5">Create New {{componentVal}}</button>
                    </form>
                </div>

                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
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
                componentVal: "Stock Request",
                ifReady: true,
                from_selected_radio_button: "",
                to_selected_radio_button: "",
                warehouseDataTo: null,
                branchDataTo: null,
                warehouseDataFrom: null,
                branchDataFrom: null,
                itemData: null,
                selected_radio_button: "",
                stock_requestable_from_id : null,
                stock_requestable_from_type: null,
                stock_requestable_to_id: null,
                stock_requestable_to_type: null,
                selectedWarehouse: "",
                selectedBranch: "",
                itemsList: [],
                stock_request_items: [],
                sub_department_id: "",
                item_id: '',
                warehousesTo: [],
                branchesTo: [],
                warehousesFrom: [],
                branchesFrom: [],
                warehouse_idTo: '',
                branch_idTo: '',
                warehouse_idFrom: '',
                branch_idFrom: '',
                number: '',
            };
        },

        mounted() {
            let promiseWarehouseFrom = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses/").then(res => {
                    // console.log('Warehouses: ' + JSON.stringify(res.data));
                    this.warehousesFrom = res.data.warehouses;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseBranchFrom = new Promise((resolve, reject) => {
                axios.get("/api/branches/get-all-branches/").then(res => {
                    // console.log('Branches: ' + JSON.stringify(res.data));
                    this.branchesFrom = res.data.branches;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseWarehouseTo = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses/").then(res => {
                    // console.log('Warehouses: ' + JSON.stringify(res.data));
                    this.warehousesTo = res.data.warehouses;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseBranchTo = new Promise((resolve, reject) => {
                axios.get("/api/branches/get-all-branches/").then(res => {
                    // console.log('Branches: ' + JSON.stringify(res.data));
                    this.branchesTo = res.data.branches;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseItem = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    // console.log('Items: ' + JSON.stringify(res.data));
                    this.itemsList = res.data.items;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            this.addRow();
        },
        methods: {
            clearFrom() {
                this.warehouseDataFrom = [];
                this.branchDataFrom = [];
                console.log('ClearFrom');
            },

            clearTo() {
                this.warehouseDataTo = [];
                this.branchDataTo = [];
                console.log('ClearTo');
            },
            
            // TO
            selectWarehouseTo(id){
                this.warehouse_idTo = id;
                this.stock_requestable_to_id = id,
                this.stock_requestable_to_type = 'warehouse',
                this.branch_idTo = '';
                console.log('Towarehouse_idTo: ' + this.warehouse_idTo + '|' + 'Tobranch_idTo: ' + this.branch_idTo);
            },
            selectBranchTo(id){
                this.branch_idTo = id;
                this.stock_requestable_to_id = id,
                this.stock_requestable_to_type = 'branch',
                this.warehouse_idTo = '';
                console.log('Tobranch_idTo: ' + this.branch_idTo + '|' + 'Towarehouse_idTo: ' + this.warehouse_idTo);
            },

            // FROM
            selectWarehouseFrom(id){
                this.warehouse_idFrom = id;
                this.stock_requestable_from_id = id,
                this.stock_requestable_from_type = 'warehouse',
                this.branch_idFrom = '';
                console.log('Fromwarehouse_idFrom: ' + this.warehouse_idFrom + '|' + 'Frombranch_idFrom: ' + this.branch_idFrom);
            },
            selectBranchFrom(id){
                this.branch_idFrom = id;
                this.stock_requestable_from_id = id,
                this.stock_requestable_from_type = 'branch',
                this.warehouse_idFrom = '';
                console.log('Frombranch_idFrom: ' + this.branch_idFrom + '|' + 'Fromwarehouse_idFrom: ' + this.warehouse_idFrom);
            },

            selectItem(){
                this.item_id = this.itemData.id;
                console.log('item_id: ' + this.item_id);
            },

            onSelectItem(id, index) {
                console.log(id, index);
                const Index = index
                const selectedItem = this.itemsList.find(y => y.id === id);
                console.log(selectedItem)
                this.stock_request_items[Index].sku = selectedItem.stock_keeping_unit,
                this.stock_request_items[Index].item_id = selectedItem.id,
                this.stock_request_items[Index].unit_of_measurement_id = selectedItem.default_unit_of_measurement_id,
                this.stock_request_items[Index].unit_of_measurement_name = selectedItem.default_unit_of_measurement.name
            },
            addRow() {
                this.stock_request_items.push({
                    sku: '',
                    item_id: '',
                    quantity: '',
                    unit_of_measurement_id: '',
                    unit_of_measurement_name: ''
                })
            },
            deleteRow(index) {
                this.stock_request_items.splice(index,1)
            },
            createNewStockRequest() {
                this.ifReady = false;
                const newItems = [];
                this.$data.stock_request_items.forEach(element => {
                    newItems.push({
                        item_id: element.item_id,
                        quantity: element.quantity,
                        unit_of_measurement_id: element.unit_of_measurement_id,
                    })
                });
                const formData = {
                    number: this.number,
                    stock_requestable_from_id: this.stock_requestable_from_id,
                    stock_requestable_from_type: this.stock_requestable_from_type,
                    stock_requestable_to_id: this.stock_requestable_to_id,
                    stock_requestable_to_type: this.stock_requestable_to_type,
                    stock_request_items: newItems
                }

                console.log(formData);

                axios.post("/api/stock-requests", formData).then(res => {
                    console.log(JSON.stringify(res.data));
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
