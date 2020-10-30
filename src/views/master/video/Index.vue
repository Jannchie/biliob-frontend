<template>
  <VContainer>
    <VSlideYReverseTransition
      hide-on-leave
      group
    >
      <VRow
        v-if="info != undefined"
        key="body-1"
        dense
      >
        <VCol
          v-if="$vuetify.breakpoint.lgAndUp"
          cols="auto"
        >
          <VImg
            class="elevation-3"
            style="border-radius: 2px; display: inline-block; height: 80px;width:150px"
            :src="zipPic(info.pic)"
          />
        </VCol>
        <VCol lg="6">
          <BiliobCard style="height: 80px">
            <div>
              <div class="caption">
                av{{ info.aid }} /
                <span class="caption">
                  BV{{ info.bvid }}
                </span>
              </div>
              <div
                class="body-1"
                style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
              >
                {{ info.title }}
              </div>
            </div>
          </BiliobCard>
        </VCol>
        <VCol>
          <VList
            class="elevation-3"
            style="height: 80px"
          >
            <VListItem>
              <VListItemAvatar size="50px">
                <VAvatar
                  size="50px"
                  @click.stop="$router.push(`/author/${info.owner.mid}`)"
                >
                  <VImg :src="info.owner.face" />
                </VAvatar>
              </VListItemAvatar>
              <VListItemContent>
                <VListItemTitle>{{ info.owner.name }}</VListItemTitle>
                <VListItemSubtitle>
                  mid: {{ info.owner.mid }}
                </VListItemSubtitle>
              </VListItemContent>
            </VListItem>
          </VList>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined"
        key="tab"
        dense
      >
        <VCol>
          <VTabs
            grow
            class="elevation-3"
          >
            <VTab :to="`/video/${id}/video`">
              浏览 / VIEW
            </VTab>
            <VTab :to="`/video/${id}/info`">
              信息 / INFO
            </VTab>
            <VTab :to="`/video/${id}/history`">
              历史 / HISTORY
            </VTab>
          </VTabs>
        </VCol>
      </VRow>
      <VRow
        v-if="tab=='video'"
        key="video"
        dense
      >
        <VCol v-if="videoSrc != ''">
          <VResponsive
            class="elevation-3"
            :aspect-ratio="16 / 9"
          >
            <iframe
              id="video-iframe"
              width="100%"
              height="100%"
              :src="videoSrc"
              scrolling="no"
              border="0"
              sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
            />
          </VResponsive>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && info.attribute != 33570816 && info.attribute != 32768 && tab=='info' && $store.state.logined && $db.user.exp > 100"
        key="attr"
        dense
      >
        <VCol>
          <BiliobCard title="标志位">
            <div class="caption">
              并不是所有人都能看到这个标志位(EXP > 100)。
            </div>
            <div class="caption">
              这些数据已经被B站隐藏，最新发布的视频现在无法查看标志位。
            </div>
            <div
              v-if="$db.user.exp > 10000"
              class="caption"
            >
              如果你看到这一条，说明你是骨灰级的观测者。也许目前还能够通过隐藏接口看到数据。且看且珍惜。
            </div>
            <div v-if=" $db.user.exp > 10000 || info.ctime < 1603897200">
              <span
                v-for="(a,i) in attr"
                :key="i"
              >
                <VChip
                  v-if="a=='1' && attrName[i] != undefined"
                  x-small
                  outlined
                  :color="[7, 8, 9, 10, 11, 24, 29].indexOf(i) != -1 ? `blue` : `red`"
                  class="pa-1 mr-1"
                  label
                >
                  {{ attrName[i] }}
                </VChip>
              </span>
            </div>
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && tab=='info'"
        key="new-data"
        dense
      >
        <VCol>
          <BiliobCard title="最新数据">
            <VRow dense>
              <VCol>
                <div>
                  播放
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.view) }}
                </div>
                <div
                  v-if="authorAvg !=undefined"
                  class="caption"
                >
                  达到自身过往作品平均值的{{ viewSelfRate.toFixed(1) }}%
                </div>
                <div
                  v-if="channelAvg !=undefined"
                  class="caption"
                >
                  达到发布时分区内平均值的{{ ( info.stat.view/ channelAvg.view * 100).toFixed(1) }}%
                </div>
              </VCol>
            </VRow>
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && tab == 'info'"
        key="stats"
        dense
      >
        <VCol
          v-for="key in ['danmaku','like','coin','favorite','reply','share']"
          :key="key"
          md="2"
          cols="6"
        >
          <BiliobCard>
            <div>{{ statDict[key] }}</div>
            <div class="caption">
              {{ $numFormat(info.stat[key]) }}
              <span>[{{ (info.stat[key] / info.stat.view * 100).toFixed(1) }}%]</span>
            </div>
            <div
              v-if="authorAvg != undefined"
              class="caption"
            >
              个人表现：{{ ( info.stat[key] / authorAvg[key] * 100).toFixed(1) }}%
            </div>
            <div
              v-if="channelAvg != undefined"
              class="caption"
            >
              分区表现：{{ ( info.stat[key] / channelAvg[key] * 100).toFixed(1) }}%
            </div>
          </BiliobCard>
        </VCol>
      </VRow>

      <VRow
        v-if="info != undefined && tab == 'info'"
        key="meta-info"
        dense
      >
        <VCol
          cols="12"
          lg="6"
        >
          <BiliobCard title="时间信息">
            发布时间: {{ $timeFormat(info.ctime * 1000,"YYYY-MM-DD HH:mm:ss") }}
            <br>
            投稿时间: {{ $timeFormat(info.pubdate * 1000,"YYYY-MM-DD HH:mm:ss") }}
            <br>
            合计时长:
            <span v-if="info.duration >= 3600">{{ (info.duration / 3600).toFixed(0) }}小时 </span>{{ (info.duration % 3600 / 60).toFixed(0) }} 分 {{ info.duration % 60 }}秒
          </BiliobCard>
        </VCol>
        <VCol
          cols="12"
          lg="6"
        >
          <BiliobCard title="其他信息">
            {{ info.tname }}区
            <br>
            <span v-if="info.copyright">原创有版权</span><span v-else>转载无版权</span>
            <br>
            共分为{{ info.videos }}P
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && (tab == 'video' || tab == 'info')"
        key="desc"
        dense
      >
        <VCol>
          <BiliobCard title="简介">
            <VueMarkdown :source="info.desc" />
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="tab == 'history'"
        key="history-chart"
        dense
      >
        <VCol>
          <MainDetailCharts
            title="历史数据"
            :options="hisOptions"
          />
        </VCol>
      </VRow>
    </VSlideYReverseTransition>
  </VContainer>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `${
        this.info == undefined ? "载入信息中" : this.info.title
      } - 视频数据 - BiliOB观测者 - B站历史数据统计分析站点 - UP主视频信息查询`
    };
  },
  data() {
    return {
      tab: this.$route.params.tab,
      videoSrc: "",
      info: undefined,
      authorAvg: undefined,
      channelAvg: undefined,
      attr: "",
      attrName: {
        0: "排名封锁",
        1: "动态封锁",
        2: "网页封锁",
        3: "APP封锁",
        4: "搜索封锁",
        5: "海外封锁",
        6: "推荐封锁",
        7: "禁止转载",
        8: "HD高清",
        9: "PGC作品",
        10: "允许承包",
        11: "番剧",
        12: "私单恰饭",
        13: "地区限制",
        // 14: "禁止其他人添加TAG",
        16: "自动跳转",
        17: "影视",
        18: "付费视频",
        19: "推送动态",
        20: "家长模式",
        21: "限制游客",
        24: "合作视频",
        29: "互动视频"
      },
      history: undefined,
      hisOptions: {},
      statDict: {
        view: "播放",
        danmaku: "弹幕",
        like: "点赞",
        coin: "硬币",
        favorite: "收藏",
        reply: "评论",
        share: "分享",
        jannchie: "指数"
      }
    };
  },
  computed: {
    id() {
      if (this.$route.params.aid != undefined) {
        return `av${this.$route.params.aid}`;
      } else {
        return `BV${this.$route.params.bvid}`;
      }
    },
    viewSelfRate() {
      if (this.info == undefined || this.authorAvg == undefined) {
        return 0;
      }
      return (this.info.stat.view / this.authorAvg.view) * 100;
    }
  },
  watch: {
    "$route.path": function (val) {
      val = val.split("/")[3];
      if (val == "history") {
        this.loadHistory();
      }
      if (val == "info") {
        this.loadAuthorAvg();
        this.loadChannelAvg();
      }
      this.tab = val;
    }
  },
  async mounted() {
    this.tab = this.$route.path.split("/")[3];
    if (this.tab == undefined) {
      this.$router.push(`/video/${this.id}/video`);
      this.tab = "video";
    }
    let res = await this.axios.get(`/video/v3/${this.id}/info`);
    this.info = res.data;

    this.attr = parseInt(this.info.attribute)
      .toString(2)
      .padStart(30, "0")
      .split("")
      .reverse()
      .join("");
    this.videoSrc = `https://player.bilibili.com/player.html?aid=${this.info.aid}&bvid=BV${this.info.bvid}&cid=${this.info.cid}&page=1&high_quality=0&t=1&autoplay=1%v=50`;
    if (this.tab == "history") {
      this.loadHistory();
    }
    if (this.tab == "info") {
      this.loadAuthorAvg();
      this.loadChannelAvg();
    }
  },
  methods: {
    async loadAuthorAvg() {
      if (this.authorAvg != undefined) {
        return;
      }
      let res = await this.axios.get(
        `/video/v3/average?mid=${this.info.owner.mid}`
      );
      this.authorAvg = res.data;
    },
    async loadChannelAvg() {
      if (this.channelAvg != undefined) {
        return;
      }
      let res = await this.axios.get(
        `/video/v3/average?tid=${this.info.tid}&pubdate=${this.info.pubdate}`
      );
      this.channelAvg = res.data;
    },
    async loadHistory() {
      if (this.history != undefined) {
        return;
      }
      let res = await this.axios.get(`/video/v3/${this.id}/stat`);
      this.history = res.data;
      this.hisOptions = {
        legend: {
          selectedMode: "single"
        },
        tooltip: {
          show: true,
          axisPointer: { type: "cross" },
          trigger: "axis"
        },
        grid: {
          left: "10px",
          right: "50px",
          top: "30px",
          containLabel: true
        },
        dataZoom: [
          {
            type: "inside",
            filterMode: "weakFilter"
          },
          {
            handleSize: "100%",
            handleStyle: {},
            bottom: "20px"
          }
        ],
        xAxis: {
          type: "time",
          axisPointer: {
            label: {
              formatter: (d) => this.$timeFormat(d.value, "YYYY-MM-DD HH:mm")
            }
          }
        },
        yAxis: {
          min: "dataMin",
          axisPointer: {
            label: {
              formatter: (d) => d.value.toFixed(0)
            }
          },
          axisLabel: {
            formatter: (d) =>
              new Intl.NumberFormat("zh-CN", {
                notation: "compact",
                maximumFractionDigits: 2
              }).format(d.toFixed(0)),
            type: "value"
          }
        },
        dataset: { source: this.history },
        series: Object.keys(this.statDict).map((k, i) => {
          return {
            type: "line",
            name: this.statDict[k],
            showSymbol: false,
            encode: { x: "datetime", y: k }
          };
        })
      };
    }
  }
};
</script>
