<template>
    <div>
        <div class="card">
            <div class="card-header">
                Contacts / View Contacts
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                <form ref="editContactForm" role="form" method="POST" accept-charset="utf-8" v-on:submit.prevent="editContact">
                    <div class="form-group">
                        <label for="type">Type</label>
                        <select v-model="type" class="form-control">
                            <option v-for="contact in contact_type" :value="contact.value">{{contact.contact_name}}</option>
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
                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewContact">Back</button>
                    <button type="button" class="btn btn-success btn-sm" :disabled="isDisabled" @click.prevent.default="updateContact">Update Contact</button>
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
            id: '',
            type:'',
            person: '',
            mobile_number: '',
            email: '',
            company: '',
            company_address: '',
            isDisabled: false,
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
                name: 'contacts.view',
                params: { id: this.$route.params.id }
            });
        },
        updateContact() {
            this.isDisabled = true;
            this.isReady= false;
            axios.patch('/api/contacts/' + this.$route.params.id, this.$data).then((res)=>{
                if(! res.data.response){
                    alert("error")
                }
                this.$router.push({
                    name: 'contacts.view',
                    params: { id: this.$route.params.id }
                })
                
                return;
            });
        }
    },

    computed: {
        // Add ES6 methods here that needs caching
    }
}
</script>
