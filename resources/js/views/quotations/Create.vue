<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">QUOTATION</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewQuotations">Quotations</a>
                    <a class="text-secondary"> / Create New Quotation</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewQuotation">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Quotation Number</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text" id="btnGroupAddon">QN</div>
                                        </div>
                                        <input type="text" class="form-control" v-model="number" required placeholder="Quotation #" aria-label="Input group example" aria-describedby="btnGroupAddon" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Customer</label>
                                    <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
                                </div>

                                <!-- <div class="col-md-6 form-group">
                                    <label>Tax Percentage</label>
                                    <input type="number" class="form-control" v-model="tax" required placeholder="Tax %">
                                </div> -->

                                <div class="col-md-6 form-group">
                                    <label>Do you want to add Tax Percentage?</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" v-model="tax_value" v-on:click="selectTax('yes')" value="Yes">
                                        <label class="form-check-label">&nbsp; Yes</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" v-model="tax_value" v-on:click="selectTax('no')" value="No">
                                        <label class="form-check-label">&nbsp; No</label>
                                    </div>
                                    <input type="number" class="form-control" v-model="tax" placeholder="Tax %" v-show="tax_value === 'Yes'">
                                </div>

                                <!-- <div class="col-md-6 form-group"></div> -->

                                <div class="col-md-6 form-group">
                                    <label>Stock Origin</label>
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
                                    <div class="dateStyle">
                                        <label>Validity Date</label>
                                        <datepicker v-model="validity_date" :bootstrap-styling="true" placeholder="Validity Date" required></datepicker>
                                    </div>
                                </div>

                                <div class="col-md-12 form-group" v-if="contactData !== null">
                                    <hr>
                                    <h5><u>Customer Information:</u></h5>
                                    <div><label for="name"><strong>Customer</strong></label>: {{contactData.person}}</div>
                                    <div><label for="name"><strong>Company</strong></label>: {{contactData.company}}</div>
                                    <div><label for="name"><strong>Address</strong></label>: {{contactData.company_address}}</div>
                                    <div><label for="name"><strong>Email</strong></label>: {{contactData.email}}</div>
                                    <div><label for="name"><strong>Phone</strong></label>: {{contactData.mobile_number}}</div>
                                    <hr>
                                </div>

                            </div>

                            <h6>
                                <b><u>Quotation Items</u></b>
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
                                        <th scope="col">Item</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">UOM</th>
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
                                            <input class="form-control" @input="calculate(index)" v-model.number="quotation_item.quantity" required>
                                        </td>
                                        <td>
                                            <vue-select v-model="quotation_item.unitOfMeasurement" @input="selectUnit(index)" label="name" :options="quotation_item.unitOfMeasurements"></vue-select>
                                        </td>
                                        <td>
                                            <input class="form-control" @input="calculate(index)" v-model.number="quotation_item.price" required>
                                        </td>
                                        <td>{{ quotation_item.subTotal | Decimal }}</td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)"><i class="far fa-times-circle"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4"></td>
                                        <td>
                                            <b>Total</b>
                                        </td>
                                        <td><b>{{ amount | Decimal }}</b></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="pt-3">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewQuotations"><i class="fas fa-chevron-left"></i> Back</button>
                                <button type="button" class="btn btn-outline-success btn-sm" @click="addNewItem"><i class="fas fa-plus-circle"></i> Add New Item</button>
                                <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Quotation</button>
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
                contactData: null,
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
                tax: "",
                validity_date: "",
                quotation_items: [
                    {
                        item: '',
                        item_id: '',
                        quantity: 0,
                        unitOfMeasurements: [],
                        unitOfMeasurement: '',
                        unit_of_measurement_id: '',
                        price: 0,
                        subTotal: 0,
                    }
                ],
                amount: 0,
                isDisabled: true,
                tax_value: ""
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
            // Customer's List
            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts.filter(cust => cust.contact_type_id == 1);
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

            this.autoGenerateQuotationNumber();
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
            viewQuotations() {
                this.$router.push({ name: 'quotations.index' });
            },

            getContactData(id) {
                axios.get("/api/contacts/" + id).then(res => {
                    this.contactData = res.data.contact;
                    // console.log("COntacts" + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            autoGenerateQuotationNumber() {
                let date = new Date();
                var components = [
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                ];
                let id = components.join("");
                this.number = id;
                console.log('Code: ' + id);
            },

            selectTax(value) {
                console.log('Value: ' + value);
                if(value == 'no') {
                    this.tax = 0;
                }
            },

            selectContact() {
                this.contact_id = this.contact.id;
                this.getContactData(this.contact_id);
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

            loadAvailableUnits(index) {
                let form = {
                    unit_of_measurement_id : this.quotation_items[index].item.default_unit_of_measurement_id
                }

                axios.post("/api/unit-of-measurements/get-the-same-base-unit-of-measurements/", form).then(res => {
                    this.quotation_items[index].unitOfMeasurements = res.data.unit_of_measurements;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            selectItem(index) {

                this.quotation_items[index].item_id = this.quotation_items[index].item.id;

                if (this.quotation_items[index].item) {
                    this.loadAvailableUnits(index);
                    this.loadItemPriceList(index);
                }
            },

            selectUnit(index) {
                this.quotation_items[index].unit_of_measurement_id = this.quotation_items[index].unitOfMeasurement.id;
            },  

            loadItemPriceList(index) {

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
                    number: 'QN' + this.number,
                    amount: this.amount,
                    tax: this.tax,
                    validity_date: moment(this.$data.due_date).format('YYYY-MM-DD'),
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

<style>
    td {
        width: 100px !important;
    }
    
    .dateStyle input:read-only {
        background-color: #ffffff !important;
    }
</style>

