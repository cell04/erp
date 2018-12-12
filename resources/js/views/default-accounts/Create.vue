<template>
    <div class="card">
        <div class="card-header">
            Default Accounts / Create New Default Account
        </div>
        <div class="card-body">
            <div v-if="ifReady">
                <form v-on:submit.prevent="createNewItemType">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Display Name</label>
                            <input type="text" class="form-control" v-model="display_name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                    </div>

                    <button type="button" class="btn btn-outline-success btn-sm" @click.prevent="viewItemType"><i class="fas fa-chevron-left"></i> Back</button>
                    <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-plus"></i> Create New Item Type</button>
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
                ifReady: true,
                name:'',
                display_name:'',
            };
        },

        methods: {
            viewItemType() {
                this.$router.push({ name: 'default-accounts.index' });
            },

            createNewItemType () {
                // axios.post('/api/item-types', this.$data).then(res => {
                //     console.log(res.data);
                //     this.$router.push({ name: 'item-types.index' });
                // }).catch(err => {
                //     console.log(err);
                //     alert(`Error! Can't create item type`);
                // });
            }
        }
    }
</script>
