<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}} / View {{componentVal}}
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
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Unit of Measurement</label>
                                    <input type="text" class="form-control" v-model="item.default_unit_of_measurement_id" id="class" readonly>
                                </div>
                            </div>
                        </div>
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
                        console.log(res);
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
