import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Source of Truth
export default new Vuex.Store({
    state: {
        access_token: localStorage.getItem('access_token') || null,
        user: null,
        selectedCorporation: null,
        corporation_id: localStorage.getItem('selectedCorporation')
    },
    getters: {
        accessToken (state) {
            return state.access_token
        }
    },
    mutations: {
        selectCorporation(state, corporation) {
            state.selectedCorporation = corporation;
        },
        getAllCorporations(state) {
            axios.get('/api/corporations/retrieve-all-corporations').then(res => {
                state.corporations = res.data.corporations;
            });
        },
        addAxiosCorporationHeader(state) {
            axios.defaults.headers.common['CORPORATION-ID'] = JSON.parse(localStorage.getItem('selectedCorporation')).id;
        }
    },
    actions: {
        SetCorporationId ({commit}, corporation_id) {
            localStorage.setItem('corp_id', corporation_id)
        }
    },
    modules: {
        //
    }
});
