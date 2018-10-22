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

                            <div class="col-md-6 form-group" v-if="stock_requestable_from_type === 'warehouse'">
                                <label>Warehouse </label>
                                <input type="text" class="form-control" v-model="selectedWarehouse.name" readonly>
                            </div>

                            <div class="col-md-6 form-group" v-if="stock_requestable_from_type === 'branch'">
                                <label>Branch </label>
                                <input type="text" class="form-control" v-model="selectedBranch.name" readonly>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Select where to get stocks: </label>
                                <div>
                                    <input type="radio" v-model="selected_radio_button" value="warehouse"> Warehouse
                                    <vue-select class="mb-2" v-model="warehouseData" @input="selectWarehouse(warehouseData.id)" 
                                    label="name" :options="warehouses" v-show="selected_radio_button === 'warehouse'">
                                    </vue-select>
                                </div>
                                <div>
                                    <input type="radio" v-model="selected_radio_button" value="branch"> Branch
                                    <vue-select class="mb-2" v-model="branchData" @input="selectBranch(branchData.id)" 
                                    label="name" :options="branches" v-show="selected_radio_button === 'branch'">
                                    </vue-select>
                                </div>
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
                warehouseData: null,
                branchData: null,
                itemData: null,
                selected_radio_button: "",
                stock_requestable_from_id : null,
                stock_requestable_from_type: null,
                stock_requestable_to_id: null,
                stock_requestable_to_type: null,
                selectedWarehouse: "",
                selectedBranch: "",
                warehouses: [],
                branches: [],
                itemsList: [],
                stock_request_items: [],
                sub_department_id: "",
                warehouse_id: '',
                branch_id: '',
                item_id: ''
            };
        },

        mounted() {
            this.stock_requestable_from_id = this.$route.params.id;
            this.stock_requestable_from_id = this.$route.params.id;
            this.stock_requestable_from_type = this.$route.query.type;

            let promiseSelectedWarehouse= new Promise((resolve, reject) => {
                axios.get('/api/warehouses/' + this.$route.params.id).then(res => {
                    this.selectedWarehouse = res.data.warehouse;
                    resolve();
                });
            });

            let promiseSelectedBranch = new Promise((resolve, reject) => {
                axios.get('/api/branches/' + this.$route.params.id).then(res => {
                    this.selectedBranch = res.data.branch;
                    resolve();
                });
            });

            let promiseWarehouse = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses/").then(res => {
                    // console.log('Warehouses: ' + JSON.stringify(res.data));
                    this.warehouses = res.data.warehouses;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseBranch = new Promise((resolve, reject) => {
                axios.get("/api/branches/get-all-branches/").then(res => {
                    // console.log('Branches: ' + JSON.stringify(res.data));
                    this.branches = res.data.branches;
                    if (!res.data) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseItem = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    console.log('Items: ' + JSON.stringify(res.data));
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
            selectWarehouse(id){
                this.warehouse_id = id;
                this.stock_requestable_to_id = id,
                this.stock_requestable_to_type = 'warehouse',
                this.branch_id = null;
                this.branchData = undefined;
                console.log('warehouse_id: ' + this.warehouse_id);
            },

            selectBranch(id){
                this.branch_id = id;
                this.stock_requestable_to_id = id,
                this.stock_requestable_to_type = 'branch',
                this.warehouse_id = null;
                this.warehouseData = undefined;
                console.log('branch_id: ' + this.branch_id);
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
                const newItems = [];
                this.$data.stock_request_items.forEach(element => {
                    newItems.push({
                        item_id: element.item_id,
                        quantity: element.quantity,
                        unit_of_measurement_id: element.unit_of_measurement_id,
                    })
                });
                const formData = {
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
                });
            }
        }
    };
</script>
