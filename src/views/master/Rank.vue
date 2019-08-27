<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <BiliobSheet class="card-tabs" padding="px-0">
          <VFlex slot="header">
            <BiliobDarkInfo light border="bottom">
              <div>
                <h4 class="px-5" style="text-align: center">{{ title }}</h4>
                <VTabs slider-color="primary" background-color="transparent">
                  <VTooltip color="#333" right eager>
                    <template v-slot:activator="{ on }">
                      <span
                        class="subheading font-weight-light"
                        style="align-self: center"
                        ><VIcon class="mx-5" v-on="on"
                          >mdi-help-box</VIcon
                        ></span
                      >
                    </template>
                    <li>
                      本排行榜数据每日更新一次。
                    </li>

                    <li>
                      其中涨粉、掉粉排行仅包括所有正在观测的UP主数据。具体数字为一日粉丝变动数，仅供参考。
                    </li>
                    <li>
                      国创番剧排行榜数据摘录自B站。
                    </li>
                  </VTooltip>

                  <VTab @click="getData(0)">
                    <VIcon style="margin-right:10px;">
                      mdi-heart
                    </VIcon>
                    涨粉
                  </VTab>
                  <VTab @click="getData(1)">
                    <VIcon style="margin-right:10px;"> mdi-heart-broken </VIcon
                    >掉粉
                  </VTab>
                  <VTab @click="getData(2)">
                    <VIcon style="margin-right:10px;"> mdi-video-vintage </VIcon
                    >番剧
                  </VTab>
                  <VTab @click="getData(3)">
                    <VIcon style="margin-right:10px;"> mdi-rabbit </VIcon>国创
                  </VTab>
                </VTabs>
              </div>
            </BiliobDarkInfo>
          </VFlex>
          <div>
            <div v-if="index === 0 || index === 1">
              <VFadeTransition mode="out-in" group>
                <RouterLink
                  v-for="eachData in data"
                  :key="eachData.name"
                  v-ripple
                  class="py-2 px-5"
                  style="display: flex; text-decoration: none; color: rgba(0, 0, 0, 0.87);"
                  :to="linkTo(eachData)"
                >
                  <VRow dense>
                    <VCol cols="auto">
                      <VAvatar size="60px">
                        <img :src="zipPic(eachData.face)" /> </VAvatar
                    ></VCol>
                    <VCol>
                      <div>
                        <div>{{ eachData.name }}</div>
                        <div v-if="eachData.official != ''">
                          <VIcon color="#FBC02D" x-small>mdi-flash-circle</VIcon
                          ><span
                            class="caption grey--text text--darken-2"
                            style="vertical-align: middle"
                          >
                            {{ eachData.official }}
                          </span>
                        </div>
                      </div></VCol
                    >
                    <VCol cols="auto" style="align-self: center;">
                      <VChip
                        :color="getColor(index)"
                        small
                        text-color="white"
                        class="pl-0"
                      >
                        <VIcon class="ml-0" color="white" left>
                          {{ getIcon(index) }}
                        </VIcon>
                        {{ Math.abs(eachData.cRate) }}
                      </VChip></VCol
                    >
                  </VRow>
                </RouterLink>
              </VFadeTransition>
            </div>
            <div v-else>
              <VFadeTransition mode="out-in" group>
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
                          <h5 class="font-weight-bold">{{ eachData.title }}</h5>
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
                          评论 <span>{{ eachData.currentReview }}</span>
                        </VFlex>
                        <VFlex xs-4>
                          弹幕 <span>{{ eachData.currentDanmaku }}</span>
                        </VFlex>
                      </VLayout>
                    </VContainer>
                  </div>
                </div>
              </VFadeTransition>
            </div>
          </div>
        </BiliobSheet>
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
    linkTo(eachData) {
      if (eachData.mid != undefined) {
        return `/author/${eachData.mid}`;
      }
    },
    getData(index) {
      this.index = index;
      switch (index) {
        case 0:
          this.title = "UP主每日涨粉TOP20";
          if (this.$store.state.rank.rankListFansIncrease == undefined)
            this.$store.dispatch("getIncrease");
          break;
        case 1:
          this.title = "UP主每日掉粉TOP20";
          if (this.$store.state.rank.rankListFansDecrease == undefined)
            this.$store.dispatch("getDecrease");
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
    },
    getColor(index) {
      if (index === 0) {
        return "red";
      } else if (index === 1) {
        return "green";
      }
    },
    getIcon(index) {
      if (index === 0) {
        return "mdi-chevron-up-circle";
      } else if (index === 1) {
        return "mdi-chevron-down-circle";
      }
    }
  }
};
</script>
