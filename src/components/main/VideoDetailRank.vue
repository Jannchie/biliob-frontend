<template>
  <MaterialCard title="视频排名数据">
    <VContainer
      grid-list-md
      text-xs-center
      class="pa-0"
    >
      <VLayout row>

        <VFlex
          xs12
          md4
        >
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            播放数排名
          </div>
          <div class="rank-value title font-weight-black blue--text text--darken-3">
            {{viewInfo}}
          </div>
          <!-- <ChevronBudget :value="rank.dViewRank"></ChevronBudget> -->
          <div>
            <VDivider vertical></VDivider>
          </div>
        </VFlex>
        <VFlex
          xs12
          md4
        >
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            点赞数排名
          </div>
          <div class="rank-value title font-weight-black blue--text text--darken-3">
            {{likeInfo}}
          </div>
          <!-- <ChevronBudget :value="rank.dLikeRank"></ChevronBudget> -->
          <div>
            <VDivider vertical></VDivider>
          </div>
        </VFlex>
        <VFlex
          xs12
          md4
        >
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            硬币数排名
          </div>
          <div class="rank-value title font-weight-black blue--text text--darken-3">
            {{coinInfo}}
          </div>
          <!-- <ChevronBudget :value="rank.dCoinRank"></ChevronBudget> -->
          <div class="special-divider">
            <VDivider vertical></VDivider>
          </div>
        </VFlex>
      </VLayout>
      <VLayout row>

        <VFlex
          xs12
          md4
        >
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            弹幕数排名
          </div>
          <div class="rank-value title font-weight-black blue--text text--darken-3">
            {{danmakuInfo}}
          </div>
          <!-- <ChevronBudget :value="rank.dDanmakuRank"></ChevronBudget> -->
          <div>
            <VDivider vertical></VDivider>
          </div>
        </VFlex>
        <VFlex
          xs12
          md4
        >
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            收藏数排名
          </div>
          <div class="rank-value title font-weight-black blue--text text--darken-3">
            {{favoriteInfo}}
          </div>
          <!-- <ChevronBudget :value="rank.dFavoriteRank"></ChevronBudget> -->
          <div>
            <VDivider vertical></VDivider>
          </div>
        </VFlex>
        <VFlex
          xs12
          md4
        >
          <div class="rank-title subheading font-weight-bold grey--text text--darken-2">
            分享数排名
          </div>
          <div class="rank-value title font-weight-black blue--text text--darken-3">
            {{shareInfo}}
          </div>
          <!-- <ChevronBudget :value="rank.dShareRank"></ChevronBudget> -->
          <div class="special-divider">
            <VDivider vertical></VDivider>
          </div>
        </VFlex>
      </VLayout>
    </VContainer>
    <div
      class="caption grey--text pt-0"
      style="display:flex;justify-content:space-between"
    >
      <div>
        仅包括已经观测的视频
      </div>
      <div>
        {{formatedDate}}
      </div>
    </div>
  </MaterialCard>
</template>

<script>
var format = require("date-fns/format");
var { convertDateToUTC } = require("../../charts/util/convertDateToUTC");
// import ChevronBudget from "../common/ChevronBudget.vue";
export default {
  // components: { ChevronBudget },
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
    dShareRank: Number(),
    pViewRank: Number(),
    pLikeRank: Number(),
    pDanmakuRank: Number(),
    pFavoriteRank: Number(),
    pCoinRank: Number(),
    pShareRank: Number()
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
    viewInfo() {
      if (this.cViewRank == undefined) {
        return "";
      }
      if (this.cViewRank <= 200 && this.cViewRank != -1) {
        return `Top ${this.cViewRank}`;
      } else {
        return this.beautify(this.pViewRank);
      }
    },
    danmakuInfo() {
      if (this.cDanmakuRank == undefined) {
        return "";
      }
      if (this.cDanmakuRank <= 200 && this.cDanmakuRank != -1) {
        return `Top ${this.cDanmakuRank}`;
      } else {
        return this.beautify(this.pDanmakuRank);
      }
    },
    shareInfo() {
      if (this.cShareRank == undefined) {
        return "";
      }
      if (this.cShareRank <= 200 && this.cShareRank != -1) {
        return `Top ${this.cShareRank}`;
      } else {
        return this.beautify(this.pShareRank);
      }
    },
    favoriteInfo() {
      if (this.cFavoriteRank == undefined) {
        return "";
      }
      if (this.cFavoriteRank <= 200 && this.cFavoriteRank != -1) {
        return `Top ${this.cFavoriteRank}`;
      } else {
        return this.beautify(this.pFavoriteRank);
      }
    },
    likeInfo() {
      if (this.cLikeRank == undefined) {
        return "";
      }
      if (this.cLikeRank <= 200 && this.cLikeRank != -1) {
        return `Top ${this.cLikeRank}`;
      } else {
        return this.beautify(this.pLikeRank);
      }
    },
    coinInfo() {
      if (this.cCoinRank == undefined) {
        return "";
      }
      if (this.cCoinRank <= 200 && this.cCoinRank != -1) {
        return `Top ${this.cCoinRank}`;
      } else {
        return this.beautify(this.pCoinRank);
      }
    }
  },
  mounted() {},
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
/* .rank-container {
  flex-wrap: wrap;
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
} */
/* .item {
  flex-grow: 1;
  text-align: center;
} */
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
.rank-value {
  height: 20px;
}
</style>
