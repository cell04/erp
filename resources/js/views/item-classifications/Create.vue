<template>
    <div>
        <div class="card">
            <div class="card-header">
                Item Classifications / Create New Item Classification
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewItemClass">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="dname">Display Name</label>
                            <input type="text" class="form-control" v-model="display_name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="desc">Description</label>
                            <textarea class="form-control" v-model="description" required></textarea>
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Item Class</button>
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
                display_name: '',
                description: '',
                status: 1
            };
        },

        methods: {
            createNewItemClass() {
                this.ifReady = false;

                axios.post('/api/item-classifications', this.$data).then(res => {
                    this.$router.push({ name: 'item-classifications.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
