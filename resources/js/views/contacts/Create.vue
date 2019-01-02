<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">CONTACTS</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewContact">Contacts</a>
                    <a class="text-secondary"> / Create New Contact</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form ref="createNewContactForm" role="form" method="POST" accept-charset="utf-8" v-on:submit.prevent="createNewContact">
                            <div class="form-group">
                                <label>Contact Type</label>
                                <vue-select v-model="contactType" @input="selectContactType()" label="display_name" :options="contactTypes"></vue-select>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="person">Full Name</label>
                                        <input type="text" class="form-control" v-model="person">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="mobile_number">Mobile No.</label>
                                        <input type="number" class="form-control" v-model="mobile_number" id="mobile_number">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" v-model="email" id="email">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="company">Business Type</label>
                                <input type="text" class="form-control" v-model="business_type" id="company" autocomplete="off" minlength="2" maxlength="255">
                            </div>
                            <div class="form-group">
                                <label for="company">Company Name</label>
                                <input type="text" class="form-control" v-model="company" id="company" autocomplete="off" minlength="2" maxlength="255">
                            </div>
                            <div class="form-group">
                                <label for="company_address">Company Address</label>
                                <textarea class="form-control" v-model="company_address" rows="3"></textarea>
                            </div>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Payment Method</label>
                                    <vue-select v-model="paymentMethodData" @input="selectPaymentMethod()" label="name" :options="payment_method"></vue-select>
                                </div>

                                <div class="form-group col-md-6" v-show="selectedBank">
                                    <label for="name">Bank</label>
                                    <input type="text" class="form-control" v-model="bank_name" autocomplete="off" minlength="2" maxlength="255">
                                </div>
                            </div>
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
                            <!-- <div class="form-group">
                                <label>Credit Limit</label>
                                <input type="number" class="form-control" v-model="credit_limit" min="0" max="99999999" required>
                            </div> -->
                            <br>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewContact"><i class="fas fa-chevron-left"></i> Back</button>
                            <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Contact</button>
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
                payment_method: [],
                paymentMethodData: null,
                contactTypes: [],
                contactType: null,
                contact_type_id: '',
                type:'',
                person: '',
                mobile_number: '',
                email: '',
                business_type: '',
                company: '',
                company_address: '',
                mode_of_payment_id: '',
                bank_name: '',
                payment_term: '',
                credit_limit: 0,
                selectedBank: false
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/contacts-type/get-all-contacts-type").then(res => {
                    this.contactTypes = res.data.contact_types;
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

            Promise.all([promise, promisePaymentMethod]).then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewContact() {
                this.$router.push({ name: 'contacts.index' });
            },

            selectPaymentMethod() {
                this.mode_of_payment_id = this.paymentMethodData.id;
                // console.log('Mop id: ' + this.mode_of_payment_id);
                if(this.paymentMethodData.id == 1){
                    this.selectedBank = false;
                } else if (this.paymentMethodData.id == 2) {
                    this.selectedBank = true;
                } else {
                    this.selectedBank = false;
                }
            },

            selectContactType() {
                this.contact_type_id = this.contactType.id;
            },
            createNewContact() {
                this.ifReady = false;

                console.log(this.$data);

                axios.post('/api/contacts', this.$data).then(res => {
                    this.$router.push({ name: 'contacts.index' });
                }).catch(err => {
                    console.log(err);
                    alert('Error');
                    this.ifReady = true;
                });
            }
        }
    }
</script>
