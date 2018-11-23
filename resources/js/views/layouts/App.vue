<template>
    <div>
        <navbar></navbar>
        <!-- <div class="headerTop"></div> -->
        <div class="container-fluid mb-5 ">
            <div class="row">
                <div v-bind:class="this.$store.state.showSidebar ? 'col-md-2 p-md-0':'col-md-0 p-md-0'">
                    <sidebar v-if="this.$store.state.showSidebar"></sidebar>
                </div>

                <div v-bind:class="this.$store.state.showSidebar ? 'col-md-10 p-md-0':'col-md-12 p-md-0'">
                    <!-- <div class="mt-3 px-md-5"> -->
                        <transition name="fade" mode="out-in">
                            <router-view class="view"></router-view>
                        </transition>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        beforeCreate() {
            Broadcast.$on('ChangeCorporation', (event) => {
                axios.defaults.headers.common['CORPORATION-ID'] = event.corporation.id;
            });

            Broadcast.$on('NewCorporationCreated', (event) => {
                axios.get('/api/corporations/retrieve-all-corporations').then(res => {
                    localStorage.setItem('corporations', JSON.stringify(res.data.corporations));
                });
            });
        },

        created() {
            //
        }
    }
</script>

<style>
.sidebarTheme {
    background: #fff;
    height: 900px;
    width: 18em;
}

/* .headerTop {
    width: 84%;
    height: 24px;
    background-color: #f5f8fa;
    clip-path: polygon(2% 2%, 100% 0%, 100% 100%, 0% 100%);
    margin-left: 16%;
    margin-top: -2%;
} */

.content-title {
    margin-top: -27px;
    border-bottom: 28px solid #f5f8fa;
    border-left: 25px solid transparent;
    height: 0;
    width: 100%;
}

.module-title {
    padding-top: 5px;
    font-weight: bold;
    font-size: 14px;
}

.title-border {
    width: 103%;
    margin-top: 0px;
    margin-left: -3%;
    border: 0;
    border-top: 2px solid #abb0b0;
}



</style>
