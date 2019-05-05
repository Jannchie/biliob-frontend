<template>
  <MainLayout>
    <div slot="main-cards">
      <VSlideYTransition group>
        <VCard
          v-for="(eachData, index) in fansVariationData"
          :key="index"
          ripple
          class="event-card"
        >
          <VCardTitle @click.stop="toAuthor(eachData.mid)">

            <div
              style="display:flex;"
              class="text-no-wrap"
            >
              <VAvatar
                small
                size="42"
                style="margin-right:12px"
              >
                <img
                  :src="eachData.face.replace('http:', '')"
                  :alt="eachData.author"
                />
              </VAvatar>
              <div style="display">
                <div class="subheading">
                  {{ eachData.author }}
                </div>
                <div class="caption grey--text text--darken-2">
                  <VIcon small>mdi-calendar-blank</VIcon>
                  {{ eachData.datetime }}
                </div>
              </div>
              <div
                :class="
                `float-info`
              "
                style="position:absolute;right:12px;text-align:right"
              >
                <img
                  v-if="eachData.info === '新星爆发'"
                  height="40"
                  src="../../public/img/pendent/新星爆发.png"
                >
                <img
                  v-else-if="eachData.info === '大量涨粉'"
                  height="40"
                  src="../../public/img/pendent/大量涨粉.png"
                >
                <img
                  v-else-if="eachData.info === '史诗级涨粉'"
                  height="40"
                  src="../../public/img/pendent/史诗级涨粉.png"
                >
                <img
                  v-else-if="eachData.info === '传说级涨粉'"
                  height="40"
                  src="../../public/img/pendent/传说级涨粉.png"
                >
                <img
                  v-else-if="eachData.info === '急转直下'"
                  height="40"
                  src="../../public/img/pendent/急转直下.png"
                >
                <img
                  v-else-if="eachData.info === '大量掉粉'"
                  height="40"
                  src="../../public/img/pendent/大量掉粉.png"
                >
                <img
                  v-else-if="eachData.info === '雪崩级掉粉'"
                  height="40"
                  src="../../public/img/pendent/雪崩级掉粉.png"
                >
                <img
                  v-else-if="eachData.info === '末日级掉粉'"
                  height="40"
                  src="../../public/img/pendent/末日级掉粉.png"
                >
              </div>
              <div hidden>
                <div>
                  <MyBadget
                    left-text="单日增量"
                    :right-text="eachData.variation"
                    :left-color="getColor(eachData.info)"
                    right-color="grey"
                  ></MyBadget>
                </div>
                <div>
                  <span :class="
                      `${getColor(
                        eachData.info
                      )}--text font-weight-black text--darken-1`
                    ">
                    {{ eachData.deltaRate }}%
                  </span>
                  <!-- <MyBadget
                    left-text="变化率"
                    :right-text="`${eachData.deltaRate}%`"
                    :left-color="getColor(eachData.info)"
                    right-color="grey"
                  ></MyBadget> -->
                </div>
              </div>
            </div>
          </VCardTitle>
          <VDivider v-if="eachData['cause'] != undefined"></VDivider>
          <VCardText
            v-if="eachData['cause'] != undefined"
            @click.stop="toVideo(eachData.mid, eachData.cause.aid)"
          >
            <div style="display:flex;">
              <img
                :src="eachData.cause.pic"
                class="video-pic"
              />
              <div class="text-no-wrap overflow-hidden">
                <div class=" text-truncate">
                  {{ eachData.cause.title }}
                </div>
                <div class="caption grey--text text--darken-2">
                  <VIcon small>mdi-bookmark-outline</VIcon>
                  {{ eachData.cause.channel
                  }}<span>
                    <VIcon small>mdi-bookmark-outline</VIcon>{{ eachData.cause.subChannel }}
                  </span>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
        <NextBtn
          key="-1"
          :api-url="apiUrl"
          @getMoreData="getMoreData"
        ></NextBtn>
      </VSlideYTransition>
    </div>
    <div slot="aside-cards">
      <VCard style="margin-bottom:5px">
        <VCardTitle class="title font-weight-bold blue--text text--darken-2">
          <VIcon class="mr-2 blue--text text--darken-2">mdi-message-alert-outline</VIcon>
          粉丝变动观测说明
        </VCardTitle>
      </VCard>
      <VCard style="margin-bottom:5px">
        <VCardText class="caption">
          此页面展示了粉丝数发生剧烈波动的UP主。<br />
          由于<span class="text--darken-2 red--text">发布视频</span>、<span class="text--darken-2 blue--text">抽奖开奖</span>、<span class="text--darken-2 green--text">石锤锤爆</span>等原因，UP主的粉丝数可能发生剧烈变化，而这种剧烈变化是观测者们喜闻乐见的。<br />
          BiliOB观测者将这些剧烈波动记录下来，并集中进行展示。
        </VCardText>
        <VDivider></VDivider>
        <VCardText class="caption">
          一共有这样几种可能：
          <li>
            <span class="text--darken-2 red--text">大量涨粉</span>:
            日涨粉数超上周平均的25倍
          </li>
          <li>
            <span class="text--darken-2 red--text">史诗级涨粉</span>:
            日涨粉数超10W或超上周平均的50倍
          </li>
          <li>
            <span class="text--darken-2 red--text">传说级涨粉</span>:
            日涨粉数超20W或超上周平均的100倍
          </li>
          <li>
            <span class="text--darken-2 green--text">急转直下</span>:
            上升轨道中的UP主突然掉粉
          </li>
          <li>
            <span class="text--darken-2 green--text">大量掉粉</span>:
            每日掉粉数突破5K
          </li>
          <li>
            <span class="text--darken-2 green--text">雪崩级掉粉</span>:
            每日掉粉数突破2W
          </li>
          <li>
            <span class="text--darken-2 green--text">末日级掉粉</span>:
            每日掉粉数突破5W
          </li>
          <li>
            <span class="text--darken-2 blue--text">新星爆发</span>:日涨粉超过粉丝总数的20%
          </li>
        </VCardText>
        <VDivider></VDivider>
        <VCardText class="caption">
          针对不同可能的情况，变化率的含义也不同。
          <li>
            对于<span class="text--darken-2 red--text">大量涨粉、史诗级涨粉、传说级涨粉</span>事件，变化率是当日涨粉量较上周平均增量的百分比。
          </li>
          <li>
            对于<span class="text--darken-2 green--text">大量掉粉、雪崩级掉粉、末日级掉粉</span>事件，变化率是当日掉粉量较上日掉粉量的百分比。
          </li>
          <li>
            对于<span class="text--darken-2 green--text">急转直下</span>事件，没有变化率之说。
          </li>
          <li>
            对于<span class="text--darken-2 blue--text">新星爆发</span>事件，变化率代表日增量与该UP主粉丝数总量的百分比。
          </li>
        </VCardText>
      </VCard>
      <OtherLink />
    </div>
  </MainLayout>
