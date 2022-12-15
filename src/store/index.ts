import { createStore } from 'vuex'
import loadingux       from './modules/ux/loading'
import formDateRangeUx from './modules/ux/formDateRange'
import loginux         from './modules/ux/login'
import loginapi        from './modules/api/login'
import profileapi      from './modules/api/profile'
import historyapi      from './modules/api/history'

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
    loginux,loginapi,
    profileapi,
    historyapi,
  }
})
