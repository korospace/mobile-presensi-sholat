import { getLocalStorage, removeLocalStorage, } from '@/services/localstorage.service';
import router    from '@/router';
import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        data: {},
        passwordError: null,
        oldPasswordError: null,
    },
    getters: {
    },
    actions: {
        DO_UPDATE_PROFILE: function ({ commit,rootState }: any,form: any) {

            const userData = getLocalStorage("userdata");

            // show loading
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'login'},{ root: true });

            axios
                .put(`${rootState.apiurl}/api/v1/profile`,form,{
                    headers: {
                      token: userData.token
                    }
                })
                .then(( ) => {

                    toast.success("password berhasil diupdate !", {
                        position: toast.POSITION.TOP_LEFT,
                    });

                })
                .catch(( error ) => {
                    
                    if (error.response.status == 400) {
                        const passwordError = error.response.data.password;
                        const oldPasswordError = error.response.data.old_password;

                        if (passwordError) {
                            commit("SET_PASSWORD_ERROR",passwordError[0]);
                        }
                        if (oldPasswordError) {
                            commit("SET_OLDPASSWORD_ERROR",oldPasswordError[0]);
                        }
                    }
                    else if (error.response.status == 401) {
                        const oldPasswordError = error.response.data.old_password;

                        if (oldPasswordError) {
                            commit("SET_OLDPASSWORD_ERROR",oldPasswordError[0]);
                        }
                        else {
                            toast.warn("waktu login anda habis", {
                                position: toast.POSITION.TOP_RIGHT,
                            });

                            removeLocalStorage("userdata");
                            router.push('/login');
                        }
                    }
                    else if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                
                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })

        },
    },
    mutations: {
        SET_DATA_PROFILE: function(state: any, data: any) {
            state.data = data;
        },
        SET_PASSWORD_ERROR: function(state: any, msg: any) {
            state.passwordError = msg;
        },
        SET_OLDPASSWORD_ERROR: function(state: any, msg: any) {
            state.oldPasswordError = msg;
        },
    }
}