<template>
    <div>
        <div class="card">
            <div class="card-header">
                Contact Types / View Contact Types
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                <fieldset disabled>
                    <div class="form-group">
                        <label for="type">Type</label>
                        <select v-model="type" class="form-control">
                            <option v-for="contact in contact_type" :key="contact.id" :value="contact.value">{{contact.contact_name}}</option>
                        </select>

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
                </fieldset>

                <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewContact">Back</button>
                <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editContact">Edit {{componentVal}}</button>
                <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteContactModal">Delete {{componentVal}}</button>
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
                        - departments <br>
                        - sub-departments <br>
                        - budgets <br>
                        - journals <br>
                        - journal entries <br>
                        - vouchers <br>
                        - voucher entries <br>
                        - statistics <br>
                        - metrics <br><br>

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
            id: '',
            type:'',
            person: '',
            mobile_number: '',
            email: '',
            company: '',
            company_address: '',
            contact_type:[
                {'value':1, 'contact_name': "Supplier"},
                {'value':2, 'contact_name': "Customer"},
                {'value':3, 'contact_name': "Employee"},

            ],
        };
    },

    mounted() {

        let promise = new Promise((resolve, reject) => {
            axios.get('/api/contacts/' + this.$route.params.id).then((res) => {
                if (! res.data.response) {
                    // Failed, do something
                    return;
                }
                this.id = res.data.contact.id;
                this.type = res.data.contact.type;
                this.person = res.data.contact.person;
                this.mobile_number = res.data.contact.mobile_number;
                this.email = res.data.contact.email;
                this.company = res.data.contact.company;
                this.company_address = res.data.contact.company_address;
                resolve();
            });
        });

        promise.then(() => {
            this.ifReady = true;
        });

    },

    methods: {

        viewContact() {
            this.$router.push({
                name: 'contacts.index'
            });
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
                if (! res.data.response) {
                    // FALSE / FAILED
                    // DO SOMETHING
                    return;
                }

                this.$router.push({
                    name: 'contacts.index'
                });

                return;
            });
        }
    },

    computed: {
        // Add ES6 methods here that needs caching
    }
}
</script>
