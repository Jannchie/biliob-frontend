import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logined: false,
    currentPage: ""
  },
  mutations: {
    login(state) {
      state.logined = true;
    },
    logout(state) {
      state.logined = false;
    },
    toVideo(state) {
      state.currentPage = "video";
    },
    toAuthor(state) {
      state.currentPage = "author";
    },
    toElse(state) {
      state.currentPage = "else";
    }
  },
  getters: {
    getLoginState: state => {
      return state.logined;
    },
    getCurrentPage: state => {
      return state.currentPage;
    }
  }
});
