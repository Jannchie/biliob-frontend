import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logined: false,
    currentPage: "",
    favoriteAid: [],
    favoriteMid: []
  },
  mutations: {
    setFavoriteVideo(state, aidList) {
      state.favoriteAid = aidList;
    },
    addFavoriteVideo(state, aid) {
      state.favoriteAid.push(aid);
    },
    addFavoriteAuthor(state, mid) {
      state.favoriteMid.push(mid);
    },
    removeFavoriteVideo(state, aid) {
      let index = state.favoriteAid.indexOf(aid);
      state.favoriteAid.splice(index, 1);
    },
    setFavoriteAuthor(state, midList) {
      state.favoriteMid = midList;
    },
    removeFavoriteAuthor(state, mid) {
      let index = state.favoriteMid.indexOf(mid);
      state.favoriteMid.splice(index, 1);
    },
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
    },
    getFavoriteAuthor: state => {
      return state.favoriteMid;
    }
  }
});
