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
                                        <input class="form-control" v-model="stock_keeping_unit" maxlength="1000" required/>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" v-model="description" maxlength="1000" required></textarea>
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
                                        <vue-select v-model="itemClassId" @input="selectItemClass()" label="name" :options="itemClassList"></vue-select>
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
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Selling UOM</label>
                                        <vue-select v-model="sellingItemUnitId" @input="selectSellingItemUnit()" label="name" :options="itemUnitList" required></vue-select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6" v-show="availableUOM.length != 0">
                                    <div class="form-group">
                                        <label>Purchase UOM</label>
                                        <vue-select v-model="purchaseItemUnitId" @input="selectPurchaseItemUnit()" label="name" :options="availableUOM"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-6" v-show="availableUOM.length != 0">
                                    <div class="form-group">
                                        <label>Default UOM</label>
                                        <vue-select v-model="defaultItemUnitId" @input="selectDefaultItemUnit()" label="name" :options="availableUOM"></vue-select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col" v-if="conversionsList.length != 0">
                                    <div class="card">
                                        <div class="card-header">
                                            <a class="text-success">Conversion Section</a>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedConversion.conversion" label="name" :options="conversionsList"></vue-select>
                                                    </div>
                                                </div>
                                                <!-- <div class="col-md-3">
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedConversion.module" label="name" :options="conversionModules"></vue-select>
                                                    </div>
                                                </div> -->
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
                                                        <!-- <th scope="col">Module</th> -->
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item_conversion, index) in item_conversions" :key="index">
                                                        <td>{{ item_conversion.from_value }} {{ item_conversion.convertFrom.name }}</td>
                                                        <td>{{ item_conversion.to_value }} {{ item_conversion.convertTo.name }}</td>
                                                        <!-- <td>{{ item_conversion.module_name }}</td> -->
                                                        <td>
                                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteRow(index)"><i class="far fa-times-circle"></i></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col" v-if="withComponent">
                                    <div class="card">
                                        <div class="card-header">
                                            <a class="text-success">Component Section</a>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Item</label>
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedComponent.item" @input="selectComponent()" label="name" :options="items"></vue-select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>Quantity</label>
                                                        <input class="form-control" v-model="selectedComponent.quantity" type="number"/>
                                                    </div>
                                                </div>
                                                <!-- <div class="col-md-3">
                                                    <label>Unit</label>
                                                    <div class="form-group">
                                                        <vue-select v-model="selectedComponent.unit" label="name" :options="itemUnitList"></vue-select>
                                                    </div>
                                                </div> -->
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>UOM</label>
                                                        <input type="text" class="form-control" v-model="selectedComponent.unit_name"  disabled>
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
                                                        <td>{{ item_component.item.name }}</td>
                                                        <td>{{ item_component.quantity }} </td>
                                                        <td>{{ item_component.unit.name }}</td>
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
                    item_conversions: [{
                        conversion_id: ""
                    }]
                },
                items: [],
                item_components: [],
                selectedComponent: {},
                withComponent: false,
                with_component: 'no',
                itemTypeId: {},
                itemClassId: {},
                defaultItemUnitId: {},
                purchaseItemUnitId: {},
                sellingItemUnitId: {},
                item_type_id: '',
                item_classification_id: '',
                name: '',
                description: '',
                stock_keeping_unit: '',
                default_unit_of_measurement_id: '',
                selling_unit_of_measurement_id: null,
                purchase_unit_of_measurement_id: '',
                itemTypesList: [],
                itemClassList: [],
                itemUnitList: [],
                availableUOM: [],
                selectedConversion : {},
                accountsList: [],
                itemClassificationsList: [],
                unitsList: [],
                defaultUnitsList: [],
                conversionsList: [],
                item_conversions: []
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

            let promiseUnit = new Promise((resolve, reject) => {
                axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(res => {
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

            getWithComponentValue() {
                if (this.withComponent) {
                    this.item_conversions = [];
                    this.default_unit_of_measurement_id = null;
                    this.purchase_unit_of_measurement_id = null;
                    this.with_component = 'yes';
                } else {
                    this.with_component = 'no';
                    this.item_components = [];
                }
            },

            selectComponent() {
                this.selectedComponent.unit_name = this.selectedComponent.item.selling_unit_of_measurement.name;
                this.selectedComponent.unit = this.selectedComponent.item.selling_unit_of_measurement;
            },

            addNewItem() {
                this.item_conversions.push({
                    conversion_id: this.selectedConversion.conversion.id,
                    convertFrom: this.selectedConversion.conversion.convert_from,
                    from_value: this.selectedConversion.conversion.from_value,
                    convertTo: this.selectedConversion.conversion.convert_to,
                    to_value: this.selectedConversion.conversion.to_value
                });

                this.selectedConversion = {};
            },

            addNewItemComponent() {
                this.item_components.push({
                    component_id: this.selectedComponent.item.id,
                    item: this.selectedComponent.item,
                    unit: this.selectedComponent.unit,
                    unit_of_measurement_id: this.selectedComponent.unit.id,
                    quantity: this.selectedComponent.quantity,
                    converter_value: 1
                    // unit_price: 0
                });

                this.selectedComponent = {};
            },

            // selectConversion() {

            //     let promise = new Promise((resolve, reject) => {
            //         axios.get("/api/conversions/" + this.selectedConversion.id).then(res => {
            //             this.selectedConversion = res.data.conversion;
            //             resolve();
            //         }).catch(err => {
            //             console.log(err);
            //             reject();
            //         });
            //     });

            //     console.log(this.selectedConversion);
            // },

            deleteRow(index) {
                this.item_conversions.splice(index, 1);
            },

            deleteComponentRow(index) {
                this.item_components.splice(index, 1);
            },

            // getConversions() {
            //     let formData = {
            //         purchase_unit_of_measurement_id: this.purchase_unit_of_measurement_id,
            //         default_unit_of_measurement_id: this.default_unit_of_measurement_id
            //     };

            //     if (this.purchase_unit_of_measurement_id && this.default_unit_of_measurement_id) {
            //         axios.post("/api/items/conversions", formData).then(res => {
            //         console.log(res.data.conversions);
            //         this.conversionsList = res.data.conversions;
            //         }).catch(err => {
            //             console.log(err);
            //             alert(`Error! No Result`);
            //             this.conversionsList = [];
            //             this.ifReady = true;
            //         });
            //     }
            // },

            getConversions() {
                let formData = {
                    selling_unit_of_measurement_id: this.selling_unit_of_measurement_id
                };

                if (this.selling_unit_of_measurement_id) {
                    axios.post("/api/items/conversions", formData).then(res => {
                    console.log(res.data.conversions);
                    this.availableUOM = res.data.conversions.availableUOM;
                    this.conversionsList = res.data.conversions.conversions;
                    }).catch(err => {
                        console.log(err);
                        alert(`Error! No Result`);
                        this.conversionsList = [];
                        this.ifReady = true;
                    });
                }
            },

            selectDefaultItemUnit() {
                this.default_unit_of_measurement_id = this.defaultItemUnitId.id;
                console.log('GetDefaultItemUnitId: ' + this.default_unit_of_measurement_id);
                // this.getConversions();
                // this.item_conversions = [];
                // this.selectedConversion = {};
                // this.selectedConversionModule = {};
            },

            selectSellingItemUnit() {
                this.selling_unit_of_measurement_id = this.sellingItemUnitId.id;
                this.getConversions();
                this.conversionsList = [];
                this.defaultItemUnitId = {};
                this.purchaseItemUnitId = {};
                this.item_conversions = [];
                this.selectedConversion = {};
                this.selectedConversionModule = {};
            },

            selectPurchaseItemUnit() {
                this.purchase_unit_of_measurement_id = this.purchaseItemUnitId.id;
                console.log('GetPurchaseItemUnitId: ' + this.purchase_unit_of_measurement_id);
            },

            selectItemType() {
                this.item_type_id = this.itemTypeId.id;
                this.itemClassList = this.itemTypeId.item_classifications;
                // this.itemClassId = {};
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
