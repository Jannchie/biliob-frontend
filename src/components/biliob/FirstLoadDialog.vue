<template>
  <VDialog
    persistent
    :value="show"
    width="500"
  >
    <VCard>
      <VCardTitle class="headline primary white--text font-weight-black">
        这里是BiliOB观测者
      </VCardTitle>
      <VCardText class="mt-5">
        <span>
          <span
            class="blue white--text darken-2"
            style="padding:1px 5px;"
          >版本</span>
          <span
            class="grey white--text darken-2"
            style="padding:1px 5px;margin-right:10px"
          >{{ latestPost.version }}</span>
        </span>
        <span display="flex">
          <span
            class="green white--text darken-2"
            style="padding:1px 5px;"
          >日期</span>
          <span
            class="grey white--text darken-2"
            style="padding:1px 5px;margin-right:10px;"
          >{{ latestPost.date }}</span>
        </span>
        <div
          class="subheading font-weight-black"
          style="margin-top:10px;margin-bottom:5px"
        >
          近期更新内容
        </div>
        <div class="caption mb-2">
          <div
            v-for="eachType in ['stone', 'cloud', 'feature', 'fix', 'beautify']"
            :key="eachType"
          >
            <div v-if="latestPost.list[eachType] != undefined">
              <div class="body-2 font-weight-bold">
                <VIcon
                  left
                  small
                >
                  {{ getListIcon(eachType) }}
                </VIcon><span style="vertical-align: middle">{{
                  getTypeName(eachType)
                }}</span>
              </div>
              <li
                v-for="eachItem in latestPost.list[eachType]"
                :key="eachItem"
                class="ml-2"
                style="list-style-type:circle"
              >
                {{ eachItem }}
              </li>
            </div>
          </div>
        </div>
      </VCardText>
      <VDivider />
      <VCardActions class="caption">
        该网站使用cookies个性化内容来分析我们的流量。该网站我们还根据我们的
        隐私政策，与分析合作伙伴共享关于您使用该网站的信息。
      </VCardActions>
      <VDivider />

      <VCardActions>
        <VSpacer />

        <VBtn
          to="/privacy"
          text
          @click="show = false"
        >
          <VIcon left>
            mdi-page-layout-sidebar-left
          </VIcon>隐私权政策
        </VBtn>
        <VBtn
          color="primary"
          text
          @click="show = false"
        >
          I got it
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<script>
import log from "@/../public/docs/log.json";

log.forEach((e) => {
  let temp = {};
  e.list.forEach((item) => {
    if (temp[item.type] == undefined) {
      temp[item.type] = [item.text];
    } else {
      temp[item.type].push(item.text);
    }
  });
  e.list = temp;
});

let latestPost = log[log.length - 1];

export default {
  data() {
    return { show: Boolean(), log: Object(), latestPost: latestPost };
  },
  mounted() {
    this.show = false;
    if (localStorage.getItem("ver") != this.latestPost.version) {
      this.show = true;
      localStorage.setItem("ver", this.latestPost.version);
    }
  },
  methods: {
    getIcon: function (type) {
      switch (type) {
        case "holyshit":
          return "mdi-nuke";
        case "important":
          return "mdi-chess-queen";
        case "ordinary":
          return "mdi-chess-rook";
        case "unimportant":
          return "mdi-chess-pawn";
        default:
          break;
      }
    },
    getTypeName(name) {
      switch (name) {
        case "stone":
          return "里程碑";
        case "feature":
          return "特性";
        case "fix":
          return "修复";
        case "beautify":
          return "美化";
        case "cloud":
          return "服务";
        default:
          return "其他";
      }
    },
    getListIcon: function (type) {
      switch (type) {
        case "feature":
          return "mdi-lightbulb-on";
        case "fix":
          return "mdi-bug";
        case "beautify":
          return "mdi-flower";
        case "stone":
          return "mdi-rocket";
        case "cloud":
          return "mdi-cloud";
        default:
          break;
      }
    }
  }
};
</script>
