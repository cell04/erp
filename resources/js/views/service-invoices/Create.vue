<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">SERVICE INVOICE</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewServiceInvoices">Service Invoices</a>
                    <a class="text-secondary"> / Create New Service Invoice</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewInvoice">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Bid Sheet #</label>
                                    <vue-select v-model="bidsheetData" @input="selectBidSheet()" label="bid_sheet_number" :options="bidsheets"></vue-select>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label> Service Invoice #</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text" id="btnGroupAddon">SRI</div>
                                        </div>
                                        <input type="text" class="form-control" v-model="reference_number" readonly placeholder="Sales Invoice #" aria-label="Input group example" aria-describedby="btnGroupAddon">
                                    </div>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Customer</label>
                                    <input type="text" class="form-control" v-model="contact" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Amount</label>
                                    <input type="text" class="form-control" v-model="amount" readonly>
                                </div>

                                <div class="col-md-6 form-group">
                                    <div class="dateStyle">
                                        <label>Due Date</label>
                                        <datepicker v-model="due_date" :bootstrap-styling="true" required></datepicker>
                                    </div>
                                </div>

                            </div>

                            <div class="pt-3">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewServiceInvoices"><i class="fas fa-chevron-left"></i> Back</button>
                                <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Invoice</button>
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
                contacts: [],
                bidsheets: [],
                bidsheetData: null,
                bid_sheet_id: "",
                contact: null,
                contact_id: "",
                due_date: "",
                amount: "",
                amount_paid: "",
                items: [],
                reference_number: "",
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
            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let getAllBidSheet = new Promise((resolve, reject) => {
                axios.get("/api/bid-sheets/get-all-bid-sheets/").then(res => {
                    this.bidsheets = res.data.bid_sheets;
                    // console.log('BIDSHEET: ' + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, getAllBidSheet]).then(() => {
                this.ifReady = true;
            });
        },

        computed: {
        },

        methods: {  
            viewServiceInvoices() {
                this.$router.push({ name: 'service-invoices.index' });
            },

            getBidSheetDetails(id) {
                console.log('Take id: ' + id);

                axios.get("/api/bid-sheets/" + id).then(res => {
                    console.log('Quote: ' + JSON.stringify(res.data));
                    this.contact = res.data.bidSheet.contact.person;
                    this.contact_id = res.data.bidSheet.contact_id;
                    this.amount = res.data.bidSheet.amount;
                    this.autoGenerateSalesInvoive();
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            autoGenerateSalesInvoive() {
                let date = new Date();
                var components = [
                    date.getFullYear(),
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

            selectBidSheet() {
                this.bid_sheet_id = this.bidsheetData.id;
                console.log('B ID: ' + this.bidsheetData.id);
                this.getBidSheetDetails(this.bidsheetData.id);
            },
            
            createNewInvoice() {
                this.ifReady = false;
                let invoiceItems = null;

                let formData = {
                    invoice_items: invoiceItems,
                    bid_sheet_id: this.bid_sheet_id,
                    contact_id: this.$data.contact_id,
                    reference_number: 'SRI' + this.$data.reference_number,
                    due_date: moment(this.$data.due_date).format('YYYY-MM-DD'),
                    amount: this.amount,
                    amount_paid: 0
                };

                console.log(formData);

                axios.post("/api/service-invoices", formData).then(res => {
                    this.$router.push({ name: "service-invoices.index" });
                }).catch(err => {
                    alert(`Error! Can't create invoice`);
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