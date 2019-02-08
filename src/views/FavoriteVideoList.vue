<template>
  <MainLayout>
    <FavoriteVideoListMain slot="main-cards" />
    <VideoListAside slot="aside-cards" />
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import FavoriteVideoListMain from "../components/main/FavoriteVideoList.vue";
import VideoListAside from "../components/aside/VideoListAside.vue";
export default {
  name: "VideoList",
  components: { MainLayout, FavoriteVideoListMain, VideoListAside },
  mounted() {
    this.$store.commit("toVideo");
  }
};
</script>
