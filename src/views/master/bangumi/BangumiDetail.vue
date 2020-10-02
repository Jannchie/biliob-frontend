<template>
  <VContainer>
    <VRow
      v-if="bangumiDetail != undefined"
      cols="12"
      dense
    >
      <VCol>
        <BiliobBangumiInfo
          v-if="$vuetify.breakpoint.mdAndDown"
          :bangumi-info="bangumiDetail"
        />
        <VCard v-else>
          <VCardText>
            <VRow class="pa-0">
              <VCol cols="auto">
                <VImg
                  style="border-radius: 5px;"
                  :src="bangumiDetail.cover"
                  height="240px"
                  width="180px"
                />
              </VCol>
              <VCol>
                <div
                  v-if="bangumiDetail.score"
                  style="position: absolute; right: 16px"
                  class="text-center"
                >
                  <VRow no-gutters>
                    <VSpacer />
                    <VCol cols="auto">
                      <h3 :class="`display-1 ${scoreColor} font-weight-black`">
                        {{ bangumiDetail.score }}
                      </h3>
                      <div class="caption">
                        {{ $numberFormat(bangumiDetail.scoreCount) }}人评分
                      </div>
                    </VCol>
                  </VRow>
                </div>
                <h2>
                  {{ bangumiDetail.name }}
                  <div class="caption">
                    {{ bangumiDetail.foreignName }}
                  </div>
                </h2>
                <br>
                <div class="caption">
                  <BiliobBangumiType
                    :type="bangumiDetail.type"
                  />
                  <BiliobBangumiCopyright
                    :copyright="bangumiDetail.copyright"
                    :charge="bangumiDetail.charge"
                  />
                  <VChip
                    style="vertical-align: unset"
                    color="primary"
                    class="px-1 mr-2"
                    label
                    outlined
                    x-small
                  >
                    {{ bangumiDetail.area }}
                  </VChip>
                  <BiliobBangumiStatus
                    :state="bangumiDetail.state"
                    :finished="bangumiDetail.finished"
                    :serializing="bangumiDetail.serializing"
                  />
                  <div class="mt-2">
                    发布时间:
                    {{
                      $timeFormat(bangumiDetail.pubDate, "YYYY-MM-DD HH:mm:ss")
                    }}
                  </div>

                  <div>
                    数据更新:
                    {{
                      $timeFormat(
                        bangumiDetail.updateTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    }}
                  </div>
                  <VRow>
                    <VCol cols="auto">
                      <VTooltip bottom>
                        <template v-slot:activator="{ on }">
                          <VIcon v-on="on">
                            mdi-play-circle-outline
                          </VIcon>
                        </template>
                        <span>{{ bangumiDetail.cView }}</span>
                      </VTooltip>
                      <span style="vertical-align: middle">
                        {{ $numberFormat(bangumiDetail.cView) }}
                      </span>
                    </VCol>
                    <VCol cols="auto">
                      <VTooltip bottom>
                        <template v-slot:activator="{ on }">
                          <VIcon v-on="on">
                            mdi-coin
                          </VIcon>
                        </template>
                        <span>{{ bangumiDetail.cCoin }}</span>
                      </VTooltip>
                      <span style="vertical-align: middle">
                        {{ $numberFormat(bangumiDetail.cCoin) }}
                      </span>
                    </VCol>
                    <VCol cols="auto">
                      <VTooltip bottom>
                        <template v-slot:activator="{ on }">
                          <VIcon v-on="on">
                            mdi-heart
                          </VIcon>
                        </template>
                        <span>新版：{{ bangumiDetail.newFollow }}，旧版：{{
                          bangumiDetail.oldFollow
                        }}，系列：{{
                          bangumiDetail.bangumiHistoryData[
                            bangumiDetail.bangumiHistoryData.length - 1
                          ].followSeries
                        }}</span>
                      </VTooltip>
                      <span
                        alt="123"
                        style="vertical-align: middle"
                      >
                        {{
                          $numberFormat(
                            bangumiDetail.oldFollow > bangumiDetail.newFollow
                              ? bangumiDetail.oldFollow
                              : bangumiDetail.newFollow
                          )
                        }}
                      </span>
                    </VCol>
                  </VRow>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
      >
        <MainDetailCharts
          title="专题历史数据"
          :options="totalOptions"
        />
      </VCol>
      <VCol
        cols="12"
      >
        <MainDetailCharts
          title="专题周增数据"
          :options="rateOptions"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
import interpolation from "@/charts/util/interpolation";
export default {
  data() {
    return { bangumiDetail: {} };
  },
  computed: {
    scoreColor() {
      if (this.bangumiDetail.score > 9) {
        return "red--text";
      } else if (this.bangumiDetail.score > 8) {
        return "red--text text--lighten-2";
      } else if (this.bangumiDetail.score > 7) {
        return "yellow--text ";
      } else if (this.bangumiDetail.score > 4) {
        return "green--text";
      } else {
        return "green--text";
      }
    },
    datus() {
      if (this.bangumiDetail.bangumiHistoryData == undefined) {
        return [];
      }
      let keys = [
        ["play", "播放", "#2b821d"],
        ["danmaku", "弹幕", "#005eaa"],
        ["coin", "硬币", "#32a487"],
        ["followSeries", "系列追番", "#884422"],
        ["followOld", "旧版追番", "#DD77aa"],
        ["followNew", "新版追番", "#2288cc"],
        ["undertake", "承包", "#444499"],
        ["rate", "评分", "#c12e34"],
        ["rateCount", "评分人数", "#f6dd00"]
      ];
      let datus = keys
        .map(e => {
          return [[], e[1], e[2]];
        })
        .sort((a, b) => {
          return this.$dateParse(a) - this.$dateParse(b);
        });
      this.bangumiDetail.bangumiHistoryData.forEach(e => {
        for (let index = 0; index < keys.length; index++) {
          let key = keys[index][0];
          if (e[key] > 0)
            datus[index][0].push([
              this.$timeFormat(e.datetime, "YYYY-MM-DD HH:mm:ss"),
              e[key]
            ]);
        }
      });
      return datus;
    },
    totalOptions() {
      return getMultiChartOptions(this.datus);
    },
    rateOptions() {
      let data = this.datus.map(e => {
        e[0] = interpolation(e[0], 7);
        return e;
      });
      return getMultiChartOptions(data, "area");
    }
  },
  mounted() {
    this.bangumiDetail = this.$db.bangumi.detail[
      Number(this.$route.params.sid)
    ];
    if (
      this.bangumiDetail == undefined ||
      this.bangumiDetail.bangumiHistoryData == undefined
    ) {
      this.axios
        .get(`/damn-you/bangumi/detail?sid=${this.$route.params.sid}`)
        .then(res => {
          this.$db.bangumi.detail[Number(this.$route.params.sid)] = res.data;
          this.bangumiDetail = res.data;
        });
    }
  }
};
</script>

<style></style>
