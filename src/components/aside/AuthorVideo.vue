<template>
  <VCard class="aside-card">
    <VCardTitle style="padding-bottom:0px" column fill-height>
      <h4>UP主热门已追踪视频</h4>
    </VCardTitle>
    <VCardText  class="video-list" column>
    </VCardText>
      <VList  two-line>
        <template v-for="eachVideo in authorTopVideo.content">
          <VDivider :key="eachVideo.title"></VDivider>
          <VListTile :key="eachVideo.aid" style="width: 100%" :to="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid" ripple>
            <VListTileContent>
              <VListTileTitle>
                {{eachVideo.title}}
              </VListTileTitle>
              <VListTileSubTitle class="caption subtext">分区：{{eachVideo.channel}}</VListTileSubTitle>
            </VListTileContent>
          </VListTile>
        </template>
      </VList>
  </VCard>
</template>
<script>
export default {
  props: {
    authorTopVideo: Object()
  },
  watch: {
    authorTopVideo: function(val) {
      this.authorTopVideo = val;
    }
  }
};
</script>
<style>
.link {
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
