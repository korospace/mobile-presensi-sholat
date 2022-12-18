import { getLocalStorage, removeLocalStorage } from "@/services/localstorage.service";
import { LocalNotifications } from '@capacitor/local-notifications'
import axios     from 'axios';
import router    from "@/router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        hijriah     : "_ _ _ _",
        jadwalSholat: {
            subuh : "_ _:_ _",
            dzuhur: "_ _:_ _",
            ashar : "_ _:_ _",
            magrib: "_ _:_ _",
            isya  : "_ _:_ _",
            date  : "_ _:_ _",
        },
        privilege : null,
        uniqid    : null,
        sholatName: null,
        status    : "berjamaah",
        subuh : {},
        dzuhur: {},
        ashar : {},
        magrib: {},
        isya  : {},
    },
    getters: {
        uniqidGetter: (state: any) => state.uniqid,
        sholatNameGetter: (state: any) => state.sholatName,
        statusGetter: (state: any) => state.status,
    },
    actions: {
        GET_HIJRIAH: function ({ commit,rootState }: any) {

            commit("SET_HIJRIAH","_ _ _ _");
            const currentUnixTime = new Date(new Date().getTime());
            const currentDay   = currentUnixTime.toLocaleString("en-US",{day: "2-digit"});
            const currentMonth = currentUnixTime.toLocaleString("en-US",{month: "2-digit"});
            const currentYear  = currentUnixTime.toLocaleString("en-US",{year: "numeric"});

            axios
                .get(`${rootState.apiurl}/api/v1/hijriyah/${currentDay}-${currentMonth}-${currentYear}`)
                .then(( res ) => {
                    const data = res.data;
                    commit("SET_HIJRIAH",`${data.hari}, ${data.tanggal_hijriyah} ${data.bulan_hijriyah} ${data.tahun_hijriyah}`);
                })
                .catch(( error ) => {
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }

                    commit("SET_HIJRIAH","_ _ _ _");
                })

        },
        GET_JADWAL: function ({ commit }: any) {

            commit("SET_JADWAL",{
                subuh : "_ _:_ _",
                dzuhur: "_ _:_ _",
                ashar : "_ _:_ _",
                magrib: "_ _:_ _",
                isya  : "_ _:_ _",
                date  : "_ _:_ _",
            });

            const userregion      = getLocalStorage("userregion");
            const currentUnixTime = new Date(new Date().getTime());
            const currentDay   = currentUnixTime.toLocaleString("en-US",{day: "2-digit"});
            const currentMonth = currentUnixTime.toLocaleString("en-US",{month: "2-digit"});
            const currentYear  = currentUnixTime.toLocaleString("en-US",{year: "numeric"});

            axios
                .get(`https://api.myquran.com/v1/sholat/jadwal/${userregion.id}/${currentYear}/${currentMonth}/${currentDay}`)
                .then(async ( res ) => {
                    const jadwal = res.data.data.jadwal;
                    
                    commit("SET_JADWAL",jadwal);
                    LocalNotifications.removeAllListeners();

                    let i = 1;
                    const notificationsArray = [];

                    for (const key in jadwal) {

                        if (['subuh','dzuhur','ashar','maghrib','isya'].includes(key)) {
                            const arrayTime = jadwal[key].split(':');                            

                            notificationsArray.push({
                                id: i++,
                                channelId: `${key}Reminders`, // If you are using channels
                                title: key,
                                body: `Adzan ${key} sudah berkumandang, segera pergi ke masjid!`,
                                schedule: {
                                    on: {
                                        hour: arrayTime[0],
                                        minute: parseInt(arrayTime[1])
                                    },
                                    allowWhileIdle: true,
                                },
                            });
                        }
                        
                    }

                    notificationsArray.push({
                        id: 1234,
                        channelId: 'tesReminders', // If you are using channels
                        title: 'Tes title',
                        body: 'Tes body',
                        schedule: {
                            on: {
                                hour: 16,
                                minute: 45
                            },
                            allowWhileIdle: true,
                        },
                        extra: {
                            // Any random data you want to add
                        },
                    })

                    await LocalNotifications.schedule({
                        notifications: notificationsArray,
                    })

                })
                .catch(( error ) => {
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }

                    commit("SET_JADWAL",{
                        subuh : "_ _:_ _",
                        dzuhur: "_ _:_ _",
                        ashar : "_ _:_ _",
                        magrib: "_ _:_ _",
                        isya  : "_ _:_ _",
                        date  : "_ _:_ _",
                    });
                })

        },
        GET_PRESENSI: function ({ commit,rootState }: any) {

            axios
                .get(`${rootState.apiurl}/api/v1/presensi`,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( res ) => {
                    let presensi = [];

                    if (res.data.privilege == "parent") {
                        if (res.data.student.presensi==null) {
                            return 0
                        }

                        presensi = res.data.student.presensi.detil_presensi;
                    } else {
                        if (res.data.presensi==null) {
                            return 0
                        }

                        presensi = res.data.presensi.detil_presensi;
                    }

                    commit("SET_PRIVILEGE",res.data.privilege);

                    const presSubuh  = presensi.filter((e: any) => e.sholat == "subuh");
                    const presDzuhur = presensi.filter((e: any) => e.sholat == "dzuhur");
                    const presAshar  = presensi.filter((e: any) => e.sholat == "ashar");
                    const presMagrib = presensi.filter((e: any) => e.sholat == "magrib");
                    const presIsya   = presensi.filter((e: any) => e.sholat == "isya");

                    commit("SET_SUBUH",presSubuh[0]);
                    commit("SET_DZUHUR",presDzuhur[0]);
                    commit("SET_ASHAR",presAshar[0]);
                    commit("SET_MAGRIB",presMagrib[0]);
                    commit("SET_ISYA",presIsya[0]);

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    // else if (error.response.status == 401) {
                        
                    //     toast.warn(error.response.data.message, {
                    //         position: toast.POSITION.TOP_RIGHT,
                    //     });

                    //     removeLocalStorage("userdata");
                    //     router.push('/login');

                    // }

                    commit("SET_SUBUH",{});
                    commit("SET_DZUHUR",{});
                    commit("SET_ASHAR",{});
                    commit("SET_MAGRIB",{});
                    commit("SET_ISYA",{});

                })

        },
        DO_CONFIRM: function ({ commit,rootState,dispatch,getters }: any) {
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'konfirmasi'},{ root: true });

            const form = new FormData();
            form.set("uniqid",getters.uniqidGetter);
            form.set("sholat",getters.sholatNameGetter);
            
            axios
                .put(`${rootState.apiurl}/api/v1/presensi/confirm`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success(`sholat ${form.get('sholat')} berhasil dikonfirmasi`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    dispatch("GET_PRESENSI");

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    else if (error.response.status == 401) {
                        
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }

                    commit("SET_SUBUH",{});
                    commit("SET_DZUHUR",{});
                    commit("SET_ASHAR",{});
                    commit("SET_MAGRIB",{});
                    commit("SET_ISYA",{});

                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })


        },
        DO_UPDATE: function ({ commit,rootState,dispatch,getters }: any) {
            commit("loadingux/SET_DATA_LOADING",{show:true,text:'menyimpan'},{ root: true });

            const form = new FormData();
            form.set("uniqid",getters.uniqidGetter);
            form.set("sholat",getters.sholatNameGetter);
            form.set("status",getters.statusGetter);

            axios
                .put(`${rootState.apiurl}/api/v1/presensi`,form,{
                    headers: {
                      token: getLocalStorage("userdata").token
                    }
                })
                .then(( ) => {

                    toast.success(`sholat ${form.get('sholat')} berhasil disimpan`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    dispatch("GET_PRESENSI");

                })
                .catch(( error ) => {
                    
                    if (error.response.status >= 500) {
                        toast.error("terjadi kesalahan pada server, refresh halaman !", {
                            position: toast.POSITION.TOP_LEFT,
                        });
                    }
                    else if (error.response.status == 401) {
                        
                        toast.warn(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });

                        removeLocalStorage("userdata");
                        router.push('/login');

                    }

                    commit("SET_PRESENSI",[]);

                })
                .finally(() => {

                    commit("loadingux/SET_DATA_LOADING",{show:false,text:''},{ root: true });

                })


        },
    },
    mutations: {
        SET_HIJRIAH: function(state: any, data: any) {
            state.hijriah = data;
        },
        SET_JADWAL: function(state: any, data: any) {
            state.jadwalSholat.subuh  = data.subuh;
            state.jadwalSholat.dzuhur = data.dzuhur;
            state.jadwalSholat.ashar  = data.ashar;
            state.jadwalSholat.magrib = data.maghrib;
            state.jadwalSholat.isya   = data.isya;
            state.jadwalSholat.date   = data.date;
        },
        SET_PRIVILEGE: function(state: any, data: any) {            
            state.privilege = data;
        },
        SET_UNIQID: function(state: any, data: any) {            
            state.uniqid = data;
        },
        SET_SHOLATNAME: function(state: any, data: any) {            
            state.sholatName = data;
        },
        SET_STATUS: function(state: any, data: any) {            
            state.status = data;
        },
        SET_SUBUH: function(state: any, data: any) {            
            state.subuh = data;
        },
        SET_DZUHUR: function(state: any, data: any) {            
            state.dzuhur = data;
        },
        SET_ASHAR: function(state: any, data: any) {            
            state.ashar = data;
        },
        SET_MAGRIB: function(state: any, data: any) {            
            state.magrib = data;
        },
        SET_ISYA: function(state: any, data: any) {            
            state.isya = data;
        },
    }
}