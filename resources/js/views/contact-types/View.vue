<template>
    <div>
        <div class="card">
            <div class="card-header">
                Contact Types / View Contact Types
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <fieldset disabled>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Display Name</label>
                                <input type="text" class="form-control" v-model="display_name" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description">Desciption</label>
                            <textarea class="form-control" v-model="description" rows="3" maxlength="500" required></textarea>
                        </div>
                    </fieldset>

                    <button type="button" class="btn btn-info btn-sm" @click.prevent.default="viewContactTypes">Back</button>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent.default="editContactType">Edit Contact Type</button>
                    <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="openDeleteContactTypeModal">Delete Contact Type</button>
                </div>

                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteContactTypeModal" tabindex="-1" role="dialog" aria-labelledby="deleteContactTypeTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">You're about to delete this contact type?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this contact type? <br><br>
                        Deleting this contact type will delete the following data <br><br>

                        that are all related to this contact type.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="deleteContact">Confirm Delete</button>
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
                name: '',
                display_name: '',
                description: ''
            };
        },

        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get('/api/contact-types/' + this.$route.params.id).then(res => {
                    this.name         = res.data.contactType.name;
                    this.display_name = res.data.contactType.display_name;
                    this.description  = res.data.contactType.description;

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
            viewContactTypes() {
                this.$router.push({ name: 'contact-types.index' });
            },
            editContact() {
                this.$router.push({
                    name: 'contacts.edit',
                    params: { id: this.id }
                });
            },

            openDeleteContactTypeModal() {
                $('#deleteContactTypeModal').modal('show');
            },

            deleteContactType() {
                $('#deleteContactTypeModal').modal('hide');

                this.ifReady = false;

                axios.delete('/api/contacts/' + this.$route.params.id).then((res) => {
                    this.$router.push({ name: 'contact-types.index' });
                }).catch(err => {
                    this.ifReady = true;
                    console.log(err);
                    return;
                });
            }
        }
    }
</script>
