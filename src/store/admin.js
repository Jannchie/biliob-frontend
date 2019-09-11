import axios from "axios";
import getCardChartOptions from "../charts/get-card-chart.js";
var format = require("date-fns/format");

export default {
  state: {
    historyQueueData: undefined,
    videoVisitList: undefined,
    authorVisitList: undefined,
    dashBoardData: undefined
  },
  mutations: {
    setData(state, payload) {
      state[payload.name] = payload.data;
    }
  },
  getters: {
    sumSpiderCount(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return state.dashBoardData.sumSpiderCount;
    },
    checkedInCount(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return state.dashBoardData.checkedInCount;
    },
    recordCount(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return state.dashBoardData.recordCount;
    },
    userCount(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return state.dashBoardData.userCount;
    },
    authorCrawlLength(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return state.dashBoardData.authorCrawlLength;
    },
    videoCrawlLength(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return state.dashBoardData.videoCrawlLength;
    },
    userOptions(state) {
      if (state.dashBoardData == undefined) {
        return {};
      }
      let data = state.dashBoardData.userBucketResult;
      let userX = data.map(x => {
        if (x._id.min == null) {
          x._id.min = "未签到";
        } else {
          x._id.min = ">" + x._id.min;
        }
        return x._id.min;
      });
      let userY = data.map(x => {
        return x.count;
      });
      return getCardChartOptions(userX, userY, "bar");
    },
    signInOptions(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return getCardChartOptions(
        state.dashBoardData.monthlySignIn.map(e => {
          return e.month + "月";
        }),
        state.dashBoardData.monthlySignIn.map(e => {
          return e.count;
        }),
        "line"
      );
    },
    checkInOptions(state) {
      if (state.dashBoardData == undefined) {
        return 0;
      }
      return getCardChartOptions(
        state.dashBoardData.weeklyCheckIn.map(e => {
          return "第" + e.week + "周";
        }),
        state.dashBoardData.weeklyCheckIn.map(e => {
          return e.count;
        }),
        "bar"
      );
    },
    authorVisitOptions(state) {
      if (state.authorVisitList == undefined) {
        return {};
      }
      let value = [];
      let date = [];
      for (let index = 0; index < state.authorVisitList.length; index += 1) {
        const element = state.authorVisitList[index];
        value.push(element.count);
        date.push(element._id);
      }
      return getCardChartOptions(date, value, "line");
    },
    videoVisitOptions(state) {
      if (state.videoVisitList == undefined) {
        return {};
      }
      let value = [];
      let date = [];
      for (let index = 0; index < state.videoVisitList.length; index += 1) {
        const element = state.videoVisitList[index];
        value.push(element.count);
        date.push(element._id);
      }
      return getCardChartOptions(date, value, "line");
    },
    videoQueueOptions(state) {
      if (state.historyQueueData == undefined) {
        return {};
      }
      let video = [];
      let date = [];
      for (let index = 0; index < state.historyQueueData.length; index += 1) {
        const element = state.historyQueueData[index];
        video.push(element.video);
        date.push(format(element.date, "HH:mm"));
      }
      return getCardChartOptions(date, video, "bar");
    },
    authorQueueOptions(state) {
      if (state.historyQueueData == undefined) {
        return {};
      }
      let value = [];
      let date = [];
      for (let index = 0; index < state.historyQueueData.length; index += 1) {
        const element = state.historyQueueData[index];
        value.push(element.author);
        date.push(format(element.date, "HH:mm"));
      }
      return getCardChartOptions(date, value, "bar");
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
    },
    getAuthorVisit(context) {
      axios.get("/tracer/visit/author").then(response => {
        context.commit("setData", {
          name: "authorVisitList",
          data: response.data
        });
      });
    },
    getVideoVisit(context) {
      axios.get("/tracer/visit/video").then(response => {
        context.commit("setData", {
          name: "videoVisitList",
          data: response.data
        });
      });
    },
    getDashBoardData(context) {
      axios.get("/tracer/exists-tasks").then(r => {
        context.commit("setData", {
          name: "scheduleTask",
          data: r.data
        });
      });

      axios.get(`/tracer/dashboard`).then(r => {
        context.commit("setData", {
          name: "dashBoardData",
          data: r.data
        });
      });
    }
  }
};
