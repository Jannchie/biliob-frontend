import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logined: false,
    checked: false,
    userName: String(),
    role: String(),
    credit: Number(),
    exp: Number(),
    dark: false,
    currentPage: String(),
    favoriteAid: [],
    favoriteMid: []
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    },
    setRole(state, role) {
      state.role = role;
    },
    setDark(state) {
      state.dark = !state.dark;
    },
    setCredit(state, credit) {
      state.credit = credit;
    },
    setExp(state, exp) {
      state.exp = exp;
    },
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
    },
    checkIn(state, checkStatus) {
      state.checked = checkStatus;
    }
  },
  getters: {
    getUserName: state => {
      return state.userName;
    },
    getRole: state => {
      return state.role;
    },
    getCredit: state => {
      return state.credit;
    },
    getExp: state => {
      return state.exp;
    },
    getLoginState: state => {
      return state.logined;
    },
    getCurrentPage: state => {
      return state.currentPage;
    },
    getFavoriteAuthor: state => {
      return state.favoriteMid;
    },
    getFavoriteVideo: state => {
      return state.favoriteAid;
    },
    getDark: state => {
      return state.dark;
    },
    getCheckStatus: state => {
      return state.checked;
    }
  }
});
