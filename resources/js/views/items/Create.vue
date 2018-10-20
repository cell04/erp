<template>
    <div>
        <div class="card">
            <div class="card-header">
                Items / Create New Item
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
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Item</button>

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
                item_type_id: '',
                item_classification_id: '',
                name: '',
                description: '',
                stock_keeping_unit: '',
                itemTypesList: [],
                itemClassList: [],

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
        },

        methods: {
            selectItemType(id) {
                this.item_type_id = id;
            },
            selectItemClass(id) {
                this.item_classification_id = id;
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
