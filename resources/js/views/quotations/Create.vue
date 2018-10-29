<template>
    <div class="card">
        <div class="card-header">
            Quotations / Create New Quotation
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewQuotation">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Number</label>
                            <input type="text" class="form-control" v-model="number" required>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Contact</label>
                            <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
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
                                <th scope="col">Unit of Measurement</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sub Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(quotation_item, index) in quotation_items" :key="index">
                                <td>{{ quotation_item.item.stock_keeping_unit }}</td>
                                <td>
                                    <vue-select v-model="quotation_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                                </td>
                                <td>
                                    <input class="form-control" v-model.number="quotation_item.quantity" required>
                                </td>
                                <td>
                                    {{ quotation_item.unitOfMeasurement }}
                                </td>
                                <td>
                                    <input class="form-control" @input="calculate(index)" v-model.number="quotation_item.price" required>
                                </td>
                                <td>{{ quotation_item.subTotal }}</td>
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
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled">Create New Quotation</button>
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
                from_selected_radio_button: "",
                fromWarehouse: null,
                fromBranch: null,
                warehouses: [],
                branches: [],
                stock_receivable_from_id : null,
                stock_receivable_from_type: null,
                contacts: [],
                contact: null,
                contact_id: "",
                items: [],
                number: "",
                quotation_items: [
                    {
                        item: '',
                        item_id: '',
                        quantity: '',
                        unitOfMeasurements: [],
                        unitOfMeasurement: '',
                        unit_of_measurement_id: '',
                        price: 0,
                        subTotal: 0
                    }
                ],
                amount: "",
                isDisabled: true
            };
        },

        mounted() {
            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts;
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

            Promise.all([getAllContacts, getAllItems, promiseBranches, promiseWarehouses]).then(() => {
                this.ifReady = true;
            });
        },

        computed: {
            subTotalRow() {
                return this.quotation_items.map((purchase_order_item) => {
                    return (purchase_order_item.quantity * purchase_order_item.unit_price);
                });
            },
            total() {
                return this.quotation_items.reduce((total, purchase_order_item) => {
                    return total + (purchase_order_item.quantity * purchase_order_item.unit_price);
                }, 0);
            }
        },

        methods: {
            selectContact() {
                this.contact_id = this.contact.id;
            },

            selectFromBranch() {
                this.stock_receivable_from_id = this.fromBranch.id;
                this.stock_receivable_from_type = "App\\Branch";
                console.log('Branch - From: ' + this.stock_receivable_from_id + ' type: ' +  this.stock_receivable_from_type);
            },
            selectFromWarehouse() {
                this.stock_receivable_from_id = this.fromWarehouse.id;
                this.stock_receivable_from_type = "App\\Warehouse";
                console.log('Warehouse - From: ' + this.stock_receivable_from_id + ' type: ' +  this.stock_receivable_from_type);
            },

            selectItem(index) {
                this.quotation_items[index].item_id = this.quotation_items[index].item.id;
                this.quotation_items[index].unitOfMeasurement = this.quotation_items[index].item.default_unit_of_measurement.name;
                this.quotation_items[index].unit_of_measurement_id = this.quotation_items[index].item.default_unit_of_measurement.id;

                let promise = new Promise((resolve, reject) => {
                    axios.get("/api/item-pricelists/get-item-pricelists/" + this.quotation_items[index].item_id).then(res => {
                        this.quotation_items[index].itemPricelists = res.data.item_pricelists;
                        resolve();
                    }).catch(err => {
                        console.log(err);
                        reject();
                    });
                });
            },
            calculate(index) {
                this.quotation_items[index].subTotal = (parseFloat(this.quotation_items[index].quantity) * parseFloat(this.quotation_items[index].price));
                this.updateTotalAmount();
            },
            selectItemPricelist(index) {
                this.quotation_items[index].item_pricelist_id = this.quotation_items[index].itemPricelist.id;
                this.quotation_items[index].subTotal = (parseFloat(this.quotation_items[index].quantity) * parseFloat(this.quotation_items[index].itemPricelist.price));
                this.updateTotalAmount();
            },
            updateTotalAmount() {
                let total = 0;

                this.quotation_items.forEach(purchase_order_item => {
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
                this.quotation_items.push({
                    item: '',
                    item_id: '',
                    quantity: '',
                    unitOfMeasurements: [],
                    unitOfMeasurement: '',
                    unit_of_measurement_id: '',
                    price: 0,
                    subTotal: 0
                });

                this.updateTotalAmount();
            },
            deleteRow(index) {
                this.quotation_items.splice(index, 1);
                this.updateTotalAmount();
            },
            createNewQuotation() {
                this.ifReady = false;

                let quotationItems = [];

                this.$data.quotation_items.forEach(purchase_order_item => {
                    quotationItems.push({
                        item_id: purchase_order_item.item_id,
                        quantity: purchase_order_item.quantity,
                        unit_of_measurement_id: purchase_order_item.unit_of_measurement_id,
                        price: purchase_order_item.price
                    });
                });

                let formData = {
                    contact_id: this.$data.contact_id,
                    quotable_id: this.stock_receivable_from_id,
                    quotable_type: this.stock_receivable_from_type,
                    number: this.number,
                    amount: this.amount,
                    quotation_items: quotationItems
                };

                axios.post("/api/quotations", formData).then(res => {
                    console.log(res.data);
                    this.$router.push({ name: "quotations.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create quotation`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
