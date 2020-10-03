<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <VExpansionPanels tile>
          <VExpansionPanel>
            <VExpansionPanelHeader class="primary--text px-4">
              <h3>
                <VIcon
                  color="primary"
                  left
                >
                  mdi-chart-bell-curve
                </VIcon>见齐指数 / JANNCHIE IDX ver.0.0.1 beta
              </h3>
            </VExpansionPanelHeader>
            <VExpansionPanelContent class="px-1">
              <h4>见齐指数简介</h4>
              <div class="body-2">
                <li>
                  见齐指数是根据BiliOB观测者观测的视频数据统计出的B站关键词热度指数。
                </li>
                <li>
                  见齐指数使用了视频的播放、收藏、点赞、投币、分享、弹幕共六个指标进行计算。
                </li>
              </div>
            </VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>

    <VRow dense>
      <VCol cols="12">
        <VCard>
          <VCardTitle class="warning--text">
            <VIcon
              style="vertical-align: text-bottom;"
              color="warning"
              left
            >
              mdi-alert
            </VIcon>
            <h4>该系统当前为测试版本</h4>
          </VCardTitle>

          <VCardText class="body-2">
            因此该系统目前具备以下三个特点：
            <li>
              <b>缓慢</b> /
              由于计算见齐指数需要一个比较复杂的算法，且数据量庞大，生产服务器的性能已经一滴都不剩了，对于某些关键词的查询可能非常慢，耐心等待。
            </li>
            <li>
              <b>偏差</b> /
              见齐指数的算法目前仍然有待商榷和改进，当下数据集不够完整，因此得出的结果可能不具备参考或者学习交流使用的价值。
            </li>
            <li>
              <b>简陋</b> /
              并没有对比、聚类等其他更深层次的分析功能，这些将在后续版本添加。
            </li>
            以上。欢迎各位观测者测试该系统，并提出意见或建议。
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow
      align="center"
      dense
    >
      <VCol>
        <VTextField
          v-model="keyword"
          solo
          label="输入关键词开始探索"
          hide-details
          @keyup.enter="search"
        />
      </VCol>
      <VCol cols="auto">
        <VBtn
          color="primary"
          large
          @click="search"
        >
          <VIcon left>
            mdi-send
          </VIcon>
          搜索
        </VBtn>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <VSlideYTransition>
          <RouterView />
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol
        v-for="(eachTag, i) in index.recentlyRank"
        :key="i"
        cols="12"
        lg="3"
      >
        <BiliobCard :to="`/index/${eachTag.tag}`">
          <VCardTitle class="primary--text">
            <h4>{{ eachTag.tag }}</h4>
          </VCardTitle>
          <VCardText>
            <VRow no-gutters>
              <VCol style="text-align: end;">
                7日累计热度
                <h3>
                  <VIcon style="vertical-align: text-bottom;">
                    mdi-fire
                  </VIcon>
                  <span class="primary--text">
                    {{ $numberFormat(eachTag.jannchie) }}</span>
                </h3>
              </VCol>
            </VRow>
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
export default {
  data() {
    return {
      index: this.$db.index,
      keyword: "",
      recentlyRank: Array()
    };
  },
  mounted() {
    if (this.index.recentlyRank == undefined) {
      this.axios.get("/index/recently-rank").then((res) => {
        this.index.recentlyRank = res.data;
      });
    }
  },
  methods: {
    search() {
      this.$router.push(`/index/${this.keyword}`);
    }
  }
};
</script>

<style></style>
