import { createStore } from "vuex";

export default createStore({
  state: {loadingStatus: false},
  getters: {
    loadingStatus: state => state.loadingStatus,
  },
  mutations: {
    startLoading(state) {
      state.loadingStatus = true
    },
    endLoading(state) {
      state.loadingStatus = false
    },
  },
  actions: {},
  modules: {},
});
