<template>
  <div>
    <VContainer>
      <VLayout>
        <VRow>
          <VCol cols="12" lg="6">
            <AdminGraphCard
              color="primary"
              :options="$store.getters.authorQueueOptions"
              title="UP主爬虫队列长度"
              sub-title="待爬取的UP主数"
            >
            </AdminGraphCard>
          </VCol>
          <VCol cols="12" lg="6">
            <AdminGraphCard
              color="primary"
              :options="$store.getters.videoQueueOptions"
              title="视频爬虫队列长度"
              sub-title="待爬取的视频数"
            >
            </AdminGraphCard>
          </VCol>
        </VRow>
      </VLayout>
    </VContainer>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("getHistoryQueueData");
  }
};
</script>
