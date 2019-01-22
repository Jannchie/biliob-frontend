<template>
  <div>
    <VCard class="card">
      <VCardTitle class="title">
        数据说明
      </VCardTitle>
      <VCardText>
        这里存放着所有正在追踪或者是曾经追踪过的UP主。<br>
        目前的追踪机制：<br>
        抓取每日日榜的视频的作者。<br>
        统计频率为每日一次。<br>
      </VCardText>
    </VCard>
    <slot name="link" />
  </div>
</template>
<script>
export default {
  components: {}
};
</script>
<style scoped>
.v-card {
  margin-bottom: 5px;
}
</style>
