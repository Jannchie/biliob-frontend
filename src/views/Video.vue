<template>
  <MainLayout>
    <VideoMain slot="main-cards"></VideoMain>
    <VideoAside slot="aside-cards">
      <AuthorInfo slot="author-info"></AuthorInfo>
      <OtherVideo slot="other-video"></OtherVideo>
      <Recommand slot="recommand"></Recommand>
    </VideoAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import VideoAside from "../components/aside/VideoAside.vue";
import VideoMain from "../components/main/VideoMain.vue";
import AuthorInfo from "../components/aside/AuthorInfo.vue";
import OtherVideo from "../components/aside/OtherVideo.vue";
import Recommand from "../components/aside/Recommand.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    VideoAside,
    VideoMain,
    AuthorInfo,
    OtherVideo,
    Recommand
  },
  mounted() {
    this.$store.commit("toVideo");
  }
};
</script>
