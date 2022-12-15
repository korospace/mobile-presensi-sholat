const currentUnixTime = new Date(new Date().getTime());
const currentDay   = currentUnixTime.toLocaleString("en-US",{day: "2-digit"});
const currentMonth = currentUnixTime.toLocaleString("en-US",{month: "2-digit"});
const currentYear  = currentUnixTime.toLocaleString("en-US",{year: "numeric"});

export default {
    namespaced: true,
    state: {
      show: false,
      dateStart:`${currentYear}-${currentMonth}-01`,
      dateEnd:`${currentYear}-${currentMonth}-${currentDay}`,
    },
    getters: {
    },
    actions: {
    },
    mutations: {
        SET_SHOW_FORM: function(state: any, show: any) {
            state.show = show;
        },
        SET_DATESTART: function(state: any, data: any) {
            state.dateStart = data;
        },
        SET_DATEEND: function(state: any, data: any) {
            state.dateEnd = data;
        },
    }
}