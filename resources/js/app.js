/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from './views/layouts/App';
import store from './store';
import router from './router';
import VueSelect from 'vue-select';
import ChartJS from 'chart.js';
import DatePicker from 'vuejs-datepicker';
import Vuelidate from 'vuelidate';

//Validator
Vue.use(Vuelidate)

// Global Broadcasting
window.Broadcast = new Vue();
window.Chart = ChartJS;

// Components
Vue.component('vue-select', VueSelect);
Vue.component('datepicker', DatePicker);

// Layouts
Vue.component('navbar', require('./views/layouts/Navbar.vue'));
Vue.component('sidebar', require('./views/layouts/Sidebar.vue'));

// OAuth2
/*Vue.component('passport-clients', require('./components/passport/Clients.vue'));
Vue.component('passport-authorized-clients', require('./components/passport/AuthorizedClients.vue'));
Vue.component('passport-personal-access-tokens', require('./components/passport/PersonalAccessTokens.vue'));*/

const app = new Vue({
    el: '#app',
    components: { app: App },
    store,
    router,
});
