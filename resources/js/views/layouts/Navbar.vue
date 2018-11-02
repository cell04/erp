<template>
    <nav class="navbar navbar-expand-md navcolor">
        <div class="container-fluid">
            <router-link class="navTextColor" :to="{ name: 'overview' }">
                <img src="../../assets/tradesoft_logo.png" style="width:115px; height:60px; margin-top:-5px; margin-bottom: -10px; margin-left:25   px;" alt="Tradesoft Business"/>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <!-- <li v-if="corporation">
                        <a class="nav-link" href="#" v-on:click.stop.prevent="">{{ corporation.name }}</a>
                    </li> -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle navTextColor" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user px-2"></i>
                            {{ user.name }} <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" :to="{ name: 'corporations.select' }">Switch Group</router-link>
                            <router-link class="dropdown-item" :to="{ name: 'settings.index' }">Settings</router-link>
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
                this.user = res.data.user;
                localStorage.setItem('user', JSON.stringify(res.data.user));
            });

            if (JSON.parse(localStorage.getItem('selectedCorporation')) instanceof Object == false) {
                this.$router.push({ name: 'corporations.select' });
            } else {
                this.$store.state.selectedCorporation = JSON.parse(localStorage.getItem('selectedCorporation'));
                this.corporation = JSON.parse(localStorage.getItem('selectedCorporation'));
                axios.defaults.headers.common['CORPORATION-ID'] = JSON.parse(localStorage.getItem('selectedCorporation')).id;
            }

            Broadcast.$on('ChangeCorporation', (event) => {
                this.corporation = event.corporation;
            });
        },

        methods: {
            logout() {
                axios.post('/logout').then(res => {
                    localStorage.clear();
                    location.reload();
                }).catch(function (error) {
                    localStorage.clear();
                    location.reload();
                });
            }
        }
    }
</script>

<style>
    .navcolor{
       background: rgb(255,255,255);
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(49, 156, 159,1) 99%);
    }
    .navTextColor{
        color: white;
    }
    .fas .fa-user .px-1{
        color: white !important;
    }
</style>
