export default {
    namespaced: true,
    state: {
      data: {
        show: false,
        text: ''
      },
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_DATA_LOADING: function(state: any, data: any) {
            state.data.show = data.show;
            state.data.text = data.text;
        },
    }
}