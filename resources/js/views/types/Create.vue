<template>
    <div>
        <div class="card">
            <div class="card-header">
                Types / Create New Type
            </div>
            <div class="card-body">
                <div v-if="ifReady">
                    <form v-on:submit.prevent="createNewType">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="description" required></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-success btn-sm">Create New Type</button>
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
            description: ''
        };
    },
    
    methods: {
        createNewType() {
            this.ifReady = false;
            
            axios.post('/api/types', this.$data).then(res => {
                this.$router.push({ name: 'types.index' });
            }).catch(err => {
                this.ifReady = true;
                console.log(err);
            });
        }
    }
}
</script>
