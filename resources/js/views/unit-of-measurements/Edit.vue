<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}}s / Edit {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editUnitOfMeasurement">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="unit_of_measurements.name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Abbreviation</label>
                            <input type="text" class="form-control" v-model="unit_of_measurements.abbreviation" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewUnitOfMeasurement">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateUnitOfMeasurement">Update Unit of Measurement</button>
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
                componentVal: 'Unit of Measurement',
                ifReady: false,
                unit_of_measurements: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/unit-of-measurements/' + this.$route.params.id).then(res => {
                    console.log(res)
                    this.unit_of_measurements = res.data.unitOfMeasurement;
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewUnitOfMeasurement() {
                this.$router.push({
                    name: 'unit-of-measurements.view',
                    params: { id: this.$route.params.id }
                });
            },
            updateUnitOfMeasurement() {
                this.ifReady = false;
                axios.put('/api/unit-of-measurements/' + this.$route.params.id, this.$data.unit_of_measurements).then(res => {
                    this.ifReady = true;
                    this.$router.push({ name: 'unit-of-measurements.index' });
                }).catch(err => {
                    this.ifReady = true;
                    alert("Error!");
                    console.log(err);
                });
            }
        }
    }
</script>
