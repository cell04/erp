<template>
    <div>
        <div v-bind:class="this.$store.state.showSidebar? 'content-title':'spacer content-title' ">
            <h4 class="module-title">SETTING</h4>
            <hr class="title-border">
        </div>

        <div class="p-md-4">
            <div class="contianer">
                <div class="card">
                    <ul class="nav nav-pills nav-justified">
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3" :to="{ name: 'corporations.index' }">
                                Corporations
                            </router-link>
                        </li>
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3" :to="{ name: 'contact-types.index' }">
                                Contact Types
                            </router-link>
                        </li>
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3 " :to="{ name: 'item-types.index' }">
                                Item Types
                            </router-link>
                        </li>
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3 " :to="{ name: 'item-classifications.index' }">
                                Item Subtypes
                            </router-link>
                        </li>
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3" :to="{ name: 'unit-of-measurements.index' }">
                                UOM
                            </router-link>
                        </li>
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3" :to="{ name: 'users.index' }">
                                Users
                            </router-link>
                        </li>
                        <li class="nav-item bg-white">
                            <router-link class="nav-link p-3" :to="{ name: 'user-roles.index' }">
                                User Roles
                            </router-link>
                        </li>
                    </ul>
                </div>

                <br>
                <div class="row">
                    <div class="col-md-12">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
