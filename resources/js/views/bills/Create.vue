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
                            <vue-select v-model="receiveOrdersId" @input="selectRO()" label="reference_number" :options="receiveOrders" required></vue-select>
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
                            <label>Due Date</label>
                            <input type="date" class="form-control" v-model="due_date" required>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="item.id" v-for="(item) in receive_order_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.item_pricelist.price }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <br>
                    <div class="pt-3">
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBills"><i class="fas fa-chevron-left"></i> Back</button>
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
                billable_id: '',
                billable_type: '',
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

        mounted() {
            // this.bill_items.expiration_date = moment(new Date(), 'DDMMMYYYY').endOf('month').format('YYYY-MM-DD');
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
                    this.receiveOrders = res.data.receive_orders;
                    this.billsContact = res.data.receive_orders.contact;
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
            // subtotalRow() {
            //     return this.receive_order_items.map((item) => {
            //     return Number(item.quantity * item.item_pricelist.price)
            //     });
            // },
            // total() {
            //     return this.receive_order_items.reduce((total, item) => {
            //     return total + item.quantity * item.item_pricelist.price;
            //     }, 0);
            // }
        },

        methods: {
            viewBills() {
                this.$router.push({ name: 'bills.index' });
            },

            getBillsData(id) {
                axios.get("/api/receive-orders/" + id).then(res => {
                    console.log('Quote: ' + JSON.stringify(res.data));
                    this.ro_contact_id = res.data.receiveOrder.contact_id;
                    this.ro_contact_name = res.data.receiveOrder.contact.person;
                    this.amount = res.data.receiveOrder.amount;
                    this.receive_order_items = res.data.receiveOrder.receive_order_items;
                    this.billable_id = res.data.receiveOrder.quotable_id;
                    this.billable_type = res.data.receiveOrder.quotable_type;

                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });

            },

            // selectContact() {
            //     this.contact_id = this.contact.id;
            // },

            selectRO() {
                this.receive_order_id = this.receiveOrdersId.id;
                // this.amount = this.billsId.amount;
                // this.contact = this.billsId.contact;
                // this.reference_number = this.billsId.number;
                console.log('Date: ' + this.due_date);
                this.getBillsData(this.receiveOrdersId.id);
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
                    billable_id: this.billable_id,
                    billable_type: this.billable_type,
                    reference_number: this.$data.reference_number,
                    due_date: this.$data.due_date,
                    amount: '0',
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
