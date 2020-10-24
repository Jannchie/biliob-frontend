<template>
  <BiliobCard
    light
    border="bottom"
    title="视频排名数据"
  >
    <VContainer
      class="text-center"
      grid-list-md
      text-xs-center
    >
      <VRow dense>
        <VCol cols="4">
          <div class="rank-title subheading font-weight-bold grey--text">
            播放数排名
          </div>
          <div class="rank-value subtitle-1 font-weight-black primary--text ">
            {{ viewInfo }}
          </div>
          <!-- <ChevronBudget :value="rank.dViewRank"></ChevronBudget> -->
        </VCol>
        <VCol cols="4">
          <div class="rank-title subheading font-weight-bold grey--text">
            点赞数排名
          </div>
          <div class="rank-value subtitle-1 font-weight-black primary--text ">
            {{ likeInfo }}
          </div>
          <!-- <ChevronBudget :value="rank.dLikeRank"></ChevronBudget> -->
        </VCol>
        <VCol cols="4">
          <div class="rank-title subheading font-weight-bold grey--text">
            硬币数排名
          </div>
          <div class="rank-value subtitle-1 font-weight-black primary--text ">
            {{ coinInfo }}
          </div>
          <!-- <ChevronBudget :value="rank.dCoinRank"></ChevronBudget> -->
        </VCol>
        <VCol cols="4">
          <div class="rank-title subheading font-weight-bold grey--text">
            弹幕数排名
          </div>
          <div class="rank-value subtitle-1 font-weight-black primary--text ">
            {{ danmakuInfo }}
          </div>
          <!-- <ChevronBudget :value="rank.dDanmakuRank"></ChevronBudget> -->
        </VCol>
        <VCol cols="4">
          <div class="rank-title subheading font-weight-bold grey--text">
            收藏数排名
          </div>
          <div class="rank-value subtitle-1 font-weight-black primary--text ">
            {{ favoriteInfo }}
          </div>
          <!-- <ChevronBudget :value="rank.dFavoriteRank"></ChevronBudget> -->
        </VCol>
        <VCol cols="4">
          <div class="rank-title subheading font-weight-bold grey--text">
            分享数排名
          </div>
          <div class="rank-value subtitle-1 font-weight-black primary--text ">
            {{ shareInfo }}
          </div>
          <!-- <ChevronBudget :value="rank.dShareRank"></ChevronBudget> -->
        </VCol>
      </VRow>
    </VContainer>
    <div
      class="caption grey--text pt-0"
      style="display:flex;justify-content:space-between"
    >
      <div>
        仅包括已经观测的视频
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
export default {
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
          convertDateToUTC(new Date(this.updateTime.replace("+00:00", ""))),
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        return "载入更新时间中";
      }
    },
    viewInfo() {
      if (this.cViewRank == undefined) {
        return this.beautify(this.pViewRank);
      }
      if (this.cViewRank != -1) {
        return `Top ${this.cViewRank}`;
      } else {
        return this.beautify(this.pViewRank);
      }
    },
    danmakuInfo() {
      if (this.cDanmakuRank == undefined) {
        return this.beautify(this.pDanmakuRank);
      }
      if (this.cDanmakuRank != -1) {
        return `Top ${this.cDanmakuRank}`;
      } else {
        return this.beautify(this.pDanmakuRank);
      }
    },
    shareInfo() {
      if (this.cShareRank == undefined) {
        return this.beautify(this.pShareRank);
      }
      if (this.cShareRank != -1) {
        return `Top ${this.cShareRank}`;
      } else {
        return this.beautify(this.pShareRank);
      }
    },
    favoriteInfo() {
      if (this.cFavoriteRank == undefined) {
        return this.beautify(this.pFavoriteRank);
      }
      if (this.cFavoriteRank != -1) {
        return `Top ${this.cFavoriteRank}`;
      } else {
        return this.beautify(this.pFavoriteRank);
      }
    },
    likeInfo() {
      if (this.cLikeRank == undefined) {
        return this.beautify(this.pLikeRank);
      }
      if (this.cLikeRank != -1) {
        return `Top ${this.cLikeRank}`;
      } else {
        return this.beautify(this.pLikeRank);
      }
    },
    coinInfo() {
      if (this.cCoinRank == undefined) {
        return this.beautify(this.pCoinRank);
      }
      if (this.cCoinRank != -1) {
        return `Top ${this.cCoinRank}`;
      } else {
        return this.beautify(this.pCoinRank);
      }
    }
  },
  mounted() {},
  methods: {
    beautify(val) {
      if (val === -1 || val === undefined) {
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
