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
                                    <input type="text" class="form-control" v-model="item.item_type.name" id="type" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Item Classification</label>
                                    <input type="text" class="form-control" v-model="item.item_classification.name" id="class" readonly>
                                </div>
                            </div>
                        </div>
                        <!-- <br />
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
                        <br /> -->

                    </fieldset>
                    <button type="button" class="btn btn-outline-info btn-sm" @click.prevent="viewItems">Back</button>
                    <button type="button" class="btn btn-info btn-sm" @click.prevent="editItems">Edit Item</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent="openDeleteItemModal">Delete Item</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <br>

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteItemModal" tabindex="-1" role="dialog" aria-labelledby="deleteItemTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete <b><u>{{item.name}}</u></b> ?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteItem">Confirm Delete</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
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
                componentVal: "Item",
                ifReady: false,
                accountType: "",
                item: '',
                itemType: '',
                itemClass: '',
                item_type_id: '',
                item_classification_id: '',
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
                        // console.log(res);
                        this.item = res.data.item;
                        this.ifReady = true;

                        if (!res.data.response) {
                            return;
                        }
                        resolve();
                    });
                });
            },

            getItemTypeName() {
                new Promise((resolve, reject) => {
                    axios.get("/api/item-types/" + this.item_type_id).then(res => {
                        // this.item = res.data;
                        console.log('get item type name: ' + JSON.stringify(res.data.itemType));
                    });
                });
            },

            viewItems() {
                this.$router.push({
                    name: "items.index"
                });
            },

            editItems () {
                this.$router.push({
                    name: 'items.edit',
                    params: { id: this.item.id }
                });
            },

            openDeleteItemModal() {
                $('#deleteItemModal').modal('show');
            },

            deleteItem() {
                axios.delete('/api/items/' + this.$route.params.id).then(res => {
                    $('#deleteItemModal').modal('hide');
                    this.$router.push({ name: 'items.index' });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>
