import axios from "axios";
import getCardChartOptions from "../charts/get-card-chart.js";
var format = require("date-fns/format");

export default {
  state: { historyQueueData: undefined },
  mutations: {
    setData(state, payload) {
      state[payload.name] = payload.data;
    }
  },
  getters: {
    authorQueueOptions(state) {
      if (state.historyQueueData == undefined) {
        return {};
      }
      let author = [];
      let date = [];
      for (let index = 0; index < state.historyQueueData.length; index += 3) {
        const element = state.historyQueueData[index];
        console.log(element);

        author.push(element.author);
        date.push(format(element.date, "HH:mm"));
      }
      return getCardChartOptions(date, author, "bar");
    },
    videoQueueOptions(state) {
      if (state.historyQueueData == undefined) {
        return {};
      }
      let video = [];
      let date = [];
      for (let index = 0; index < state.historyQueueData.length; index += 3) {
        const element = state.historyQueueData[index];
        console.log(element);

        video.push(element.video);
        date.push(format(element.date, "HH:mm"));
      }
      return getCardChartOptions(date, video, "bar");
    }
  },
  actions: {
    getHistoryQueueData(context) {
      axios.get("/tracer/history-queue").then(response => {
        context.commit("setData", {
          name: "historyQueueData",
          data: response.data
        });
      });
    }
  }
};
