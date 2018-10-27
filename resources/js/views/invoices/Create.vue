<template>
    <div class="card">
        <div class="card-header">
            Invoices / Create New Invoice
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewInvoice">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Receive Order</label>
                            <vue-select v-model="receiveOrderId" @input="selectRo()" label="reference_number" :options="receiveOrder"></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" v-model="due_date">
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Contact</label>
                            <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Reference #</label>
                            <input type="text" class="form-control" v-model="reference_number" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Amount</label>
                            <input type="number" class="form-control" v-model="amount">
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Amount Paid</label>
                            <input type="number" class="form-control" v-model="amount_paid">
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
                                <th scope="col">SKU</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit of Measurement</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sub Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(invoice_item, index) in invoice_items" :key="index">
                                <td>{{ invoice_item.item.stock_keeping_unit }}</td>
                                <td>
                                    <vue-select v-model="invoice_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                                </td>
                                <td>
                                    <input class="form-control" v-model.number="invoice_item.quantity" required>
                                </td>
                                <td>
                                    {{ invoice_item.unitOfMeasurement }}
                                </td>
                                <td>
                                    <vue-select v-model="invoice_item.itemPricelist" @input="selectItemPricelist(index)" label="price" :options="invoice_item.itemPricelists"></vue-select>
                                </td>
                                <td>{{ isNaN(invoice_item.subTotal) ? '0.00' : invoice_item.subTotal }}</td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)">Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td>{{ isNaN(amounts)  ? '0.00': amounts }}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pt-3">
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled">Create New Invoice</button>
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
                receiveOrder: [],
                receiveOrderId: null,
                contacts: [],
                contact: null,
                contact_id: "",
                due_date: "",
                amount: "",
                amount_paid: "",
                items: [],
                reference_number: "",
                receive_order_id: "",
                invoice_items: [
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
                amounts: "",
                isDisabled: true
            };
        },

        mounted() {
            // this.invoice_items.expiration_date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');
            // console.log('EXP Date: ' + this.this.date);

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

            let getAllRo = new Promise((resolve, reject) => {
                axios.get("/api/receive-orders/get-all-receive-orders/").then(res => {
                    this.receiveOrder = res.data.receive_orders;
                    // console.log('RO: ' + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, getAllItems, getAllRo]).then(() => {
                this.ifReady = true;
            });
        },

        computed: {
            subTotalRow() {
                return this.invoice_items.map((invoice_item) => {
                    return (invoice_item.quantity * invoice_item.unit_price);
                });
            },
            total() {
                return this.invoice_items.reduce((total, invoice_item) => {
                    return total + (invoice_item.quantity * invoice_item.unit_price);
                }, 0);
            }
        },

        methods: {
            selectContact() {
                this.contact_id = this.contact.id;
            },

            selectRo() {
                this.receive_order_id = this.receiveOrderId.id;
                console.log('RO: ' + this.receiveOrderId.id);
            },

            selectItem(index) {
                this.invoice_items[index].item_id = this.invoice_items[index].item.id;
                this.invoice_items[index].unitOfMeasurement = this.invoice_items[index].item.default_unit_of_measurement.name;
                this.invoice_items[index].unit_of_measurement_id = this.invoice_items[index].item.default_unit_of_measurement.id;

                let promise = new Promise((resolve, reject) => {
                    axios.get("/api/item-pricelists/get-item-pricelists/" + this.invoice_items[index].item_id).then(res => {
                        this.invoice_items[index].itemPricelists = res.data.item_pricelists;
                        resolve();
                    }).catch(err => {
                        console.log(err);
                        reject();
                    });
                });
            },
            selectItemPricelist(index) {
                this.invoice_items[index].item_pricelist_id = this.invoice_items[index].itemPricelist.id;
                this.invoice_items[index].subTotal = (parseFloat(this.invoice_items[index].quantity) * parseFloat(this.invoice_items[index].itemPricelist.price));
                this.updateTotalAmount();
            },
            updateTotalAmount() {
                let total = 0;

                this.invoice_items.forEach(invoice_item => {
                    total += invoice_item.subTotal;
                });

                this.amounts = total;

                if (this.amounts > 0) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            },
            addNewItem() {
                this.invoice_items.push({
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
                this.invoice_items.splice(index, 1);
                this.updateTotalAmount();
            },
            createNewInvoice() {
                this.ifReady = false;

                let invoiceItems = [];

                this.$data.invoice_items.forEach(invoice_item => {
                    invoiceItems.push({
                        item_id: invoice_item.item_id,
                        quantity: invoice_item.quantity,
                        unit_of_measurement_id: invoice_item.unit_of_measurement_id,
                        item_pricelist_id: invoice_item.item_pricelist_id
                    });
                });

                let formData = {
                    invoice_items: invoiceItems,
                    receive_order_id: this.receive_order_id,
                    contact_id: this.$data.contact_id,
                    reference_number: this.$data.reference_number,
                    due_date: this.$data.due_date,
                    amount: this.$data.amount,
                    amount_paid: this.$data.amount_paid
                };

                console.log(formData);

                axios.post("/api/invoices", formData).then(res => {
                    this.$router.push({ name: "invoices.index" });
                }).catch(err => {
                    alert(`Error! Can't create invoice`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>
