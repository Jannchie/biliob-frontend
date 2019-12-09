<template>
  <BiliobCard light border="bottom" title="UP主排名数据">
    <div class="rank-container">
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title subheading  grey--text text--darken-2">
          粉丝总数
        </div>
        <div
          class="rank-value py-1  subtitle-1 font-weight-black blue--text text--darken-3"
        >
          {{ fansInfo }}
        </div>
        <ChevronBudget :value="dFansRank"></ChevronBudget>
      </div>
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title subheading  grey--text text--darken-2">
          播放总量
        </div>
        <div
          class="rank-value py-1  subtitle-1 font-weight-black blue--text text--darken-3"
        >
          {{ archiveInfo }}
        </div>
        <ChevronBudget :value="dArchiveViewRank"></ChevronBudget>
      </div>
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title subheading  grey--text text--darken-2">
          获赞总量
        </div>
        <div
          class="rank-value py-1  subtitle-1 font-weight-black blue--text text--darken-3"
        >
          {{ likeInfo }}
        </div>
        <ChevronBudget :value="dLikeRank"></ChevronBudget>
      </div>
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title subheading  grey--text text--darken-2">
          专栏阅读
        </div>
        <div
          class="rank-value py-1  subtitle-1 font-weight-black blue--text text--darken-3"
        >
          {{ articleInfo }}
        </div>
        <ChevronBudget :value="dArticleViewRank"></ChevronBudget>
      </div>
    </div>
    <div
      class="caption grey--text pt-0"
      style="display:flex;justify-content:space-between"
    >
      <div>
        仅包括已经观测UP主
      </div>
      <div>
        {{ formatedDate }}
      </div>
    </div>
  </BiliobCard>
</template>

<script>
var format = require("date-fns/format");
var { convertDateToUTC } = require("@/charts/util/convertDateToUTC");
import ChevronBudget from "@/components/common/ChevronBudget.vue";
export default {
  components: { ChevronBudget },
  props: {
    fansRank: Number(),
    articleViewRank: Number(),
    archiveViewRank: Number(),
    dFansRank: Number(),
    dArticleViewRank: Number(),
    dArchiveViewRank: Number(),
    pFansRank: Number(),
    pArticleViewRank: Number(),
    pArchiveViewRank: Number(),
    dLikeRank: Number(),
    likeRank: Number(),
    updateTime: String()
  },
  computed: {
    formatedDate() {
      if (this.updateTime != undefined) {
        return format(
          convertDateToUTC(new Date(this.updateTime.replace("+0000", ""))),
          "YYYY-MM-DD HH:MM:SS"
        );
      } else {
        return "载入更新时间中";
      }
    },
    fansInfo() {
      if (this.fansRank == undefined || this.fansRank == -1) {
        return "-";
      }
      return `Top ${this.fansRank}`;
    },
    articleInfo() {
      if (this.articleViewRank == undefined || this.articleViewRank == -1) {
        return "-";
      }
      return `Top ${this.articleViewRank}`;
    },
    likeInfo() {
      if (this.likeRank == undefined || this.likeRank == -1) {
        return "-";
      }
      return `Top ${this.likeRank}`;
    },
    archiveInfo() {
      if (this.archiveViewRank == undefined || this.archiveViewRank == -1) {
        return "-";
      }
      return `Top ${this.archiveViewRank}`;
    }
  },

  methods: {
    beautify(val) {
      if (val === -1) {
        return "-";
      } else {
        return `前${val}%`;
      }
    }
  }
};
</script>

<style scoped>
.rank-container {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
}
.rank-value py-1 {
  height: 20px;
}
</style>
