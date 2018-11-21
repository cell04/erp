<template>
    <div class="card">
        <div class="card-header">
            <b>Bills / Create New Bill</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewBill">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Receive Order #</label>
                            <input type="text" class="form-control" v-model="receiveOrdersId" readonly>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Bill #</label>
                            <input type="text" class="form-control" v-model="reference_number" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Supplier</label>
                            <input type="text" class="form-control" v-model="ro_contact_name" readonly>
                        </div>

                        <!-- <div class="col-md-6 form-group">
                            <label>Amount</label>
                            <input type="number" class="form-control" v-model="amount" readonly>
                        </div> -->

                        <div class="col-md-6 form-group">
                            <div class="dateStyle">
                                <label>Due Date</label>
                                <datepicker v-model="due_date" :bootstrap-styling="true" required></datepicker>
                            </div>
                        </div>
                    </div>

                    <br>
                    <h6><b><u>Invoice Items</u></b></h6>
                    <br>

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
                                <th class="text-right">Sub Total</th>
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
                    
                    <br>
                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewRo"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Bill</button>
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
                receive_order_items: [],
                receiveOrders: [],
                receiveOrdersId: null,
                bills: [],
                billsContact: [],
                billsId: null,
                contacts: [],
                contact: null,
                contact_id: "",
                ro_contact_id: "",
                ro_contact_name: "",
                due_date: "",
                amount: "",
                amount_paid: 0,
                items: [],
                reference_number: "",
                receive_order_id: "",
                bill_items: [
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

        filters: {
            Decimal: function (value) {
                if (value) {
                    return value.toFixed(2);
                }
            }
        },

        mounted() {
            // this.bill_items.expiration_date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');
            // console.log('EXP Date: ' + this.this.date);
            this.due_date = new Date();

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
                axios.get("/api/receive-orders/" + this.$route.params.id).then(res => {
                    this.receiveOrdersId = res.data.receiveOrder.reference_number;
                    this.receive_order_id = res.data.receiveOrder.id;
                    this.ro_contact_id = res.data.receiveOrder.contact_id;
                    this.ro_contact_name = res.data.receiveOrder.contact.person;
                    this.amount = res.data.receiveOrder.amount;
                    this.receive_order_items = res.data.receiveOrder.receive_order_items;
                    // console.log('RO: ' + JSON.stringify(res.data));
                    this.getBillAmount();
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

        methods: {
            viewRo() {
                this.$router.push({ name: 'receive-orders.index' });
            },

            getBillAmount() {
                // Computation of Total Amount
                let totalAmount = 0;
                this.receive_order_items.forEach(ro_items => {
                    totalAmount += (ro_items.quantity * ro_items.item_pricelist.price);
                });
                this.amount = totalAmount;
                console.log('total: ' + this.amount);
            },

            createNewBill() {
                this.ifReady = false;

                let quotationItems = [];

                this.$data.receive_order_items.forEach(quotation_item => {
                    quotationItems.push({
                        item_id: quotation_item.item_id,
                        quantity: quotation_item.quantity,
                        unit_of_measurement_id: quotation_item.unit_of_measurement_id,
                        price: quotation_item.item_pricelist.price
                    });
                });

                let formData = {
                    bill_items: this.receive_order_items,
                    receive_order_id: this.$data.receive_order_id,
                    contact_id: this.$data.ro_contact_id,
                    reference_number: this.$data.reference_number,
                    due_date: moment(this.$data.due_date).format('YYYY-MM-DD'),
                    amount: this.amount,
                    amount_paid: '0'
                };

                console.log(formData);

                axios.post("/api/bills", formData).then(res => {
                    this.$router.push({ name: "bills.index" });
                }).catch(err => {
                    alert(`Error! Can't create bill`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>

<style>
    .dateStyle input:read-only {
        background-color: #ffffff !important;
    }
</style>
