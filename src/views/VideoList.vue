<template>
  <MainLayout>
    <VideoListMain slot="main-cards" />
    <VideoListAside slot="aside-cards">
      <OtherLink slot="link" />
    </VideoListAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import VideoListMain from "../components/main/VideoList.vue";
import OtherLink from "../components/aside/OtherLink.vue";
import VideoListAside from "../components/aside/VideoListAside.vue";
export default {
  name: "VideoList",
  components: { MainLayout, VideoListMain, VideoListAside, OtherLink },
  mounted() {
    this.$store.commit("toVideo");
  }
};
</script>
