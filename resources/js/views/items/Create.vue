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

                                <div class="col-md-6" v-show="!withComponent">
                                    <div class="form-group">
                                        <label>Purchase UOM</label>
                                        <vue-select v-model="purchaseItemUnitId" @input="selectPurchaseItemUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-6" v-show="!withComponent">
                                    <div class="form-group">
                                        <label>Default UOM</label>
                                        <vue-select v-model="defaultItemUnitId" @input="selectDefaultItemUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>

                                <div class="col-md-6" v-show="withComponent">
                                    <div class="form-group">
                                        <label>Selling UOM</label>
                                        <vue-select v-model="defaultItemUnitId" @input="selectDefaultItemUnit()" label="name" :options="itemUnitList"></vue-select>
                                    </div>
                                </div>

                                <div class="col" v-if="conversionsList.length != 0">
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
                                                        <td>{{ item_conversion.from_value }} {{ item_conversion.convertFrom.name }}</td>
                                                        <td>{{ item_conversion.to_value }} {{ item_conversion.convertTo.name }}</td>
                                                        <td>{{ item_conversion.module_name }}</td>
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
                withComponent: null,
                with_component: null,
                itemTypeId: {},
                itemClassId: {},
                defaultItemUnitId: {},
                purchaseItemUnitId: {},
                item_type_id: '',
                item_classification_id: '',
                name: '',
                description: '',
                stock_keeping_unit: '',
                default_unit_of_measurement_id: '',
                purchase_unit_of_measurement_id: '',
                itemTypesList: [],
                itemClassList: [],
                itemUnitList: [],
                selectedConversion : {},
                selectedConversionModule : {},
                accountsList: [],
                itemClassificationsList: [],
                unitsList: [],
                defaultUnitsList: [],
                conversionsList: [],
                item_conversions: [],
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
                    this.with_component = 'yes';
                } else {
                    this.with_component = 'no';
                }
            },

            addNewItem() {

                this.item_conversions.push({
                    module: this.selectedConversionModule.value,
                    module_name: this.selectedConversionModule.name,
                    conversion_id: this.selectedConversion.id,
                    convertFrom: this.selectedConversion.convert_from,
                    from_value: this.selectedConversion.from_value,
                    convertTo: this.selectedConversion.convert_to,
                    to_value: this.selectedConversion.to_value
                });
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

            selectDefaultItemUnit() {
                this.default_unit_of_measurement_id = this.defaultItemUnitId.id;
                console.log('GetDefaultItemUnitId: ' + this.default_unit_of_measurement_id);
                this.getConversions();
                this.item_conversions = [];
                this.selectedConversion = {};
                this.selectedConversionModule = {};
            },

            selectPurchaseItemUnit() {
                this.purchase_unit_of_measurement_id = this.purchaseItemUnitId.id;
                this.conversionsList = [];
                this.defaultItemUnitId = {};
                this.item_conversions = [];
                this.selectedConversion = {};
                this.selectedConversionModule = {};
                console.log('GetPurchaseItemUnitId: ' + this.purchase_unit_of_measurement_id);
            },

            selectItemType() {
                this.item_type_id = this.itemTypeId.id;
                this.itemClassList = this.itemTypeId.item_classifications;
                this.itemClassId = {};
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
<style>
    .dateStyle input:read-only {
        background-color: #ffffff !important;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 90px;
        height: 34px;
    }
  
    .switch input {display:none;}
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #8E8E8E;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + .slider {
        background-color: #0CC27E;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(55px);
        -ms-transform: translateX(55px);
        transform: translateX(55px);
    }
    
    /*------ ADDED CSS ---------*/
    .on
    {
        display: none;
    }
    
    .on, .off
    {
        color: white;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
    }
    
    .on 
    {
        left: 45%;
    }
    
    .off 
    {
        left: 55%;
    }
    
    input:checked+ .slider .on
    {display: block;}
    
    input:checked + .slider .off
    {display: none;}
    
    /*--------- END --------*/
    
    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
</style>
