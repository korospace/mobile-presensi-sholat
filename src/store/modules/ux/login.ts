export default {
    namespaced: true,
    state: {
        privilege: "student"
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_PRIVILEGE(state: any, privilege: any) {
            state.privilege = privilege;
        },
    }
}