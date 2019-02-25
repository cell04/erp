<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">PURCHASE ORDER</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewPOs">Purchase Orders</a>
                    <a class="text-secondary"> / Create New Purchase Order</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewPurchaseOrder">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Purchase Order #</label>
                                    <input type="text" class="form-control" v-model="reference_number" required>
                                </div>
                                <div class="col-md-6 form-group"></div>
                                <div class="col-md-6 form-group">
                                    <label>Warehouse</label>
                                    <vue-select v-model="warehouse" @input="selectWarehouse()" label="name" :options="warehouses"></vue-select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Supplier</label>
                                    <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
                                </div>
                            </div>

                            <br>
                            <h6>
                                <b><u>Purchase Order Items</u></b>
                            </h6>
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
                                        <th scope="col">SKU</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">UOM</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Amount</th>
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
                                        <td>{{ purchase_order_item.subTotal | Decimal }}</td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)"><i class="far fa-times-circle"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4"></td>
                                        <td>
                                            <b>Total</b>
                                        </td>
                                        <td>{{ amount | Decimal }}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="pt-3">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewPOs"><i class="fas fa-chevron-left"></i> Back</button>
                                <button type="button" class="btn btn-outline-success btn-sm" @click="addNewItem"><i class="fas fa-plus-circle"></i> Add New Item</button>
                                <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Purchase Order</button>
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

        filters: {
            Decimal: function (value) {
                if (value) {
                    return value.toFixed(2);
                }
            }
        },

        mounted() {
            this.date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');

            // Supplier's List
            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts.filter(cust => cust.contact_type_id == 2);
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
                axios.get("/api/items/get-all-items-without-components/").then(res => {
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
            viewPOs() {
                this.$router.push({ name: 'purchase-orders.index' });
            },

            selectContact() {
                this.contact_id = this.contact.id;
            },
            selectWarehouse() {
                this.warehouse_id = this.warehouse.id;
            },
            selectItem(index) {
                if (this.purchase_order_items[index].item instanceof Object) {
                    this.purchase_order_items[index].item_id = this.purchase_order_items[index].item.id;
                    this.purchase_order_items[index].unitOfMeasurement = this.purchase_order_items[index].item.purchase_unit_of_measurement.name;
                    this.purchase_order_items[index].unit_of_measurement_id = this.purchase_order_items[index].item.purchase_unit_of_measurement.id;

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

<style>
    td {
        width: 100px !important;
    }
</style>