<template>
    <div>
        <div class="card">
            <div class="card-header">
                Items / Edit Item
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
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Type</label>
                                    <select class="form-control" v-model="item_type_id" v-on:change="selectItemType(item_type_id)"  required>
                                        <option value="" disabled hidden>-- Select Item Type --</option>
                                        <option v-for="itemType in itemTypesList" v-bind:value="itemType.id">{{ itemType.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Classification</label>
                                    <select class="form-control" v-model="item_classification_id" v-on:change="selectItemClass(item_classification_id)"  required>
                                        <option value="" disabled hidden>-- Select Item Classification --</option>
                                        <option v-for="itemClass in itemClassList" v-bind:value="itemClass.id">{{ itemClass.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Unit of Measurement</label>
                                    <select class="form-control" v-model="default_unit_of_measurement_id" v-on:change="selectUnit(default_unit_of_measurement_id)"  required>
                                        <option value="" disabled hidden>-- Select Unit of Measurement --</option>
                                        <option v-for="unit in itemUnitList" v-bind:value="unit.id">{{ unit.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewItems">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateItem">Update Item</button>
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
                    console.log('Items: ' + JSON.stringify(res.data));
                    this.id = res.data.item.id;
                    this.name = res.data.item.name;
                    this.description = res.data.item.description;
                    this.stock_keeping_unit = res.data.item.stock_keeping_unit;
                    this.item_type_id = res.data.item.item_type_id;
                    this.item_classification_id = res.data.item.item_classification_id;
                    this.default_unit_of_measurement_id = res.data.item.default_unit_of_measurement_id
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
            selectItemType (id) {
                this.item_type_id = id;
            },

            selectItemClass(id) {
                this.item_classification_id = id;
            },

            selectUnit(id) {
                this.default_unit_of_measurement_id = id;
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
