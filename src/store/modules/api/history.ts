import { getLocalStorage } from "@/services/localstorage.service";
// import router    from "@/router";
import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        historySholat:null,
    },
    getters: {
        // userDataGetter: state => state.userData
    },
    actions: {
        GET_HISTORY: function ({ commit,rootState }: any,query: any) {
            commit("SET_HISTORY_SHOLAT",null);
            
            axios
                .get(`${rootState.apiurl}/api/v1/presensi/history?datestart=${query.datestart}&dateend=${query.dateend}`,{
                    headers: {
                      token: getLocalStorage("userdata").token,
                    }
                })
                .then(( res ) => {

                    commit("SET_HISTORY_SHOLAT",res.data);

                })
                .catch(( error ) => {
                    commit("SET_HISTORY_SHOLAT",null);
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })

        },
    },
    mutations: {
        SET_HISTORY_SHOLAT: function(state: any, data: any) {
            state.historySholat = data;
        },
    }
}