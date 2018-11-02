<template>
    <div>
        <div class="card">
            <div class="card-header">
                <b>Bill Payments / Create New Bill Payment</b>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewInvoicePayment">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Bill #</label>
                                <vue-select v-model="billsData" @input="selectBills()" label="reference_number" :options="bills"></vue-select>
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
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBillPayment"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Bill Payment</button>
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
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                bills: [],
                billsData: null,
                bill_id: '',
                amount: '',
                mop: [],
                mopData: null,
                mode_of_payment_id: '',
                amount: '',
                cr_number: '',
                bank_name: '',
                check: '',
                name: '',
                selectedCash: false,
                selectedCheck: false
            };
        },

        mounted() {
            let promiseBills = new Promise((resolve, reject) => {
                axios.get("/api/bills/get-all-bills/").then(res => {
                    this.bills = res.data.bills;
                    // console.log('IP: ' + JSON.stringify(res.data));
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
            
            selectBills() {
                this.bill_id = this.billsData.id;
                console.log('IV id: ' + this.bill_id);
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
