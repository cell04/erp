<template>
    <div>
        <div class="card">
            <div class="card-header">
                Items / Create New Item
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewItem">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="newItem.name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" v-model="newItem.description" maxlength="1000" required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Type</label>
                                    <select class="form-control" v-model="newItem.item_type_id" v-on:change="onSelectItemType(newItem.item_type_id)" required>
                                        <option value="" disabled hidden>-- Select Item Type --</option>
                                        <option v-for="item in itemTypesList" v-bind:value="item.id">{{ item.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Classification</label>
                                    <select class="form-control" v-model="newItem.classification_type_id" required>
                                        <option value="" disabled hidden>-- Select Item Classification --</option>
                                        <option v-for="itemClass in itemClassList" v-bind:value="itemClass.id">{{ itemClass.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Purchase Unit</label>
                                    <select class="form-control" v-model="newItem.purchase_unit_id" v-on:change="onSelectPurchaseUnit(newItem.purchase_unit_id)" required>
                                        <option value="" disabled hidden>-- Select Purchase Unit --</option>
                                        <option v-for="unit in unitsList" v-bind:value="unit.id">{{ unit.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Default Unit</label>
                                    <select class="form-control" v-model="newItem.default_unit_id" v-on:change="onSelectDefaultUnit(newItem.default_unit_id)" required>
                                        <option value="" disabled hidden>-- Select Default Unit --</option>
                                        <option v-for="unit in unitsList" v-bind:value="unit.id">{{ unit.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div> -->

                        <!-- <br />
                        <br />
                        <table class="table table-hover table-sm" v-if="conversionsList.length>0">
                            <thead>
                                <tr>
                                    <th scope="col">Conversions</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in newItem.conversions">
                                    <td>
                                        <select class="form-control" v-model="item.conversion_id" required>
                                            <option value="" disabled hidden>-- Select Conversion --</option>
                                            <option v-for="conversion in conversionsList" v-bind:value="conversion.id">
                                                {{ conversion.from_value }} {{ conversion.from_unit_name }} = {{ conversion.to_value }} {{ conversion.to_unit_name }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm mt-1"  @click="deleteConversionRow(index)">Remove</button>
                                    </td>
                                </tr>
                                <div class="ml-1">
                                    <button type="button" class="btn btn-raised btn-primary btn-sm mt-2" @click="addConversionRow">
                                        Add Row
                                    </button>
                                </div>

                            </tbody>
                        </table>
                        <br />
                        <br />

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Purchase Price</label>
                                    <input type="number" class="form-control" v-model="newItem.purchase_price" required>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Asset Account</label>
                                    <select class="form-control" v-model="newItem.asset_account_id" required>
                                        <option value="" disabled hidden>-- Select Asset Account --</option>
                                        <option v-for="account in accountsList" v-bind:value="account.id">{{ account.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Cost of Goods Sold Account</label>
                                    <select class="form-control" v-model="newItem.cogs_account_id" required>
                                        <option value="" disabled hidden>-- Select COGS Account --</option>
                                        <option v-for="account in accountsList" v-bind:value="account.id">{{ account.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Expense Account</label>
                                    <select class="form-control" v-model="newItem.expense_account_id" required>
                                        <option value="" disabled hidden>-- Select Expense Account --</option>
                                        <option v-for="account in accountsList" v-bind:value="account.id">{{ account.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Sales Account</label>
                                    <select class="form-control" v-model="newItem.sales_account_id" required>
                                        <option value="" disabled hidden>-- Select Sales Account --</option>
                                        <option v-for="account in accountsList" v-bind:value="account.id">{{ account.name }}</option>
                                    </select>
                                </div>
                            </div>

                        </div> -->

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
                    name: "",
                    description: "",
                    purchase_price: "",
                    classification_type_id: "",
                    asset_account_id: "",
                    cogs_account_id: "",
                    expense_account_id: "",
                    sales_account_id: "",
                    default_unit_id: "",
                    purchase_unit_id: "",
                    conversion_id: "",
                    item_type_id: "",
                    conversions: [{
                        conversion_id: ""
                    }]
                },
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

            let promise2 = new Promise((resolve, reject) => {
                axios.get("/api/accounts/get-all-accounts/").then(res => {
                    console.log(res);
                    this.ifReady = true;
                    this.accountsList = res.data.accounts;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

            let promise3 = new Promise((resolve, reject) => {
                axios.get("/api/units/retrieve-all-units/").then(res => {
                    console.log(res.data);
                    this.ifReady = true;
                    this.unitsList = res.data.units;

                    if (!res.data.response) {
                        return;
                    }

                    resolve();
                });
            });
        },

        methods: {
            onSelectItemType(id) {
                this.itemClassificationsList = this.itemTypesList.find(item => item.id === id );
            },
            onSelectPurchaseUnit(id) {
                const formData = {
                    purchase_unit_id: id
                }
                axios
                .post("/api/items/default-units", formData)
                .then(res => {
                    this.defaultUnitsList = res.data
                    console.log(res)
                })
                .catch(err => {
                    this.newItem.default_unit_id = undefined;
                    alert("Error!");
                    console.log(err);
                });
            },
            onSelectDefaultUnit(id) {
                const formData = {
                    purchase_unit_id: this.newItem.purchase_unit_id,
                    default_unit_id: id
                }

                console.log('form data', formData)

                axios.post("/api/items/conversions", formData).then(res => {
                    this.conversionsList = [];
                    this.conversionsList = res;
                }).catch(err => {
                    this.newItem.default_unit_id = undefined;
                    this.conversionsList = [];
                    alert("Error!");
                    console.log(err);
                });
            },
            addConversionRow() {
                this.newItem.conversions.push({
                    conversion_id: ""
                });
            },
            deleteConversionRow(index) {
                this.newItem.conversions.splice(index, 1);
            },
            createNewItem() {
                this.ifReady = false;

                axios.post("/api/items", this.newItem).then(res => {
                    this.$router.push({ name: "items.index" });
                }).catch(err => {
                    this.ifReady = true;
                    alert("Error!");
                    console.log(err);
                });
            }
        }
    };
</script>
