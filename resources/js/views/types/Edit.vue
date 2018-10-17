<template>
    <div>
        <div class="card">
            <div class="card-header">
                Types / Edit Type
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editType">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="description" required></textarea>
                        </div>

                        <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewType">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateType">Update Type</button>
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
            ifReady: false,
            id: '',
            name: '',
            description: ''
        };
    },

    mounted() {
        let promise = new Promise((resolve, reject) => {
            axios.get('/api/types/' + this.$route.params.id).then(res => {
                this.id          = res.data.type.id;
                this.name        = res.data.type.name;
                this.description = res.data.type.description;

                resolve();
            });
        });

        promise.then(() => {
            this.ifReady = true;
        });
    },

    methods: {
        viewType() {
            this.$router.push({
                name: 'types.view',
                params: { id: this.$route.params.id }
            });
        },
        updateType() {
            this.ifReady = false;
            
            axios.patch('/api/types/' + this.$route.params.id, this.$data).then(res => {
                this.$router.push({
                    name: 'types.view',
                    params: { id: this.$route.params.id }
                });
            }).catch(err => {
                this.ifReady = true;
                console.log(err);
            });
        }
    }
}
</script>
