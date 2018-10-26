<template>
    <div>
        <div class="card">
            <div class="card-header">
                Item Price Lists / View Item Price List
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label for="name">Item</label>
                            <input type="text" class="form-control" v-model="itemId.name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="name">Price</label>
                            <input type="text" class="form-control" v-model="itemPricelist.price" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-outline-primary btn-sm" @click.prevent.default="viewItemPricelists">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editItemPricelists">Edit Item Class</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteItemPricelistsModal">Delete Item Class</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteItemPricelistsModal" tabindex="-1" role="dialog" aria-labelledby="deleteItemPricelistsTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Item Price?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Item <b><u>{{ itemId.name }} - {{ itemPricelist.price }} </u></b>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteItemPricelists">Confirm Delete</button>
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
                ifReady: false,
                itemId: '',
                itemPricelist: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-pricelists/' + this.$route.params.id).then(res => {
                    const getItemTypeId = res.data.itemPricelist.item_id;
                    // console.log('ALL Pricelist: ' + JSON.stringify(getItemTypeId));
                    // Query Item Type
                    let promise = new Promise((resolve, reject) => {
                        axios.get('/api/items/' + getItemTypeId).then(res2 => {
                            this.itemPricelist = res.data.itemPricelist;
                            this.itemId = res2.data.item;
                        });
                    });
                    resolve();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewItemPricelists() {
                this.$router.push({
                    name: 'item-pricelists.index'
                });
            },
            editItemPricelists() {
                this.$router.push({
                    name: 'item-pricelists.edit',
                    params: { id: this.itemPricelist.id }
                });
            },
            openDeleteItemPricelistsModal() {
                $('#deleteItemPricelistsModal').modal('show');
            },
            deleteItemPricelists() {
                axios.delete('/api/item-pricelists/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'item-pricelists.index' });
                    $('#deleteItemPricelistsModal').modal('hide');
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
