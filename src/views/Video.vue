<template>
  <MainLayout>
    <VideoMain slot="main-cards"></VideoMain>
    <VideoAside slot="aside-cards">
      <AuthorOperation slot="author-info"></AuthorOperation>
      <OtherVideo slot="other-video"></OtherVideo>
      <Recommand slot="recommand"></Recommand>
    </VideoAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import VideoAside from "../components/aside/VideoAside.vue";
import VideoMain from "../components/main/VideoMain.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
import OtherVideo from "../components/aside/OtherVideo.vue";
import Recommand from "../components/aside/Recommand.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    VideoAside,
    VideoMain,
    AuthorOperation,
    OtherVideo,
    Recommand
  },
  mounted() {
    this.$store.commit("toVideo");
  }
};
</script>
