<template>
    <div>
        <div class="card">
            <div class="card-header">
                Branches / View Branch
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="branch.name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="adress">Address</label>
                            <textarea class="form-control" v-model="branch.address" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-3 form-group">
                                <label for="city">City</label>
                                <input type="text" class="form-control" v-model="branch.city" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="country">Country</label>
                                <input type="text" class="form-control" v-model="branch.country" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="zip_code">Zip Code</label>
                                <input type="text" class="form-control" v-model="branch.zip_code" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="telephone_number">Telephone Number</label>
                                <input type="text" class="form-control" v-model="branch.telephone_number" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent.default="viewBranches">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editBranch">Edit Branch</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteBranchModal">Delete Branch</button>
                    <button type="button" class="btn btn-success btn-sm" @click.prevent.default="createNewStockRequest">Create New Stock Request</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteBranchModal" tabindex="-1" role="dialog" aria-labelledby="deleteBranchTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Branch?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Branch?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteBranch">Confirm Delete</button>
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
                branch: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/branches/' + this.$route.params.id).then(res => {
                    this.branch = res.data.branch;
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewBranches() {
                this.$router.push({
                    name: 'branches.index'
                });
            },
            editBranch() {
                this.$router.push({
                    name: 'branches.edit',
                    params: { id: this.branch.id }
                });
            },
            createNewStockRequest() {
                this.$router.push({
                    name: 'stock-requests.create',
                    params: { id: this.branch.id },
                    query: { type: 'branch'}
                });
            },
            openDeleteBranchModal() {
                $('#deleteBranchModal').modal('show');
            },
            deleteBranch() {
                $('#deleteBranchModal').modal('hide');
                axios.delete('/api/branches/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'branches.index' });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
