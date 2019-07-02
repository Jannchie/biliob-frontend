<template>
  <VLayout wrap>
    <VFlex sm12 md12 lg8>
      <TheHomeCarousel></TheHomeCarousel>
      <AuthorVersusCard
        :a-mid="firstMid"
        :b-mid="secondMid"
        title="粉丝数榜首争夺"
        a-title="冠军"
        b-title="亚军"
        :frequently="true"
      />
      <HomePopularTag></HomePopularTag>
      <DetailCharts
        :options="siteData"
        title="过去24小时全站在线人数情况"
        sub-title="每小时统计"
      />
    </VFlex>
    <VFlex sm12 md12 lg4>
      <VSlideYTransition>
        <MaterialCard
          v-if="variationData.length != 0"
          title="近期值得注意的UP主"
        >
          <VList two-line>
            <template v-for="(item, index) in variationData">
              <VSubheader v-if="item.header" :key="item.header">
                {{ item.header }}
              </VSubheader>

              <VDivider v-else-if="item.divider" :key="index"></VDivider>

              <VListTile
                v-else
                :key="item.title"
                avatar
                @click="toAuthor(item.mid)"
              >
                <VListTileAvatar>
                  <img :src="zipPic(item.face)" />
                </VListTileAvatar>

                <VListTileContent>
                  <VListTileTitle>{{ item.author }}</VListTileTitle>
                  <VListTileSubTitle>{{ item.info }}</VListTileSubTitle>
                </VListTileContent>
              </VListTile>
            </template>
          </VList>
          <div slot="actions" class="caption">
            <RouterLink to="/event">
              更多...
            </RouterLink>
          </div>
        </MaterialCard>
      </VSlideYTransition>
      <VSlideYTransition>
        <MaterialChartCard
          v-if="recommendVideoList.length != 0"
          :options="keywordOptions"
        >
          <h4>观测者关注的话题</h4>
        </MaterialChartCard>
      </VSlideYTransition>

      <VSlideYTransition>
        <VideoRecommendList
          v-if="recommendVideoList.length != 0"
          :video-list="recommendVideoList"
        ></VideoRecommendList>
      </VSlideYTransition>
      <AsideOtherLink></AsideOtherLink>
    </VFlex>
    <!-- <DetailCharts :options="onlineOptions"></DetailCharts> -->
  </VLayout>
</template>
<script>
import AuthorVersusCard from "../components/main/AuthorVersusCard.vue";
import DetailCharts from "../components/main/DetailCharts.vue";
import drawSitePlay from "../charts/site_play.js";
// import getOnlineOptions from "../charts/online.js";
import drawKeywordCloud from "../charts/keyword-cloud.js";

export default {
  components: { AuthorVersusCard, DetailCharts },
  data() {
    return {
      siteData: Object(),
      onlineOptions: Object(),
      firstMid: Number(),
      secondMid: Number(),
      thirdMid: Number(),
      keywords: {},
      recommendVideoList: [],
      variationData: [],
      keywordOptions: Object()
    };
  },
  mounted() {
    this.getRecommendData();
    this.$store.commit("toElse");
    this.axios.get(`/site`).then(response => {
      this.siteData = drawSitePlay(response.data);
    });
    this.axios.get("/author?page=0&pageSize=3&sort=0").then(r => {
      this.firstMid = r.data.content[0].mid;
      this.secondMid = r.data.content[1].mid;
      this.thirdMid = r.data.content[2].mid;
    });
    this.axios.get(`/event/fans-variation?pagesize=5`).then(response => {
      this.variationData = response.data.content;
    });
  },
  methods: {
    toAuthor(mid) {
      this.$router.push(`/author/${mid}`);
    },
    getRecommendData() {
      this.axios
        .post(`/video/prefer-keyword`, this.getPreferKeyword())
        .then(r => {
          this.keywords = r.data;
          this.keywordOptions = drawKeywordCloud(this.keywords);
          this.axios
            .post(`/video/recommend?pagesize=5`, this.keywords)
            .then(response => {
              this.recommendVideoList = response.data;
            });
        });
    },
    getPreferKeyword() {
      let result = {};
      for (var i = localStorage.length - 1; i >= 0; i--) {
        let key = localStorage.key(i);
        let value = Number(localStorage.getItem(localStorage.key(i)));
        let list = key.split(":");
        let type = list[0];
        let id = list[1];
        if ("aid" === type) {
          result[id] = value;
        }
      }
      return result;
    }
  }
};
</script>
