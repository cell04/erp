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
                            <input type="text" class="form-control" v-model="itemTypes.name" id="name" readonly>
                        </div>

                        <div class="form-group">
                            <label for="name">Display Name</label>
                            <input type="text" class="form-control" v-model="itemTypes.display_name" id="name" readonly>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="itemTypes.description" id="description" readonly></textarea>
                        </div>
                    </fieldset>
                    <button type="button" class="btn btn-outline-primary btn-sm" @click.prevent="viewItemTypes">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent="editItemType">Edit {{componentVal}}</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteItemType">Delete Item Type</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteItemTypeModal" tabindex="-1" role="dialog" aria-labelledby="deleteItemTypeTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Item Type?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete <b><u>{{ itemTypes.name }}</u></b>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteItemType">Confirm Delete</button>
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
            componentVal: 'Item Type',
            ifReady: false,
            accountType: '',
            itemTypes: [],
            classificationType: {},
            classifications: []
        };
    },

    mounted() {
       this.getItemTypes()
    },

    methods: {

        getItemTypes() {
            new Promise((resolve, reject) => {
                axios.get('/api/item-types/' + this.$route.params.id).then((res) => {
                    // console.log('Item Typs:' + JSON.stringify(res.data));
                    this.ifReady= true;
                    this.itemTypes = res.data.itemType;
                    // this.classifications = res.data.item_type.classifications
                    if (! res.data.response) {
                        return;
                    }
                    resolve();
                });
            });
        },
        viewItemTypes() {
            this.$router.push({
                name: 'item-types.index'
            });
        },
        editItemType() {
            this.$router.push({
                name: 'item-types.edit',
                params: { id: this.itemTypes.id }
            });
        },
        openDeleteItemType() {
            $('#deleteItemTypeModal').modal('show');
        },
        deleteItemType() {
            axios.delete('/api/item-types/' + this.$route.params.id).then(res => {
                this.$router.push({ name: 'item-types.index' });
                $('#deleteItemTypeModal').modal('hide');
            }).catch(err => {
                console.log(err);
            });
        }
    },

    computed: {
        // Add ES6 methods here that needs caching
    }
}
</script>
