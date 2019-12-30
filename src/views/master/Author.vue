<template>
  <VContainer>
    <VRow dense>
      <VCol :md="6" :cols="12">
        <AuthorInfo slot="author-operation" :author-data="authorData" />
      </VCol>
      <VCol :md="6" :cols="12">
        <BiliobAuthorOperation
          style="height: 100%"
          :mid="authorData.mid"
          :name="authorData.name"
          :pic="authorData.face"
          :force-focus="authorData.forceFocus"
        />
      </VCol>
    </VRow>

    <VRow dense>
      <VCol>
        <VTabs class="elevation-3 py-0 my-2" show-arrows>
          <VIcon left right>mdi-finance</VIcon>
          <VTab @click="getPage(0)">
            <VIcon left>mdi-database</VIcon>基本统计
          </VTab>
          <VTab @click="getPage(3)">
            <VIcon left>mdi-history</VIcon>历史数据
          </VTab>
          <VTab @click="getPage(1)">
            <VIcon left>mdi-brain</VIcon>高级统计
          </VTab>
        </VTabs>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol :cols="12">
        <VSlideYTransition>
          <div v-if="cPage == 3">
            <DetailCharts
              class="mb-2"
              title="UP主历史数据"
              :options="historyDataOptions"
            />
            <DetailCharts
              class="mb-2"
              title="历史变化速率"
              :options="authorFansRateOptions"
            />
            <DetailCharts
              class="mb-2"
              title="变化日历"
              :height="220"
              :options="authorDataDiffOptions"
            />
          </div>
          <div v-if="cPage == 0">
            <VRow dense>
              <VCol>
                <BiliobAuthorBrief
                  :author-data="authorData"
                  :author-top-video="authorTopVideo"
                  :author-latest-video="authorLatestVideo"
                ></BiliobAuthorBrief>
              </VCol>
            </VRow>
            <VRow dense>
              <VCol>
                <BiliobCard light border="bottom" title="UP主最新数据">
                  <VRow>
                    <VCol
                      v-for="each in [
                        { name: '粉丝总数', value: formatedFans },
                        { name: '播放总数', value: formatedView },
                        { name: '获赞总数', value: formatedLike },
                        { name: '专栏阅读', value: formatedArticle }
                      ]"
                      :key="each.name"
                    >
                      <div style="flex-grow: 1; text-align:center">
                        <div
                          class="rank-title subheading  grey--text text--darken-2"
                        >
                          {{ each.name }}
                        </div>
                        <div
                          class="rank-value subtitle-1 font-weight-black blue--text text--darken-3"
                        >
                          {{ each.value }}
                        </div>
                      </div>
                    </VCol>
                  </VRow>
                </BiliobCard>
              </VCol>
            </VRow>
            <VRow dense>
              <VCol>
                <BiliobAuthorRank
                  v-bind="authorData.rank"
                  class="mb-2"
                ></BiliobAuthorRank>
              </VCol>
            </VRow>

            <!-- <DetailCharts
          id="relationship"
          title="UP主作品相关度"
          :options="relationshipOptions"
            />-->
          </div>
          <div v-else-if="cPage == 1">
            <VRow dense>
              <VCol>
                <DetailCharts
                  title="粉丝变化效率"
                  sub-title="每一万播放量增长造成的粉丝变动数"
                  :options="authorFansEfficiencyOptions"
                />
              </VCol>
            </VRow>
            <VRow dense>
              <VCol>
                <DetailCharts :options="authorTagCloudOptions">
                  <VFlex slot="header">
                    <VTabs
                      background-color="transparent"
                      slider-color="primary"
                    >
                      <span
                        class="subheading font-weight-light mr-3"
                        style="align-self: center"
                      >
                        <VIcon left right>mdi-format-list-bulleted-type</VIcon>
                      </span>
                      <VTab @click="tagSort('totalView')">
                        <VIcon style="margin-right:10px;">
                          mdi-video
                        </VIcon>
                        投稿量
                      </VTab>
                      <VTab @click="tagSort('count')">
                        <VIcon style="margin-right:10px;">
                          mdi-play-circle-outline
                        </VIcon>
                        播放量
                      </VTab>
                    </VTabs>
                  </VFlex>
                </DetailCharts>
              </VCol>
            </VRow>
          </div>
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobCard light title="UP主播放最高视频" border="bottom">
          <VSlideGroup :value="authorTopVideo.content" multiple show-arrows>
            <VSlideItem
              v-for="(eachVideo, index) in authorTopVideo.content"
              :key="index"
              class="ma-1"
            >
              <VCard
                :to="`/author/${eachVideo.mid}/video/${eachVideo.aid}`"
                max-width="160"
                width="160px"
              >
                <VImg
                  class="white--text"
                  height="100px"
                  :src="zipPic(eachVideo.pic)"
                >
                </VImg>

                <VCardText style="overflow: hidden; text-overflow: ellipsis;">
                  <span class=" cards-title text--primary caption">
                    <span>{{ eachVideo.title }}</span
                    ><br />
                  </span>
                  <span class="caption">{{
                    formatDate(eachVideo.datetime, "YYYY-MM-DD HH:MM:SS")
                  }}</span
                  ><br />
                </VCardText>
              </VCard>
            </VSlideItem>
          </VSlideGroup>
        </BiliobCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobCard light title="UP主最新上传视频" border="bottom">
          <VSlideGroup :value="authorLatestVideo.content" multiple show-arrows>
            <VSlideItem
              v-for="(eachVideo, index) in authorLatestVideo.content"
              :key="index"
              class="ma-1"
            >
              <VCard
                class="elevation-3"
                :to="`/author/${eachVideo.mid}/video/${eachVideo.aid}`"
                max-width="160"
                width="160px"
              >
                <VImg
                  class="white--text"
                  height="100px"
                  :src="zipPic(eachVideo.pic)"
                >
                </VImg>

                <VCardText>
                  <span class="text--primary caption cards-title">
                    <span>{{ eachVideo.title }}</span
                    ><br />
                  </span>
                  <span class="caption">{{
                    formatDate(eachVideo.datetime, "YYYY-MM-DD HH:MM:SS")
                  }}</span
                  ><br />
                </VCardText>
              </VCard>
            </VSlideItem>
          </VSlideGroup>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import formatNumber from "@/util/format-number";
