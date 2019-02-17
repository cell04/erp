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
                    <a class="text-secondary"> / View Item</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <fieldset>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control" v-model="item.name" id="name" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name">SKU</label>
                                        <input type="text" class="form-control" v-model="item.stock_keeping_unit" id="name" readonly>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control" v-model="item.description" id="description" readonly></textarea>
                            </div> -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Item Type</label>
                                        <input type="text" class="form-control" v-model="item.item_type.name" id="type" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label> Item Subtype</label>
                                        <input type="text" class="form-control" v-model="item.item_classification.name" id="class" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Purchase UOM</label>
                                        <input type="text" class="form-control" v-model="item.purchase_unit_of_measurement.name" id="class" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Default UOM</label>
                                        <input type="text" class="form-control" v-model="item.default_unit_of_measurement.name" id="class" readonly>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card">
                                        <div class="card-header">
                                            <a class="text-success">Conversion Section</a>
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="conversion in conversions" :key="conversion.id">
                                                        <td>{{ conversion.conversion.from_value }} {{ conversion.conversion.convert_from.name }}</td>
                                                        <td>{{ conversion.conversion.to_value }} {{ conversion.conversion.convert_to.name }}</td>
                                                        <td v-if="conversion.module === 1">
                                                            Invetory
                                                        </td>
                                                        <td v-if="conversion.module === 2">
                                                            Recipe
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <br>
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewItems"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="button" class="btn btn-primary btn-sm" @click.prevent="editItems"><i class="fas fa-edit"></i> Edit Item</button>
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent="openDeleteItemModal"><i class="fas fa-trash-alt"></i> Delete Item</button>
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
                        console.log(JSON.stringify(res.data.item));
                        this.item = res.data.item;
                        this.conversions = res.data.item.item_conversions;
                        this.ifReady = true;
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
