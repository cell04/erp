<template>
    <div class="contianer">
        <div class="card my-4">
            <ul class="nav nav-pills nav-justified">
                <li class="nav-item bg-white">
                    <router-link class="nav-link active p-3" :to="{ name: 'settings.index' }">
                        System
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.users' }">
                        Users
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.units.index' }">
                        Unit of Measurements
                    </router-link>
                </li>
                <li class="nav-item bg-white">
                    <router-link class="nav-link p-3" :to="{ name: 'settings.conversions' }">
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
            <div class="card-header">
                Available Settings
            </div>
            <div class="card-body">
                Test
            </div>
        </div>
    </div>
</template>