</template>
<script>
import MainLayout from "../components/common/MainLayout.vue";
import MyBadget from "../components/common/MyBadget.vue";
import NextBtn from "../components/common/NextBtn.vue";
import OtherLink from "../components/aside/OtherLink.vue";

export default {
  components: { MainLayout, MyBadget, OtherLink, NextBtn },
  data() {
    return {
      fansVariationData: Object(),
      last: Boolean(),
      page: Number(),
      apiUrl: String()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get("/event/fans-variation").then(response => {
      this.fansVariationData = response.data.content;
      this.last = response.data.last;
      this.page = response.data.number;
      this.apiUrl = `/event/fans-variation?page=${this.page + 1}`;
    });
  },
  methods: {
    getMoreData(content, number) {
      this.apiUrl = `/event/fans-variation?page=${number + 1}`;
      content.forEach(e => {
        this.fansVariationData.push(e);
      });
    },
    toAuthor(mid) {
      this.$router.push(`/author/${mid}`);
    },
    toVideo(mid, aid) {
      this.$router.push(`/author/${mid}/video/${aid}`);
    },
    getColor(info) {
      switch (info) {
        case "大量涨粉":
          return "red";
        case "史诗级涨粉":
          return "red";
        case "传说级涨粉":
          return "red";
        case "新星爆发":
          return "blue";
        case "急转直下":
          return "green";
        case "大量掉粉":
          return "green";
        case "雪崩级掉粉":
          return "green";
        case "末日级掉粉":
          return "green";
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.event-card {
}
.float-info {
  margin-left: 20px;
  opacity: 0.75;
}
.video-pic {
  width: 96px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
