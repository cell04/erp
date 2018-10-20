<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}}s / View {{componentVal}}
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

                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewUnitOfMeasurements">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editUnitOfMeasurements">Edit Unit of Measurement</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteUnitOfMeasurementModal">Delete Unit of Measurement</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteUnitOfMeasurementModal" tabindex="-1" role="dialog" aria-labelledby="deleteCorporationTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Unit of Measurement?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Unit of Measurement? <br><br>
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
