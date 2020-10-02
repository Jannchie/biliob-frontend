<template>
  <VContainer>
    <VRow dense>
      <VCol
        cols="12"
        lg="4"
      >
        <AdminStatsCard
          :value="$store.getters.userCount"
          title="观测者总数"
          icon="mdi-telescope"
          sub-icon="mdi-calendar-blank"
          small-value="人"
          color="info"
          :sub-text="currentDate"
        />
      </VCol>
      <VCol
        cols="12"
        lg="4"
      >
        <AdminStatsCard
          :value="$store.getters.checkedInCount"
          title="8小时内签到用户数"
          icon="mdi-account-check"
          color="info"
          small-value="人"
          sub-icon="mdi-calendar-blank"
          :sub-text="currentDate"
        />
      </VCol>
      <VCol
        cols="12"
        lg="4"
      >
        <AdminStatsCard
          :value="$store.getters.recordCount"
          title="观测者有效操作数"
          icon="mdi-receipt"
          color="info"
          small-value="次"
          sub-icon="mdi-calendar-blank"
          :sub-text="currentDate"
        />
      </VCol>
    </VRow>
    <VRow dense>
      <VCol cols="12">
        <VRow dense>
          <VCol
            cols="12"
            lg="6"
          >
            <AdminGraphCard
              color="red"
              :options="$store.getters.authorVisitOptions"
              title="UP主数据查询次数"
              sub-title="网站使用情况图表"
            />
          </VCol>
          <VCol
            cols="12"
            lg="6"
          >
            <AdminGraphCard
              color="green"
              :options="$store.getters.videoVisitOptions"
              title="视频数据查询次数"
              sub-title="网站使用情况图表"
            />
          </VCol>
        </VRow>

        <VRow dense>
          <VCol
            cols="12"
            lg="6"
          >
            <AdminGraphCard
              color="primary"
              :options="$store.getters.authorQueueOptions"
              title="UP主爬虫队列长度"
              sub-title="爬虫状态图表"
            />
          </VCol>
          <VCol
            cols="12"
            lg="6"
          >
            <AdminGraphCard
              color="orange"
              :options="$store.getters.videoQueueOptions"
              title="视频爬虫队列长度"
              sub-title="爬虫状态图表"
            />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" />
    </VRow>
  </VContainer>
</template>
<script>
var format = require("date-fns/format");
export default {
  data() {
    return {
      currentDate: format(Date(), "YYYY-MM-DD HH:mm:ss")
    };
  },
  mounted() {
    this.$store.dispatch("getHistoryQueueData");
    this.$store.dispatch("getAuthorVisit");
    this.$store.dispatch("getVideoVisit");
    this.$store.dispatch("getDashBoardData");
  }
};
</script>
