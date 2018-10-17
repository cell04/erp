<template>
    <div>
        <div class="card">
            <div class="card-header">
                General Items / Create New General Item
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewGeneralItem">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" v-model="description" maxlength="1000" required></textarea>
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Item Type</button>
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
                description: ''
            };
        },

        methods: {
            createNewGeneralItem () {
                console.log(this.$data)
                  axios.post('/api/general-items', this.$data).then(res => {
                   console.log(JSON.stringify(res.data))
                  this.$router.push({ name: 'item-types.index' })
                }).catch(err => {
                    console.log(err);
                });
            },
        }
    }
</script>
