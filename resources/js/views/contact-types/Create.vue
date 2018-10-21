<template>
    <div>
        <div class="card">
            <div class="card-header">
                Contact Types / Create New Contact Type
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewContactType">
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

                        <button type="submit" class="btn btn-success btn-sm">Create New Contact Type</button>
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
                name: '',
                display_name: '',
                description: ''
            };
        },

        methods: {
            createNewContactType() {
                this.ifReady = false;
                axios.post('/api/contact-types', this.$data).then(res => {
                    this.$router.push({ name: 'contact-types.index' });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
