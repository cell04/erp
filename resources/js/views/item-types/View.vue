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
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-header">
                Classifications
            </div>
            <!-- <div class="card-body">
                <div v-if="ifReady">
                   <table class="table table-hover table-sm">
                       <thead>
                        <th>Name</th>
                       </thead>

                       <tbody>
                           <tr v-for="classification in classifications" :key="classification.id">
                               <td> {{ classification.name }} </td>
                           </tr>
                       </tbody>

                   </table>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div> -->
        </div><br/>
        <div class="card">
            <div class="card-header">
                Add Classification To {{componentVal}}
            </div>
            <!-- <div class="card-body">
                <div v-if="ifReady">
                    <fieldset>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="classificationType.name" id="name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" v-model="classificationType.description" id="description"></textarea>
                        </div>
                    </fieldset>
                    <button type="button" class="btn btn-primary btn-sm" @click.prevent="addClassificationType">Add {{componentVal}}</button>
                </div>
                <div v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div> -->
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
        // addClassificationType() {
        //     var vm = this
        //     this.classificationType.item_type_id = this.itemTypes.id
        //     new Promise((resolve, reject) => {
        //         axios.post('/api/item-type-classifications', this.classificationType).then((res) => {
        //             console.log(res)
        //             this.ifReady= true;
        //             this.$router.push({
        //                 name: 'item-types.index'
        //             });
        //             if (! res.data.response) {
        //                 return;
        //             }
        //             resolve();
        //         });
        //     });
        // }
    },

    computed: {
        // Add ES6 methods here that needs caching
    }
}
</script>
