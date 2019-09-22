<template>
  <div slot="main-cards">
    <VSlideYTransition group>
      <VCard
        v-for="(eachData, index) in fansVariationData"
        :key="index"
        ripple
        class="event-card mb-1 elevation-3"
      >
        <VCardTitle @click.stop="toAuthor(eachData.mid)">
          <div style="display:flex;" class="text-no-wrap">
            <VAvatar small size="42" style="margin-right:12px">
              <img
                :src="zipPic(eachData.face.replace('http:', ''))"
                :alt="eachData.author"
              />
            </VAvatar>
            <div>
              <div class="subheading">
                {{ eachData.author }}
              </div>
              <div class="caption grey--text text--darken-2">
                <VIcon small>mdi-calendar-blank</VIcon>
                {{ eachData.datetime }}
              </div>
            </div>
            <div
              :class="`float-info`"
              style="position:absolute;right:12px;text-align:right"
            >
              <img
                v-if="eachData.info === '新星爆发'"
                height="40"
                src="../../../public/img/pendent/新星爆发.png"
              />
              <img
                v-else-if="eachData.info === '大量涨粉'"
                height="40"
                src="../../../public/img/pendent/大量涨粉.png"
              />
              <img
                v-else-if="eachData.info === '史诗级涨粉'"
                height="40"
                src="../../../public/img/pendent/史诗级涨粉.png"
              />
              <img
                v-else-if="eachData.info === '传说级涨粉'"
                height="40"
                src="../../../public/img/pendent/传说级涨粉.png"
              />
              <img
                v-else-if="eachData.info === '急转直下'"
                height="40"
                src="../../../public/img/pendent/急转直下.png"
              />
              <img
                v-else-if="eachData.info === '大量掉粉'"
                height="40"
                src="../../../public/img/pendent/大量掉粉.png"
              />
              <img
                v-else-if="eachData.info === '雪崩级掉粉'"
                height="40"
                src="../../../public/img/pendent/雪崩级掉粉.png"
              />
              <img
                v-else-if="eachData.info === '末日级掉粉'"
                height="40"
                src="../../../public/img/pendent/末日级掉粉.png"
              />
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
        </VCardTitle>
        <VDivider v-if="eachData['cause'] != undefined"></VDivider>
        <VCardText
          v-if="eachData['cause'] != undefined"
          @click.stop="toVideo(eachData.mid, eachData.cause.aid)"
        >
          <div style="display:flex;">
            <img :src="eachData.cause.pic" class="video-pic" />
            <div class="text-no-wrap overflow-hidden">
              <div class=" text-truncate">
                {{ eachData.cause.title }}
              </div>
              <div class="caption grey--text text--darken-2">
                <VIcon small>mdi-bookmark-outline</VIcon>
                {{ eachData.cause.channel
                }}<span>
                  <VIcon small>mdi-bookmark-outline</VIcon
                  >{{ eachData.cause.subChannel }}
                </span>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
      <NextBtn key="-1" :api-url="apiUrl" @getMoreData="getMoreData"></NextBtn>
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
</style>
