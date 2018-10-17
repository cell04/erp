<template>
    <div>
        <div class="card">
            <div class="card-header">
                Users / View User
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="user.name">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" class="form-control" v-model="user.email">
                        </div>
                        <div class="form-group">
                            <label>Mobile Number</label>
                            <input type="text" class="form-control" v-model="user.mobile_number">
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewUsers">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editUser">Edit User</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteUserModal">Delete User</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="deleteUserTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this User?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this User?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteUser">Confirm Delete</button>
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
                user: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/users/' + this.$route.params.id).then(res => {
                    this.user = res.data.user;
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewUsers() {
                this.$router.push({
                    name: 'users.index'
                });
            },
            editUser() {
                this.$router.push({
                    name: 'users.edit',
                    params: { id: this.user.id }
                });
            },
            openDeleteUserModal() {
                $('#deleteUserModal').modal('show');
            },
            deleteUser() {
                $('#deleteUserModal').modal('hide');
                axios.delete('/api/users/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'users.index' });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
