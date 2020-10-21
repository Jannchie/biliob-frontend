<template>
  <div slot="main-cards">
    <VSlideYTransition group>
      <BiliobCard
        v-for="(eachData, index) in fansVariationData"
        :key="index"
        ripple
        class="event-card mb-1"
      >
        <div @click.stop="toAuthor(eachData.mid)">
          <VRow style="margin-left: 0px;margin-right: 0px;">
            <VCol cols="auto">
              <VAvatar
                small
                size="48"
              >
                <img
                  :src="zipPic(eachData.face.replace('http:', ''))"
                  :alt="eachData.author"
                >
              </VAvatar>
            </VCol>
            <VCol>
              <div>
                <div class="subtitle-2">
                  {{ eachData.author }}
                </div>
                <div class="caption grey--text">
                  <VIcon small>
                    mdi-calendar-blank
                  </VIcon>
                  {{ eachData.datetime }}
                </div>
              </div>
            </VCol>
            <div
              :class="`float-info`"
              style="position:absolute;right:12px;text-align:right"
            >
              <img
                v-if="eachData.info === '新星爆发'"
                height="40"
                src="../../../public/img/pendent/新星爆发.png"
              >
              <img
                v-else-if="eachData.info === '大量涨粉'"
                height="40"
                src="../../../public/img/pendent/大量涨粉.png"
              >
              <img
                v-else-if="eachData.info === '史诗级涨粉'"
                height="40"
                src="../../../public/img/pendent/史诗级涨粉.png"
              >
              <img
                v-else-if="eachData.info === '传说级涨粉'"
                height="40"
                src="../../../public/img/pendent/传说级涨粉.png"
              >
              <img
                v-else-if="eachData.info === '急转直下'"
                height="40"
                src="../../../public/img/pendent/急转直下.png"
              >
              <img
                v-else-if="eachData.info === '大量掉粉'"
                height="40"
                src="../../../public/img/pendent/大量掉粉.png"
              >
              <img
                v-else-if="eachData.info === '雪崩级掉粉'"
                height="40"
                src="../../../public/img/pendent/雪崩级掉粉.png"
              >
              <img
                v-else-if="eachData.info === '末日级掉粉'"
                height="40"
                src="../../../public/img/pendent/末日级掉粉.png"
              >
            </div>
          </VRow>
          <div
            style="display:flex;"
            class="text-no-wrap"
          >
            <div hidden>
              <div>
                <MyBadget
                  left-text="单日增量"
                  :right-text="eachData.variation"
                  :left-color="getColor(eachData.info)"
                  right-color="grey"
                />
              </div>
              <div>
                <span
                  :class="
                    `${getColor(
                      eachData.info
                    )}--text font-weight-black text--darken-1`
                  "
                >
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
        </div>
        <VDivider v-if="eachData['cause'] != undefined" />
        <VRow
          v-if="eachData['cause'] != undefined"
          class="mt-2"
          @click.stop="toVideo(eachData.mid, eachData.cause.aid)"
        >
          <div style="display:flex;">
            <img
              :src="eachData.cause.pic"
              class="video-pic"
            >
            <div class="text-no-wrap overflow-hidden">
              <div class=" text-truncate">
                {{ eachData.cause.title }}
              </div>
              <div class="caption grey--text">
                <VIcon small>
                  mdi-bookmark-outline
                </VIcon>
                {{ eachData.cause.channel
                }}<span>
                  <VIcon small>mdi-bookmark-outline</VIcon>{{ eachData.cause.subChannel }}
                </span>
              </div>
            </div>
          </div>
        </VRow>
      </BiliobCard>
      <NextBtn
        key="-1"
        :api-url="apiUrl"
        @getMoreData="getMoreData"
      />
    </VSlideYTransition>
  </div>
</template>
<script>
import MyBadget from "@/components/common/MyBadget.vue";
import NextBtn from "@/components/common/NextBtn.vue";

export default {
  components: { MyBadget, NextBtn },
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
    this.axios.get("/event/fans-variation").then((response) => {
      this.fansVariationData = response.data.content;
      this.last = response.data.last;
      this.page = response.data.number;
      this.apiUrl = `/event/fans-variation?page=${this.page + 1}`;
    });
  },
  methods: {
    getMoreData(content, number) {
      this.apiUrl = `/event/fans-variation?page=${number + 1}`;
      content.forEach((e) => {
        this.fansVariationData.push(e);
      });
    },
    toAuthor(mid) {
      this.$router.push(`/author/${mid}`);
    },
    toVideo(mid, aid) {
      this.$router.push(`/video/av${aid}`);
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
          return "primary";
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

.row {
  margin-left: 0px;
  margin-right: 0px;
}
</style>
