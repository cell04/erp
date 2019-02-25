<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">PURCHASE INVOICE PAYMENT</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewBillPayment">Purchase Invoice Payment</a>
                    <a class="text-secondary"> / Create New Purchase Invoice Payment</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewInvoicePayment">
                            <div class="row">

                                <div class="col-md-6 form-group">
                                    <label>Purchase Invoice #</label>
                                    <vue-select v-model="billsData" @input="selectBills()" label="reference_number" :options="bills"></vue-select>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Purchase Invoice Payment #</label>
                                    <input type="text" class="form-control" v-model="bills_payment_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="name">Purchase Invoice Payment Date</label>
                                    <input type="date" class="form-control" v-model="bills_payment_date" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="name">Amount</label>
                                    <input type="number" class="form-control" v-model="amount" autocomplete="off" minlength="2" maxlength="255"  required>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="name">Remaining Balance</label>
                                    <input type="number" class="form-control" v-model="remaining_balance" autocomplete="off" minlength="2" maxlength="255" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Mode of Payment</label>
                                    <vue-select v-model="mopData" @input="selectModeOfPayment()" label="name" :options="mop"></vue-select>
                                </div>

                            </div>

                            <div class="row">

                                <div class="form-group col-md-6" v-show="selectedCash">
                                    <label for="name">CR #</label>
                                    <input type="text" class="form-control" v-model="cr_number" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>

                                <div class="form-group col-md-6" v-show="selectedCheck">
                                    <label for="name">Bank</label>
                                    <input type="text" class="form-control" v-model="bank_name" autocomplete="off" minlength="2" maxlength="255">
                                </div>

                                <div class="form-group col-md-6" v-show="selectedCheck">
                                    <label for="name">Check #</label>
                                    <input type="text" class="form-control" v-model="check" autocomplete="off" minlength="2" maxlength="255">
                                </div>

                                <div class="col-md-12 form-group" v-if="billsData !== null">
                                    <div><label for="name"><strong>Supplier</strong></label>: {{contacts.company}}</div>
                                    <div><label for="name"><strong>Address</strong></label>: {{contacts.company_address}}</div>
                                    <div><label for="name"><strong>Email</strong></label>: {{contacts.email}}</div>
                                    <div><label for="name"><strong>Phone</strong></label>: {{contacts.mobile_number}}</div>
                                </div>
                            </div>
                            <br>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBillPayment"><i class="fas fa-chevron-left"></i> Back</button>
                            <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create Purchase Invoice Payment</button>
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
                // bills: [],
                billsData: null,
                bill_id: '',
                amount: '',
                bills_payment_number: '',
                bills_payment_date: '',
                remaining_balance: null,
                mop: [],
                mopData: null,
                mode_of_payment_id: '',
                amount: '',
                cr_number: '',
                bank_name: '',
                check: '',
                name: '',
                selectedCash: false,
                selectedCheck: false,
                contacts: []
            };
        },

        mounted() {
            let promiseBills = new Promise((resolve, reject) => {
                axios.get("/api/bills/get-all-open-bills/").then(res => {
                    this.bills = res.data.bills;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseIvp = new Promise((resolve, reject) => {
                axios.get("/api/mode-of-payments/get-all-mode-of-payments/").then(res => {
                    this.mop = res.data.mode_of_payments;
                    // console.log('MOP: ' + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([promiseBills, promiseIvp]).then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewBillPayment() {
                this.$router.push({ name: 'bill-payments.index' });
            },

            getInvoiceData(id) {
                axios.get("/api/bills/" + id).then(res => {
                    console.log((res.data));
                    this.remaining_balance = res.data.bill.amount - res.data.bill.amount_paid;
                    this.contacts = res.data.bill.contact;
                }).catch(err => {
                    console.log(err);
                    reject();
                });

            },

            selectBills() {
                this.bill_id = this.billsData.id;
                console.log('IV id: ' + this.bill_id);
                this.getInvoiceData(this.billsData.id);
            },

            selectModeOfPayment() {
                this.mode_of_payment_id = this.mopData.id;
                console.log('IVP id: ' + this.mode_of_payment_id);
                if(this.mopData.id == 1){
                    this.selectedCash = true;
                    this.selectedCheck = false;
                } else if (this.mopData.id == 2) {
                    this.selectedCash = true;
                    this.selectedCheck = true;
                } else {
                    this.selectedCash = false;
                    this.selectedCheck = false;
                }
            },

            createNewInvoicePayment() {
                this.ifReady = false;
                console.log(this.$data);
                axios.post("/api/bill-payments", this.$data).then(res => {
                    this.$router.push({ name: 'bill-payments.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
