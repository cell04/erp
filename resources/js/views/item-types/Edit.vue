<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{componentVal}} / Edit {{componentVal}}
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="itemType.name" id="name">
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="itemType.description" id="description"></textarea>
                        </div>

                        <!-- <div class="form-group">
                            <label for="type">Type</label>
                            <input type="text" class="form-control" v-model="accountType.type" id="type">
                        </div> -->
                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent="viewItemTypes">Back</button>
                    <button type="button" class="btn btn-danger btn-sm" :disabled="isDisabled" @click.prevent="updateItemType">Update {{componentVal}}</button>
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
                componentVal: 'Item Type',
                ifReady: false,
                accountType: '',
                itemType: [],
                isDisabled: false,
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-types/' + this.$route.params.id).then((res) => {
                    console.log(res)
                    this.ifReady= true;
                    this.itemType = res.data.item_type;
                    if (! res.data.response) { return; }
                    resolve();
                });
            });
        },

        methods: {
            viewItemTypes() {
                this.$router.push({
                    name: 'item-types.index'
                });
            },
            updateItemType() {
                this.isDisabled = true;
                this.ifReady = false;
                console.log(this.$data)
                axios.put('/api/item-types/' + this.$route.params.id, this.$data.itemType).then((res)=>{
                    if(! res.data.response){
                        alert("error")
                    }
                    this.$router.push({
                        name: 'item-types.view',
                        params: { id: this.$route.params.id }
                    })
                    return;
                });
            }
        }
    }
</script>
