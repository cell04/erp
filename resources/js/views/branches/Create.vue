<template>
    <div>
        <div class="card">
            <div class="card-header">
                <b>Branches / Create New Branch</b>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewBranch">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
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
                        <br>
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewBranches"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Branch</button>
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
                name: '',
                address: '',
                city: '',
                zip_code: '',
                country: '',
                telephone_number: '',
                status: 1
            };
        },

        methods: {
            viewBranches() {
                this.$router.push({ name: 'branches.index' });
            },

            createNewBranch() {
                this.ifReady = false;

                axios.post('/api/branches', this.$data).then(res => {
                    this.$router.push({ name: 'branches.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
