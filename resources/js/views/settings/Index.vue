<template>
    <div class="contianer">
        <div class="card my-4">
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
                        Item Class
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
            </ul>
        </div>

        <div class="row">
            <div class="col-md-12">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
