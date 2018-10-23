<template>
    <div class="card">
        <div class="card-header">
            Item Pricelists / Create New Item Pricelist
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewItemPricelist">
                    <div class="form-group">
                        <label>Item</label>
                        <vue-select v-model="item" @input="selectItem()" label="name" :options="items"></vue-select>
                    </div>
                    <div class="form-group">
                        <label for="name">Price</label>
                        <input type="number" class="form-control" v-model="price" autocomplete="off" minlength="2" maxlength="255" step=".01" placeholder="0.00" required>
                    </div>

                    <button type="submit" class="btn btn-success btn-sm">Create New Item Pricelist</button>
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
                items: [],
                item: null,
                item_id: '',
                price: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/items/get-all-items/").then(res => {
                    this.items = res.data.items;
                    resolve();
                }).catch(err => {
                    console.log(err);
                    reject();
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            selectItem() {
                this.item_id = this.item.id;
            },
            createNewItemPricelist() {
                this.ifReady = false;

                axios.post('/api/item-pricelists', this.$data).then(res => {
                    this.$router.push({ name: 'item-pricelists.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                });
            }
        }
    }
</script>
