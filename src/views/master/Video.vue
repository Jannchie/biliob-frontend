<template>
  <VContainer>
    <VRow
      v-if="videoData != undefined"
      dense
    >
      <VCol
        cols="12"
        md="7"
      >
        <VideoDetailTitle
          :title="videoData.title"
          :aid="videoData.aid"
          :pic="videoData.pic"
          :bv="videoData.bvid"
        />
      </VCol>
      <VCol
        cols="12"
        md="5"
      >
        <AuthorInfo
          style="height:100%"
          :author-data="videoData.author"
        />
      </VCol>
    </VRow>
    <VRow
      v-if="videoData != undefined"
      dense
    >
      <VCol cols="12">
        <BiliobVideoOperation
          slot="video-to-bilibili"
          class="mb-2"
          :aid="videoData.aid"
          :pic="videoData.pic"
          :title="videoData.title"
        />
      </VCol>
    </VRow>
    <VRow dense>
      <VCol cols="12">
        <!-- <BiliobVideoRank class="mb-2" v-bind="rank"></BiliobVideoRank> -->
        <DetailCharts
          class="mb-2"
          title="视频详细历史数据"
          :options="mainChart"
        />

        <DetailCharts
          slot="like-rate"
          class="mb-2"
          title="各指标比率统计"
          :options="likeRateChart"
        />
        <BiliobCard
          v-if="hasDanmakuAggregate"
          slot="danmaku-switch"
          light
          border="bottom"
          class="mb-2"
          title="弹幕统计-分P选择"
        >
          <div>
            <VSelect
              v-model="defaultPage"
              class="mb-2"
              solo
              prepend-inner-icon="mdi-video-outline"
              :items="pageItems"
              :messages="
                `<span>选择分P</span><span style='float: right'>更新时间: ${danmakuUpdateTime}</span>`
              "
              @change="pageChange"
            />
          </div>
        </BiliobCard>
        <DetailCharts
          v-if="hasDanmakuAggregate"
          slot="danmaku-density"
          class="mb-2"
          :options="danmakuDensityOptions"
          title="弹幕统计-弹幕密度"
        />
        <DetailCharts
          v-if="hasDanmakuAggregate"
          slot="danmaku-cloud"
          class="mb-2"
          title="弹幕统计-弹幕云关键词"
          :options="wordCloudOptions"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
import VideoDetailTitle from "@/components/main/VideoDetailTitle.vue";
import DetailCharts from "@/components/main/DetailCharts.vue";
import AuthorInfo from "@/components/aside/AuthorInfo.vue";
import drawMainChart from "@/charts/video-main.js";
import drawVideoPieChart from "@/charts/video-pie.js";
import drawDanmakuCloud from "@/charts/danmaku-cloud.js";
import drawDanmakuDensity from "@/charts/danmaku-density.js";
var deepCopy = function(o) {
  if (o instanceof Array) {
    var n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    var no = {};
    for (var i in o) {
      no[i] = deepCopy(o[i]);
    }
    return no;
  } else {
    return o;
  }
};
export default {
  name: "VideoDetail",
  components: {
    VideoDetailTitle,
    DetailCharts,
    AuthorInfo
  },
  data() {
    return {
      videoData: undefined,
      authorData: Object(),
      mainChart: Object(),
      likeRateChart: Object(),
      wordCloudOptions: Object(),
      otherVideo: undefined,
      danmakuDensityOptions: Object(),
      hasDanmakuAggregate: false,
      pageItems: Array(),
      danmakuUpdateTime: "未记录",
      defaultPage: String(),
      rank: { pViewRank: -1, updateTime: Date() }
    };
  },
  watch: {
    "$route.params.aid": function() {
      this.getDataFromAid();
    }
  },
  mounted() {
    this.getDataFromAid();
  },
  methods: {
    pageChange(val) {
      this.redrawDanmakuCharts(val);
    },
    getVideoData(response) {
      this.videoData = response.data;
      let title = this.videoData.title;
      document.title = `${title} - 视频详细数据 - biliOB观测者 - B站历史数据统计分析站点`;
      this.rank = this.videoData.rank;
      this.videoData.pic = this.videoData.pic.slice(5);
      this.mainChart = drawMainChart(deepCopy(response.data));
      this.likeRateChart = drawVideoPieChart(deepCopy(response.data));
      this.drawDanmakuCloud = drawVideoPieChart(deepCopy(response.data));
      if (
        Object.prototype.hasOwnProperty.call(response.data, "danmakuAggregate")
      ) {
        this.hasDanmakuAggregate = true;
        let pagelist = [];
        for (var eachPage in response.data.danmakuAggregate) {
          pagelist.push(eachPage);
          if (eachPage == "updatetime") {
            this.danmakuUpdateTime = response.data.danmakuAggregate.updatetime;
            continue;
          }
          this.pageItems.push({
            text: `P${eachPage}: ${response.data.danmakuAggregate[eachPage]["p_name"]}`,
            value: eachPage
          });
          this.defaultPage = this.pageItems[0];
        }
        this.redrawDanmakuCharts(pagelist[0]);
      } else {
        this.hasDanmakuAggregate = false;
      }
    },
    getDataFromAid() {
      this.$store.commit("toVideo");
      if (this.$route.params.bvid != undefined) {
        var url = "/video/v2/BV" + this.$route.params.bvid;
      } else {
        url = "/video/v2/av" + this.$route.params.aid;
      }
      this.axios.get(url).then(response => {
        this.getVideoData(response);
        // this.axios
        //   .get(
        //     `/author/${response.data.author.mid}/video/${
        //       response.data.aid
        //     }?pagesize=${10}`
        //   )
        //   .then(response => {
        //     this.otherVideo = response.data;
        //   });
      });
    },
    redrawDanmakuCharts(page) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.videoData.danmakuAggregate[page],
          "word_frequency"
        )
      ) {
        this.wordCloudOptions = drawDanmakuCloud(
          this.videoData.danmakuAggregate[page]["word_frequency"]
        );
      }
      this.danmakuDensityOptions = drawDanmakuDensity(
        this.videoData.danmakuAggregate[page]["danmaku_density"],
        this.videoData.danmakuAggregate[page]["duration"]
      );
    }
  }
};
</script>
