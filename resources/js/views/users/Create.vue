<template>
    <div>
        <div class="card">
            <div class="card-header">
                <a class="text-success" href="" @click.prevent="viewUser">Users</a>
                <a class="text-secondary"> / Create New User</a>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewUser">
                        <div class="form-group">
                            <label>Picture </label>
                            <input type="file" class="form-control-file" @change="onFileSelected" required>
                        </div>

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="role">Role</label>
                            <vue-select v-model="roleId" @input="selectRole()" label="name" :options="roleList"></vue-select>
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" v-model="email" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="mobile_number">Mobile No.</label>
                            <input type="text" class="form-control" v-model="mobile_number" autocomplete="off" minlength="11" maxlength="11" required>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" v-model="password" autocomplete="off" minlength="2" maxlength="255" required>
                            <p v-if="$v.password_confirmation.$error">Password Does Not Match Password Confirmation</p>
                        </div>

                        <div class="form-group">
                            <label for="password_confirmation">Password Confirmation</label>
                            <input type="password" @blur="$v.password_confirmation.$touch()" class="form-control" v-model="password_confirmation">
                            <p v-if="$v.password_confirmation.$error">Password Confirmation Does Not Match Password</p>
                        </div>
                        
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewUser"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New User</button>
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
    import { sameAs } from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                ifReady: true,
                image: null,
                name: '',
                email: '',
                role_id: '',
                password: '',
                password_confirmation: '',
                mobile_number: '',
                roleId: null,
                roleList: [],
            };
        },
        validations: {
            password_confirmation: {
                sameAs: sameAs(vm => {
                    return vm.password
                })
            }
        },
        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/roles/get-all-roles/").then(res => {
                    console.log(res);
                    this.ifReady = true;
                    this.roleList = res.data.roles;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });
        },
        methods: {
            viewUser() {
                this.$router.push({ name: 'users.index' });
            },
            onFileSelected(event) {
                this.image = event.target.files[0];
            },
            selectRole() {
                this.role_id = this.roleId.id;
            },
            createNewUser() {
                this.ifReady = false;

                let formData = new FormData();

                if (this.image != null) {
                    formData.append('image', this.image);
                }

                formData.append('name', this.name);
                formData.append('role_id', this.role_id);
                formData.append('email', this.email);
                formData.append('password', this.password);
                formData.append('password_confirmation', this.password_confirmation);
                formData.append('mobile_number', this.mobile_number);

                axios.post('/api/users', formData).then(res => {
                    this.$router.push({ name: 'users.index' });
                    this.ifReady = true;
                }).catch(err => {
                    console.log(err);
                    this.ifReady = true;

                });
            }
        }
    }
</script>

<style>

  p {
      color: red !important;
  }

</style>
