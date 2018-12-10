<template>
  <MainLayout>
    <VideoListMain slot="main-cards"></VideoListMain>
    <VideoListAside slot="aside-cards" class="hidden-lg-and-down">
      <OtherLink slot="link"></OtherLink>
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
