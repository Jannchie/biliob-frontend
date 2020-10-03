<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <BiliobCard
          class="card-tabs"
          padding="px-0"
        >
          <VFlex slot="header">
            <BiliobDarkInfo
              light
              border="bottom"
            >
              <div>
                <VCardTitle>
                  <h4 style="text-align: center">
                    {{ title }}
                  </h4>
                </VCardTitle>
                <VTabs
                  slider-color="primary"
                  background-color="transparent"
                >
                  <VTab @click="getData(0)">
                    <VIcon style="margin-right:10px;">
                      mdi-heart
                    </VIcon>
                    涨粉榜 / ASC
                  </VTab>
                  <VTab @click="getData(1)">
                    <VIcon style="margin-right:10px;">
                      mdi-heart-broken
                    </VIcon>掉粉榜 / DESC
                  </VTab>
                  <!-- <VTab @click="getData(2)">
                    <VIcon style="margin-right:10px;"> mdi-video-vintage </VIcon
                    >番剧
                  </VTab>
                  <VTab @click="getData(3)">
                    <VIcon style="margin-right:10px;"> mdi-rabbit </VIcon>
                    国创
                  </VTab> -->
                </VTabs>
              </div>
            </BiliobDarkInfo>
          </VFlex>
          <div>
            <RouterView key="" />
            <div v-if="index === 0 || index === 1" />
            <div v-else>
              <VSlideYTransition
                mode="out-in"
                group
              >
                <div
                  v-for="(eachData, idx) in data"
                  :key="idx"
                  style="display: flex; text-decoration: none; color: rgba(0, 0, 0, 0.87);"
                  class="py-4"
                >
                  <VImg
                    style="border-radius:3px;width:90px;height:120px;margin:0 8px"
                    :src="zipPic(eachData.cover)"
                    :lazy-src="zipPic(eachData.cover)"
                  />
                  <div style="width: 100%">
                    <VContainer class="pt-0 body-1">
                      <VLayout>
                        <VFlex xs-12>
                          <h5 class="font-weight-bold">
                            {{ eachData.title }}
                          </h5>
                        </VFlex>
                      </VLayout>
                      <VLayout row>
                        <VFlex xs-2>
                          播放 <span>{{ eachData.currentPlay }}</span>
                        </VFlex>
                        <VFlex xs-2>
                          综分 <span>{{ eachData.currentPts }}</span>
                        </VFlex>
                        <VFlex xs-2>
                          追番 <span>{{ eachData.currentWatch }}</span>
                        </VFlex>
                        <VFlex xs-2>
                          观测记录 <span>{{ eachData.currentReview }}</span>
                        </VFlex>
                        <VFlex xs-4>
                          弹幕 <span>{{ eachData.currentDanmaku }}</span>
                        </VFlex>
                      </VLayout>
                    </VContainer>
                  </div>
                </div>
              </VSlideYTransition>
            </div>
          </div>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      title: "数据载入中",
      index: Number()
    };
  },
  computed: {
    data() {
      switch (this.index) {
        case 0:
          return this.$store.state.rank.rankListFansIncrease;
        case 1:
          return this.$store.state.rank.rankListFansDecrease;
        case 2:
          return this.$store.state.rank.rankListBangumi;
        case 3:
          return this.$store.state.rank.rankListDonghua;
        default:
          return this.$store.state.rank.rankListFansIncrease;
      }
    }
  },
  mounted() {
    this.getData(0);
    this.$store.commit("toElse");
  },
  methods: {
    getData(index) {
      this.index = index;
      switch (index) {
        case 0:
          this.title = "实时涨粉TOP20(24小时)";
          if (this.$store.state.rank.rankListFansIncrease == undefined) {
            this.$store.dispatch("getIncrease");
          }
          this.$router.push("/rank/fans-increase");
          break;
        case 1:
          this.title = "实时掉粉TOP20(24小时)";
          if (this.$store.state.rank.rankListFansDecrease == undefined)
            this.$store.dispatch("getDecrease");

          this.$router.push("/rank/fans-decrease");
          break;
        case 2:
          this.title = "番剧综合评分TOP20";
          if (this.$store.state.rank.rankListBangumi == undefined)
            this.$store.dispatch("getBangumiTopList");
          break;
        case 3:
          this.title = "国创综合评分TOP20";
          if (this.$store.state.rank.rankListDonghua == undefined)
            this.$store.dispatch("getDonghuaTopList");
          break;
        default:
          break;
      }
    }
  }
};
</script>
