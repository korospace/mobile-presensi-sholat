import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        currentCity: null,
        city: [],
        tmpCity: [],
    },
    getters: {
    },
    actions: {
        GET_CITY: function ({ commit }: any) {

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'loading'},{ root: true });

            axios
                .get(`https://api.myquran.com/v1/sholat/kota/semua`)
                .then(( res ) => {

                    commit("SET_CITY",res.data);
                    commit("SET_TMP_CITY",res.data);

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }

                    commit("SET_CITY",[]);
                    commit("SET_TMP_CITY",[]);
                
                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
    },
    mutations: {
        SET_CURRENT_CITY: function(state: any, data: any) {
            state.currentCity = data;
        },
        SET_CITY: function(state: any, data: any) {
            state.city = data;
        },
        SET_TMP_CITY: function(state: any, data: any) {
            state.tmpCity = data;
        },
    }
}