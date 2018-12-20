<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">BID SHEET</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewBidSheets">Bid Sheet</a>
                    <a class="text-secondary"> / Create New Bid Sheet</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewQuotation">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Bid Sheet Number</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text" id="btnGroupAddon">BN</div>
                                        </div>
                                        <input type="text" class="form-control" v-model="bid_sheet_number" required placeholder="Bid Sheet #" aria-label="Input group example" aria-describedby="btnGroupAddon" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Customer</label>
                                    <vue-select v-model="contact" @input="selectContact()" label="person" :options="contacts" required></vue-select>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Project Title</label>
                                    <input type="text" class="form-control" v-model="project_title" required placeholder="Project Title">
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Description</label>
                                    <input type="text" class="form-control" v-model="description" required placeholder="Description">
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Amount</label>
                                    <input type="text" class="form-control" v-model="amount" required placeholder="Amount">
                                </div>

                                <div class="col-md-6 form-group">
                                    <div class="dateStyle">
                                        <label>Bid Sheet Date</label>
                                        <datepicker v-model="bid_sheet_date" :bootstrap-styling="true" placeholder="Bid Sheet Date" required></datepicker>
                                    </div>
                                </div>

                                <div class="col-md-6 form-group">
                                    <label>Location</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" v-model="from_selected_radio_button" value="warehouse">
                                        <label class="form-check-label" for="inlineRadio1">&nbsp; Warehouse</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" v-model="from_selected_radio_button" value="branch">
                                        <label class="form-check-label" for="inlineRadio2">&nbsp; Branch</label>
                                    </div>
                                    <vue-select v-model="fromWarehouse" @input="selectFromWarehouse()" label="name" :options="warehouses" v-show="from_selected_radio_button === 'warehouse'" required></vue-select>
                                    <vue-select v-model="fromBranch" @input="selectFromBranch()" label="name" :options="branches" v-show="from_selected_radio_button === 'branch'" required></vue-select>
                                </div>

                                <div class="col-md-12 form-group" v-if="contactData !== null">
                                    <hr>
                                    <h5><u>Customer Information:</u></h5>
                                    <div><label for="name"><strong>Customer</strong></label>: {{contactData.person}}</div>
                                    <div><label for="name"><strong>Company</strong></label>: {{contactData.company}}</div>
                                    <div><label for="name"><strong>Address</strong></label>: {{contactData.company_address}}</div>
                                    <div><label for="name"><strong>Email</strong></label>: {{contactData.email}}</div>
                                    <div><label for="name"><strong>Phone</strong></label>: {{contactData.mobile_number}}</div>
                                    <hr>
                                </div>

                            </div>

                            <div class="pt-3">
                                <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBidSheets"><i class="fas fa-chevron-left"></i> Back</button>
                                <!-- <button type="button" class="btn btn-outline-success btn-sm" @click="addNewItem"><i class="fas fa-plus-circle"></i> Add New Item</button> -->
                                <button type="submit" class="btn btn-success btn-sm" :disabled="isDisabled"><i class="fas fa-plus"></i> Create New Bid Sheet</button>
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
                contactData: null,
                from_selected_radio_button: "",
                fromWarehouse: null,
                fromBranch: null,
                warehouses: [],
                branches: [],
                location_id : null,
                location_type: null,
                contacts: [],
                contact: null,
                contact_id: "",

                bid_sheet_number: "",
                bid_sheet_date: "",
                project_title: "",
                description: "",
                amount: "",
                quotation_items: [
                    {
                        item: '',
                        item_id: '',
                        quantity: '',
                        unitOfMeasurements: [],
                        unitOfMeasurement: '',
                        unit_of_measurement_id: '',
                        price: 0,
                        subTotal: 0
                    }
                ],
                isDisabled: false,
                tax_value: ""
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
            // Customer's List
            let getAllContacts = new Promise((resolve, reject) => {
                axios.get("/api/contacts/get-all-contacts/").then(res => {
                    this.contacts = res.data.contacts.filter(cust => cust.contact_type_id == 1);
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseBranches = new Promise((resolve, reject) => {
                axios.get("/api/branches/get-all-branches/").then(res => {
                    this.branches = res.data.branches;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            let promiseWarehouses = new Promise((resolve, reject) => {
                axios.get("/api/warehouses/get-all-warehouses/").then(res => {
                    this.warehouses = res.data.warehouses;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([getAllContacts, promiseBranches, promiseWarehouses]).then(() => {
                this.ifReady = true;
            });

            this.autoGenerateBidSheetNumber();
        },

        computed: {
        },

        methods: {
            viewBidSheets() {
                this.$router.push({ name: 'bid-sheets.index' });
            },

            getContactData(id) {
                axios.get("/api/contacts/" + id).then(res => {
                    this.contactData = res.data.contact;
                    // console.log("COntacts" + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            },

            autoGenerateBidSheetNumber() {
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
                this.bid_sheet_number = id;
                console.log('Code: ' + id);
            },

            selectContact() {
                this.contact_id = this.contact.id;
                this.getContactData(this.contact_id);
            },

            selectFromBranch() {
                this.location_id = this.fromBranch.id;
                this.location_type = "App\\Branch";
                console.log('Branch - From: ' + this.location_id + ' type: ' +  this.location_type);
            },
            selectFromWarehouse() {
                this.location_id = this.fromWarehouse.id;
                this.location_type = "App\\Warehouse";
                console.log('Warehouse - From: ' + this.location_id + ' type: ' +  this.location_type);
            },

            createNewQuotation() {
                this.ifReady = false;

                let formData = {
                    bid_sheet_number: 'BN' + this.bid_sheet_number,
                    contact_id: this.$data.contact_id,
                    bid_sheet_date: moment(this.$data.bid_sheet_date).format('YYYY-MM-DD'),
                    project_title: this.project_title,
                    description: this.description,
                    amount: this.amount,
                    location_id: this.location_id,
                    location_type: this.location_type,
                };

                axios.post("/api/bid-sheets", formData).then(res => {
                    console.log(res.data);
                    this.$router.push({ name: "bid-sheets.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! Can't create quotation`);
                    this.ifReady = true;
                });
            }
        }
    };
</script>

<style>
    td {
        width: 100px !important;
    }
    
    .dateStyle input:read-only {
        background-color: #ffffff !important;
    }
</style>

