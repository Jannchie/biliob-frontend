<template>
  <VContainer>
    <VRow dense>
      <VCol
        :md="6"
        :cols="12"
      >
        <AuthorInfo
          slot="author-operation"
          :author-data="authorData"
        />
      </VCol>
      <VCol
        :md="6"
        :cols="12"
      >
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
        <VTabs
          class="py-0 my-2 elevation-3"
          show-arrows
        >
          <VTab @click="getPage(0)">
            <VIcon left>
              mdi-database
            </VIcon>基本 / BASIC
          </VTab>
          <VTab @click="getPage(3)">
            <VIcon left>
              mdi-history
            </VIcon>历史 / HISTORY
          </VTab>
          <VTab @click="getPage(1)">
            <VIcon left>
              mdi-brain
            </VIcon>高级 / ADVENCED
          </VTab>
        </VTabs>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol :cols="12">
        <VSlideYTransition>
          <div v-if="cPage == 3">
            <VRow dense>
              <VCol cols="12">
                <BiliobCard
                  v-if="!$store.state.logined || $db.user.exp < 100"
                  title="数据访问制限"
                >
                  <VIcon color="warning">
                    mdi-alert
                  </VIcon>
                  <span
                    class="body-1"
                    style="vertical-align: middle"
                  >
                    您还没有登陆观测者账号！目前只有登陆且经验值>100的观测者才能看到30日之前的UP主数据！
                  </span>
                  <VBtn
                    small
                    to="/login"
                    color="primary"
                  >
                    前往登陆
                  </VBtn>
                </BiliobCard>
              </VCol>
            </VRow>
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
                />
              </VCol>
            </VRow>
            <VRow dense>
              <VCol>
                <BiliobCard
                  light
                  border="bottom"
                  title="UP主最新数据"
                >
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
                      <div style="flex-grow: 1; text-align: center">
                        <div class="rank-title caption grey--text">
                          {{ each.name }}
                        </div>
                        <div class="rank-value caption font-weight-black primary--text">
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
                  :author-data="authorData"
                  class="mb-2"
                />
              </VCol>
            </VRow>
            <VRow
              v-if="authorData.achievements != undefined"
              dense
            >
              <VCol>
                <BiliobAuthorAchievements :author-data="authorData" />
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
                        <VIcon
                          left
                          right
                        >mdi-format-list-bulleted-type</VIcon>
                      </span>
                      <VTab @click="tagSort('totalView')">
                        <VIcon style="margin-right: 10px">
                          mdi-video
                        </VIcon>
                        投稿量
                      </VTab>
                      <VTab @click="tagSort('count')">
                        <VIcon style="margin-right: 10px">
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
        <BiliobSlideCard
          v-if="authorTopVideo"
          name="top-video-slide"
          title="UP主播放最高视频"
          :value="authorTopVideo"
          multiple
          show-arrows
        >
          <div
            v-for="(eachVideo, index) in authorTopVideo"
            :key="index"
            class="ma-1"
          >
            <VCard
              :to="`/video/av${eachVideo.aid}/video`"
              max-width="160"
              width="160px"
            >
              <VImg
                class="white--text"
                height="100px"
                :src="zipPic(eachVideo.pic)"
              />

              <VCardText>
                <div class="text--primary caption cards-title">
                  <div style="min-height: 40px">
                    {{ eachVideo.title }}
                  </div>
                </div>
                <div class="caption">
                  {{
                    formatDate(eachVideo.ctime * 1000, "YYYY-MM-DD HH:mm:ss")
                  }}
                </div>
              </VCardText>
            </VCard>
          </div>
        </BiliobSlideCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobSlideCard
          v-if="authorLatestVideo"
          name="latest-video-slide"
          title="UP主最新上传视频"
          :value="authorLatestVideo"
          multiple
          show-arrows
        >
          <div
            v-for="(eachVideo, index) in authorLatestVideo"
            :key="index"
            class="ma-1"
          >
            <VCard
              class="elevation-3"
              :to="`/video/av${eachVideo.aid}/video`"
              max-width="160"
              width="160px"
            >
              <VImg
                class="white--text"
                height="100px"
                :src="zipPic(eachVideo.pic)"
              />

              <VCardText>
                <div class="text--primary caption cards-title">
                  <div style="min-height: 40px">
                    {{ eachVideo.title }}
                  </div>
                </div>
                <div class="caption">
                  {{
                    formatDate(eachVideo.ctime * 1000, "YYYY-MM-DD HH:mm:ss")
                  }}
                </div>
              </VCardText>
            </VCard>
          </div>
        </BiliobSlideCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
