<template>
  <BiliobCard class="aside-card" :title="title">
    <VList two-line>
      <template v-for="eachVideo in authorTopVideo.content">
        <VDivider :key="eachVideo.title" />
        <VListItem
          :key="eachVideo.aid"
          style="width: 100%"
          :to="'/author/' + eachVideo.mid + '/video/' + eachVideo.aid"
          ripple
        >
          <VListItemAvatar :key="eachVideo.title" tile>
            <VImg :src="zipPic(eachVideo.pic)" />
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle>
              {{ eachVideo.title }}
            </VListItemTitle>
            <VListItemSubtitle class="caption subtext">
              分区：{{ eachVideo.channel }} 投稿时间：{{
                dateToStr(eachVideo.datetime)
              }}
            </VListItemSubtitle>
          </VListItemContent>
        </VListItem>
      </template>
    </VList>
  </BiliobCard>
</template>
<script>
var format = require("date-fns/format");
var { convertDateToUTC } = require("../../charts/util/convertDateToUTC");
export default {
  props: {
    title: String(),
    authorTopVideo: Object()
  },
  watch: {
    authorTopVideo: function(val) {
      this.authorTopVideo = val;
    }
  },
  methods: {
    dateToStr(d) {
      return format(
        convertDateToUTC(new Date(d.replace("+0000", ""))),
        "YYYY-MM-DD HH:mm"
      );
    }
  }
};
</script>
<style>
.link {
  text-decoration: none;
}

.aside-card {
}

.video-list {
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>
