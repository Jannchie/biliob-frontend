<template>
  <MainLayout>
    <VideoListMain slot="main-cards"></VideoListMain>
    <VideoListAside slot="aside-cards"></VideoListAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import VideoListMain from "../components/main/VideoList.vue";
import VideoListAside from "../components/aside/VideoListAside.vue";
export default {
  name: "VideoList",
  components: { MainLayout, VideoListMain, VideoListAside },
  mounted() {
    this.$store.commit("toVideo");
  }
};
</script>