var format = require("date-fns/format");
import interpolation from "../../charts/util/interpolation";
import AuthorInfo from "@/components/aside/AuthorInfo.vue";
import DetailCharts from "@/components/main/DetailCharts.vue";
import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
import getAuthorFansEfficiencyOptions from "@/charts/author-fans-efficiency.js";
import getAuthorTagCloudOptions from "@/charts/cloud-charts.js";
import getAuthorDataDiffOptions from "@/charts/author-data-diff.js";

var deepCopy = function (o) {
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
      authorData: {},
      authorTopVideo: undefined,
      authorLatestVideo: undefined,
      relationshipOptions: Object(),
      authorFansRateOptions: Object(),
      authorFansEfficiencyOptions: Object(),
      authorTagCloudOptions: Object(),
      authorDataDiffOptions: Object(),
      historyDataOptions: Object(),
      mid: Number(),
      cPage: 0
    };
  },
  metaInfo() {
    return {
      title: `${
        this.authorName == undefined ? "载入UP主信息中" : this.authorName
      } - UP主数据详情 - BiliOB观测者 - B站历史数据统计分析站点`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.briefInfo
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: this.authorKeywords
        }
      ]
    };
  },
  computed: {
    authorKeywords() {
      let n = "";
      if (this.authorTagCloudData != undefined) {
        n = this.authorTagCloudData.reduce(
          (total, e) => total + e._id + ",",
          ""
        );
      }
      return this.authorData.name + "," + n + this.$baseKeywords;
    },
    authorName() {
      if (this.authorData == undefined) {
        return undefined;
      }
      return this.authorData.name;
    },
    formatedFans() {
      if (this.authorData.cFans == undefined) {
        return "-";
      } else {
        return this.$numberFormat(this.authorData.cFans);
      }
    },
    formatedView() {
      if (this.authorData.cArchiveView == undefined) {
        return "-";
      } else {
        return this.$numberFormat(this.authorData.cArchiveView);
      }
    },
    formatedLike() {
      if (this.authorData.cLike == undefined) {
        return "-";
      } else {
        return this.$numberFormat(this.authorData.cLike);
      }
    },
    formatedArticle() {
      if (this.authorData.cLike == undefined) {
        return "-";
      } else {
        return this.$numberFormat(this.authorData.cArticleView);
      }
    },
    authorChannelInfo() {
      if (
        this.authorData.channels == undefined ||
        this.authorData.channels.length == 0
      )
        return [" ", " "];
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
      } 个稿件。代表作有《 ${this.authorTopVideo[0].title}》。`;
      return briefInfo;
    }
  },
  mounted() {
    if (this.$route.params.mid != undefined) {
      this.mid = this.$route.params.mid;
    }
    this.$store.commit("toAuthor");
    this.axios.get("/author/" + this.mid).then((response) => {
      if (response.data.channels != undefined) {
        response.data.channels = Object.values(response.data.channels);
        response.data.channels.sort((a, b) => b.count - a.count);
      }
      this.authorData = response.data;

      this.authorFansEfficiencyOptions = getAuthorFansEfficiencyOptions(
        deepCopy(this.authorData)
      );

      let fansArray = [];
      let likeArray = [];
      let viewArray = [];

      this.authorData.data.forEach((e) => {
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
      likeArray = likeArray.reverse();
      viewArray = viewArray.reverse();

      this.authorFansRateOptions = getMultiChartOptions(
        [
          [interpolation(fansArray), "粉丝数", "#1e88e5"],
          [interpolation(viewArray), "播放数", "#2b821d"],
          [interpolation(likeArray), "获赞数", "#c12e34"]
        ],
        "area",
        "YYYY-MM-DD"
      );
      this.authorDataDiffOptions = getAuthorDataDiffOptions([
        [fansArray, "粉丝数", "#1e88e5"],
        [viewArray, "播放数", "#2b821d"],
        [likeArray, "获赞数", "#c12e34"]
      ]);

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
      .get(`/video/v3/author?mid=${this.mid}&sort=view`)
      .then((response) => {
        this.authorTopVideo = response.data;
      });
    this.axios
      .get(`/video/v3/author?mid=${this.mid}&sort=ctime`)
      .then((response) => {
        this.authorLatestVideo = response.data;
      });
    this.axios.get(`/author/tag?mid=${this.mid}&limit=${50}`).then((r) => {
      this.authorTagCloudData = r.data;
      this.authorTagCloudOptions = getAuthorTagCloudOptions(
        this.authorTagCloudData.map((e) => {
          return { name: e._id, value: e.totalView };
        })
      );
    });
  },
  methods: {
    formatDate(date) {
      return format(date, "YYYY-MM-DD HH:mm:ss");
    },
    getPage(page) {
      this.cPage = page;
    },
    tagSort(type) {
      this.authorTagCloudOptions = getAuthorTagCloudOptions(
        this.authorTagCloudData.map((e) => {
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
