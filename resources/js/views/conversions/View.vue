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
                            <label for="name">From</label>
                            <input type="text" class="form-control" v-model="conversions.from_value">
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" v-model="conversions.convert_from.name">
                        </div>

                        <div class="form-group">
                            <label for="name">To</label>
                            <input type="text" class="form-control" v-model="conversions.to_value">
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" v-model="conversions.convert_to.name">
                        </div>

                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewUnitOfMeasurements">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editUnitOfMeasurements">Edit {{componentVal}}</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteConversionModal">Delete {{componentVal}}</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteConversionModal" tabindex="-1" role="dialog" aria-labelledby="deleteConversionTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this {{componentVal}}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this {{componentVal}}? <br><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteConversion">Confirm Delete</button>
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
                componentVal: 'Conversion',
                ifReady: false,
                conversions: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/conversions/' + this.$route.params.id).then(res => {
                    console.log(res)
                    this.conversions = res.data.conversion;
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
                    name: 'conversions.index'
                });
            },
            editUnitOfMeasurements() {
                this.$router.push({
                    name: 'conversions.edit',
                    params: { id: this.conversions.id }
                });
            },
            openDeleteConversionModal() {
                $('#deleteConversionModal').modal('show');
            },
            deleteConversion() {
                $('#deleteConversionModal').modal('hide');

                axios.delete('/api/conversions/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'conversions.index' });
                }).catch(err => {
                    alert("Error!");
                    console.log(err);
                });
            }
        }
    }
</script>
