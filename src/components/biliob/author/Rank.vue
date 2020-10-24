<template>
  <BiliobCard
    light
    border="bottom"
    title="UP主排名数据"
  >
    <div class="rank-container">
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title caption  grey--text">
          粉丝数
        </div>
        <div class="rank-value py-1 caption  font-weight-black primary--text ">
          {{ fansInfo }}
        </div>
        <ChevronBudget :value="dFansRank" />
      </div>
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title caption  grey--text">
          播放排名
        </div>
        <div class="rank-value py-1 caption font-weight-black primary--text ">
          {{ archiveInfo }}
        </div>
        <ChevronBudget :value="dArchiveViewRank" />
      </div>
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title caption  grey--text">
          获赞排名
        </div>
        <div class="rank-value py-1 caption font-weight-black primary--text ">
          {{ likeInfo }}
        </div>
        <ChevronBudget :value="dLikeRank" />
      </div>
      <div style="flex-grow: 1;text-align:center">
        <div class="rank-title caption  grey--text">
          专栏阅读
        </div>
        <div class="rank-value py-1 caption font-weight-black primary--text ">
          {{ articleInfo }}
        </div>
        <ChevronBudget :value="dArticleViewRank" />
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
    authorData: Object(),
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
          convertDateToUTC(new Date(this.updateTime.replace("+00:00", ""))),
          "YYYY-MM-DD HH:mm:ss"
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
