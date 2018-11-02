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
                            <label>Quotation #</label>
                            <vue-select v-model="billsId" @input="selectBill()" label="number" :options="bills" required></vue-select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Bill #</label>
                            <input type="text" class="form-control" v-model="reference_number" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Supplier</label>
                            <input type="text" class="form-control" v-model="q_contact_name" readonly>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Amount</label>
                            <input type="number" class="form-control" v-model="amount" readonly>
                        </div>

                        <div class="col-md-6 form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" v-model="due_date" required>
                        </div>

                        <!-- <div class="col-md-6 form-group">
                            <label>Amount Paid</label>
                            <input type="number" class="form-control" v-model="amount_paid" required>
                        </div>                       -->

                        

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
                            <tr :key="item.id" v-for="(item) in quotation_items">
                                <td>{{ item.item.stock_keeping_unit }}</td>
                                <td>{{ item.item.name }}</td>
                                <td>{{ item.item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit_of_measurement.name }}</td>
                                <td>{{ item.price }}</td>
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
                            <tr v-for="(bill_item, index) in bill_items" :key="index">
                                <td>{{ bill_item.item.stock_keeping_unit }}</td>
                                <td>
                                    <vue-select v-model="bill_item.item" @input="selectItem(index)" label="name" :options="items"></vue-select>
                                </td>
                                <td>
                                    <input class="form-control" v-model.number="bill_item.quantity" required>
                                </td>
                                <td>
                                    {{ bill_item.unitOfMeasurement }}
                                </td>
                                <td>
                                    <input class="form-control" @input="calculate(index)" v-model.number="bill_item.price" required>
                                </td>
                                <td>{{ isNaN(bill_item.subTotal) ? '0.00' : bill_item.subTotal }}</td>
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
                quotation_items: [],
                bills: [],
                billsContact: [],
                billsId: null,
                contacts: [],
                contact: null,
                contact_id: "",
                q_contact_id: "",
                q_contact_name: "",
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
                axios.get("/api/quotations/get-all-quotations/").then(res => {
                    this.bills = res.data.quotations;
                    this.billsContact = res.data.quotations.contact;
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

        // computed: {
        //     subTotalRow() {
        //         return this.bill_items.map((bill_item) => {
        //             return (bill_item.quantity * bill_item.unit_price);
        //         });
        //     },
        //     total() {
        //         return this.bill_items.reduce((total, bill_item) => {
        //             return total + (bill_item.quantity * bill_item.unit_price);
        //         }, 0);
        //     }
        // },

        computed: {
            // subtotalRow() {
            //     return this.quotation_items.map((item) => {
            //     return Number(item.quantity * item.item_pricelist.price)
            //     });
            // },
            // total() {
            //     return this.quotation_items.reduce((total, item) => {
            //     return total + item.quantity * item.item_pricelist.price;
            //     }, 0);
            // }
        },

        methods: {
            viewBills() {
                this.$router.push({ name: 'bills.index' });
            },

            getBillsData(id) {
                axios.get("/api/quotations/" + id).then(res => {
                    // console.log('Quote: ' + JSON.stringify(res.data));
                    this.q_contact_id = res.data.quotation.contact_id;
                    this.q_contact_name = res.data.quotation.contact.person;
                    this.amount = res.data.quotation.amount;
                    this.quotation_items = res.data.quotation.quotation_items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });

            },

            // selectContact() {
            //     this.contact_id = this.contact.id;
            // },

            selectBill() {
                this.receive_order_id = this.billsId.id;
                // this.amount = this.billsId.amount;
                // this.contact = this.billsId.contact;
                // this.reference_number = this.billsId.number;
                console.log('Date: ' + this.due_date);
                this.getBillsData(this.billsId.id);
            },

            // selectItem(index) {
            //     this.bill_items[index].item_id = this.bill_items[index].item.id;
            //     this.bill_items[index].unitOfMeasurement = this.bill_items[index].item.default_unit_of_measurement.name;
            //     this.bill_items[index].unit_of_measurement_id = this.bill_items[index].item.default_unit_of_measurement.id;

            //     let promise = new Promise((resolve, reject) => {
            //         axios.get("/api/item-pricelists/get-item-pricelists/" + this.bill_items[index].item_id).then(res => {
            //             this.bill_items[index].itemPricelists = res.data.item_pricelists;
            //             resolve();
            //         }).catch(err => {
            //             console.log(err);
            //             reject();
            //         });
            //     });
            // },
            // calculate(index) {
            //     this.bill_items[index].subTotal = (parseFloat(this.bill_items[index].quantity) * parseFloat(this.bill_items[index].price));
            //     this.updateTotalAmount();
            // },
            // selectItemPricelist(index) {
            //     this.bill_items[index].item_pricelist_id = this.bill_items[index].itemPricelist.id;
            //     this.bill_items[index].subTotal = (parseFloat(this.bill_items[index].quantity) * parseFloat(this.bill_items[index].itemPricelist.price));
            //     this.updateTotalAmount();
            // },
            // updateTotalAmount() {
            //     let total = 0;

            //     this.bill_items.forEach(bill_item => {
            //         total += bill_item.subTotal;
            //     });

            //     this.amounts = total;

            //     if (this.amounts > 0) {
            //         this.isDisabled = false;
            //     } else {
            //         this.isDisabled = true;
            //     }
            // },
            // addNewItem() {
            //     this.bill_items.push({
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
            //     this.bill_items.splice(index, 1);
            //     this.updateTotalAmount();
            // },
            createNewBill() {
                this.ifReady = false;

                let quotationItems = [];

                this.$data.quotation_items.forEach(quotation_item => {
                    quotationItems.push({
                        item_id: quotation_item.item_id,
                        quantity: quotation_item.quantity,
                        unit_of_measurement_id: quotation_item.unit_of_measurement_id,
                        price: quotation_item.price
                    });
                });

                let formData = {
                    bill_items: this.$data.quotation_items,
                    quotation_id: this.$data.receive_order_id,
                    contact_id: this.$data.q_contact_id,
                    reference_number: this.$data.reference_number,
                    due_date: this.$data.due_date,
                    amount: this.$data.amount,
                    amount_paid: '0'
                };

                // let formData = {
                //     bill_items: [],
                //     quotation_id: 1,
                //     contact_id: 1,
                //     reference_number: 123,
                //     due_date: this.$data.due_date,
                //     amount: 0,
                //     amount_paid: 0
                // };

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
