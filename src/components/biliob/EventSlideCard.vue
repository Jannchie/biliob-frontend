<template>
  <BiliobSlideCard
    more-link="/event"
    title="近期粉丝数波动"
    name="event-bar"
  >
    <BiliobCard
      v-for="(eachItem, i) in $store.getters.recentEventList"
      :key="i"
      :to="`/author/${eachItem.mid}`"
      class="mx-1 recent-event-card "
      @mouseover="showExtraInfo(eachItem.mid)"
    >
      <VRow class="mx-0">
        <VCol cols="auto">
          <VAvatar>
            <VImg
              :lazy-src="zipPic(eachItem.face)"
              :src="zipPic(eachItem.face)"
            />
          </VAvatar>
        </VCol>
        <VCol cols="auto">
          <div
            class="font-weight-bold"
            style="vertical-align: middle; width:120px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
          >
            {{ eachItem.author }}
          </div>
          <VChip
            style="vertical-align: middle"
            small
            outlined
            :class="`caption ${getColor(eachItem.info)}`"
          >
            <VIcon
              left
              small
            >
              {{ getIcon(eachItem.info) }}
            </VIcon>
            {{ eachItem.info }}
          </VChip>
        </VCol>
      </VRow>
      <span
        class="caption ma-1 grey--text text--lighten-2"
        style="position: absolute; right: 0px; bottom: 0px"
      >
        {{ eachItem.datetime }}
      </span>
    </BiliobCard>
  </BiliobSlideCard>
</template>
<script>
export default {
  data() {
    return {
      currentExtraInfoMid: Number
    };
  },
  methods: {
    showExtraInfo(mid) {
      this.currentExtraInfoMid = mid;
    },
    getColor(info) {
      switch (info) {
        case "大量涨粉":
          return "primary primary--text";
        case "史诗级涨粉":
          return "purple darken-2 purple--text ";
        case "传说级涨粉":
          return "orange orange--text ";
        case "新星爆发":
          return "primary";
        case "急转直下":
          return "green green--text ";
        case "大量掉粉":
          return "green darken-1 green--text ";
        case "雪崩级掉粉":
          return "green darken-2  green--text ";
        case "末日级掉粉":
          return "green darken-2  green--text ";
        default:
          break;
      }
    },
    getIcon(info) {
      switch (info) {
        case "大量涨粉":
          return "mdi-chevron-up";
        case "史诗级涨粉":
          return "mdi-chevron-double-up";
        case "传说级涨粉":
          return "mdi-chevron-triple-up";
        case "新星爆发":
          return "mdi-new-box";
        case "急转直下":
          return "mdi-trending-down";
        case "大量掉粉":
          return "mdi-chevron-down";
        case "雪崩级掉粉":
          return "mdi-chevron-double-down";
        case "末日级掉粉":
          return "mdi-chevron-triple-down";
        default:
          break;
      }
    }
  }
};
</script>
<style>
.recent-event-card {
  min-width: 250px;
}
</style>
