import axios from "axios";
export default {
  state: { recentEvent: undefined },
  mutations: {
    setData(state, payload) {
      state[payload.name] = payload.data;
    }
  },
  getters: {
    recentEventList(state) {
      return state.recentEvent;
    }
  },
  actions: {
    getRecentEvent(context) {
      axios.get("/event/fans-variation").then(response => {
        context.commit("setData", {
          data: response.data.content,
          name: "recentEvent"
        });
      });
    }
  }
};
