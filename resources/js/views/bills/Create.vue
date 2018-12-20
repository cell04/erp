<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">PURCHASE INVOICE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewBills">Purchase Invoices</a>
                    <a class="text-secondary"> / Create New Purchase Invoice</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewBill">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Received Order #</label>
                                    <vue-select v-model="receiveOrdersId" @input="selectRO()" label="reference_number" :options="receiveOrders" required></vue-select>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Purchase Invoice #</label>
                                    <input type="text" class="form-control" v-model="reference_number" required>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Supplier</label>
                                    <input type="text" class="form-control" v-model="ro_contact_name" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <div class="dateStyle">
                                        <label>Due Date</label>
                                        <datepicker v-model="due_date" :bootstrap-styling="true" required></datepicker>
                                    </div>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Taxable</label><br />
                                    <label class="switch">
                                        <input type="checkbox" v-model="taxable" @change="onTaxable()">
                                        <span class="slider round">
                                            <span class="on">{{'Yes'}}</span>
                                            <span class="off">{{'No'}}</span>
                                        </span>
                                    </label>
                                </div>

                                <div class="col-md-6 form-group" v-if="this.$data.taxable === true">
                                    <label>Tax %</label>  
                                    <input type="number" class="form-control" v-model="taxable_value">
                                </div>
                            </div>

                            <br>
                            <h6><b><u>Purchase Invoice Items</u></b></h6>
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
                                        <th class="text-right">Amount</th>
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
                                            <b>Subtotal</b>
                                        </td>
                                        <td align="right">{{subtotal | Decimal}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td>
                                            <b>Tax</b>
                                        </td>
                                        <td align="right">{{taxis ? (taxis.toFixed(2)) : 0 }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5"></td>
                                        <td>
                                            <b>Total</b>
                                        </td>
                                        <td align="right">{{total | Decimal}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <br>
                            <div class="pt-3">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBills"><i class="fas fa-chevron-left"></i> Back</button>
                                <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Purchase Invoice</button>
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
                receiveOrders: [],
                receiveOrdersId: null,
                taxable: 0,
                tax: 0,
                taxable_value: 0,
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
            subtotalRow() {
                return this.receive_order_items.map((item) => {
                return Number(item.quantity * item.item_pricelist.price)
                });
            },
            subtotal() {
                return this.receive_order_items.reduce((total, item) => {
                return total + item.quantity * item.item_pricelist.price;
                }, 0);
            },
            taxis() {
                return this.subtotal * (this.$data.taxable_value / 100);
         
            },
            total() {
                return this.receive_order_items.reduce((total, item) => {
                return (total + item.quantity * item.item_pricelist.price) - this.taxis;
                }, 0);
            }
        },

        methods: {
            onTaxable() {
                return this.taxable_value = 0;
            },
            viewBills() {
                this.$router.push({ name: 'bills.index' });
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

            getBillsData(id) {
                axios.get("/api/receive-orders/" + id).then(res => {
                    // console.log('Quote: ' + JSON.stringify(res.data));
                    this.ro_contact_id = res.data.receiveOrder.contact_id;
                    this.ro_contact_name = res.data.receiveOrder.contact.person;
                    this.amount = res.data.receiveOrder.amount;
                    this.receive_order_items = res.data.receiveOrder.receive_order_items;
                    this.getBillAmount();
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });

            },

            selectRO() {
                this.receive_order_id = this.receiveOrdersId.id;
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
                    taxable: this.$data.taxable === true ? 1 : 0,
                    tax: this.taxis,
                    taxable_value: +this.$data.taxable_value,
                    bill_items: this.receive_order_items,
                    receive_order_id: this.$data.receive_order_id,
                    contact_id: this.$data.ro_contact_id,
                    reference_number: this.$data.reference_number,
                    due_date: moment(this.$data.due_date).format('YYYY-MM-DD'),
                    amount: this.amount,
                    amount_paid: '0'
                };

                console.log(formData);
                this.ifReady = true;
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

    .switch {
        position: relative;
        display: inline-block;
        width: 90px;
        height: 34px;
    }
  
    .switch input {display:none;}
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #8E8E8E;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + .slider {
        background-color: #0CC27E;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(55px);
        -ms-transform: translateX(55px);
        transform: translateX(55px);
    }
    
    /*------ ADDED CSS ---------*/
    .on
    {
        display: none;
    }
    
    .on, .off
    {
        color: white;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
    }
    
    .on 
    {
        left: 45%;
    }
    
    .off 
    {
        left: 55%;
    }
    
    input:checked+ .slider .on
    {display: block;}
    
    input:checked + .slider .off
    {display: none;}
    
    /*--------- END --------*/
    
    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
</style>
