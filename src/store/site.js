import axios from "axios";
import drawSitePlay from "../charts/site_play.js";
export default {
  state: { siteInfo: undefined, siteGroupInfo: undefined },
  mutations: {
    setSiteInfo(state, info) {
      state.siteInfo = info;
    },
    setData(state, payload) {
      state[payload.name] = payload.data;
    }
  },
  getters: {
    bigestWatching(state) {
      if (state.siteInfo != undefined) {
        state.siteInfo.series[0].data;
        return `约为${Math.max
          .apply(null, state.siteInfo.series[0].data)
          .toFixed(2)}万人`;
      } else {
        return null;
      }
    },
    bigestOnline(state) {
      if (state.siteInfo != undefined) {
        state.siteInfo.series[1].data;
        return `约为${Math.max
          .apply(null, state.siteInfo.series[1].data)
          .toFixed(2)}万人`;
      } else {
        return null;
      }
    },
    currentMonthTop(state) {
      if (state.siteGroupInfo == undefined) {
        return "载入中..";
      } else {
        return `约${(state.siteGroupInfo[0].play_online / 10000).toFixed(
          3
        )}万人`;
      }
    },
    compareWithLastMonth(state) {
      if (state.siteGroupInfo == undefined) {
        return "载入中..";
      }
      let text = `${(
        ((state.siteGroupInfo[0].play_online -
          state.siteGroupInfo[1].play_online) /
          state.siteGroupInfo[1].play_online) *
        100
      ).toFixed(3)}%`;
      if (text[0] == "-") {
        text = "↓  " + text.replace("-", "");
      } else {
        text = "↑  " + text;
      }
      return text;
    },
    compareWithLastYear(state) {
      if (state.siteGroupInfo == undefined) {
        return "载入中..";
      } else {
        let text = `${(
          ((state.siteGroupInfo[0].play_online -
            state.siteGroupInfo[state.siteGroupInfo.length - 1].play_online) /
            state.siteGroupInfo[state.siteGroupInfo.length - 1].play_online) *
          100
        ).toFixed(3)}%`;
        if (text[0] == "-") {
          text = "↓  " + text.replace("-", "");
        } else {
          text = "↑  " + text;
        }
        return text;
      }
    }
  },
  actions: {
    getSiteInfo(context) {
      axios.get("/site").then(response => {
        context.commit("setSiteInfo", drawSitePlay(response.data));
      });
    },
    getSiteGroupInfo(context) {
      axios.get("/site/group").then(response => {
        context.commit("setData", {
          data: response.data,
          name: "siteGroupInfo"
        });
      });
    }
  }
};
