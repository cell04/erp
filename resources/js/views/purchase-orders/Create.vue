<template>
    <div>
        <div class="card">
            <div class="card-header">
                Purchase Orders / Create New Purchase Order
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewPurchaseOrder">

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Date</label>
                                <input type="date" class="form-control" v-model="order_date" required>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Contact</label>
                                <vue-select v-model="contactData" @input="selectContact()" label="person" :options="contacts"></vue-select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Warehouse</label>
                                <vue-select v-model="warehouseData" @input="selectWarehouse()" label="name" :options="warehouses"></vue-select>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Reference #</label>
                                <input type="text" class="form-control" v-model="reference_number" required>
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
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="item.id" v-for="(item, key) in items">
                                    <td>{{ item.sku }}</td>
                                    <td>
                                        <select class="form-control" v-model="item.item_id" required v-on:change="onSelectItem(item.item_id, key)">
                                            <option value="" disabled hidden>Select Item</option>
                                            <option :key="item.id" v-for="item in itemsList" v-bind:value="item.id">{{ item.name }}</option>
                                        </select>
                                    </td>
                                    <td><input class="form-control" v-model.number="item.quantity" required></td>
                                    <td>{{ item.unit_name }}</td>
                                    <td><input class="form-control" v-model.number="item.unit_price"></td>
                                    <td>{{subtotalRow[key]}}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm" @click="deleteRow">Remove</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <b>Total</b>
                                    </td>
                                    <td>{{total}}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <button type="button" class="btn btn-primary btn-sm" @click="addRow">Add Row</button>
                        </table>

                        <button type="submit" class="btn btn-success btn-sm">Create New Purchase Order</button>
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
                ifReady: true,
                contactData: null,
                warehouseData: null,
                contacts: [],
                warehouses: [],
                itemsList: [],
                reference_number: "",
                contact_id: "",
                order_date: "",
                warehouse_id: "",
                items: [],
                amount: ""
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            let promise2 = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses").then(res => {
                    this.warehouses = res.data.warehouses;
                    if (! res.data.response) { return; }
                    resolve();
                });
            });

            let promise3 = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    this.itemsList = res.data.items;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            this.addRow();
        },

        computed: {
            subtotalRow() {
                return this.items.map((item) => {
                    return Number(item.quantity * item.unit_price)
                });
            },
            total() {
                return this.items.reduce((total, item) => {
                    return total + item.quantity * item.unit_price;
                }, 0);
            }
        },

        methods: {
            selectContact(){
                this.contact_id = this.contactData.id;
                console.log('contact_id: ' + this.contact_id);
            },

            selectWarehouse(){
                this.warehouse_id = this.warehouseData.id;
                console.log('warehouse_id: ' + this.warehouse_id);
            },

            onSelectItem(id, index) {
                const Index = index
                const selectedItem = this.itemsList.find(y => y.id === id);
                console.log(selectedItem)
                this.items[Index].sku = selectedItem.SKU,
                this.items[Index].item_id = selectedItem.id,
                this.items[Index].unit_id = selectedItem.purchase_unit_id,
                this.items[Index].unit_name = selectedItem.purchase_uom.name,
                this.items[Index].unit_price = selectedItem.purchase_price
            },
            addRow() {
                this.items.push({
                    sku: '',
                    item_id: '',
                    quantity: '',
                    unit_id: '',
                    unit_name: '',
                    unit_price: ''
                })
            },
            deleteRow(index) {
                this.items.splice(index,1)
            },
            createNewPurchaseOrder() {
                const newItems = [];
                this.$data.items.forEach(element => {
                    newItems.push({
                        item_id: element.item_id,
                        quantity: element.quantity,
                        unit_id: element.unit_id,
                        unit_price: element.unit_price
                    })
                });
                const formData = {
                    reference_number: this.$data.reference_number,
                    contact_id: this.$data.contact_id,
                    order_date: this.$data.order_date,
                    warehouse_id: this.$data.warehouse_id,
                    amount: this.total,
                    items: newItems
                }

                console.log(formData);

                axios.post("/api/purchase-orders", formData).then(res => {
                    console.log(JSON.stringify(res.data));
                    this.$router.push({ name: "purchase-orders.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create purchase order`);
                });
            }
        }
    };
</script>
