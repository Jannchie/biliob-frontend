<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VSlideYTransition>
          <BiliobVersusCard />
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow
      v-if="recentAchievement"
      dense
    >
      <VCol>
        <VSlideYTransition>
          <BiliobAuthorAchievementSlideCard />
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow
      v-if="forecastCard"
      dense
    >
      <VCol>
        <VSlideYTransition>
          <BiliobSlideCard
            name="biliob-preview"
            title="观测者预测"
          >
            <BiliobGuessingItem
              v-for="guessing in $db.fansGuessing"
              :key="guessing.guessingId"
              :guessing="guessing"
              style="width: 220px"
            />
          </BiliobSlideCard>
        </VSlideYTransition>
      </VCol>
    </VRow>
    <!-- <VRow dense>
      <VCol>
        <VSlideYTransition>
          <BiliobSiteChart
            v-if="this.$store.state.site.siteInfo != undefined"
            :options="siteInfo"
            title="B站全站信息"
          ></BiliobSiteChart>
        </VSlideYTransition>
      </VCol>
    </VRow> -->

    <!-- <VRow dense>
      <VCol>
        <VSlideYTransition>
          <MainDetailCharts
            :options="stockOption"
            title="B站每日最大在线观看周线"
            sub-title="趋势图"
          />
        </VSlideYTransition>
      </VCol>
    </VRow> -->
    <VRow dense>
      <VCol>
        <VSlideYTransition>
          <HomePopularTag />
        </VSlideYTransition>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
// import getStockOption from "@/charts/biliob-candlestick.js";
export default {
  data() {
    return { stockOption: {}, forecastCard: false, recentAchievement: false };
  },
  computed: {
    siteInfo() {
      if (this.$store.state.site.siteInfo == undefined) {
        return {};
      }
      return this.$store.state.site.siteInfo;
    }
  },
  mounted() {
    if (this.$db.fansGuessing.length == 0) {
      this.axios.get(`/author/fans-guessing?p=${0}`).then((res) => {
        this.$db.fansGuessing = res.data;
        this.forecastCard = true;
      });
    } else {
      this.forecastCard = true;
    }

    if (this.$db.recentAchievement == undefined) {
      this.axios.get(`/author/achievement?lv=${5}`).then((res) => {
        this.$db.recentAchievement = res.data;
        this.recentAchievement = true;
      });
    } else {
      this.recentAchievement = true;
    }
    // if (this.$store.state.site.siteInfo == undefined) {
    //   this.$store.dispatch("getSiteInfo");
    // }
    // if (this.$store.state.event.recentEvent == undefined) {
    //   this.$store.dispatch("getRecentEvent");
    // }
    // if (this.$store.state.site.siteGroupInfo == undefined) {
    //   this.$store.dispatch("getSiteGroupInfo");
    // }
    // this.axios.get("/site/history-play?days=365").then(res => {
    //   this.stockOption = getStockOption(res.data);
    // });
  }
};
</script>
