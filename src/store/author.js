import axios from "axios";
export default {
  state: { hotSearch: undefined },
  mutations: {
    setData(state, payload) {
      state[payload.name] = payload.data;
    }
  },
  getters: {
    getHotSearchAuthor(state) {
      return state.hotSearch;
    }
  },
  actions: {
    getHotSearchAuthor(context) {
      axios.get("/author/hot").then(response => {
        context.commit("setData", {
          data: response.data,
          name: "hotSearch"
        });
      });
    }
  }
};
