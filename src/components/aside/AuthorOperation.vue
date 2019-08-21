<template>
  <BiliobCard :title="title" border="bottom">
    <VRow style="height: 100%;align-content: center;">
      <VCol align="center">
        <BiliobOperationBtn
          :pic="pic"
          :name="title"
          color="green"
          icon="mdi-refresh"
          tile-title="刷新数据"
          tile-sub-title="需要消耗积分：5"
          :request-url="`/user/author/${mid}`"
        >
          <VCardText slot="card-text">
            立即刷新作者数据<span class="font-weight-black red--text"
              >消耗5积分</span
            >。
            <br />
            立即刷新需要数秒至数分钟的操作时间
            <br />
            请稍后刷新页面获取最新的数据！
          </VCardText>
        </BiliobOperationBtn>
      </VCol>
      <VCol>
        <VBtn
          color="blue"
          :href="
            `https://connect.qq.com/widget/shareqq/index.html?url=https://www.biliob.com${
              this.$route.path
            }&sharesource=qzone&title=biliob观测者:${name}的历史数据&pics=https:${pic}&summary=快来围观这个UP主的数据变化吧~&desc=这个UP主牛逼坏了`
          "
          outlined
          large
          block
          tile
        >
          <VIcon left>
            mdi-qqchat
          </VIcon>
          QQ分享</VBtn
        ></VCol
      >
      <VCol>
        <VBtn
          color="pink lighten-3"
          tile
          outlined
          large
          block
          :href="`https://space.bilibili.com/${mid}`"
        >
          <VIcon left>
            mdi-home
          </VIcon>
          UP主空间</VBtn
        ></VCol
      >
    </VRow>
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
