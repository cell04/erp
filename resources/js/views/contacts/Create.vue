<template>
    <div>
        <div class="card">
            <div class="card-header">
                Contacts / Create New Contact
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form ref="createNewContactForm" role="form" method="POST" accept-charset="utf-8" v-on:submit.prevent="createNewContact">
                        <div class="form-group">
                            <label>Contact Type</label>
                            <select class="form-control" v-model="contact_type_id" v-on:change="selectContactType(contact_type_id)"  required>
                                <option value="" disabled hidden>-- Select Item Type --</option>
                                <option v-for="contactType in contactTypesList" v-bind:value="contactType.id">{{ contactType.display_name }}</option>
                            </select>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="person">Person Full Name</label>
                                    <input type="text" class="form-control" v-model="person">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="mobile_number">Person Mobile No.</label>
                                    <input type="number" class="form-control" v-model="mobile_number" id="mobile_number">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="email">Person Email</label>
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
                            <input type="number" class="form-control" placeholder="0" v-model="credit_limit" minlength="2" maxlength="255" required>
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Contact</button>
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
            ifReady: true,
            contactTypesList: [],
            contact_type_id:'',
            person: '',
            mobile_number: '',
            email: '',
            company: '',
            company_address: '',
            credit_limit: ''
        };
    },

    mounted() {
        let promise = new Promise((resolve, reject) => {
                axios.get("/api/contacts-type/get-all-contacts-type/").then(res => {
                    console.log(res);
                    this.ifReady = true;
                    this.contactTypesList = res.data.contact_types;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });
    },

    methods: {
        selectContactType(id) {
                this.contact_type_id = id;
        },

        createNewContact() {            
            this.ifReady = false;
            axios.post('/api/contacts', this.$data).then((res)=>{
                if(! res.data.response){
                    alert("error");
                }
                
                this.$router.push({ name: 'contacts.index' });
            });
        }
    },

    computed: {
        // Add ES6 methods here that needs caching
    }
}
</script>
