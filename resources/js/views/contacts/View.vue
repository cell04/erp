<template>
    <div>
        <div class="card">
            <div class="card-header">
                <b>Contacts / View Contacts</b>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label>Contact Type</label>
                            <input type="text" class="form-control" v-model="contact_type"required></input>
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
                        <div class="form-group">
                            <label>Credit Limit</label>
                            <input type="number" class="form-control" v-model="credit_limit" min="0" max="99999999" required>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewContact"><i class="fas fa-chevron-left"></i> Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editContact"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteContactModal"><i class="fas fa-trash-alt"></i> Delete</button>
                </div>

                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>


            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteContactModal" tabindex="-1" role="dialog" aria-labelledby="deleteContactTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this contact?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this {{componentVal}}? <br><br>
                        Deleting this {{componentVal}} will delete the following data <br><br>

                        that are all related to this {{componentVal}}.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteContact">Confirm Delete</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
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
                componentVal: 'contact',
                contact_type: '',
                id: '',
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
                axios.get('/api/contacts/' + this.$route.params.id).then(res => {
                    if (! res.data.response) { return; }

                    this.contact_type    = res.data.contact.contact_type.display_name;
                    this.id              = res.data.contact.id;
                    this.type            = res.data.contact.type;
                    this.person          = res.data.contact.person;
                    this.mobile_number   = res.data.contact.mobile_number;
                    this.email           = res.data.contact.email;
                    this.company         = res.data.contact.company;
                    this.company_address = res.data.contact.company_address;
                    this.credit_limit    = res.data.contact.credit_limit;

                    resolve();
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
            editContact() {
                this.$router.push({
                    name: 'contacts.edit',
                    params: { id: this.id }
                });
            },
            openDeleteContactModal() {
                $('#deleteContactModal').modal('show');
            },
            deleteContact() {
                $('#deleteContactModal').modal('hide');

                axios.delete('/api/contacts/' + this.$route.params.id).then((res) => {
                    this.$router.push({ name: 'contacts.index' });
                });
            }
        }
    }
</script>
