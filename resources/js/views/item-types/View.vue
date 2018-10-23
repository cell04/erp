<template>
    <div>
        <div class="card">
            <div class="card-header">
                Item Types / View Item Type
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" v-model="itemType.name" id="name" readonly>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="name">Display Name</label>
                                <input type="text" class="form-control" v-model="itemType.display_name" id="name" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="itemType.description" id="description" readonly></textarea>
                        </div>
                    </fieldset>
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="viewItemTypes">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent="editItemType">Edit Item Type</button>
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
                        Are you sure you want to delete <b><u>{{ itemType.name }}</u></b>?
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
                ifReady: false,
                itemType: ""
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/item-types/' + this.$route.params.id).then(res => {
                    this.itemType = res.data.itemType;
                    resolve();
                }).catch(err => {
                    console.log(err);
                });
            });

            promise.then(() => {
                this.ifReady = true;
            });
        },

        methods: {
            viewItemTypes() {
                this.$router.push({
                    name: 'item-types.index'
                });
            },
            editItemType() {
                this.$router.push({
                    name: 'item-types.edit',
                    params: { id: this.itemType.id }
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
        }
    }
</script>
