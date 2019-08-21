<template>
  <div>
    <VRow dense>
      <VCol :md="6" :cols="12">
        <AuthorInfo slot="author-operation" :author-data="authorData" />
      </VCol>
      <VCol :md="6" :cols="12">
        <AuthorOperation
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
          class="elevation-3 py-0 my-2"
          show-arrows
          dark
          background-color="#333"
        >
          <VIcon left right>mdi-finance</VIcon>

          <VTab @click="getPage(0)">
            <VIcon left>mdi-database</VIcon>基本统计
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
          <div v-if="cPage == 0">
            <!-- <AuthorDetailChannel slot="channel" :channels="authorData.channels"></AuthorDetailChannel> -->
            <AuthorDetailRank
              v-bind="authorData.rank"
              class="mb-2"
            ></AuthorDetailRank>
            <DetailCharts
              class="mb-2"
              title="粉丝、播放量变化趋势"
              :options="authorFansOptions"
            />
            <DetailCharts
              class="mb-2"
              title="粉丝数变化速率"
              :options="authorFansRateOptions"
            />
            <!-- <DetailCharts
          id="relationship"
          title="UP主作品相关度"
          :options="relationshipOptions"
            />-->
          </div>
          <div v-else-if="cPage == 1">
            <DetailCharts
              title="粉丝变化效率"
              sub-title="每一万播放量增长造成的粉丝变动数"
              :options="authorFansEfficiencyOptions"
            />
            <DetailCharts :options="authorTagCloudOptions">
              <VFlex slot="header">
                <VTabs dark background-color="#333" slider-color="blue">
                  <span
                    class="subheading font-weight-light mr-3"
                    style="align-self: center"
                  >
                    <VIcon left right>mdi-format-list-bulleted-type</VIcon>
                  </span>
                  <VTab @click="tagSort(0)">
                    <VIcon style="margin-right:10px;">
                      mdi-video
                    </VIcon>
                    投稿量
                  </VTab>
                  <VTab @click="tagSort(1)">
                    <VIcon style="margin-right:10px;">
                      mdi-play-circle-outline
                    </VIcon>
                    播放量
                  </VTab>
                </VTabs>
              </VFlex>
            </DetailCharts>
          </div>
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobCard title="UP主播放最高视频" border="bottom">
          <VSlideGroup :value="authorTopVideo.content" multiple show-arrows>
            <VSlideItem
              v-for="(eachVideo, index) in authorTopVideo.content"
              :key="index"
            >
              <VCard
                :to="`/author/${eachVideo.mid}/video/${eachVideo.aid}`"
                class="ma-4"
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
                  <span class="text--primary caption">
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
        <BiliobCard title="UP主最新上传视频" border="bottom">
          <VSlideGroup :value="authorLatestVideo.content" multiple show-arrows>
            <VSlideItem
              v-for="(eachVideo, index) in authorLatestVideo.content"
              :key="index"
            >
              <VCard
                :to="`/author/${eachVideo.mid}/video/${eachVideo.aid}`"
                class="ma-4"
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
                  <span class="text--primary caption">
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
  </div>
</template>

<script>
var format = require("date-fns/format");

