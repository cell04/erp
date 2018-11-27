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
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" v-model="email" autocomplete="off" minlength="2" maxlength="255" required>
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

                        <div class="form-group">
                            <label for="mobile_number">Mobile Number</label>
                            <input type="text" class="form-control" v-model="mobile_number" autocomplete="off" minlength="11" maxlength="11" required>
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
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                mobile_number: ''
            };
        },
        validations: {
            password_confirmation: {
                sameAs: sameAs(vm => {
                    return vm.password
                })
            }
        },
        methods: {
            viewUser() {
                this.$router.push({ name: 'users.index' });
            },
            createNewUser() {
                this.ifReady = false;

                axios.post('/api/users', this.$data).then(res => {
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
