import axios from "axios";
export default {
  state: {
    rankListFansIncrease: undefined,
    rankListFansDecrease: undefined,
    rankListBangumi: undefined,
    rankListDonghua: undefined
  },
  mutations: {
    setData(state, payload) {
      state[payload.name] = payload.data;
    }
  },
  actions: {
    getIncrease(context) {
      axios.get("/rank/fans-increase-rate").then(response => {
        context.commit("setData", {
          data: response.data.content,
          name: "rankListFansIncrease"
        });
      });
    },
    getDecrease(context) {
      axios.get("/rank/fans-decrease-rate").then(response => {
        context.commit("setData", {
          data: response.data.content,
          name: "rankListFansDecrease"
        });
      });
    },
    getBangumiTopList(context) {
      axios.get("/bangumi").then(response => {
        let data = response.data.content;
        data.forEach(element => {
          element.cover = element.cover.slice(5);
        });
        context.commit("setData", {
          data: data,
          name: "rankListBangumi"
        });
      });
    },
    getDonghuaTopList(context) {
      axios.get("/donghua").then(response => {
        let data = response.data.content;
        data.forEach(element => {
          element.cover = element.cover.slice(5);
        });
        context.commit("setData", {
          data: data,
          name: "rankListDonghua"
        });
      });
    }
  }
};
