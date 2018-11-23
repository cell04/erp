<template>
    <div>
        <div class="card">
            <div class="card-header">
                Unit of Measurements / Create New UOM
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewUnitOfMeasurement">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Abbreviation</label>
                            <input type="text" class="form-control" v-model="abbreviation" autocomplete="off" minlength="1" maxlength="255" required>
                        </div>
                        
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewUOM"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New UOM</button>
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
                name:'',
                abbreviation: '',
            };
        },

        methods: {
            viewUOM() {
                this.$router.push({ name: 'unit-of-measurements.index' });
            },

            createNewUnitOfMeasurement() {
                this.ifReady = false;
                axios.post('/api/unit-of-measurements', this.$data).then(res => {
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
