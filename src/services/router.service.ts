import { 
    getLocalStorage,
    removeLocalStorage }   from './localstorage.service';
import router              from "@/router";
import axios               from 'axios';
import createStore         from "@/store";
import { toast }           from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const authCheck = () => {

    const userData = getLocalStorage("userdata");
    
    if (userData == null) {
        
        router.push('/login');
        return false;
    } 
    else {
        
        if (userData.token == null || userData.token == "") {
        
            removeLocalStorage("userdata");
            router.push('/login');

        } 
        else {
        
            axios
                .get(`${createStore.state.apiurl}/api/v1/profile`,{
                    headers: {
                      token: userData.token
                    }
                })
                .then((reseponse) => {
                    createStore.commit('profileapi/SET_DATA_PROFILE',reseponse.data);
                })
                .catch(( error ) => {
                    
                    if (error.response.status == 401) {
                        
                        if (error.response.data.message == "token expired") {
                            toast.warn("waktu login anda habis !", {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        }

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }
                    else {
                        
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                    }
                
                })
            
        }

    }

}

const loginCheck = async (to: any, from: any, next: any) => {
    const userData = getLocalStorage("userdata");

    if (userData != null) {
        router.push('/');
    }

    next();
    
}

const regionCheck = async (to: any, from: any, next: any) => {

    if (getLocalStorage("userregion") == null) {
        router.push('/regionsetting');
    }

    next();
    
}

// const authorizationCheck = async (to: any, from: any, next: any) => {
//     const userData = getLocalStorage("userdata");
//     const privilege= userData.privilege;

//     if(['admin','teacher','student','kelas'].includes(to.name) && privilege != 'admin') { 
//         next({ path: '/' });
//     } 

//     next();
    
// }

export { authCheck,loginCheck,regionCheck };