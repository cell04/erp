<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}} / View {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="item.name" id="name" readonly>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="item.description" id="description" readonly></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Type</label>
                                    <input type="text" class="form-control" v-model="item.classification_type.classifiable.name" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Classification</label>
                                    <input type="text" class="form-control" v-model="item.classification_type.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Conversions</th>
                                </tr>
                            </thead>
                            <tbody v-if="conversions">
                                <tr :key="conversion.id" v-for="conversion in conversions">
                                    <td>{{ conversion.from_value }} {{ conversion.from_unit.name }} = {{ conversion.to_value }} {{ conversion.to_unit.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Purchase Unit</label>
                                    <input type="text" class="form-control" v-model="item.purchase_uom.name" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Default Unit</label>
                                    <input type="text" class="form-control" v-model="item.default_uom.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Purchase Price</label>
                                    <input type="text" class="form-control" v-model="item.purchase_price" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Asset Account</label>
                                    <input type="text" class="form-control" v-model="item.asset_account.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Cost of Goods Sold Account</label>
                                    <input type="text" class="form-control" v-model="item.cogs_account.name" id="name" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Expense Account</label>
                                    <input type="text" class="form-control" v-model="item.expense_account.name" id="name" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Sales Account</label>
                                    <input type="text" class="form-control" v-model="item.sales_account.name" id="name" readonly>
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />
                        Price History
                        <table class="table table-hover table-sm" v-if="price_histories">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="history.id" v-for="history in price_histories">
                                    <td>{{ history.updated_at }}</td>
                                    <td>{{ history.unit_price }}</td>
                                    <td>{{ history.status }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />

                    </fieldset>
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewItems">Back</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                componentVal: "Item",
                ifReady: false,
                accountType: "",
                item: [],
                conversions: [],
                price_histories: []
            };
        },

        mounted() {
            this.getItem();
        },

        methods: {
            getItem() {
                new Promise((resolve, reject) => {
                    axios.get("/api/items/" + this.$route.params.id).then(res => {
                        console.log(res);
                        this.ifReady = true;
                        this.item = res.data.item;
                        this.conversions = res.data.item.conversions;
                        this.price_histories = res.data.item.item_price_histories;
                        if (!res.data.response) {
                            return;
                        }
                        resolve();
                    });
                });
            },
            viewItems() {
                this.$router.push({
                    name: "items.index"
                });
            }
        }
    };
</script>
