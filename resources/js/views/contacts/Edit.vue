<template>
    <div class="card">
        <div class="card-header">
            <b>Contacts / View Contacts</b>
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
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="mobile_number">Mobile No.</label>
                                <input type="text" class="form-control" v-model="mobile_number" id="mobile_number">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" v-model="email" id="email">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="company">Company Name</label>
                                <input type="text" class="form-control" v-model="company" id="company" autocomplete="off" minlength="2" maxlength="255">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="company_address">Company Address</label>
                        <input type="text" class="form-control" v-model="company_address" id="company_address">
                    </div>

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
</template>

<script>
    export default {
        data() {
            return {
                ifReady: false,
                contactTypes: [],
                contactType: null,
                contact_type_id: '',
                id: '',
                type:'',
                person: '',
                mobile_number: '',
                email: '',
                company: '',
                company_address: ''
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
                    console.log(this.contactType);
                    resolve();
                }).catch(err => {
                    console.log(err);
                });
            });

            Promise.all([promiseContactTypes, promiseContacts]).then(() => {
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
