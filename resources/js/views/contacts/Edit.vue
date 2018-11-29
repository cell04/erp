<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">CONTACT</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewContact">Contacts</a>
                    <a class="text-secondary"> / Edit Contact</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form ref="editContactForm" role="form" method="POST" accept-charset="utf-8" v-on:submit.prevent="editContact">
                            <div class="form-group">
                                <label>Contact Type</label>
                                <vue-select v-model="contactType" @input="selectContactType()" label="display_name" :options="contactTypes"></vue-select>
                            </div>

                            <div class="form-group">
                                <label for="person">Full Name</label>
                                <input type="text" class="form-control" v-model="person" id="person" required></input>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="mobile_number">Mobile No.</label>
                                        <input type="text" class="form-control" v-model="mobile_number" id="mobile_number">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" v-model="email" id="email">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="business_type">Business Type</label>
                                        <input type="text" class="form-control" v-model="business_type" id="business_type" autocomplete="off" minlength="2" maxlength="255">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="company">Company Name</label>
                                        <input type="text" class="form-control" v-model="company" id="company" autocomplete="off" minlength="2" maxlength="255">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Payment Method</label>
                                    <vue-select v-model="mode_of_payment" @input="selectPaymentMethod()" label="name" :options="payment_method"></vue-select>
                                </div>

                                <div class="form-group col-md-6" v-show="selectedBank">
                                    <label for="name">Bank</label>
                                    <input type="text" class="form-control" v-model="bank_name" autocomplete="off" minlength="2" maxlength="255">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Payment Term</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" name="optradio" v-model="payment_term" value="2">
                                        <label class="form-check-label">&nbsp; Full</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" name="optradio" v-model="payment_term" value="1">
                                        <label class="form-check-label">&nbsp; Partial</label>
                                    </div>
                                </div>
                            </div>

                            <br>

                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewContact"><i class="fas fa-chevron-left"></i> Back</button>
                            <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateContact"><i class="fas fa-edit"></i> Update Contact</button>
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
                paymentMethodData: null,
                payment_method: [],
                contactTypes: [],
                contactType: null,
                contact_type_id: '',
                id: '',
                type:'',
                person: '',
                mobile_number: '',
                email: '',
                company: '',
                company_address: '',
                business_type: '',
                bank_name: '',
                payment_term: '',
                mode_of_payment: '',
                mode_of_payment_id: '',
                selectedBank: null
            };
        },

        mounted() {
            let promiseContactTypes = new Promise((resolve, reject) => {
                axios.get("/api/contacts-type/get-all-contacts-type").then(res => {
                    this.contactTypes = res.data.contact_types;
                    resolve();
                }).catch(err => {
                    console.log(err);
                });
            });

            let promiseContacts = new Promise((resolve, reject) => {
                axios.get('/api/contacts/' + this.$route.params.id).then(res => {
                    console.log(res.data.contact.contact_type);
                    this.id = res.data.contact.id;
                    this.contactType = res.data.contact.contact_type;
                    this.contact_type_id = res.data.contact.contact_type.id;
                    this.person = res.data.contact.person;
                    this.mobile_number = res.data.contact.mobile_number;
                    this.email = res.data.contact.email;
                    this.company = res.data.contact.company;
                    this.company_address = res.data.contact.company_address;

                    this.business_type   = res.data.contact.business_type;
                    this.bank_name       = res.data.contact.bank_name;
                    this.mode_of_payment = res.data.contact.mode_of_payment;
                    this.payment_term    = res.data.contact.payment_term;

                    console.log(this.contactType);
                    resolve();
                }).catch(err => {
                    console.log(err);
                });
            });

            let promisePaymentMethod = new Promise((resolve, reject) => {
                axios.get("/api/mode-of-payments/get-all-mode-of-payments/").then(res => {
                    this.payment_method = res.data.mode_of_payments;
                    // console.log('MOP: ' + JSON.stringify(res.data));
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            Promise.all([promiseContactTypes, promiseContacts, promisePaymentMethod]).then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewContact() {
                this.$router.push({
                    name: 'contacts.view',
                    params: { id: this.$route.params.id }
                });
            },

            selectPaymentMethod() {
                this.mode_of_payment_id = this.mode_of_payment.id;
                console.log('Mop id: ' + this.mode_of_payment_id);
                if(this.mode_of_payment.id == 1){
                    this.selectedBank = false;
                    this.bank_name = '';
                } else if (this.mode_of_payment.id == 2) {
                    this.selectedBank = true;
                } else {
                    this.selectedBank = false;
                }
            },
            
            selectContactType() {
                this.contact_type_id = this.contactType.id;
            },

            updateContact() {
                this.ifReady = false;

                axios.patch('/api/contacts/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'contacts.view',
                        params: { id: this.$route.params.id }
                    });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                    alert('Error');
                });
            }
        }
    }
</script>
