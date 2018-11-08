<template>
    <div>
        <div class="card">
            <div class="card-header">
                Users / Edit User
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editUser">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" v-model="email" disabled>
                        </div>

                        <div class="form-group">
                            <label for="mobile_number">Mobile Number</label>
                            <input type="text" class="form-control" v-model="mobile_number">
                        </div>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewUsers"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateAdmin"><i class="fas fa-edit"></i> Update Admin</button>
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
                name: '',
                email: '',
                mobile_number: ''
            };
        },

        mounted() {
            let retrieveUserPromise = new Promise((resolve, reject) => {
                axios.get('/api/users/' + this.$route.params.id).then(res => {
                    this.id            = res.data.user.id;
                    this.name          = res.data.user.name;
                    this.email         = res.data.user.email;
                    this.mobile_number = res.data.user.mobile_number;

                    resolve();
                });
            });

            Promise.all([retrieveUserPromise]).then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewUsers() {
                this.$router.push({
                    name: 'users.view',
                    params: { id: this.$route.params.id }
                });
            },
            updateAdmin() {
                this.ifReady = false;

                let formData = new FormData();
                formData.append('_method','PATCH');
                formData.append('name', this.name);
                formData.append('email', this.email);
                formData.append('mobile_number', this.mobile_number);

                axios.post('/api/users/' + this.$route.params.id, formData).then(res => {
                    this.$router.push({
                        name: 'users.view',
                        params: { id: this.$route.params.id }
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
