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
                    <router-link class="nav-link p-3" :to="{ name: 'settings.paymentTerms' }">
                        payment_terms
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.conversions' }">
                        Conversions
                    </router-link>
                </li>
                <li class="nav-item bg-white ">
                    <router-link class="nav-link p-3 active" :to="{ name: 'settings.paymentTerms' }">
                        Payment Terms
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="card">
            <div class="card-header clearfix">
                Payment Terms
                <button type="button" class="btn btn-primary float-right" @click.prevent="setUnit('','','','create')" >+ Add Payment Term</button>
            </div>
            <div class="card-body">
                <table class="table table-hover table-sm">
                    <caption>
                        <div class="row">
                            <div class="col-md-9">
                                List of payment_terms - Total payment_terms {{ this.meta.total }}
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
                            <th scope="col">Name</th>
                            <th scope="col">value</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="payment_terms">
                        <tr :key="id" v-for="{ id, name, value } in payment_terms">
                            <td>{{ name }}</td>
                            <td>{{ value }}</td>
                            <td>
                                <button class="btn btn-primary" @click.prevent="setUnit(id,name,value,'view')">View</button>
                                <button class="btn btn-danger" @click.prevent="setUnit(id,name,value,'update')">Edit</button>
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
                    <button type="button" class="btn btn-primary mr-2" @click.prevent="openSearchModal">Search Payment Term</button>
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
        <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New Payment Term</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form v-on:submit.prevent="createNewUnit">
                    <div class="modal-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" :readonly=" modal.type === 'view' ? true : false" v-model="modal.name" required>
                            </div>
                            <div class="form-group">
                                <label>Value</label>
                                <input type="number" class="form-control" :readonly=" modal.type === 'view' ? true : false" v-model="modal.value" required>
                            </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-if="modal.type === 'create'">Save Unit</button>
                        <button type="submit" class="btn btn-primary" v-if="modal.type === 'update'">Update Unit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>


        </div>
    </div>
</template>

<script>
const getunits = (page, per_page, callback) => {
    const params = { page, per_page };

    Vue.http.get('/api/payment-terms', { params }).then(res => {
        console.log(res)
        callback(null, res.data);
    }).catch(error => {
        console.error(error)
        callback(error, error.res.data);
    });
};

export default {
    data() {
        return {
            componentVal: 'Contact',
            payment_terms: null,
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
            modal: {
                id:'',
                name:'',
                value:'',
                type:''
            }
        };
    },

    beforeRouteEnter (to, from, next) {
        if (to.query.per_page == null) {
            getunits(to.query.page, 10, (err, data) => {
                next(vm => vm.setData(err, data));
            });
        } else {
            getunits(to.query.page, to.query.per_page, (err, data) => {
                next(vm => vm.setData(err, data));
            });
        }
    },

    beforeRouteUpdate (to, from, next) {
        getunits(to.query.page, this.meta.per_page, (err, data) => {
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

    methods: {
        toggleModal( val ) {
            $('#modal').modal(val)
        },
        setUnit(id,name,value, type){
            this.modal.id = id;
            this.modal.name = name;
            this.modal.value = value;
            this.modal.type = type
            this.toggleModal('show')
        },
         createNewUnit () {
             switch (this.modal.type) {
                 case 'update':
                    this.$http.put(`/api/payment-terms/${this.modal.id}`, this.modal)
                    .then(res => {
                        console.log(JSON.stringify(res.data));
                        alert(`Success! Unit updated successfully`);
                        this.toggleModal('hide')
                        this.refresh()
                    }).catch(err => {
                        console.log(err);
                        alert(`Error! Can't update unit`);
                    });

                    break;

                case 'create':
                    this.$http.post('/api/payment-terms', this.modal)
                    .then(res => {
                        console.log(JSON.stringify(res.data));
                        alert(`Success! New unit created successfully`);
                        this.toggleModal('hide')
                        this.refresh()
                    }).catch(err => {
                        console.log(err);
                        alert(`Error! Can't create new unit`);
                    });
                    break;
             }
        },
        refresh(){
            this.showProgress = true;
            this.$router.go({
                name: 'settings.paymentTerms',
                query: {
                    page: this.meta.current_page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToFirstPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.paymentTerms',
                query: {
                    page: 1,
                    per_page: this.meta.per_page
                },
            });
        },
        goToPage(page = null) {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.paymentTerms',
                query: {
                    page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToLastPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.paymentTerms',
                query: {
                    page: this.meta.last_page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToNextPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.paymentTerms',
                query: {
                    page: this.nextPage,
                    per_page: this.meta.per_page
                },
            });
        },
        goToPreviousPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'settings.paymentTerms',
                query: {
                    page: this.prevPage,
                    per_page: this.meta.per_page
                }
            });
        },
        setData(err, { data: payment_terms, links, meta }) {
            this.pageNumbers = [];

            if (err) {
                this.error = err.toString();
            } else {
                this.payment_terms = payment_terms;
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
                name: 'settings.paymentTerms',
                query: {
                    page: 1,
                    per_page: this.meta.per_page
                }
            });
        }
    }
}
</script>
