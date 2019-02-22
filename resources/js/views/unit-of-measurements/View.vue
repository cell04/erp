<template>
    <div>
        <div class="card">
            <div class="card-header">
                <a class="text-success" href="" @click.prevent="viewUnitOfMeasurements">Unit of Measurements</a>
                <a class="text-secondary"> / View Unit of Measurement</a>
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="unit_of_measurements.name">
                        </div>

                        <div class="form-group">
                            <label for="name">Abbreviation</label>
                            <input type="text" class="form-control" v-model="unit_of_measurements.abbreviation">
                        </div>

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Default</label><br />
                                <label class="switch">
                                    <input type="checkbox" v-model="defaultValue" disabled/>
                                    <span class="slider round">
                                        <span class="on">{{'Yes'}}</span>
                                        <span class="off">{{'No'}}</span>
                                    </span>
                                </label>
                            </div>
                        </div>

                    </fieldset>

                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewUnitOfMeasurements"><i class="fas fa-chevron-left"></i> Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editUnitOfMeasurements"><i class="fas fa-edit"></i>  Edit UOM</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteUnitOfMeasurementModal"><i class="fas fa-trash-alt"></i> Delete UOM</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteUnitOfMeasurementModal" tabindex="-1" role="dialog" aria-labelledby="deleteUnitOfMeasurementTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this UOM?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this UOM? <br><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteCorporation">Confirm Delete</button>
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
            viewUnitOfMeasurements() {
                this.$router.push({
                    name: 'unit-of-measurements.index'
                });
            },
            editUnitOfMeasurements() {
                this.$router.push({
                    name: 'unit-of-measurements.edit',
                    params: { id: this.unit_of_measurements.id }
                });
            },
            openDeleteUnitOfMeasurementModal() {
                $('#deleteUnitOfMeasurementModal').modal('show');
            },
            deleteCorporation() {
                $('#deleteUnitOfMeasurementModal').modal('hide');

                axios.delete('/api/unit-of-measurements/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'unit-of-measurements.index' });
                }).catch(err => {
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
