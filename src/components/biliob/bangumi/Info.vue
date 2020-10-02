<template>
  <VCard
    @click="
      $router.push({
        path: `/bangumi/${bangumiInfo.sid}`,
        props: bangumiInfo
      })
    "
  >
    <VImg
      class="white--text align-end"
      height="200px"
      :src="bangumiInfo.cover"
    >
      <VCardTitle style="background: linear-gradient(0deg, #222F, #2220)">
        <h3>
          {{ bangumiInfo.name }}
        </h3>
        <br>
        <div class="caption">
          {{ bangumiInfo.foreignName }}
        </div>
      </VCardTitle>
    </VImg>

    <VCardText class="caption">
      <BiliobBangumiType :type="bangumiInfo.type" />
      <BiliobBangumiCopyright
        :copyright="bangumiInfo.copyright"
        :charge="bangumiInfo.charge"
      />
      <VChip
        style="vertical-align: unset"
        color="primary"
        class="px-1 mr-2"
        label
        outlined
        x-small
      >
        {{ bangumiInfo.area }}
      </VChip>
      <BiliobBangumiStatus
        :state="bangumiInfo.state"
        :finished="bangumiInfo.finished"
        :serializing="bangumiInfo.serializing"
      />
      <VCardText
        v-if="bangumiInfo.score"
        style="position: absolute;left: 0"
        class="text-center"
      >
        <VRow no-gutters>
          <VSpacer />
          <VCol cols="auto">
            <h3 :class="`display-1 ${scoreColor} font-weight-black`">
              {{ bangumiInfo.score.toFixed(1) }}
            </h3>
            <div class="caption">
              {{ $numberFormat(bangumiInfo.scoreCount) }}人评分
            </div>
          </VCol>
        </VRow>
      </VCardText>
      <div>发布时间: {{ formatDate(bangumiInfo.pubDate) }}</div>

      <div>
        数据更新:
        {{ $timeFormat(bangumiInfo.updateTime, "YYYY-MM-DD HH:mm:ss") }}
      </div>
    </VCardText>
    <VCardText>
      <VRow class="caption">
        <VCol
          cols="auto"
        >
          <VIcon x-small>
            mdi-play-circle
          </VIcon>
          <span style="vertical-align: middle">
            {{ $numberFormat(bangumiInfo.cView) }}
          </span>
        </VCol>
        <VCol cols="auto">
          <VIcon x-small>
            mdi-coin
          </VIcon>
          <span style="vertical-align: middle">
            {{ $numberFormat(bangumiInfo.cCoin) }}
          </span>
        </VCol>
        <VCol cols="auto">
          <VIcon x-small>
            mdi-heart
          </VIcon>
          <span style="vertical-align: middle">
            {{
              $numberFormat(
                bangumiInfo.oldFollow > bangumiInfo.newFollow
                  ? bangumiInfo.oldFollow
                  : bangumiInfo.newFollow
              )
            }}
          </span>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
export default {
  props: {
    bangumiInfo: Object()
  },
  computed: {
    scoreColor() {
      if (this.bangumiInfo.score > 9) {
        return "red--text";
      } else if (this.bangumiInfo.score > 8) {
        return "red--text text--lighten-2";
      } else if (this.bangumiInfo.score > 7) {
        return "yellow--text ";
      } else if (this.bangumiInfo.score > 4) {
        return "green--text";
      } else {
        return "green--text";
      }
    }
  },
  methods: {
    formatDate(date) {
      return this.$timeFormat(date, "YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style></style>
