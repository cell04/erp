<template>
    <div class="card">
        <div class="card-header">
            Item Types / Edit Item Type
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <fieldset>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" id="name">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="name">Display Name</label>
                            <input type="text" class="form-control" v-model="display_name" id="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" v-model="description" id="description"></textarea>
                    </div>
                </fieldset>

                <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="viewItemTypes">Back</button>
                <button type="button" class="btn btn-success btn-sm" :disabled="isDisabled" @click.prevent="updateItemType">Update Item Type</button>
            </div>
            <div v-else>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
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
                name: '',
                display_name:'',
                description: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-types/' + this.$route.params.id).then(res => {
                    this.name         = res.data.itemType.name;
                    this.display_name = res.data.itemType.display_name;
                    this.description  = res.data.itemType.description;

                    resolve();
                }).catch(err => {
                    console.log(err);
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewItemTypes() {
                this.$router.push({
                    name: 'item-types.view',
                    params: { id: this.$route.params.id }
                });
            },
            updateItemType() {
                this.ifReady = false;

                axios.put('/api/item-types/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'item-types.view',
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
