<template>
    <div>
        <div class="card">
            <div class="card-header">
                Item Pricelists / Create New Item Pricelist
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewItemPricelist">
                        <div class="form-group">
                            <label>Item</label>
                            <select class="form-control" v-model="item_id" v-on:change="selectItem(item_id)" required>
                                <option value="" disabled hidden>-- Select Item --</option>
                                <option v-for="item in itemsList" v-bind:value="item.id">{{ item.name }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="name">Price</label>
                            <input type="number" class="form-control" v-model="price" autocomplete="off" minlength="2" maxlength="255" step=".01" placeholder="0.00" required>
                        </div>

                        <button type="submit" class="btn btn-success btn-sm">Create New Item Class</button>
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
                itemsList: [],
                ifReady: true,
                item_id: '',
                price: '',
                status: 1
            };
        },

        mounted() {
            // Load All Item Type List
            new Promise((resolve, reject) => {
               axios.get("/api/items/get-all-items/").then(res => {
                //    console.log('All Items: ' + JSON.stringify(res.data.items));
                this.itemsList = res.data.items;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });

        },

        methods: {
            selectItem(id) {
                this.item_id = id;
                console.log('selected item_id: ' + id);
                // console.log('getItemPrice')
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
