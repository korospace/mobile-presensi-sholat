
export default {
    namespaced: true,
    state: {
      show: false,
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_SHOW_FORM: function(state: any, show: any) {
            state.show = show;
        },
    }
}