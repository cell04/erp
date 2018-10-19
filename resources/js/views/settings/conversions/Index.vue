<template>
    <div>
        <div class="card my-4">
            <ul class="nav nav-pills nav-justified">
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.index' }">
                        System
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.users' }">
                        Users
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.units' }">
                        Units
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link active p-3" :to="{ name: 'settings.conversions' }">
                        Conversions
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3 " :to="{ name: 'settings.paymentTerms' }">
                        Payment Terms
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="card">
            <div class="card-header clearfix">
                Conversions / View Conversion
                <button type="button" class="btn btn-primary float-right" @click.prevent="setConversion('', '', '', '', '', 'create')" >+ New Conversion</button>
            </div>
            <div class="card-body">
                <table class="table table-hover table-sm">
                    <caption>
                        <div class="row">
                            <div class="col-md-9">
                                List of Conversions - Total Conversions {{ this.meta.total }}
                            </div>
                            <div class="col-md-3">
                                <div class="progress" height="30px;" v-if="showProgress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                                </div>
                            </div>
                        </div>
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="conversions">
                        <tr :key="id" v-for="{ id, unit_of_measurement_from_id, from_value, unit_of_measurement_to_id, to_value } in conversions">
                            <td>{{ from_value }}</td>
                            <td>{{ to_value }}</td>
                            <td>
                                <!-- <button class="btn btn-primary" @click.prevent="setConversion(id, unit_of_measurement_from_id, from_value, unit_of_measurement_to_id, to_value, 'view')">View</button> -->
                                <button class="btn btn-danger" @click.prevent="setConversion(id, unit_of_measurement_from_id, from_value, unit_of_measurement_to_id, to_value, 'update')">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br>

        <div class="clearfix">
            <div v-if="pageCount">
                <nav class="float-left">
                    <ul class="pagination">
                        <li class="page-item" v-bind:class="isPrevDisabled">
                            <a class="page-link" href="#" @click.prevent="goToPreviousPage" disabled>Previous</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" @click.prevent="goToFirstPage">First</a>
                        </li>
                        <li class="page-item" :key="pageNumber" v-for="pageNumber in pageNumbers" v-bind:class="isPageActive(pageNumber)">
                            <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">{{ pageNumber }}</a>
                        </li>
                        <li class="page-item" v-bind:class="isNextDisabled">
                            <a class="page-link" href="#" @click.prevent="goToLastPage">Last</a>
                        </li>
                        <li class="page-item" v-bind:class="isNextDisabled">
                            <a class="page-link" href="#" @click.prevent="goToNextPage">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div v-else>
                <nav class="float-left">
                    <ul class="pagination">
                        <li class="page-item" v-bind:class="isPrevDisabled">
                            <a class="page-link" href="#" @click.prevent="goToPreviousPage" disabled>Previous</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" @click.prevent="goToFirstPage">First</a>
                        </li>
                        <li class="page-item" :key="pageNumber" v-for="pageNumber in pageNumbers" v-bind:class="isPageActive(pageNumber)">
                            <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">{{ pageNumber }}</a>
                        </li>
                        <li class="page-item" v-bind:class="isNextDisabled">
                            <a class="page-link" href="#" @click.prevent="goToLastPage">Last</a>
                        </li>
                        <li class="page-item" v-bind:class="isNextDisabled">
                            <a class="page-link" href="#" @click.prevent="goToNextPage">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="float-right">
                <form class="form-inline">
                    <button type="button" class="btn btn-primary mr-2" @click.prevent="openSearchModal">Search Conversion</button>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Items per page</div>
                        </div>
                        <select class="custom-select" id="number_of_items" v-model="meta.per_page" v-on:change="changePerPage">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                </form>
            </div>


            <!-- Modal -->
            <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Conversion</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form v-on:submit.prevent="createNewConversion">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>From</label>
                                    <input type="number" class="form-control" placeholder="0" v-model="modal.from_value" :readonly=" modal.type === 'view' ? true : false">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="modal.unit_of_measurement_from_id" :readonly=" modal.type === 'view' ? true : false">
                                        <option value="" disabled hidden>Select Unit</option>
                                        <option v-for="unit in units" v-bind:value="unit.id">{{ unit.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>To</label>
                                    <input type="number" class="form-control" placeholder="0" v-model="modal.to_value" :readonly=" modal.type === 'view' ? true : false">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="modal.unit_of_measurement_to_id" :readonly=" modal.type === 'view' ? true : false">
                                        <option value="" disabled hidden>Select Unit</option>
                                        <option v-for="unit in units" v-bind:value="unit.id">{{ unit.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" v-if="modal.type === 'create'">Save Conversion</button>
                                <button type="submit" class="btn btn-primary" v-if="modal.type === 'update'">Update Conversion</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
const getconversions = (page, per_page, callback) => {
    const params = { page, per_page };

    axios.defaults.headers.common['CORPORATION-ID'] = JSON.parse(localStorage.getItem('selectedCorporation')).id;

    axios.get('/api/conversions', { params }).then(res => {
        callback(null, res.data);
    }).catch(error => {
        callback(error, error.res.data);
    });
};

export default {
    data() {
        return {
            componentVal: 'Conversions',
            conversions: null,
            meta: {
                current_page: null,
                from: null,
                last_page: null,
                path: null,
                per_page: 10,
                to: null,
                total: null
            },
            links: {
                first: null,
                last: null,
                next: null,
                prev: null,
            },
            error: null,
            showProgress: false,
            pageNumbers: [],
            units: [],
            modal: {
                id:'',
                type:'',
                unit_of_measurement_from_id:'',
                from_value: '',
                unit_of_measurement_to_id: '',
                to_value: '',
            }
        };
    },

    beforeRouteEnter (to, from, next) {
        if (to.query.per_page == null) {
            getconversions(to.query.page, 10, (err, data) => {
                next(vm => vm.setData(err, data));
            });
        } else {
            getconversions(to.query.page, to.query.per_page, (err, data) => {
                next(vm => vm.setData(err, data));
            });
        }
    },

    beforeRouteUpdate (to, from, next) {
        getconversions(to.query.page, this.meta.per_page, (err, data) => {
            this.setData(err, data);
            next();
        });
    },

    computed: {
        nextPage() {
            return this.meta.current_page + 1;
        },
        prevPage() {
            return this.meta.current_page - 1;
        },
        paginatonCount() {
            if (! this.meta) {
                return;
            }

            const { current_page, last_page } = this.meta;

            return `${current_page} of ${last_page}`;
        },
        pageCount() {
            if (this.meta.last_page > 10) {
                return false;
            }

            return true;
        },
        isPrevDisabled() {
            if (this.links.prev == null) {
                return 'disabled';
            }

            return;
        },
        isNextDisabled() {
            if (this.links.next == null) {
                return 'disabled';
            }

            return;
        }
    },

    mounted() {
        let promise = new Promise((resolve, reject) => {
            axios.get("/api/unit-of-measurements/get-all-unit-of-measurements/").then(res => {
                console.log(res);
                this.units = res.data.unit_of_measurements;
                if (!res.data.response) {
                return;
                }
                resolve();
            });
        });
    },

    methods: {
        toggleModal( val ) {
            $('#modal').modal(val)
        },
        setConversion(id, unit_of_measurement_from_id, from_value, unit_of_measurement_to_id, to_value, type){
            this.modal.id = id;
            this.modal.unit_of_measurement_from_id = unit_of_measurement_from_id;
            this.modal.from_value = from_value;
            this.modal.unit_of_measurement_to_id = unit_of_measurement_to_id;
            this.modal.to_value = to_value;
            this.modal.type = type
            this.toggleModal('show')
        },
         createNewConversion () {
             console.log(this.modal);
             switch (this.modal.type) {
                case 'update':
                    axios.put(`/api/conversions/${this.modal.id}`, this.modal).then((res)=>{
                        this.toggleModal('hide')
                        this.refresh()
                    }).catch(err => {
                        console.log(err);
                        alert("Can't update unit");
                    });
                    
                    break;

                case 'create':
                     axios.post('/api/conversions', this.modal).then((res)=>{
                        this.toggleModal('hide')
                        this.refresh()
                    }).catch(err => {
                        console.log(err);
                        alert("Can't create unit");
                    });
                    
                    break;
             }
        },
        refresh(){
            this.showProgress = true;
            this.$router.go({
                name: 'settings.conversions',
                query: {
                    page: this.meta.current_page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToFirstPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.conversions',
                query: {
                    page: 1,
                    per_page: this.meta.per_page
                },
            });
        },
        goToPage(page = null) {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.conversions',
                query: {
                    page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToLastPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.conversions',
                query: {
                    page: this.meta.last_page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToNextPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.conversions',
                query: {
                    page: this.nextPage,
                    per_page: this.meta.per_page
                },
            });
        },
        goToPreviousPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.conversions',
                query: {
                    page: this.prevPage,
                    per_page: this.meta.per_page
                }
            });
        },
        setData(err, { data: conversions, links, meta }) {
            this.pageNumbers = [];

            if (err) {
                this.error = err.toString();
            } else {
                console.log(conversions)
                this.conversions = conversions;
                this.links = links;
                this.meta = meta;
            }

            this.showProgress = false;
            this.populatePages();
        },
        populatePages() {
            if (this.pageCount) {
                for (let i = 1; i <= this.meta.last_page; i++) {
                    this.pageNumbers.push(i);
                }
            } else if (this.meta.current_page <= 6) {
                let page = 1;
                this.pageNumbers.push(page);
                this.pageNumbers.push(page + 1);
                this.pageNumbers.push(page + 2);
                this.pageNumbers.push(page + 3);
                this.pageNumbers.push(page + 4);
                this.pageNumbers.push(page + 5);
                this.pageNumbers.push(page + 6);
                this.pageNumbers.push('...');
                this.pageNumbers.push(this.meta.last_page - 1);
                this.pageNumbers.push(this.meta.last_page);
            } else if ((this.meta.current_page + 6) >= this.meta.last_page) {
                this.pageNumbers.push(1);
                this.pageNumbers.push(2);
                this.pageNumbers.push('...');
                this.pageNumbers.push(this.meta.last_page - 7);
                this.pageNumbers.push(this.meta.last_page - 6);
                this.pageNumbers.push(this.meta.last_page - 5);
                this.pageNumbers.push(this.meta.last_page - 4);
                this.pageNumbers.push(this.meta.last_page - 3);
                this.pageNumbers.push(this.meta.last_page - 2);
                this.pageNumbers.push(this.meta.last_page - 1);
                this.pageNumbers.push(this.meta.last_page);
            } else {
                this.pageNumbers.push(1);
                this.pageNumbers.push(2);
                this.pageNumbers.push('...');
                this.pageNumbers.push(this.meta.current_page - 2);
                this.pageNumbers.push(this.meta.current_page - 1);
                this.pageNumbers.push(this.meta.current_page);
                this.pageNumbers.push(this.meta.current_page + 1);
                this.pageNumbers.push(this.meta.current_page + 2);
                this.pageNumbers.push('...');
                this.pageNumbers.push(this.meta.last_page - 1);
                this.pageNumbers.push(this.meta.last_page);
            }
        },
        isPageActive(page) {
            if (page == this.$route.query.page || (page == 1 && this.$route.query.page == null)) {
                return 'active';
            }

            return;
        },
        changePerPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.conversions',
                query: {
                    page: 1,
                    per_page: this.meta.per_page
                }
            });
        }
    }
}
</script>
