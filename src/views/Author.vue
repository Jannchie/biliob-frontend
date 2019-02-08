<template>
  <MainLayout>
    <AuthorMain slot="main-cards">
      <!-- <AuthorDetailChannel slot="channel" :channels="authorData.channels"></AuthorDetailChannel> -->
      <AuthorDetailFansChart
        slot="fans"
        :author-data="authorData"
      />
      <AuthorDetailFansRateChart
        slot="fans-rate"
        :fans-rate="authorData"
      />
    </AuthorMain>
    <AuthorAside slot="aside-cards">
      <AuthorOperation
        slot="author-operation"
        :author-data="authorData"
      />
      <AuthorToSpace
        slot="author-to-space"
        :mid="authorData.mid"
      />
      <AuthorVideo
        slot="author-latest-video"
        title="UP主最新发布视频"
        :author-top-video="authorLatestVideo"
      />
      <AuthorVideo
        slot="author-video"
        title="UP主播放最高视频"
        :author-top-video="authorTopVideo"
      />
    </AuthorAside>
  </MainLayout>
</template>

<script>
import AuthorMain from "../components/main/AuthorMain.vue";
import AuthorDetailFansChart from "../components/main/AuthorDetailFansChart.vue";
import AuthorDetailFansRateChart from "../components/main/AuthorDetailFansRateChart.vue";
import MainLayout from "../components/common/MainLayout.vue";
import AuthorAside from "../components/aside/AuthorDetailAside.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
import AuthorVideo from "../components/aside/AuthorVideo.vue";
import AuthorToSpace from "../components/aside/AuthorToSpace.vue";
// import AuthorDetailChannel from "../components/main/AuthorDetailChannel.vue";
export default {
  name: "AuthorList",
  components: {
    AuthorMain,
    MainLayout,
    AuthorAside,
    AuthorDetailFansChart,
    AuthorDetailFansRateChart,
    AuthorOperation,
    AuthorVideo,
    AuthorToSpace
    // AuthorDetailChannel
  },
  data() {
    return {
      authorData: Object(),
      authorTopVideo: Object(),
      authorLatestVideo: Object()
    };
  },
  mounted() {
    this.$store.commit("toAuthor");
    this.axios.get("/author/" + this.$route.params.mid).then(response => {
      this.authorData = response.data;
    });
    this.axios.get(`/author/${this.$route.params.mid}/video`).then(response => {
      this.authorTopVideo = response.data;
    });
    this.axios
      .get(`/author/${this.$route.params.mid}/video?sort=1`)
      .then(response => {
        this.authorLatestVideo = response.data;
      });
  }
};
</script>
