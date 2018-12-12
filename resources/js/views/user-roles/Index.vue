<template>
    <div>
        <div class="card">
            <div class="card-header clearfix">
                <div class="float-left">
                    Settings / User Roles
                </div>
                <!-- <div class="float-right">
                    <router-link class="btn-primary btn-sm" :to="{ name: 'users.create' }"><i class="fas fa-plus"></i> Create New User</router-link>
                </div> -->
            </div>
            <div class="card-body">
                <table class="table table-hover table-sm">
                    <caption>
                        <div class="row">
                            <div class="col-md-9">
                                <!-- List of User Roles - Total Items {{ this.meta.total }} -->
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
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody v-if="user_roles">
                        <tr v-for="{ id, name } in user_roles">
                            <td>{{ name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br>

        <!-- <div class="clearfix">
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
            </div> -->

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user_roles: null,
                error: null,
                showProgress: false,
                pageNumbers: []
            };
        },
        mounted() {
            let promise = new Promise((resolve, reject) => {
                axios.get("/api/roles/get-all-roles/").then(res => {
                    console.log(res);
                    this.ifReady = true;
                    this.user_roles = res.data.roles;
                    if (!res.data.response) {
                        return;
                    }
                    resolve();
                });
            });
        }
    }
</script>
