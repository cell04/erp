<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
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

                            <!-- <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control" v-model="description" autocomplete="off" minlength="2" maxlength="255" required ></textarea>
                            </div> -->

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Item Type</label>
                                        <vue-select v-model="itemTypeId" @input="selectItemType()" label="name" :options="itemTypesList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label> Item Subtype</label>
                                        <vue-select v-model="itemClassId" @input="selectClassType()" label="name" :options="itemClassList"></vue-select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>With Components</label><br />
                                    <label class="switch">
                                        <input type="checkbox" v-model="withComponent" @change="getWithComponentValue()">
                                        <span class="slider round">
                                            <span class="on">{{'Yes'}}</span>
                                            <span class="off">{{'No'}}</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6" v-if="!withComponent">
                                    <div class="form-group">
                                        <label>Purchase UOM</label>
                                        <vue-select v-model="purchaseItemUnitId" @input="selectPurchaseUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-6" v-if="!withComponent">
                                    <div class="form-group">
                                        <label>Default UOM</label>
                                        <vue-select v-model="defaultItemUnitId" @input="selectDefaultUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-6" v-if="withComponent">
                                    <div class="form-group">
                                        <label>Selling UOM</label>
                                        <vue-select v-model="sellingItemUnitId" @input="selectSellingUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col" v-if="conversionsList.length != 0 && !withComponent">
                                    <div class="card">
                                        <div class="card-header">
                                            <a class="text-success">Conversion Section</a>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedConversion" label="name" :options="conversionsList"></vue-select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedConversionModule" label="name" :options="conversionModules"></vue-select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <button type="button" class="btn btn-success" @click="addNewItem"><i class="fas fa-plus"></i> Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <table class="table table-hover table-sm">
                                                <caption>
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                        </div>
                                                    </div>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">From</th>
                                                        <th scope="col">To</th>
                                                        <th scope="col">Module</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item_conversion, index) in item_conversions" :key="index">
                                                        <td>{{ item_conversion.conversion.from_value }} {{ item_conversion.conversion.convert_from.name }}</td>
                                                        <td>{{ item_conversion.conversion.to_value }} {{ item_conversion.conversion.convert_to.name }}</td>
                                                        <td v-if="item_conversion.module === 1">
                                                            Invetory
                                                        </td>
                                                        <td v-if="item_conversion.module === 2">
                                                            Recipe
                                                        </td>
                                                        <td>
                                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)"><i class="far fa-times-circle"></i></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col" v-if="withComponent">
                                    <div class="card">
                                        <div class="card-header">
                                            <a class="text-success">Component Section</a>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <label>Item</label>
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedComponent.component" label="name" :options="items"></vue-select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Quantity</label>
                                                        <input class="form-control" v-model="selectedComponent.quantity" type="number"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <label>Unit</label>
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedComponent.unit_of_measurement" label="name" :options="itemUnitList"></vue-select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <label>Action</label>
                                                    <div class="form-group">
                                                        <button type="button" class="btn btn-success" @click="addNewItemComponent"><i class="fas fa-plus"></i> Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <table class="table table-hover table-sm">
                                                <caption>
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                        </div>
                                                    </div>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">UOM</th>
                                                        <!-- <th scope="col">Unit Price</th> -->
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item_component, index) in item_components" :key="index">
                                                        <td>{{ item_component.component.name }}</td>
                                                        <td>{{ item_component.quantity }} </td>
                                                        <td>{{ item_component.unit_of_measurement.name }}</td>
                                                        <!-- <td>{{ item_component.unit_price }}</td> -->
                                                        <td>
                                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteComponentRow(index)"><i class="far fa-times-circle"></i></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
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
                items: [],
                withComponent: null,
                itemTypeId: {},
                itemClassId: {},
                item_components: [],
                defaultItemUnitId: {},
                purchaseItemUnitId: {},
                sellingItemUnitId: {},
                itemTypesList: [],
                itemClassList: [],
                itemUnitList: [],
                item_type_id: '',
                selectedComponent: {},
                item_classification_id: '',
                id: '',
                stock_keeping_unit: '',
                default_unit_of_measurement_id: '',
                purchase_unit_of_measurement_id: '',
                selling_unit_of_measurement_id: null,
                with_component: null,
                name: '',
                description: '',
                status: 1,
                conversionsList: [],
                item_conversions: [],
                selectedConversionModule: {},
                selectedConversion : {},
                conversionModules : [
                    {
                        value : 1,
                        name : "Inventory"
                    },
                    {
                        value : 2,
                        name : "Recipe"
                    }
                ]
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
                    this.purchase_unit_of_measurement_id = res.data.item.purchase_unit_of_measurement_id;
                    this.selling_unit_of_measurement_id = res.data.item.selling_unit_of_measurement_id;
                    this.itemTypeId = res.data.item.item_type;
                    this.item_components = res.data.item.item_components;
                    this.itemClassId = res.data.item.item_classification;
                    this.defaultItemUnitId = res.data.item.default_unit_of_measurement;
                    this.purchaseItemUnitId = res.data.item.purchase_unit_of_measurement;
                    this.sellingItemUnitId = res.data.item.selling_unit_of_measurement;
                    this.item_conversions = res.data.item.item_conversions;
                    this.itemClassList = res.data.item.item_type.item_classifications;
                    this.with_component = res.data.item.with_component;
                    this.getItemType();
                    this.getClassType();
                    this.getUnit();
                    this.getConversions();
                    if (this.with_component === 'yes') {
                        this.withComponent = true;
                    } else {
                        this.withComponent = false;
                    }
                    resolve();
                });

                axios.get("/api/items/get-all-items").then(res => {
                    console.log(res);
                    this.ifReady = true;
                    this.items = res.data.items;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });
            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            getWithComponentValue() {
                if (this.withComponent) {
                    this.with_component = 'yes';
                } else {
                    this.with_component = 'no';
                }
            },
            addNewItemComponent() {
                this.item_components.push({
                    component_id: this.selectedComponent.component.id,
                    component: this.selectedComponent.component,
                    unit_of_measurement: this.selectedComponent.unit_of_measurement,
                    unit_of_measurement_id: this.selectedComponent.unit_of_measurement.id,
                    quantity: this.selectedComponent.quantity,
                    converter_value: 0
                    // unit_price: 0
                });

                this.selectedComponent = {};
            },

            refreshData() {
                this.item_classifications = [];
            },

            selectItemType() {
                this.item_type_id = this.itemTypeId.id;
                this.itemClassList = this.itemTypeId.item_classifications;
                console.log('GetItemTypeId: ' + this.item_type_id);
            },

            addNewItem() {

                // console.log(this.selectedConversion);
                this.item_conversions.push({
                    module: this.selectedConversionModule.value,
                    module_name: this.selectedConversionModule.name,
                    conversion_id: this.selectedConversion.id,
                    conversion: 
                    {
                        convert_from: this.selectedConversion.convert_from,
                        from_value: this.selectedConversion.from_value,
                        convert_to: this.selectedConversion.convert_to,
                        to_value: this.selectedConversion.to_value
                    }
                });

                console.log(this.item_conversions);
            },

            getConversions() {
                let formData = {
                    purchase_unit_of_measurement_id: this.purchase_unit_of_measurement_id,
                    default_unit_of_measurement_id: this.default_unit_of_measurement_id
                };

                console.log(formData);

                axios.post("/api/items/conversions", formData).then(res => {
                    console.log(res.data.conversions);
                    this.conversionsList = res.data.conversions;
                    // this.

                    // this.$router.push({ name: "receive-orders.index" });
                }).catch(err => {
                    console.log(err);
                    alert(`Error! No Result`);
                    this.ifReady = true;
                });
            },

            selectClassType() {
                this.item_classification_id = this.itemClassId.id;
                console.log('GetItemClassId: ' + this.item_classification_id);
            },

            selectDefaultUnit() {
                this.default_unit_of_measurement_id = this.defaultItemUnitId.id;
                this.getConversions();
                this.selectedConversion = {};
                this.selectedConversionModule = {};
                console.log('GetDefaultUnitId: ' + this.default_unit_of_measurement_id);
            },

            selectSellingUnit() {
                this.selling_unit_of_measurement_id = this.sellingItemUnitId.id;
            },

            getConversions() {
                let formData = {
                    purchase_unit_of_measurement_id: this.purchase_unit_of_measurement_id,
                    default_unit_of_measurement_id: this.default_unit_of_measurement_id
                };

                if (this.purchase_unit_of_measurement_id && this.default_unit_of_measurement_id) {
                    axios.post("/api/items/conversions", formData).then(res => {
                    console.log(res.data.conversions);
                    this.conversionsList = res.data.conversions;
                    }).catch(err => {
                        console.log(err);
                        alert(`Error! No Result`);
                        this.conversionsList = [];
                        this.ifReady = true;
                    });
                }
            },

            selectPurchaseUnit() {
                this.purchase_unit_of_measurement_id = this.purchaseItemUnitId.id;
                this.selectedConversion = {};
                this.selectedConversionModule = {};
                console.log('GetPurchaseUnitId: ' + this.purchase_unit_of_measurement_id);
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
                    axios.get('/api/item-classifications/get-all-item-classifications/').then(res => {
                        // console.log('Items: ' + JSON.stringify(res3.data));
                        this.itemClassList = res.data.item_classifications;
                        resolve();
                    });
                });
            },

            getUnit() {
                let promise = new Promise((resolve, reject) => {
                    axios.get('/api/unit-of-measurements/get-all-unit-of-measurements/').then(res => {
                        // console.log('Items: ' + JSON.stringify(res.data));
                        this.itemUnitList = res.data.unit_of_measurements;
                        resolve();
                    });
                });
            },

            viewItems() {
                this.$router.push({
                    name: "items.index"
                });
            },

            deleteRow(index) {
                this.item_conversions.splice(index, 1);
            },

            deleteComponentRow(index) {
                this.item_components.splice(index, 1);
            },

            updateItem() {
                this.ifReady = false;

                if (this.withComponent) {
                    this.item_conversions = [];
                    this.default_unit_of_measurement_id = null;
                    this.purchase_unit_of_measurement_id = null;
                } else {
                    this.selling_unit_of_measurement_id = null;
                    this.item_components = [];
                }

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
