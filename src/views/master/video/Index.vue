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
            style="border-radius: 2px; display: inline-block; height: 98px;width:170px"
            :src="info.pic"
          />
        </VCol>
        <VCol lg="6">
          <BiliobCard style="height: 98px">
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
              <div>
                {{ info.owner.name }}
              </div>
            </div>
          </BiliobCard>
        </VCol>
        <VCol>
          <VList
            three-line
            class="elevation-3"
            style="height: 98px"
          >
            <VListItem>
              <VListItemAvatar size="50px">
                <VAvatar size="50px">
                  <VImg :src="info.owner.face" />
                </VAvatar>
              </VListItemAvatar>
              <VListItemContent>
                <VListItemTitle>{{ info.owner.name }}</VListItemTitle>
                <VListItemSubtitle>
                  mid: {{ info.owner.mid }}
                </VListItemSubtitle>
                <VListItemSubtitle class="caption">
                  {{ this.$timeFormat(new Date(info.ctime * 1000),"YYYY-MM-DD HH:mm:ss") }}
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
        v-if="info != undefined && tab=='video'"
        key="desc"
        dense
      >
        <VCol>
          <BiliobCard>
            <VueMarkdown :source="info.desc" />
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && tab=='info'"
        key="test"
        dense
      >
        <VCol>
          <BiliobCard title="最新数据">
            <VRow>
              <VCol>
                <div>
                  播放
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.view) }}
                </div>
              </VCol>
              <VCol>
                <div>
                  硬币
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.coin) }}
                </div>
              </VCol>
              <VCol>
                <div>
                  弹幕
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.danmaku) }}
                </div>
              </VCol>
              <VCol>
                <div>
                  评论
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.reply) }}
                </div>
              </VCol>
              <VCol>
                <div>
                  点赞
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.like) }}
                </div>
              </VCol>
              <VCol>
                <div>
                  收藏
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.favorite) }}
                </div>
              </VCol>
              <VCol>
                <div>
                  分享
                </div>
                <div class="caption">
                  {{ $numFormat(info.stat.share) }}
                </div>
              </VCol>
            </VRow>
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && info.attribute != 33570816 && tab=='info'"
        key="attr"
      >
        <VCol>
          <BiliobCard title="状态">
            <span
              v-for="(a,i) in attr"
              :key="i"
            >
              <VChip
                v-if="a=='1' && attrName[i] != undefined"
                x-small
                outlined
                color="red"
                class="pa-1 mr-1"
                label
              >
                {{ attrName[i] }}
              </VChip>
            </span>
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
            创建时间: {{ $timeFormat(info.ctime * 1000,"YYYY-MM-DD HH:mm:ss") }}
            <br>
            发布时间: {{ $timeFormat(info.pubdate * 1000,"YYYY-MM-DD HH:mm:ss") }}
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
        v-if="info != undefined"
        key="test-attr"
      >
        <VCol>
          {{ info.attribute }}
          {{ attr }}
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined"
        key="test1"
        dense
      >
        <h1 class="caption">
          {{ info }}
        </h1>
      </VRow>
      <VRow
        v-if="tab == 'history'"
        key="history"
      >
        <VCol>
          <MainDetailCharts
            title="历史数据"
            :options="his_options"
          />
        </VCol>
      </VRow>
    </VSlideYReverseTransition>
  </VContainer>
</template>

<script>
export default {
  data() {
    return {
      tab: this.$route.params.tab,
      videoSrc: "",
      info: undefined,
      attr: "",
      attrName: {
        0: "排名封锁",
        1: "动态封锁",
        2: "网页封锁",
        3: "APP封锁",
        4: "搜索封锁",
        5: "海外封锁",
        6: "推荐封锁",
        7: "转载封锁",
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
        24: "合作",
        29: "互动"
      },
      history: undefined,
      his_options: {}
    };
  },
  computed: {
    id() {
      if (this.$route.params.aid != undefined) {
        return `av${this.$route.params.aid}`;
      } else {
        return `BV${this.$route.params.bvid}`;
      }
    }
  },
  watch: {
    "$route.params.tab": function (val) {
      if (val == "history") {
        this.loadHistory();
      }
    }
  },
  async mounted() {
    let res = await this.axios.get(`/video/v3/${this.id}/info`);
    this.info = res.data;
    this.attr = parseInt(this.info.attribute)
      .toString(2)
      .padStart(30, "0")
      .split("")
      .reverse()
      .join("");
    this.videoSrc = `https://player.bilibili.com/player.html?aid=${this.info.aid}&bvid=BV${this.info.bvid}&cid=${this.info.cid}&page=1&high_quality=0&t=1&autoplay=1%v=50`;
    if (this.$route.params.tab == "history") {
      this.loadHistory();
    }
  },
  methods: {
    async loadHistory() {
      if (this.history != undefined) {
        return;
      }
      let res = await this.axios.get(`/video/v3/${this.id}/stat`);
      this.history = res.data;
      this.his_options = {
        legend: {
          selectedMode: "single"
        },
        tooltip: { axisPointer: "cross" },
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
            show: true,
            label: {
              formatter: function (params) {
                return "日期：" + params.value;
              }
            }
          }
        },
        yAxis: {
          min: "dataMin",
          type: "value",
          axisPointer: {
            show: true,
            label: {
              formatter: function (params) {
                return "数值：" + params.value;
              }
            }
          }
        },
        dataset: { source: this.history },
        series: _.remove(
          Object.keys(this.history[0]),
          (d) => !(["datetime", "aid", "bvid"].indexOf(d) != -1)
        ).map((k, i) => {
          return {
            type: "line",
            name: k,
            showSymbol: false,
            encode: { x: "datetime", y: k }
          };
        })
      };
      console.log(JSON.stringify(this.his_options));
    }
  }
};
</script>
