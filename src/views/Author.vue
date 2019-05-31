<template>
  <MainLayout>
    <AuthorMain slot="main-cards">
      <div>
        <AuthorDetailRank v-bind="authorData.rank"></AuthorDetailRank>
        <!-- <AuthorDetailChannel slot="channel" :channels="authorData.channels"></AuthorDetailChannel> -->
        <DetailCharts
          title="粉丝数变化趋势"
          :options="authorFansOptions"
        />
        <DetailCharts
          title="粉丝数变化速率"
          :options="authorFansRateOptions"
        />
        <DetailCharts
          id="relationship"
          title="UP主作品相关度"
          :options="relationshipOptions"
        />
      </div>
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
//定义抠图方法
function getImgData(
  imgSrc,
  center = {
    x: 80,
    y: 80
  }
) {
  return new Promise(resolve => {
    let radius = 80;
    const canvas = document.createElement("canvas");
    const contex = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "";
    const diameter = 2 * radius;
    img.onload = function() {
      canvas.width = diameter;
      canvas.height = diameter;
      contex.clearRect(0, 0, diameter, diameter);
      contex.save();
      contex.beginPath();
      contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
      contex.clip(); //裁剪上面的圆形
      contex.drawImage(
        img,
        center.x - radius,
        center.y - radius,
        diameter,
        diameter,
        0,
        0,
        diameter,
        diameter
      ); // 在刚刚裁剪的园上画图
      contex.restore(); // 还原状态
      resolve(canvas.toDataURL("image/png", 1));
    };
    console.log(imgSrc);
    img.src = imgSrc;
  });
}
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
      relationshipOptions: Object(),
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
      this.axios
        .get(`/author/${this.mid}/relationship?limit=5`)
        .then(response => {
          let data = response.data;
          let nodes = [];
          let categories = [];
          let links = [];
          let tags = new Set();
          let pic = {};
          nodes.push({
            name: this.authorData.name,
            value: 100,
            symbolSize: 100,
            id: this.authorData.name
          });
          pic[this.authorData.name] = this.authorData.face;
          categories.push(this.authorData.name);
          data.forEach(e => {
            nodes.push({
              name: e.name,
              value: 70,
              symbolSize: 60,
              id: e.name
            });
            pic[e.name] = e.face;
            links.push({ source: this.authorData.name, target: e.name });
            categories.push(e.name);
            var i = 6;
            e.tag.forEach(t => {
              i--;
              if (i >= 0) {
                tags.add(t);
                links.push({ source: e.name, target: t + "id" });
              } else {
                return;
              }
            });
          });
          let nodesList = Array.from(tags).map(e => {
            return { name: e, id: e + "id", symbolSize: 5, value: 1 };
          });
          nodes = nodes.concat(nodesList);

          var listPromise = [];

          categories.forEach(e => {
            listPromise.push(getImgData(pic[e] + "@160w_160h.webp"));
          });
          let option = {
            tooltip: {},
            legend: [
              {
                data: categories.map(function(a) {
                  return a.name;
                })
              }
            ],
            series: [
              {
                name: "up主名称",
                type: "graph",
                layout: "force",
                data: nodes,
                links: links,
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                  normal: {
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: "rgba(0, 0, 0, 0.3)"
                  }
                },
                force: {
                  initLayout: "circular",
                  edgeLength: 70,
                  repulsion: 200
                },
                label: {
                  position: "right",
                  formatter: "{b}"
                },
                lineStyle: {
                  color: "source",
                  curveness: 0.1
                },
                emphasis: {
                  lineStyle: {
                    width: 5
                  }
                }
              }
            ]
          };
          //当处理的图片数据量比较大时，可由后端来处理这个过程
          Promise.all(listPromise).then(images => {
            for (let i = 0; i < categories.length; i++) {
              nodes[i].symbol = "image://" + images[i];
            }
            this.relationshipOptions = option;
          });
        });
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
