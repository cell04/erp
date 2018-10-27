<template>
    <div>
        <div class="card">
            <div class="card-header">
                Warehouses / Edit Warehouse
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editWarehouse">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="adress">Address</label>
                            <textarea class="form-control" v-model="address" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-3 form-group">
                                <label for="city">City</label>
                                <input type="text" class="form-control" v-model="city" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="country">Country</label>
                                <input type="text" class="form-control" v-model="country" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="zip_code">Zip Code</label>
                                <input type="text" class="form-control" v-model="zip_code" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="telephone_number">Telephone Number</label>
                                <input type="text" class="form-control" v-model="telephone_number" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </div>

                        <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent.default="viewWarehouse">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateWarehouse">Update Warehouse</button>
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
                id: '',
                name: '',
                address: '',
                city: '',
                zip_code: '',
                country: '',
                telephone_number: '',
                status: 1
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/warehouses/' + this.$route.params.id).then(res => {
                    this.id               = res.data.warehouse.id;
                    this.name             = res.data.warehouse.name;
                    this.address          = res.data.warehouse.address;
                    this.city             = res.data.warehouse.city;
                    this.zip_code         = res.data.warehouse.zip_code;
                    this.country          = res.data.warehouse.country;
                    this.telephone_number = res.data.warehouse.telephone_number;

                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewWarehouse() {
                this.$router.push({
                    name: 'warehouses.view',
                    params: { id: this.$route.params.id }
                });
            },
            updateWarehouse() {
                this.ifReady = false;

                axios.patch('/api/warehouses/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'warehouses.view',
                        params: { id: this.$route.params.id }
                    });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
