<template>
    <div class="card">
        <div class="card-header">
            Purchase Orders / Create New Purchase Order
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <h5>
                    Purchase Order
                </h5>
                <form v-on:submit.prevent="createNewPurchaseOrder">
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label>Reference #</label>
                            <input type="text" class="form-control" v-model="reference_number" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Warehouse</label>
                            <vue-select v-model="warehouse" @input="selectWarehouse()" label="name" :options="warehouses"></vue-select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Contact</label>
                            <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
                        </div>
                    </div>

                    <br>
                    <h5>
                        Purchase Order Items
                    </h5>
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
                                <th scope="col">Unit of Measurement</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sub Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(purchase_order_item, index) in purchase_order_items" :key="index">
                                <td>{{ purchase_order_item.item.stock_keeping_unit }}</td>
                                <td>
                                    <vue-select v-model="purchase_order_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                                </td>
                                <td>
                                    <input class="form-control" v-model.number="purchase_order_item.quantity" required>
                                </td>
                                <td>
                                    {{ purchase_order_item.unitOfMeasurement }}
                                </td>
                                <td>
                                    <vue-select v-model="purchase_order_item.itemPricelist" @input="selectItemPricelist(index)" label="price" :options="purchase_order_item.itemPricelists"></vue-select>
                                </td>
                                <td>{{ purchase_order_item.subTotal }}</td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)">Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>{{ amount }}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pt-3">
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled">Create New Purchase Order</button>
                        <button type="button" class="btn btn-primary btn-sm" @click="addNewItem">Add New Item</button>
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
                contacts: [],
                contact: null,
                contact_id: "",
                warehouses: [],
                warehouse: null,
                warehouse_id: "",
                items: [],
                reference_number: "",
                purchase_order_items: [
                {
                    item: '',
                    item_id: '',
                    quantity: 0,
                    unitOfMeasurements: [],
                    unitOfMeasurement: '',
                    unit_of_measurement_id: '',
                    itemPricelists: [],
                    itemPricelist: 0,
                    item_pricelist_id: '',
                    subTotal: 0
                }
                ],
                amount: "",
                isDisabled: true
            };
        },

        mounted() {
            this.date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');

            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getAllWarehouses = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses").then(res => {
                    this.warehouses = res.data.warehouses;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getAllItems = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    this.items = res.data.items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, getAllWarehouses, getAllItems]).then(() => {
                this.ifReady = true;
            });
        },

        computed: {
            subTotalRow() {
                return this.purchase_order_items.map((purchase_order_item) => {
                    return (purchase_order_item.quantity * purchase_order_item.unit_price);
                });
            },
            total() {
                return this.purchase_order_items.reduce((total, purchase_order_item) => {
                    return total + (purchase_order_item.quantity * purchase_order_item.unit_price);
                }, 0);
            }
        },

        methods: {
            selectContact() {
                this.contact_id = this.contact.id;
            },
            selectWarehouse() {
                this.warehouse_id = this.warehouse.id;
            },
            selectItem(index) {
                if (this.purchase_order_items[index].item instanceof Object) {
                    this.purchase_order_items[index].item_id = this.purchase_order_items[index].item.id;
                    this.purchase_order_items[index].unitOfMeasurement = this.purchase_order_items[index].item.default_unit_of_measurement.name;
                    this.purchase_order_items[index].unit_of_measurement_id = this.purchase_order_items[index].item.default_unit_of_measurement.id;

                    let promise = new Promise((resolve, reject) => {
                        axios.get("/api/item-pricelists/get-item-pricelists/" + this.purchase_order_items[index].item_id).then(res => {
                            this.purchase_order_items[index].itemPricelists = res.data.item_pricelists;
                            resolve();
                        }).catch(err => {
                            console.log(err);
                            reject();
                        });
                    });
                }
            },
            selectItemPricelist(index) {
                if (this.purchase_order_items[index].item instanceof Object) {
                    this.purchase_order_items[index].item_pricelist_id = this.purchase_order_items[index].itemPricelist.id;
                    this.purchase_order_items[index].subTotal = (parseFloat(this.purchase_order_items[index].quantity) * parseFloat(this.purchase_order_items[index].itemPricelist.price));
                    this.updateTotalAmount();
                }
            },
            updateTotalAmount() {
                let total = 0;

                this.purchase_order_items.forEach(purchase_order_item => {
                    total += purchase_order_item.subTotal;
                });

                this.amount = total;

                if (this.amount > 0) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            },
            addNewItem() {
                this.purchase_order_items.push({
                    item: '',
                    item_id: '',
                    quantity: '',
                    unitOfMeasurements: [],
                    unitOfMeasurement: '',
                    unit_of_measurement_id: '',
                    itemPricelists: [],
                    itemPricelist: '',
                    item_pricelist_id: '',
                    subTotal: 0
                });

                this.updateTotalAmount();
            },
            deleteRow(index) {
                this.purchase_order_items.splice(index, 1);
                this.updateTotalAmount();
            },
            createNewPurchaseOrder() {
                this.ifReady = false;

                let purchaseOrderItems = [];

                this.purchase_order_items.forEach(purchase_order_item => {
                    purchaseOrderItems.push({
                        item_id: purchase_order_item.item_id,
                        quantity: purchase_order_item.quantity,
                        unit_of_measurement_id: purchase_order_item.unit_of_measurement_id,
                        item_pricelist_id: purchase_order_item.item_pricelist_id
                    });
                });

                let formData = {
                    reference_number: this.reference_number,
                    warehouse_id: this.warehouse_id,
                    contact_id: this.contact_id,
                    amount: this.amount,
                    purchase_order_items: purchaseOrderItems
                };

                axios.post("/api/purchase-orders", formData).then(res => {
                    console.log(res.data);
                    this.$router.push({ name: "purchase-orders.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create purchase order`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
