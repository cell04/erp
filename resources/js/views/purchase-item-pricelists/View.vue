<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">PURCHASE ITEM PRICE LIST</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="card">
                <div class="card-header">
                    <a class="text-success" href="" @click.prevent="viewItemPricelists">Purchase Item Price Lists</a>
                    <a class="text-secondary"> / View Purchase Item Price List</a>
                </div>
                <div class="card-body">
                    <div v-if="ifReady">
                        <fieldset disabled>
                            <div class="form-group">
                                <label for="name">Item</label>
                                <input type="text" class="form-control" v-model="item.name" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>

                            <div class="form-group">
                                <label for="name">Price</label>
                                <input type="text" class="form-control" v-model="itemPricelist.price" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </fieldset>
                        <br>
                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewItemPricelists"><i class="fas fa-chevron-left"></i> Back</button>
                        <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editItemPricelists"><i class="fas fa-edit"></i> Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteItemPricelistsModal"><i class="fas fa-trash-alt"></i> Delete</button>
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
                            Are you sure you want to delete this Item <b><u>{{ item.name }} - {{ itemPricelist.price }} </u></b>?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteItemPricelists">Confirm Delete</button>
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
                ifReady: false,
                itemPricelist: '',
                item: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-pricelists/' + this.$route.params.id).then(res => {
                    this.itemPricelist = res.data.itemPricelist;
                    this.item = res.data.itemPricelist.item;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    alert('Error');
                    reject();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewItemPricelists() {
                this.$router.push({ name: 'purchase-item-pricelists.index' });
            },
            editItemPricelists() {
                this.$router.push({
                    name: 'purchase-item-pricelists.edit',
                    params: { id: this.itemPricelist.id }
                });
            },
            openDeleteItemPricelistsModal() {
                $('#deleteItemPricelistsModal').modal('show');
            },
            deleteItemPricelists() {
                axios.delete('/api/item-pricelists/' + this.$route.params.id).then(res => {
                    this.$router.push({ name: 'purchase-item-pricelists.index' });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
