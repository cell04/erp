<template>
    <div>
        <div class="content-title">
            <h4 class="module-title">ITEM</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewItems">Items</a>
                    <a class="text-secondary"> / Edit Item</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="editWarehouse">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>

                            <div class="form-group">
                                <label for="name">SKU</label>
                                <input type="text" class="form-control" v-model="stock_keeping_unit" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>

                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control" v-model="description" autocomplete="off" minlength="2" maxlength="255" required ></textarea>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Item Type</label>
                                        <vue-select v-model="itemTypeId" @input="selectItemType()" label="name" :options="itemTypesList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label> Item Subtype</label>
                                        <vue-select v-model="itemClassId" @input="selectClassType()" label="name" :options="itemClassList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>UOM</label>
                                        <vue-select v-model="itemUnitId" @input="selectUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewItems"><i class="fas fa-chevron-left"></i> Back</button>
                            <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateItem"><i class="fas fa-edit"></i> Update Item</button>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ifReady: true,
                itemTypeId: null,
                itemClassId: null,
                itemUnitId: null,
                itemTypesList: [],
                itemClassList: [],
                itemUnitList: [],
                item_type_id: '',
                item_classification_id: '',
                id: '',
                stock_keeping_unit: '',
                default_unit_of_measurement_id: '',
                name: '',
                description: '',
                status: 1
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/items/' + this.$route.params.id).then(res => {
                    // console.log('Items: ' + JSON.stringify(res.data));
                    this.id = res.data.item.id;
                    this.name = res.data.item.name;
                    this.description = res.data.item.description;
                    this.stock_keeping_unit = res.data.item.stock_keeping_unit;
                    this.item_type_id = res.data.item.item_type_id;
                    this.item_classification_id = res.data.item.item_classification_id;
                    this.default_unit_of_measurement_id = res.data.item.default_unit_of_measurement_id;

                    this.itemTypeId = res.data.item.item_type;
                    this.itemClassId = res.data.item.item_classification;
                    this.itemUnitId = res.data.item.default_unit_of_measurement;
                    this.getItemType();
                    this.getClassType();
                    this.getUnit();
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

            selectClassType() {
                this.item_classification_id = this.itemClassId.id;
                console.log('GetItemClassId: ' + this.item_classification_id);
            },

            selectUnit() {
                this.default_unit_of_measurement_id = this.itemUnitId.id;
                console.log('GetUnitId: ' + this.default_unit_of_measurement_id);
            },

            getItemType() {
                let promise = new Promise((resolve, reject) => {
                    axios.get('/api/item-types/get-all-item-types/').then(res2 => {
                        // console.log('Items: ' + JSON.stringify(res2.data));
                        this.itemTypesList = res2.data.item_types;
                        resolve();
                    });
                });
            },

            getClassType() {
                let promise = new Promise((resolve, reject) => {
                    axios.get('/api/item-classifications/get-all-item-classifications/').then(res3 => {
                        // console.log('Items: ' + JSON.stringify(res3.data));
                        this.itemClassList = res3.data.item_classifications;
                        resolve();
                    });
                });
            },

            getUnit() {
                let promise = new Promise((resolve, reject) => {
                    axios.get('/api/unit-of-measurements/get-all-unit-of-measurements/').then(res3 => {
                        // console.log('Items: ' + JSON.stringify(res3.data));
                        this.itemUnitList = res3.data.unit_of_measurements;
                        resolve();
                    });
                });
            },

            viewItems() {
                this.$router.push({
                    name: "items.index"
                });
            },
            updateItem() {
                this.ifReady = false;

                axios.patch('/api/items/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'items.view',
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
