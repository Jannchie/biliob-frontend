<template>
  <BiliobCard :title="title" border="bottom">
    <VBtn class="ma-2" color="green" block outlined tile>
      <VIcon left>
        mdi-refresh
      </VIcon>
      立即刷新作者数据</VBtn
    >
    <VBtn class="ma-2" color="blue" block outlined tile>
      <VIcon left>
        mdi-qqchat
      </VIcon>
      通过QQ分享该页面</VBtn
    >
  </BiliobCard>
</template>
<script>
export default {
  props: {
    mid: Number(),
    pic: String(),
    name: String(),
    title: String(),
    forceFocus: Boolean()
  }
};
</script>

<style scoped>
.v-btn {
  color: #ffffff;
}
</style>
