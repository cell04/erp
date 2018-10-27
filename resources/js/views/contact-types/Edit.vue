<template>
    <div>
        <div class="card">
            <div class="card-header">
                Contact Types / Edit Contact Type
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="editContactType">
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

                        <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent.default="viewContactType">Back</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="updateContactType">Update Contact Type</button>
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
                ifReady: false,
                id: '',
                name: '',
                display_name: '',
                description: '',
                status: 1
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
            viewContactType() {
                this.$router.push({
                    name: 'contact-types.view',
                    params: { id: this.$route.params.id }
                });
            },
            updateContactType() {
                this.ifReady = false;

                axios.patch('/api/contact-types/' + this.$route.params.id, this.$data).then(res => {
                    this.$router.push({
                        name: 'contact-types.view',
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
