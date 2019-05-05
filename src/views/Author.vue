<template>
  <MainLayout>
    <AuthorMain slot="main-cards">
      <AuthorDetailRank
        slot="rank"
        v-bind="authorData.rank"
      ></AuthorDetailRank>
      <!-- <AuthorDetailChannel slot="channel" :channels="authorData.channels"></AuthorDetailChannel> -->
      <DetailCharts
        slot="fans"
        title="粉丝数变化趋势"
        :options="authorFansOptions"
      />
      <DetailCharts
        slot="fans-rate"
        title="粉丝数变化速率"
        :options="authorFansRateOptions"
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
import MainLayout from "../components/common/MainLayout.vue";
import AuthorAside from "../components/aside/AuthorDetailAside.vue";
import AuthorInfo from "../components/aside/AuthorInfo.vue";
import AuthorVideo from "../components/aside/AuthorVideo.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
import DetailCharts from "../components/main/DetailCharts.vue";
import OtherLink from "../components/aside/OtherLink.vue";
import drawFansChart from "../charts/author-fans.js";
import drawFansRateChart from "../charts/author-fans-rate.js";
// import AuthorDetailChannel from "../components/main/AuthorDetailChannel.vue";
var deepCopy = function(o) {
  if (o instanceof Array) {
    var n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    var no = {};
    for (let i in o) {
      no[i] = deepCopy(o[i]);
    }
    return no;
  } else {
    return o;
  }
};
export default {
  name: "Author",
  components: {
    AuthorMain,
    MainLayout,
    OtherLink,
    AuthorAside,
    AuthorDetailRank,
    AuthorInfo,
    AuthorVideo,
    AuthorOperation,
    DetailCharts
    // AuthorDetailChannel
  },
  data() {
    return {
      authorData: Object(),
      authorTopVideo: Object(),
      authorLatestVideo: Object(),
      authorFansOptions: Object(),
      authorFansRateOptions: Object(),
      mid: Number()
    };
  },
  mounted() {
    if (this.$route.params.mid != undefined) {
      this.mid = this.$route.params.mid;
    }
    this.$store.commit("toAuthor");
    this.axios.get("/author/" + this.mid).then(response => {
      this.authorData = response.data;
      this.authorFansOptions = drawFansChart(deepCopy(this.authorData));
      this.authorFansRateOptions = drawFansRateChart(deepCopy(this.authorData));
      if (this.authorData.forceFocus != true) {
        this.authorData.forceFocus == false;
      }
    });
    this.axios.get(`/author/${this.mid}/video`).then(response => {
      this.authorTopVideo = response.data;
    });
    this.axios.get(`/author/${this.mid}/video?sort=1`).then(response => {
      this.authorLatestVideo = response.data;
    });
  }
};
</script>
