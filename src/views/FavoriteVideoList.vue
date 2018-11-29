<template>
 <MainLayout>
   <FavoriteVideoListMain slot="main-cards"></FavoriteVideoListMain>
   <VideoListAside slot="aside-cards"></VideoListAside>
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
