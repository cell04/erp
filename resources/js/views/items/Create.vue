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
                    <a class="text-secondary"> / Create New Item</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <form v-on:submit.prevent="createNewItem">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>SKU</label>
                                        <input class="form-control" v-model="stock_keeping_unit" maxlength="1000" required></input>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" v-model="description" maxlength="1000" required></textarea>
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
                                        <vue-select v-model="itemClassId" @input="selectItemClass()" label="name" :options="itemClassList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>UOM</label>
                                        <vue-select v-model="itemUnitId" @input="selectItemUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewItems"><i class="fas fa-chevron-left"></i> Back</button>
                            <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Item</button>

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
                newItem: {
                    purchase_price: "",
                    asset_account_id: "",
                    cogs_account_id: "",
                    expense_account_id: "",
                    sales_account_id: "",
                    default_unit_id: "",
                    purchase_unit_id: "",
                    conversion_id: "",
                    conversions: [{
                        conversion_id: ""
                    }]
                },
                itemTypeId: null,
                itemClassId: null,
                itemUnitId: null,
                item_type_id: '',
                item_classification_id: '',
                name: '',
                description: '',
                stock_keeping_unit: '',
                default_unit_of_measurement_id: '',
                itemTypesList: [],
                itemClassList: [],
                itemUnitList: [],

                accountsList: [],
                itemClassificationsList: [],
                unitsList: [],
                defaultUnitsList: [],
                conversionsList: []
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/item-types/get-all-item-types/").then(res => {
                    console.log(res);
                    this.ifReady = true;
                    this.itemTypesList = res.data.item_types;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseItemClass = new Promise((resolve, reject) => {
                axios.get("/api/item-classifications/get-all-item-classifications/").then(res => {
                    // console.log('getItemClass: ' + JSON.stringify(res.data.item_classifications));
                    this.ifReady = true;
                    this.itemClassList = res.data.item_classifications;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            let promiseUnit = new Promise((resolve, reject) => {
                axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(res => {
                    // console.log('getUnit: ' + JSON.stringify(res.data));
                    this.ifReady = true;
                    this.itemUnitList = res.data.unit_of_measurements;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });
        },

        methods: {
            viewItems() {
                this.$router.push({ name: 'items.index' });
            },

            selectItemUnit() {
                this.default_unit_of_measurement_id = this.itemUnitId.id;
                console.log('GetItemUnitId: ' + this.default_unit_of_measurement_id);
            },

            selectItemType() {
                this.item_type_id = this.itemTypeId.id;
                console.log('GetItemTypeId: ' + this.item_type_id);
            },

            selectItemClass() {
                this.item_classification_id = this.itemClassId.id;
                console.log('GetItemClassId: ' + this.item_classification_id);
            },

            createNewItem() {
                this.ifReady = false;

                axios.post("/api/items", this.$data).then(res => {
                    this.$router.push({ name: "items.index" });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }

        }
    };
</script>
