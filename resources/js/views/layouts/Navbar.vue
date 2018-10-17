<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{ name: 'overview' }">Inventory</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li v-if="corporation">
                        <a class="nav-link" href="#" v-on:click.stop.prevent="">{{ corporation.name }}</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ user.name }} <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" :to="{ name: 'corporations.select' }">Settings</router-link>
                            <a class="dropdown-item" href="#" v-on:click.stop.prevent="logout">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                corporation: '',
                user: ''
            };
        },

        mounted() {
            /*Broadcast.$on('System Initialized', (event) => {
                this.user = this.$store.state.user;
            });*/

            axios.get('/api/auth/user').then(res => {
                /*Broadcast.$emit('System Initialized', {});
                localStorage.setItem('user', JSON.stringify(res.data.user));*/
                this.user = res.data.user;
            });

            Broadcast.$on('CacheReloaded', (event) => {
                this.user = this.$store.state.user;

                if (JSON.parse(localStorage.getItem('selectedCorporation')) instanceof Object == false) {
                    this.$router.push({ name: 'corporations.select' });
                } else {
                    this.corporation = JSON.parse(localStorage.getItem('selectedCorporation'));
                }
            });

            Broadcast.$on('ChangeCorporation', (event) => {
                this.corporation = event.corporation;
            });
        },

        methods: {
            logout() {
                axios.post('/logout').then(res => {
                //
            }).catch(function (error) {
                localStorage.clear();
                location.reload();
            });
        }
    }
}
</script>
