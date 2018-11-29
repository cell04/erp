<template>
    <div>
        <navbar></navbar>
        <div class="container-fluid mb-5 ">
            <div class="row">
                <div class="col-md-2 p-md-0">
                    <sidebar></sidebar>
                </div>
                <div class="col-md-10">
                    <div class="mt-3 px-md-5">
                        <transition name="fade" mode="out-in">
                            <router-view class="view"></router-view>
                        </transition>
                    </div>
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
        }
    }
</script>

<!-- <style scoped>
.sidebarTheme {
    background: #fff;
    height: 900px;
    width: 18em;
}
</style> -->
