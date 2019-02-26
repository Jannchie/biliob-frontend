<template>
  <VCard>
    <VCardText style="height:100%">
      <div class="rank-container">

        <div class="item">
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            播放数排名
          </div>
          <div class="title font-weight-black blue--text text--darken-3">
            {{beautify(cViewRank)}}
          </div>
          <ChevronBudget :value="dViewRank"></ChevronBudget>
        </div>
        <div>
          <VDivider vertical></VDivider>
        </div>
        <div class="item">
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            点赞数排名
          </div>
          <div class="title font-weight-black blue--text text--darken-3">
            {{beautify(cLikeRank)}}
          </div>
          <ChevronBudget :value="dLikeRank"></ChevronBudget>
        </div>
        <div>
          <VDivider vertical></VDivider>
        </div>
        <div class="item">
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            硬币数排名
          </div>
          <div class="title font-weight-black blue--text text--darken-3">
            {{beautify(cCoinRank)}}
          </div>
          <ChevronBudget :value="dCoinRank"></ChevronBudget>
        </div>
        <div class="special-divider">
          <VDivider vertical></VDivider>
        </div>
        <div class="item">
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            弹幕数排名
          </div>
          <div class="title font-weight-black blue--text text--darken-3">
            {{beautify(cDanmakuRank)}}
          </div>
          <ChevronBudget :value="dDanmakuRank"></ChevronBudget>
        </div>
        <div>
          <VDivider vertical></VDivider>
        </div>
        <div class="item">
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            收藏数排名
          </div>
          <div class="title font-weight-black blue--text text--darken-3">
            {{beautify(cFavoriteRank)}}
          </div>
          <ChevronBudget :value="dFavoriteRank"></ChevronBudget>
        </div>
        <div>
          <VDivider vertical></VDivider>
        </div>
        <div class="item">
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            分享数排名
          </div>
          <div class="title font-weight-black blue--text text--darken-3">
            {{beautify(cShareRank)}}
          </div>
          <ChevronBudget :value="dShareRank"></ChevronBudget>
        </div>
      </div>
    </VCardText>
    <VCardText
      class="caption grey--text"
      style="display:flex;justify-content:space-between"
    >
      <div>
        仅包括已经观测的视频
      </div>
      <div>
        {{formatedDate}}
      </div>
    </VCardText>
  </VCard>
</template>

<script>
var format = require("date-fns/format");
var { convertDateToUTC } = require("../../charts/util/convertDateToUTC");
import ChevronBudget from "../common/ChevronBudget.vue";
export default {
  components: { ChevronBudget },
  props: {
    updateTime: String(),
    cViewRank: Number(),
    cLikeRank: Number(),
    cDanmakuRank: Number(),
    cFavoriteRank: Number(),
    cCoinRank: Number(),
    cShareRank: Number(),
    dViewRank: Number(),
    dLikeRank: Number(),
    dDanmakuRank: Number(),
    dFavoriteRank: Number(),
    dCoinRank: Number(),
    dShareRank: Number()
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
    }
  },
  methods: {
    beautify(val) {
      if (val === -1) {
        return "-";
      } else {
        return val;
      }
    }
  }
};
</script>

<style scoped>
.rank-container {
  flex-wrap: wrap;
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
}
.item {
  flex-grow: 1;
  text-align: center;
}
@media only screen and (max-width: 1800px) {
  .item {
    flex-grow: 1;
    text-align: center;
    flex-basis: 33%;
  }
  .special-divider {
    display: none;
  }
}
</style>
