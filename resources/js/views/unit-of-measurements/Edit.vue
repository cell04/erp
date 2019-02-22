<template>
    <div>
        <div class="card">
            <div class="card-header">
                <a class="text-success" href="" @click.prevent="viewUnitOfMeasurement">Unit of Measurements</a>
                <a class="text-secondary"> / Edit Unit of Measurement</a>
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

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Default</label><br />
                                <label class="switch">
                                    <input type="checkbox" v-model="defaultValue" @change="getDefaultValue()">
                                    <span class="slider round">
                                        <span class="on">{{'Yes'}}</span>
                                        <span class="off">{{'No'}}</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewUnitOfMeasurement"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateUnitOfMeasurement"><i class="fas fa-edit"></i> Update UOM</button>
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
                componentVal: 'UOM',
                ifReady: false,
                unit_of_measurements: '',
                defaultValue: null
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/unit-of-measurements/' + this.$route.params.id).then(res => {
                    console.log(res)
                    this.unit_of_measurements = res.data.unitOfMeasurement;
                    if (this.unit_of_measurements.default_value == 'yes') {
                        this.defaultValue = true;
                    } else {    
                        this.defaultValue = false;
                    }   
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

            getDefaultValue() {
                if (this.defaultValue) {
                    this.unit_of_measurements.default_value = 'yes';
                } else {
                    this.unit_of_measurements.default_value = 'no';
                }
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
<style>
    .dateStyle input:read-only {
        background-color: #ffffff !important;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 90px;
        height: 34px;
    }
  
    .switch input {display:none;}
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #8E8E8E;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + .slider {
        background-color: #0CC27E;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(55px);
        -ms-transform: translateX(55px);
        transform: translateX(55px);
    }
    
    /*------ ADDED CSS ---------*/
    .on
    {
        display: none;
    }
    
    .on, .off
    {
        color: white;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
    }
    
    .on 
    {
        left: 45%;
    }
    
    .off 
    {
        left: 55%;
    }
    
    input:checked+ .slider .on
    {display: block;}
    
    input:checked + .slider .off
    {display: none;}
    
    /*--------- END --------*/
    
    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
</style>
