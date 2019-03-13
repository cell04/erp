<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}}s / Create New {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewConversion">
                        <div class="form-group">
                            <label>From</label>
                            <input type="number" class="form-control" placeholder="0" v-model="from_value" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label>Select UOM</label>
                            <vue-select v-model="unitOfMeasurementFrom" @input="selectUnitFrom()" label="name" :options="units"></vue-select>
                        </div>
                        
                        <div class="form-group">
                            <label>To</label>
                            <input type="number" class="form-control" placeholder="0" v-model="to_value" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label>Select UOM</label>
                            <vue-select v-model="unitOfMeasurementTo" @input="selectUnitTo()" label="name" :options="fromUnits"></vue-select>
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Conversion</button>
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
                ifReady: true,
                unitOfMeasurementFrom: null,
                unitOfMeasurementTo: null,
                units: [],
                fromUnits: [],
                unit_of_measurement_from_id:'',
                from_value: '',
                unit_of_measurement_to_id: '',
                to_value: '',
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(res => {
                    // console.log('Units: ' + JSON.stringify(res.data));
                    this.units = res.data.unit_of_measurements;
                    if (!res.data.response) {
                    return;
                    }
                    resolve();
                });
            });
        },

        methods: {
            selectUnitFrom(){
                this.unit_of_measurement_from_id = this.unitOfMeasurementFrom.id;
                this.loadSimilarBaseUnit();
                this.unitOfMeasurementTo = {};
            },

            loadSimilarBaseUnit() {
                let form = {
                    unit_of_measurement_id : this.unit_of_measurement_from_id 
                };

                axios.post("/api/unit-of-measurements/get-the-same-base-unit-of-measurements/", form).then(res => {
                    this.fromUnits = res.data.unit_of_measurements;
                    if (!res.data.response) {
                    return;
                    }
                    resolve();
                });
            },

            selectUnitTo() {
                this.unit_of_measurement_to_id = this.unitOfMeasurementTo.id;
                // console.log('unitMeasurementTo: ' + this.unit_of_measurement_to_id);
            },

            createNewConversion() {
                this.ifReady = false;
                axios.post('/api/conversions', this.$data).then(res => {
                    this.$router.push({ name: 'conversions.index' });
                    this.ifReady = true;
                }).catch(err => {
                    this.ifReady = true;
                    alert("Error!");
                    console.log(err);
                });
            }
        }
    }
</script>
