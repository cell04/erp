<template>
    <div>
        <div class="card">
            <div class="card-header">
                Warehouses / View Warehouse
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="warehouse.name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="adress">Address</label>
                            <textarea class="form-control" v-model="warehouse.address" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-3 form-group">
                                <label for="city">City</label>
                                <input type="text" class="form-control" v-model="warehouse.city" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="country">Country</label>
                                <input type="text" class="form-control" v-model="warehouse.country" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="zip_code">Zip Code</label>
                                <input type="text" class="form-control" v-model="warehouse.zip_code" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="telephone_number">Telephone Number</label>
                                <input type="text" class="form-control" v-model="warehouse.telephone_number" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewWarehouses">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editWarehouse">Edit Warehouse</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteWarehouseModal">Delete Warehouse</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteWarehouseModal" tabindex="-1" role="dialog" aria-labelledby="deleteWarehouseTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Warehouse?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Warehouse?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteWarehouse">Confirm Delete</button>
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
                warehouse: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/warehouses/' + this.$route.params.id).then(res => {
                    this.warehouse = res.data.warehouse;
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewWarehouses() {
                this.$router.push({
                    name: 'warehouses.index'
                });
            },
            editWarehouse() {
                this.$router.push({
                    name: 'warehouses.edit',
                    params: { id: this.warehouse.id }
                });
            },
            openDeleteWarehouseModal() {
                $('#deleteWarehouseModal').modal('show');
            },
            deleteWarehouse() {
                $('#deleteWarehouseModal').modal('hide');
                axios.delete('/api/warehouses/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'warehouses.index' });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
