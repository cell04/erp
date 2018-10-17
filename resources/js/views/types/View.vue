<template>
    <div>
        <div class="card">
            <div class="card-header">
                Types / View Type
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="type.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="type.description" required></textarea>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewTypes">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editType">Edit Type</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteTypeModal">Delete Type</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteTypeModal" tabindex="-1" role="dialog" aria-labelledby="deleteTypeTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this Type?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this Type?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteType">Confirm Delete</button>
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
            type: ''
        };
    },

    mounted() {
        let promise = new Promise((resolve, reject) => {
            axios.get('/api/types/' + this.$route.params.id).then(res => {
                this.type = res.data.type;
                resolve();
            });
        });

        promise.then(() => {
            this.ifReady = true;
        });
    },

    methods: {
        viewTypes() {
            this.$router.push({
                name: 'types.index'
            });
        },
        editType() {
            this.$router.push({
                name: 'types.edit',
                params: { id: this.type.id }
            });
        },
        openDeleteTypeModal() {
            $('#deleteTypeModal').modal('show');
        },
        deleteType() {
            $('#deleteTypeModal').modal('hide');
            axios.delete('/api/types/' + this.$route.params.id).then(res => {
                this.$router.push({ name: 'types.index' });
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>
