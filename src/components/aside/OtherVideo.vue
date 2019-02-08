<template>
  <VCard class="aside-card">
    <VCardTitle
      style="padding-bottom:0px"
      column
      fill-height
    >
      <h4>UP主其他已追踪视频</h4>
    </VCardTitle>
    <VCardText
      class="video-list"
      column
    />
    <VList two-line>
      <template v-for="eachVideo in otherVideo">
        <VDivider :key="eachVideo.title" />
        <VListTile
          :key="eachVideo.aid"
          style="width: 100%"
          :to="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid"
          ripple
        >
          <VListTileContent>
            <VListTileTitle>
              {{ eachVideo.title }}
            </VListTileTitle>
            <VListTileSubTitle class="caption subtext">
              分区：{{ eachVideo.channel }}
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </template>
    </VList>
  </VCard>
</template>
<script>
export default {
  props: {
    otherVideo: Object()
  },
  watch: {
    otherVideo: function(val) {
      this.otherVideo = val;
    }
  }
};
</script>
<style>
.link {
  color: slategray;
  text-decoration: none;
}

.aside-card {
  margin-top: 5px;
}

.video-list {
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>
