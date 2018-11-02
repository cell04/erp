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
                            <label>Receive Order #</label>
                            <vue-select v-model="receiveOrderId" @input="selectRo()" label="reference_number" :options="receiveOrder"></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Customer</label>
                            <!-- <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts"></vue-select> -->
                            <input type="text" class="form-control" v-model="contact" readonly>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" v-model="due_date" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Invoice #</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text" id="btnGroupAddon">I</div>
                                </div>
                                <input type="text" class="form-control" v-model="reference_number" readonly placeholder="Quotation #" aria-label="Input group example" aria-describedby="btnGroupAddon">
                            </div>
                        </div>

                    </div>

                    <br>
                    <h6>
                        <b><u>Invoice Items</u></b>
                    </h6>
                    <br>

                    <!-- <table class="table table-hover table-sm">
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
                    </table> -->

                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col">UOM</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Tracking #</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item, index) in received_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.item_pricelist.price }}</td>
                                <td>{{ item.tracking_number }}</td>
                                <td>{{ subtotalRow[index] }}</td>
                            </tr>
                            <tr>
                                    <td></td>
                                    <td></td>
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
                    </table>

                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewInvoices"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Invoice</button>
                        <!-- <button type="button" class="btn btn-primary btn-sm" @click="addNewItem">Add New Item</button> -->
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
                received_items: [],
                receiveOrder: [],
                receiveOrderData: [],
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
            this.autoGenerateInvoive();
        },

        // computed: {
        //     subTotalRow() {
        //         return this.invoice_items.map((invoice_item) => {
        //             return (invoice_item.quantity * invoice_item.unit_price);
        //         });
        //     },
        //     total() {
        //         return this.invoice_items.reduce((total, invoice_item) => {
        //             return total + (invoice_item.quantity * invoice_item.unit_price);
        //         }, 0);
        //     }
        // },

        computed: {
            subtotalRow() {
                return this.received_items.map((item) => {
                return Number(item.quantity * item.item_pricelist.price)
                });
            },
            total() {
                return this.received_items.reduce((total, item) => {
                return total + item.quantity * item.item_pricelist.price;
                }, 0);
            }
        },

        methods: {  
            viewInvoices() {
                this.$router.push({ name: 'invoices.index' });
            },
            
            getRoDetails(id) {
                console.log('Take id: ' + id);
                if (this.receiveOrderData === ''){
                    this.isDisabled = true;
                } else {
                    this.isDisabled = false;
                }

                axios.get("/api/receive-orders/" + id).then(res => {
                    this.receiveOrderData = res.data;
                    console.log('RO: ' + JSON.stringify(res.data.receiveOrder.contact.person));
                    this.contact = res.data.receiveOrder.contact.person;
                    this.contact_id = res.data.receiveOrder.contact_id;
                    this.received_items = res.data.receiveOrder.receive_order_items;
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
            
            // selectContact() {
            //     this.contact_id = this.contact.id;
            // },

            selectRo() {
                this.receive_order_id = this.receiveOrderId.id;
                console.log('RO: ' + this.receiveOrderId.id);
                this.getRoDetails(this.receiveOrderId.id);
            },

            // selectItem(index) {
            //     this.invoice_items[index].item_id = this.invoice_items[index].item.id;
            //     this.invoice_items[index].unitOfMeasurement = this.invoice_items[index].item.default_unit_of_measurement.name;
            //     this.invoice_items[index].unit_of_measurement_id = this.invoice_items[index].item.default_unit_of_measurement.id;

            //     let promise = new Promise((resolve, reject) => {
            //         axios.get("/api/item-pricelists/get-item-pricelists/" + this.invoice_items[index].item_id).then(res => {
            //             this.invoice_items[index].itemPricelists = res.data.item_pricelists;
            //             resolve();
            //         }).catch(err => {
            //             console.log(err);
            //             reject();
            //         });
            //     });
            // },
            // selectItemPricelist(index) {
            //     this.invoice_items[index].item_pricelist_id = this.invoice_items[index].itemPricelist.id;
            //     this.invoice_items[index].subTotal = (parseFloat(this.invoice_items[index].quantity) * parseFloat(this.invoice_items[index].itemPricelist.price));
            //     this.updateTotalAmount();
            // },
            // updateTotalAmount() {
            //     let total = 0;

            //     this.invoice_items.forEach(invoice_item => {
            //         total += invoice_item.subTotal;
            //     });

            //     this.amounts = total;

            //     if (this.amounts > 0) {
            //         this.isDisabled = false;
            //     } else {
            //         this.isDisabled = true;
            //     }
            // },
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

                let receivedItems = [];

                this.$data.invoice_items.forEach(invoice_item => {
                    receivedItems.push({
                        item_id: invoice_item.item_id,
                        quantity: invoice_item.quantity,
                        unit_of_measurement_id: invoice_item.unit_of_measurement_id,
                        item_pricelist_id: invoice_item.item_pricelist_id
                    });
                });

                let formData = {
                    invoice_items: this.received_items,
                    receive_order_id: this.receive_order_id,
                    contact_id: this.$data.contact_id,
                    reference_number: 'I' + this.$data.reference_number,
                    due_date: this.$data.due_date,
                    amount: 0,
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