var format = require("date-fns/format");
import interpolation from "../../charts/util/interpolation";
import AuthorInfo from "@/components/aside/AuthorInfo.vue";
import DetailCharts from "@/components/main/DetailCharts.vue";
import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
import getAuthorFansEfficiencyOptions from "@/charts/author-fans-efficiency.js";
import getAuthorTagCloudOptions from "@/charts/cloud-charts.js";
import getAuthorDataDiffOptions from "@/charts/author-data-diff.js";

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
  name: "Author",
  components: {
    AuthorInfo,
    DetailCharts
  },
  data() {
    return {
      authorData: Object(),
      authorTopVideo: Object(),
      authorLatestVideo: Object(),
      relationshipOptions: Object(),
      authorFansRateOptions: Object(),
      authorFansEfficiencyOptions: Object(),
      authorTagCloudOptions: Object(),
      authorDataDiffOptions: Object(),
      mid: Number(),
      cPage: 0
    };
  },
  metaInfo() {
    return {
      meta: [
        { vmid: "description", name: "description", content: this.briefInfo }
      ]
    };
  },
  computed: {
    formatedFans() {
      if (this.authorData.cFans == undefined) {
        return "-";
      } else {
        return formatNumber(this.authorData.cFans);
      }
    },
    formatedView() {
      if (this.authorData.cArchiveView == undefined) {
        return "-";
      } else {
        return formatNumber(this.authorData.cArchiveView);
      }
    },
    formatedLike() {
      if (this.authorData.cLike == undefined) {
        return "-";
      } else {
        return formatNumber(this.authorData.cLike);
      }
    },
    formatedArticle() {
      if (this.authorData.cLike == undefined) {
        return "-";
      } else {
        return formatNumber(this.authorData.cArticleView);
      }
    },
    authorChannelInfo() {
      if (this.authorData.channels == undefined) return [" ", " "];
      return [
        this.authorData.channels[0].name,
        this.authorData.channels[0].count
      ];
    },
    briefInfo() {
      if (
        this.authorData.name == undefined ||
        this.authorTopVideo.content == undefined ||
        this.authorTopVideo.content[0] == undefined
      ) {
        return "载入中";
      }
      let briefInfo = `${this.authorData.name} 是 ${
        this.authorData.official == ""
          ? "没有认证的UP主"
          : this.authorData.official
      }。他是主要活跃在${this.authorChannelInfo[0]}区的UP主，在该分区共存活 ${
        this.authorChannelInfo[1]
      } 个稿件。代表作有《 ${this.authorTopVideo.content[0].title}》。`;
      return briefInfo;
    }
  },
  mounted() {
    if (this.$route.params.mid != undefined) {
      this.mid = this.$route.params.mid;
    }
    this.$store.commit("toAuthor");
    this.axios.get("/author/" + this.mid).then(response => {
      if (response.data.channels != undefined) {
        response.data.channels.sort((a, b) => b.count - a.count);
      }
      this.authorData = response.data;
      document.title = `${
        this.authorData.name
      } - UP主数据详情 - BiliOB观测者 - B站历史数据统计分析站点`;
      this.authorFansEfficiencyOptions = getAuthorFansEfficiencyOptions(
        deepCopy(this.authorData)
      );

      let fansArray = [];
      let likeArray = [];
      let viewArray = [];
      this.authorData.data.forEach(e => {
        if (e.fans != undefined && e.fans != 0) {
          fansArray.push([e.datetime, e.fans]);
        }
        if (e.like != undefined && e.like != 0) {
          likeArray.push([e.datetime, e.like]);
        }
        if (e.archiveView != undefined && e.archiveView != 0) {
          viewArray.push([e.datetime, e.archiveView]);
        }
      });
      fansArray = fansArray.reverse();
      viewArray = viewArray.reverse();
      likeArray = likeArray.reverse();
      this.authorDataDiffOptions = getAuthorDataDiffOptions([
        [fansArray, "粉丝数", "#1e88e5"],
        [viewArray, "播放数", "#2b821d"],
        [likeArray, "获赞数", "#c12e34"]
      ]);
      this.authorFansRateOptions = getMultiChartOptions(
        [
          [interpolation(fansArray), "粉丝数", "#1e88e5"],
          [interpolation(viewArray), "播放数", "#2b821d"],
          [interpolation(likeArray), "获赞数", "#c12e34"]
        ],
        "bar"
      );

      this.historyDataOptions = getMultiChartOptions([
        [fansArray, "粉丝数", "#1e88e5"],
        [viewArray, "播放数", "#2b821d"],
        [likeArray, "获赞数", "#c12e34"]
      ]);

      if (this.authorData.forceFocus != true) {
        this.authorData.forceFocus == false;
      }
    });
    this.axios
      .get(`/author/${this.mid}/video?pagesize=${10}`)
      .then(response => {
        this.authorTopVideo = response.data;
      });
    this.axios
      .get(`/author/${this.mid}/video?sort=1&pagesize=${10}`)
      .then(response => {
        this.authorLatestVideo = response.data;
      });
    this.axios.get(`/author/tag?mid=${this.mid}&limit=${50}`).then(r => {
      this.authorTagCloudData = r.data;
      this.authorTagCloudOptions = getAuthorTagCloudOptions(
        this.authorTagCloudData.map(e => {
          return { name: e._id, value: e.totalView };
        })
      );
    });
  },
  methods: {
    formatDate(date) {
      return format(date, "YYYY-MM-DD HH:MM:SS");
    },
    getPage(page) {
      this.cPage = page;
    },
    tagSort(type) {
      this.authorTagCloudOptions = getAuthorTagCloudOptions(
        this.authorTagCloudData.map(e => {
          return { name: e._id, value: e[type] };
        })
      );
    }
  }
};
</script>
<style scoped>
.cards-title {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
