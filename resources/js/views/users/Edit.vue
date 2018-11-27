<template>
    <div>
        <div class="card">
            <div class="card-header">
                <a class="text-success" href="" @click.prevent="viewUsers">Users</a>
                <a class="text-secondary"> / Edit User</a>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editUser">
                        <div class="form-group">
                            <label>Picture</label>
                            <input type="file" class="form-control-file" @change="onFileSelected">
                        </div>

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Role</label>
                            <vue-select v-model="roleId" @input="selectRole()" label="name" :options="rolesList"></vue-select>
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" v-model="email" disabled>
                        </div>

                        <div class="form-group">
                            <label for="mobile_number">Mobile No.</label>
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
                role_id: '',
                roleId: '',
                mobile_number: '',
                image: null
            };
        },

        mounted() {
            let retrieveUserPromise = new Promise((resolve, reject) => {
                axios.get('/api/users/' + this.$route.params.id).then(res => {
                    this.id            = res.data.user.id;
                    this.name          = res.data.user.name;
                    this.email         = res.data.user.email;
                    this.mobile_number = res.data.user.mobile_number;
                    this.roleId        = res.data.user.role;


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
            onFileSelected(event) {
                this.image = event.target.files[0];
            },
            updateAdmin() {
                this.ifReady = false;

                let formData = new FormData();
                formData.append('_method','PATCH');
                formData.append('name', this.name);
                formData.append('role_id', this.role_id)
                formData.append('email', this.email);
                formData.append('mobile_number', this.mobile_number);
                
                if (this.image != null) {
                    formData.append('image', this.image);
                }

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
