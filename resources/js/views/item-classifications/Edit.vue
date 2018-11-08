<template>
    <div>
        <div class="card">
            <div class="card-header">
                Item Classifications / Edit Item Classification
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editItemClassification">

                        <div class="form-group">
                            <label>Item Type</label>
                            <vue-select v-model="itemTypeId" @input="selectItemType()" label="name" :options="itemTypesList"></vue-select>
                        </div>

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="name">Display Name</label>
                            <input type="text" class="form-control" v-model="display_name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="name">Description</label>
                            <input type="text" class="form-control" v-model="description" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewItemClassification"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateItemClassification"><i class="fas fa-edit"></i> Update Item Class</button>
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
                itemTypesList: [],
                itemTypeId: null,
                id: '',
                item_type_id: '',
                name: '',
                display_name: '',
                description: '',
                status: 1
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-classifications/' + this.$route.params.id).then(res => {
                    console.log('Item Class:' + JSON.stringify(res.data))
                    this.id = res.data.itemClassification.id;
                    this.name = res.data.itemClassification.name;
                    this.display_name = res.data.itemClassification.display_name;
                    this.description = res.data.itemClassification.description;
                    this.itemTypeId = res.data.itemClassification.item_type;
                    this.getAllItemType();
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            selectItemType() {
                this.item_type_id = this.itemTypeId.id;
                console.log('GetItemTypeId: ' + this.item_type_id);
            },

            getAllItemType() {
                new Promise((resolve, reject) => {
                axios.get("/api/item-types/get-all-item-types/").then(res => {
                    this.itemTypesList = res.data.item_types;
                    // console.log('getItemType: ' + JSON.stringify(res.data));
                        if (!res.data.response) {
                            return;
                        }
                        resolve();
                    });
                });
            },

            viewItemClassification() {
                this.$router.push({
                    name: 'item-classifications.index'
                });
            },
            updateItemClassification() {
                this.ifReady = false;

                axios.patch('/api/item-classifications/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'item-classifications.view',
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
