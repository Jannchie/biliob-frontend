<template>
  <MainLayout>
    <AuthorMain slot="main-cards">
      <AuthorDetailRank
        slot="rank"
        v-bind="authorData.rank"
      ></AuthorDetailRank>
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
      <AuthorInfo
        slot="author-operation"
        :author-data="authorData"
      />
      <AuthorOperation
        slot="author-to-space"
        :mid="authorData.mid"
        :name="authorData.name"
        :pic="authorData.face"
        :force-focus="authorData.forceFocus"
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
      <OtherLink slot="other-link" />
    </AuthorAside>
  </MainLayout>
</template>

<script>
import AuthorMain from "../components/main/AuthorMain.vue";
import AuthorDetailRank from "../components/main/AuthorDetailRank.vue";
import AuthorDetailFansChart from "../components/main/AuthorDetailFansChart.vue";
import AuthorDetailFansRateChart from "../components/main/AuthorDetailFansRateChart.vue";
import MainLayout from "../components/common/MainLayout.vue";
import AuthorAside from "../components/aside/AuthorDetailAside.vue";
import AuthorInfo from "../components/aside/AuthorInfo.vue";
import AuthorVideo from "../components/aside/AuthorVideo.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
import OtherLink from "../components/aside/OtherLink.vue";
// import AuthorDetailChannel from "../components/main/AuthorDetailChannel.vue";
export default {
  name: "AuthorList",
  components: {
    AuthorMain,
    MainLayout,
    OtherLink,
    AuthorAside,
    AuthorDetailRank,
    AuthorDetailFansChart,
    AuthorDetailFansRateChart,
    AuthorInfo,
    AuthorVideo,
    AuthorOperation
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
      if (this.authorData.forceFocus != true) {
        this.authorData.forceFocus == false;
      }
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
