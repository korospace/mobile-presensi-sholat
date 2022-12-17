import { createStore } from 'vuex'
import loadingux           from './modules/ux/loading'
import formDateRangeUx     from './modules/ux/formDateRange'
import formStatusSholatUx  from './modules/ux/formStatusSholat'
import formKonfirmSholatUx from './modules/ux/formKonfirmSholat'
import loginux          from './modules/ux/login'
import loginapi         from './modules/api/login'
import profileapi       from './modules/api/profile'
import presensiapi      from './modules/api/presensi'
import historyapi       from './modules/api/history'
import regionsettingapi from './modules/api/regionsetting'

export default createStore({
  state: {
    apiurl : "https://sholat.up.railway.app",
    // apiurl : "http://127.0.0.1:8000",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loadingux,
    formDateRangeUx,
    formStatusSholatUx,
    formKonfirmSholatUx,
    loginux,loginapi,
    profileapi,
    presensiapi,
    historyapi,
    regionsettingapi,
  }
})
