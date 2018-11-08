<template>
    <div class="card">
        <div class="card-header">
            <b>Invoices / Create New Invoice</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewInvoice">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Quotation #</label>
                            <vue-select v-model="quotationData" @input="selectQuotation()" label="number" :options="quotation"></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Invoice #</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text" id="btnGroupAddon">I</div>
                                </div>
                                <input type="text" class="form-control" v-model="reference_number" readonly placeholder="Invoice #" aria-label="Input group example" aria-describedby="btnGroupAddon">
                            </div>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" v-model="due_date" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Customer</label>
                            <input type="text" class="form-control" v-model="contact" readonly>
                        </div>

                    </div>

                    <br>
                    <h6>
                        <b><u>Invoice Items</u></b>
                    </h6>
                    <br>

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th class="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item, index) in quotation_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td><input type="text" class="form-control" v-model="item.quantity" required></td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.price }}</td>
                                <td align="right">{{ subtotalRow[index] | Decimal }}</td>
                            </tr>
                            <tr>
                                <td colspan="5"></td>
                                <td>
                                    <b>Total</b>
                                </td>
                                <td align="right">{{total | Decimal}}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewInvoices"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Invoice</button>
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
                quotation_items: [],
                receiveOrder: [],
                receiveOrderData: [],
                quotation: [],
                quotationData: null,
                contacts: [],
                contact: null,
                contact_id: "",
                due_date: "",
                amount: "",
                amount_paid: "",
                items: [],
                reference_number: "",
                quotation_id: "",
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
                        price: '',
                        subTotal: 0
                    }
                ],
                amounts: "",
                isDisabled: false
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
                axios.get("/api/quotations/get-all-quotations/").then(res => {
                    this.quotation = res.data.quotations;
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
            subtotalRow() {
                return this.quotation_items.map((item) => {
                return Number(item.quantity * item.price)
                });
            },
            total() {
                return this.quotation_items.reduce((total, item) => {
                return total + item.quantity * item.price;
                }, 0);
            }
        },

        methods: {  
            viewInvoices() {
                this.$router.push({ name: 'invoices.index' });
            },
            
            getQuotationDetails(id) {
                console.log('Take id: ' + id);

                axios.get("/api/quotations/" + id).then(res => {
                    // console.log('Quote: ' + JSON.stringify(res.data.quotation));
                    this.contact = res.data.quotation.contact.person;
                    this.contact_id = res.data.quotation.contact_id;
                    this.quotation_items = res.data.quotation.quotation_items;
                    this.autoGenerateInvoive();
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            autoGenerateInvoive() {
                let date = new Date();
                var components = [
                    date.getYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                ];
                let id = components.join("");
                this.reference_number = id;
                console.log('Code: ' + id);
            },

            selectQuotation() {
                this.quotation_id = this.quotationData.id;
                console.log('RO: ' + this.quotationData.id);
                this.getQuotationDetails(this.quotationData.id);
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
                    price: '',
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

                this.$data.quotation_items.forEach(quotation_item => {
                    invoiceItems.push({
                        item_id: quotation_item.item_id,
                        quantity: quotation_item.quantity,
                        unit_of_measurement_id: quotation_item.unit_of_measurement_id,
                        price: quotation_item.price
                    });
                });

                let formData = {
                    invoice_items: invoiceItems,
                    quotation_id: this.quotation_id,
                    contact_id: this.$data.contact_id,
                    reference_number: 'I' + this.$data.reference_number,
                    due_date: this.$data.due_date,
                    amount: this.total,
                    amount_paid: 0
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
