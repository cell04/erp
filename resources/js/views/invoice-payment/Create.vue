<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">INVOICE PAYMENT</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewInvoicePayment">Invoice Payments</a>
                    <a class="text-secondary"> / Create New Invoice Payment</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewInvoicePayment">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Payment For</label>
                                    <vue-select v-model="invoiceTypeData" @input="selectInvoiceType()" label="name" :options="invoiceType"></vue-select>
                                </div>

                                <div class="col-md-6 form-group">
                                    <div class="col-md-12" v-show="selectedSales">
                                        <label>Sales Invoices #</label>
                                        <vue-select v-model="invoicesData" @input="selectInvoices()" label="reference_number" :options="invoices" required></vue-select>
                                    </div>

                                    <div class="col-md-12" v-show="selectedService">
                                        <label>Service Invoices #</label>
                                        <vue-select v-model="serviceInvoicesData" @input="selectServiceInvoices()" label="reference_number" :options="serviceInvoices" required></vue-select>
                                    </div>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="name">Amount</label>
                                    <input type="number" class="form-control" v-model="amount" autocomplete="off" minlength="2" maxlength="255" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Mode of Payment</label>
                                    <vue-select v-model="mopData" @input="selectModeOfPayment()" label="name" :options="mop"></vue-select>
                                </div>

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
                            </div>
                            <br>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewInvoicePayment"><i class="fas fa-chevron-left"></i> Back</button>
                            <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-chevron-left"></i> Create New Item Class</button>
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
                invoiceType: [],
                invoices: [],
                serviceInvoices: [],
                mop: [],
                mopData: null,
                invoicesData: null,
                serviceInvoicesData: null,
                invoiceTypeData: null,
                invoice_id: '',
                mode_of_payment_id: '',
                amount: '',
                cr_number: '',
                bank_name: '',
                check: '',
                name: '',
                payment_for: '',
                selectedCash: false,
                selectedCheck: false,
                selectedSales: false,
                selectedService: false
            };
        },

        mounted() {
            this.invoiceType = [
                {"id": "1", "name": "Sales Invoice"},
                {"id": "2", "name": "Service Invoice"}
            ]

            let promiseIv = new Promise((resolve, reject) => {
                axios.get("/api/invoices/get-all-invoices/").then(res => {
                    this.invoices = res.data.invoices;
                    // console.log('IP: ' + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseServiceIv = new Promise((resolve, reject) => {
                axios.get("/api/service-invoices/get-all-service-invoices/").then(res => {
                    this.serviceInvoices = res.data.service_invoices;
                    // console.log('SRI: ' + JSON.stringify(res.data));
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

            Promise.all([promiseIv, promiseIvp, promiseServiceIv]).then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewInvoicePayment() {
                this.$router.push({ name: 'invoice-payments.index' });
            },

            selectServiceInvoices() {
                this.invoice_id = this.serviceInvoicesData.id;
                console.log('Service Invoice id: ' + this.invoice_id);
            },

            selectInvoices() {
                this.invoice_id = this.invoicesData.id;
                console.log('Sales Invoice id: ' + this.invoice_id);
            },

            selectInvoiceType() {
                this.payment_for = this.invoiceTypeData.id;
                console.log('Payment For: ' + this.invoiceTypeData.id);
                if(this.invoiceTypeData.id == 1){
                    this.selectedSales = true;
                    this.selectedService = false;
                } else if (this.invoiceTypeData.id == 2) {
                    this.selectedSales = false;
                    this.selectedService = true;
                } else {
                    this.selectedCash = false;
                    this.selectedCheck = false;
                }
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

                let formData = {
                    invoice_id: this.$data.invoice_id,
                    payment_for: this.$data.payment_for,
                    mode_of_payment_id: this.$data.mode_of_payment_id,
                    cr_number: this.$data.cr_number,
                    bank_name: this.$data.bank_name,
                    check: this.$data.check,
                    name: 'Payment',
                    amount: this.$data.amount
                }

                axios.post("/api/invoice-payments", formData).then(res => {
                    this.$router.push({ name: 'invoice-payments.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
