<template>
    <div>
        <div class="card">
            <div class="card-header clearfix">
                Branches / View Branches
            </div>
            <div class="card-body">
                <table class="table table-hover table-sm">
                    <caption>
                        <div class="row">
                            <div class="col-md-9">
                                List of Branches - Total Items {{ this.meta.total }}
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
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Zip Code</th>
                            <th scope="col">Telephone Number</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody v-if="branches">
                        <tr v-for="{ id, name, city, country, zip_code, telephone_number } in branches">
                            <td>{{ id }}</td>
                            <td>{{ name }}</td>
                            <td>{{ city }}</td>
                            <td>{{ country }}</td>
                            <td>{{ zip_code }}</td>
                            <td>{{ telephone_number }}</td>
                            <td>
                                <router-link class="text-info" :to="{ name: 'branches.view', params: { id: id }}">View</router-link> | 
                                <router-link class="btn-success btn-sm" :to="{ name: 'stock-requests.create', params: { id: id },  query: { type: 'branch' }}">Create New Stock Request</router-link>
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
                        <li class="page-item" v-for="pageNumber in pageNumbers" v-bind:class="isPageActive(pageNumber)">
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
                        <li class="page-item" v-for="pageNumber in pageNumbers" v-bind:class="isPageActive(pageNumber)">
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
                    <button type="button" class="btn btn-primary mr-2" @click.prevent.default="openSearchModal">Search Branches</button>
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
        </div>

        <!-- Modal -->
        <div class="modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="searchBranches" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Search Branches</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="searchColumnName" autocomplete="off" minlength="2" maxlength="255" required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <textarea class="form-control" v-model="searchColumnAddress" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-3 form-group">
                                <label for="city">City</label>
                                <input type="text" class="form-control" v-model="searchColumnCity" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="country">Country</label>
                                <input type="text" class="form-control" v-model="searchColumnCountry" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="zip_code">Zip Code</label>
                                <input type="text" class="form-control" v-model="searchColumnZipCode" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="telephone_number">Telephone Number</label>
                                <input type="text" class="form-control" v-model="searchColumnTelephoneNumber" autocomplete="off" minlength="2" maxlength="255" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Order By</label>
                            <select class="form-control" v-model="order_by">
                                <option value="desc">Newest</option>
                                <option value="asc">Oldest</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer clearfix">
                        <button type="button" class="btn btn-danger btn-sm" @click.prevent.default="clear">Clear</button>
                        <button type="button" class="btn btn-success btn-sm" @click.prevent.default="search">Search</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

const getBranches = (
        page,
        per_page,
        searchColumnName,
        searchColumnAddress,
        searchColumnCity,
        searchColumnCountry,
        searchColumnZipCode,
        searchColumnTelephoneNumber,
        order_by,
        callback
    ) => {
        const params = {
            page,
            per_page,
            searchColumnName,
            searchColumnAddress,
            searchColumnCity,
            searchColumnCountry,
            searchColumnZipCode,
            searchColumnTelephoneNumber,
            order_by
        };

        axios.get('/api/branches', { params }).then(res => {
            console.log(res)
            callback(null, res.data);
        }).catch(error => {
            console.error(error)
            if (error.response.status == 401) {
                location.reload();
            }

            if (error.response.status == 500) {
                alert('Kindly report this issue to the devs.');
            }
        });
    };

export default {
    data() {
        return {
            branches: null,
            searchColumnName: '',
            searchColumnAddress: '',
            searchColumnCity: '',
            searchColumnCountry: '',
            searchColumnZipCode: '',
            searchColumnTelephoneNumber: '',
            order_by: 'desc',
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
            pageNumbers: []
        };
    },

    beforeRouteEnter (to, from, next) {
            if (to.query.per_page == null) {
                getBranches(
                    to.query.page,
                    10,
                    to.query.searchColumnName,
                    to.query.searchColumnAddress,
                    to.query.searchColumnCity,
                    to.query.searchColumnCountry,
                    to.query.searchColumnZipCode,
                    to.query.searchColumnTelephoneNumber,
                    to.query.order_by,
                    (err, data) => {
                        next(vm => vm.setData(err, data));
                    }
                );
            } else {
                getWBranches(
                    to.query.page,
                    to.query.per_page,
                    to.query.searchColumnName,
                    to.query.searchColumnAddress,
                    to.query.searchColumnCity,
                    to.query.searchColumnCountry,
                    to.query.searchColumnZipCode,
                    to.query.searchColumnTelephoneNumber,
                    to.query.order_by,
                    (err, data) => {
                        next(vm => vm.setData(err, data));
                    }
                );
            }
        },

    beforeRouteUpdate (to, from, next) {
        getBranches(to.query.page, this.meta.per_page, (err, data) => {
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
        goToFirstPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'branches.index',
                query: {
                    page: 1,
                    per_page: this.meta.per_page
                },
            });
        },
        goToPage(page = null) {
            this.showProgress = true;
            this.$router.push({
                name: 'branches.index',
                query: {
                    page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToLastPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'branches.index',
                query: {
                    page: this.meta.last_page,
                    per_page: this.meta.per_page
                },
            });
        },
        goToNextPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'branches.index',
                query: {
                    page: this.nextPage,
                    per_page: this.meta.per_page
                },
            });
        },
        goToPreviousPage() {
            this.showProgress = true;
            this.$router.push({
                name: 'branches.index',
                query: {
                    page: this.prevPage,
                    per_page: this.meta.per_page
                }
            });
        },
        setData(err, { data: branches, links, meta }) {
            this.pageNumbers = [];

            if (err) {
                this.error = err.toString();
            } else {
                this.branches = branches;
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
                name: 'branches.index',
                query: {
                    page: 1,
                    per_page: this.meta.per_page
                }
            });
        },search() {
                $('#searchModal').modal('hide');
                this.showProgress = true;
                this.$router.push({
                    name: 'warehouses.index',
                    query: {
                        page: 1,
                        per_page: this.meta.per_page,
                        searchColumnName: this.searchColumnName,
                        searchColumnAddress: this.searchColumnAddress,
                        searchColumnCity: this.searchColumnCity,
                        searchColumnCountry: this.searchColumnCountry,
                        searchColumnZipCode: this.searchColumnZipCode,
                        searchColumnTelephoneNumber: this.searchColumnTelephoneNumber,
                        order_by: this.order_by
                    }
                });
            },
            clear() {
                this.searchColumnName            = '';
                this.searchColumnAddress         = '';
                this.searchColumnCity            = '';
                this.searchColumnCountry         = '';
                this.searchColumnZipCode         = '';
                this.searchColumnTelephoneNumber = '';
                this.order_by                    = 'desc';
            },
            openSearchModal() {
                $('#searchModal').modal('show');
            }
    }
}
</script>
