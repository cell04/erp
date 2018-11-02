<template>
    <div class="card">
        <div class="card-header">
            <b>Contacts / Create New Contact</b>
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
                        <label for="company">Company Name</label>
                        <input type="text" class="form-control" v-model="company" id="company" autocomplete="off" minlength="2" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label for="company_address">Company Address</label>
                        <textarea class="form-control" v-model="company_address" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Credit Limit</label>
                        <input type="number" class="form-control" v-model="credit_limit" min="0" max="99999999" required>
                    </div>
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
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                contactTypes: [],
                contactType: null,
                contact_type_id: '',
                type:'',
                person: '',
                mobile_number: '',
                email: '',
                company: '',
                company_address: '',
                credit_limit: 0
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

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewContact() {
                this.$router.push({ name: 'contacts.index' });
            },

            selectContactType() {
                this.contact_type_id = this.contactType.id;
            },
            createNewContact() {
                this.ifReady = false;

                axios.post('/api/contacts', this.$data).then(res => {
                    this.$router.push({ name: 'contacts.index' });
                }).catch(err => {
                    console.log(err);
                    this.ifReady = false;
                    alert('Error');
                });
            }
        }
    }
</script>