import AuthorDetailRank from "@/components/main/AuthorDetailRank.vue";
import AuthorInfo from "@/components/aside/AuthorInfo.vue";
import AuthorOperation from "@/components/aside/AuthorOperation.vue";
import DetailCharts from "@/components/main/DetailCharts.vue";
import drawFansChart from "@/charts/author-fans.js";
import drawFansRateChart from "@/charts/author-fans-rate.js";
import getAuthorFansEfficiencyOptions from "@/charts/author-fans-efficiency.js";
import getAuthorTagCloudOptions from "@/charts/author-tag-cloud.js";
//定义抠图方法
// function getImgData(
//   imgSrc,
//   center = {
//     x: 80,
//     y: 80
//   }
// ) {
//   return new Promise(resolve => {
//     let radius = 80;
//     const canvas = document.createElement("canvas");
//     const contex = canvas.getContext("2d");
//     const img = new Image();
//     img.crossOrigin = "";
//     const diameter = 2 * radius;
//     img.onload = function() {
//       canvas.width = diameter;
//       canvas.height = diameter;
//       contex.clearRect(0, 0, diameter, diameter);
//       contex.save();
//       contex.beginPath();
//       contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
//       contex.clip(); //裁剪上面的圆形
//       contex.drawImage(
//         img,
//         center.x - radius,
//         center.y - radius,
//         diameter,
//         diameter,
//         0,
//         0,
//         diameter,
//         diameter
//       ); // 在刚刚裁剪的园上画图
//       contex.restore(); // 还原状态
//       resolve(canvas.toDataURL("image/png", 1));
//     };
//     img.src = imgSrc;
//   });
// }
// import AuthorDetailChannel from "@/components/main/AuthorDetailChannel.vue";
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
    AuthorDetailRank,
    AuthorInfo,
    AuthorOperation,
    DetailCharts
  },
  data() {
    return {
      authorData: Object(),
      authorTopVideo: Object(),
      authorLatestVideo: Object(),
      authorFansOptions: Object(),
      relationshipOptions: Object(),
      authorFansRateOptions: Object(),
      authorFansEfficiencyOptions: Object(),
      authorTagCloudOptions: Object(),
      mid: Number(),
      cPage: 0
    };
  },
  mounted() {
    if (this.$route.params.mid != undefined) {
      this.mid = this.$route.params.mid;
    }
    this.$store.commit("toAuthor");
    this.axios.get("/author/" + this.mid).then(response => {
      this.authorData = response.data;
      document.title = `${
        this.authorData.name
      } - UP主数据详情 - BiliOB观测者 - B站历史数据统计分析站点`;
      //   this.axios
      //     .get(`/author/${this.mid}/relationship?limit=3`)
      //     .then(response => {
      //       let data = response.data;
      //       let nodes = [];
      //       let categories = [];
      //       let links = [];
      //       let tags = new Set();
      //       let pic = {};
      //       let tagSet = new Set();
      //       let max = Math.max.apply(
      //         Math,
      //         data.map(function(o) {
      //           return o.value;
      //         })
      //       );
      //       let min = Math.min.apply(
      //         Math,
      //         data.map(function(o) {
      //           return o.value;
      //         })
      //       );
      //       // 标准化值
      //       function getValue(value) {
      //         return ((value - min) / (max - min)) * 50 + 50;
      //       }
      //       data.forEach((e, memberIndex) => {
      //         let fixed = false;
      //         if (memberIndex == data.length - 1) {
      //           fixed = true;
      //         } else {
      //           links.push({ source: this.authorData.name, target: e.name });
      //         }
      //         nodes.push({
      //           name: e.name,
      //           value: getValue(e.value),
      //           symbolSize: getValue(e.value),
      //           id: e.name,
      //           fixed: fixed
      //         });
      //         pic[e.name] = e.face;
      //         categories.push(e.name);
      //         var i = 6;
      //         e.tag.forEach(t => {
      //           tagSet.add(t);
      //           // let value = 70;
      //           i--;
      //           if (i >= 0) {
      //             tags.add(t);
      //             // links.push({
      //             //   source: e.name,
      //             //   target: t + "id",
      //             //   value: value
      //             // });
      //           } else {
      //             return;
      //           }
      //         });
      //       });
      //       let nodesList = [];
      //       // let nodesList = Array.from(tags).map(e => {
      //       //   return { name: e, id: e + "id", symbolSize: 5, value: 1 };
      //       // });
      //       nodes = nodes.concat(nodesList);

      //       var listPromise = [];

      //       categories.forEach(e => {
      //         listPromise.push(getImgData(pic[e] + "@160w_160h.webp"));
      //       });
      //       let option = {
      //         tooltip: {},
      //         legend: [
      //           {
      //             data: categories.map(function(a) {
      //               return a.name;
      //             })
      //           }
      //         ],
      //         series: [
      //           {
      //             name: "up主名称",
      //             type: "graph",
      //             layout: "force",
      //             data: nodes,
      //             links: links,
      //             categories: categories,
      //             roam: true,
      //             focusNodeAdjacency: true,
      //             itemStyle: {
      //               normal: {
      //                 borderColor: "#fff",
      //                 borderWidth: 2,
      //                 shadowBlur: 10,
      //                 shadowColor: "rgba(0, 0, 0, 0.3)"
      //               }
      //             },
      //             force: {
      //               initLayout: "circular",
      //               edgeLength: [60, 180],
      //               repulsion: 300
      //             },
      //             label: {
      //               position: "right",
      //               formatter: "{b}"
      //             },
      //             lineStyle: {
      //               color: "source",
      //               curveness: 0.1
      //             },
      //             emphasis: {
      //               lineStyle: {
      //                 width: 5
      //               }
      //             }
      //           }
      //         ]
      //       };
      //       //当处理的图片数据量比较大时，可由后端来处理这个过程
      //       Promise.all(listPromise).then(images => {
      //         for (let i = 0; i < categories.length; i++) {
      //           nodes[i].symbol = "image://" + images[i];
      //         }
      //         this.relationshipOptions = option;
      //       });
      //     });
      this.authorFansOptions = drawFansChart(deepCopy(this.authorData));
      this.authorFansRateOptions = drawFansRateChart(deepCopy(this.authorData));
      this.authorFansEfficiencyOptions = getAuthorFansEfficiencyOptions(
        deepCopy(this.authorData)
      );
      if (this.authorData.forceFocus != true) {
        this.authorData.forceFocus == false;
      }
    });
    this.axios.get(`/author/${this.mid}/video`).then(response => {
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
        this.authorTagCloudData
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
        this.authorTagCloudData,
        type
      );
    }
  }
};
</script>
