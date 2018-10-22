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
                            <label>From</label>
                            <input type="number" class="form-control" placeholder="0" v-model="conversion.from_value" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Select Unit of Measurement</label>
                            <vue-select v-model="unitOfMeasurementFrom" @input="selectUnitFrom()" label="name" :options="unit_of_measurements"></vue-select>
                        </div>

                        <!-- <div class="form-group">
                            <select class="form-control" v-model="conversion.unit_of_measurement_from_id" required>
                                <option value="" disabled hidden>Select Unit of Measurement</option>
                                <option v-for="unit in unit_of_measurements" v-bind:value="unit.id">{{ unit.name }}</option>
                            </select>
                        </div> -->

                        <div class="form-group">
                            <label>To</label>
                            <input type="number" class="form-control" placeholder="0" v-model="conversion.to_value" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Select Unit of Measurement</label>
                            <vue-select v-model="unitOfMeasurementTo" @input="selectUnitTo()" label="name" :options="unit_of_measurements"></vue-select>
                        </div>

                        <!-- <div class="form-group">
                            <select class="form-control" v-model="conversion.unit_of_measurement_to_id" required>
                                <option value="" disabled hidden>Select Unit of Measurement</option>
                                <option v-for="unit in unit_of_measurements" v-bind:value="unit.id">{{ unit.name }}</option>
                            </select>
                        </div> -->

                        <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewConversion">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateConversion">Update Conversion</button>
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
                componentVal: 'Conversion',
                ifReady: false,
                unitOfMeasurementFrom: null,
                unitOfMeasurementTo: null,
                unit_of_measurements: [],
                conversion: '',
                unit_of_measurement_from_id: '',
                unit_of_measurement_to_id: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/conversions/' + this.$route.params.id).then(res => {
                    console.log('Conversions: ' + JSON.stringify(res.data.conversion));
                    this.conversion = res.data.conversion;
                    this.unitOfMeasurementFrom = res.data.conversion.convert_from;
                    this.unitOfMeasurementTo = res.data.conversion.convert_to;
                    if (!res.data.response) {
                    return;
                    }
                    resolve();
                });
            });

            let promise2 = new Promise((resolve, reject) => {
                axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(res2 => {
                    console.log(res2);
                    this.unit_of_measurements = res2.data.unit_of_measurements;
                    if (!res2.data.response) {
                    return;
                    }
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });


            promise2.then(() => {
                this.ifReady = true;
            });
            
        },

        methods: {
            selectUnitFrom(){
                this.conversion.unit_of_measurement_from_id = this.unitOfMeasurementFrom.id;
                console.log('unitMeasurementFrom: ' + this.conversion.unit_of_measurement_from_id);
            },

            selectUnitTo(){
                this.conversion.unit_of_measurement_to_id = this.unitOfMeasurementTo.id;
                console.log('unitMeasurementTo: ' + this.conversion.unit_of_measurement_to_id);
            },

            viewConversion() {
                this.$router.push({
                    name: 'conversions.view',
                    params: { id: this.$route.params.id }
                });
            },
            updateConversion() {
                this.ifReady = false;
                axios.put('/api/conversions/' + this.$route.params.id, this.$data.conversion).then(res => {
                    this.ifReady = true;
                    this.$router.push({ name: 'conversions.index' });
                }).catch(err => {
                    this.ifReady = true;
                    alert("Error!");
                    console.log(err);
                });
            }
        }
    }
</script>
