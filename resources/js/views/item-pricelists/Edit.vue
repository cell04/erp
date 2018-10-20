<template>
    <div>
        <div class="card">
            <div class="card-header">
                Item Pricelists / Edit Item Pricelist
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editItemClassification">

                        <div class="form-group">
                            <label for="name">Item</label>
                            <input type="text" class="form-control" v-model="itemList.name" autocomplete="off" minlength="2" maxlength="255" required readonly>
                        </div>

                        <div class="form-group">
                            <label for="name">Price</label>
                            <input type="text" class="form-control" v-model="price" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>

                        <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewItemPricelists">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateItemPricelist">Update Item Class</button>
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
                itemList: [],
                id: '',
                item_id: '',
                price: '',
                status: 1
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-pricelists/' + this.$route.params.id).then(res => {
                    // console.log('Item Pricelist:' + JSON.stringify(res.data));
                    const getPricelistId = res.data.itemPricelist.item_id;
                    // Query Items
                    new Promise((resolve, reject) => {
                        axios.get("/api/items/" + getPricelistId).then(res2 => {
                            this.id = res.data.itemPricelist.id;
                            this.price = res.data.itemPricelist.price;
                            this.item_id = res.data.itemPricelist.item_id;
                            
                            this.itemList = res2.data.item;
                            console.log('Item:' + JSON.stringify(res2.data));
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
            updateItemPricelist() {
                this.ifReady = false;

                axios.patch('/api/item-pricelists/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'item-pricelists.view',
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
