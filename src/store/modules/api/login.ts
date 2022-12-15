import { saveLocalStorage } from '@/services/localstorage.service';
import axios                from 'axios';
import router               from "@/router";
import { toast }            from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        errorCredential: false
    },
    getters: {
    },
    actions: {
        DO_LOGIN: function ({ commit,rootState }: any,form: any) {

            const privilege = form.get('privilege') == "guru" ? "teacher" : form.get('privilege');

            // if username or password empty
            if (form.get("username") == "" || form.get("password") == "") {
                return 0;
            }

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'login'},{ root: true });

            axios
                .post(`${rootState.apiurl}/api/v1/login/${privilege}`,form)
                .then(( response ) => {
                    
                    saveLocalStorage('userdata',response.data);
                    router.push("/");

                    toast.success("login success !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                })
                .catch(( error ) => {
                    
                    if (error.response.status == 401) {
                        commit("SET_ERROR_CREDENTIAL",true);

                        toast.error("NIS atau Password salah !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                    else if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                
                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
    },
    mutations: {
        SET_ERROR_CREDENTIAL(state: any, data: any) {
            state.errorCredential = data;
        },
        
    }
}