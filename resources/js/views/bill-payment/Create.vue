<template>
    <div>
        <div class="card">
            <div class="card-header">
                Bill Payments / Create New Bill Payment
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewInvoicePayment">
                        <div class="form-group">
                            <label>Bills</label>
                            <vue-select v-model="invoicesData" @input="selectInvoices()" label="reference_number" :options="invoices"></vue-select>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="name">Amount</label>
                                <input type="number" class="form-control" v-model="amount" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Bill Payment</button>
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
                invoices: [],
                invoicesData: null,
                invoice_id: '',
                amount: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/invoices/get-all-invoices/").then(res => {
                    this.invoices = res.data.invoices;
                    // console.log('IP: ' + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            selectInvoices() {
                this.invoice_id = this.invoicesData.id;
                console.log('IV id: ' + this.invoice_id);
            },
            createNewInvoicePayment() {
                this.ifReady = false;

                axios.post("/api/invoice-payments", this.$data).then(res => {
                    this.$router.push({ name: 'bill-payment.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
