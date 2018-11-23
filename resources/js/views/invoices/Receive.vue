<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">INVOICE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewQuotations">Invoices</a>
                    <a class="text-secondary"> / Receive Invoice</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewInvoice">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Receive Order</label>
                                    <input type="text" class="form-control" v-model="receiveOrderId" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Contact</label>
                                    <input type="text" class="form-control" v-model="contact_person" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Invoice #</label>
                                    <input type="text" class="form-control" v-model="reference_number" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Due Date</label>
                                    <input type="date" class="form-control" v-model="due_date" required>
                                </div>
                            </div>

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
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="item.id" v-for="(item, index) in receive_order_items">
                                        <td>{{ item.item.stock_keeping_unit }}</td>
                                        <td>{{ item.item.name }}</td>
                                        <td>{{ item.item.description }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>{{ item.unit_of_measurement.name }}</td>
                                        <td>{{ item.item_pricelist.price }}</td>
                                        <td>{{ subtotalRow[index] }}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <b>Total</b>
                                        </td>
                                        <td>{{ total }}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="pt-3">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewQuotations"><i class="fas fa-chevron-left"></i> Back</button>
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                receive_order_items: [],
                purchaseOrder: [],
                receiveOrderId: null,
                contacts: [],
                contact: null,
                contact_id: "",
                contact_person: "",
                due_date: "",
                amount: "",
                amount_paid: "",
                warehouses: [],
                warehouse: null,
                warehouse_id: "",
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
                isDisabled: false
            };
        },

        mounted() {
            // this.receive_order_items.expiration_date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');
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

            let getPo = new Promise((resolve, reject) => {
                axios.get("/api/receive-orders/" + this.$route.params.id).then(res => {
                    this.receiveOrderId = res.data.receiveOrder.reference_number;
                    this.contact_id = res.data.receiveOrder.contact.id;
                    this.contact_person = res.data.receiveOrder.contact.person;
                    this.receive_order_id = res.data.receiveOrder.id;
                    this.receive_order_items = res.data.receiveOrder.receive_order_items;

                    let total = 0;

                    this.receive_order_items.forEach(invoice_item => {
                        total += invoice_item.subTotal;
                    });

                    this.amount = total;

                    // console.log('RO: ' + JSON.stringify(res.data.receiveOrder));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, getAllWarehouses, getAllItems, getPo]).then(() => {
                this.ifReady = true;
            });
            console.log('Params: ' + this.$route.params.id);
        },

        computed: {
            subtotalRow() {
                return this.receive_order_items.map((item) => {
                    return Number(item.quantity * item.item_pricelist.price)
                });
            },
            total() {
                return this.receive_order_items.reduce((total, item) => {
                    return total + item.quantity * item.item_pricelist.price;
                }, 0);
            }
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

        methods: {
            viewQuotations() {
                this.$router.push({ name: 'quotations.index' });
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
            // addNewItem() {
            //     this.invoice_items.push({
            //         item: '',
            //         item_id: '',
            //         quantity: '',
            //         unitOfMeasurements: [],
            //         unitOfMeasurement: '',
            //         unit_of_measurement_id: '',
            //         itemPricelists: [],
            //         itemPricelist: '',
            //         item_pricelist_id: '',
            //         subTotal: 0
            //     });

            //     this.updateTotalAmount();
            // },
            // deleteRow(index) {
            //     this.invoice_items.splice(index, 1);
            //     this.updateTotalAmount();
            // },
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
                    invoice_items: this.$data.receive_order_items,
                    receive_order_id: this.receive_order_id,
                    contact_id: this.$data.contact_id,
                    reference_number: this.$data.reference_number,
                    due_date: this.$data.due_date,
                    amount: this.amount,
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
