<template>
    <div class="card">
        <div class="card-header">
            <b>Item Price List / Edit Item Price List</b>
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="editItemClassification">
                    <div class="form-group">
                        <label for="name">Item</label>
                        <input type="text" class="form-control" v-model="item.name" autocomplete="off" minlength="2" maxlength="255" required readonly>
                    </div>

                    <div class="form-group">
                        <label for="name">Price</label>
                        <input type="text" class="form-control" v-model="price" autocomplete="off" minlength="2" maxlength="255" required>
                    </div>
                    <br>
                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent.default="viewItemPricelists"><i class="fas fa-chevron-left"></i>Back</button>
                    <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateItemPricelist"><i class="fas fa-edit"></i> Update Item Price List</button>
                </form>
            </div>
            <div v-else>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
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
                item: '',
                id: '',
                item_id: '',
                price: '',
                status: 1
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-pricelists/' + this.$route.params.id).then(res => {
                    this.id = res.data.itemPricelist.id;
                    this.price = res.data.itemPricelist.price;
                    this.item_id = res.data.itemPricelist.item.id;
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
