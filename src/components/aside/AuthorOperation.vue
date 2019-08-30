<template>
  <BiliobCard light :title="title" border="bottom">
    <VRow dense style="height: 100%;align-content: center;">
      <VCol lg="3" md="3" sm="6" align="center">
        <BiliobOperationBtn
          :disabled="forceFocus"
          color="red"
          :pic="pic"
          :name="name"
          icon="mdi-eye"
          :tile-title="'强行观测'"
          tile-sub-title="需要消耗积分：200"
          :request-url="`/user/author/${mid}/status?forceFocus=true`"
        >
          <VCardText slot="card-text">
            强行观测需要<span class="font-weight-black red--text"
              >消耗200积分</span
            >。
            <br />
            打破取消爬取机制，保持数据每日更新。
            <br />
            目前强行观测后只有管理员能取消操作。
          </VCardText>
        </BiliobOperationBtn>
      </VCol>

      <VCol lg="3" md="3" sm="6">
        <VBtn
          color="primary"
          :href="
            `https://connect.qq.com/widget/shareqq/index.html?url=https://www.biliob.com${
              this.$route.path
            }&sharesource=qzone&title=biliob观测者:${name}的历史数据&pics=https:${pic}&summary=快来围观这个UP主的数据变化吧~&desc=这个UP主牛逼坏了`
          "
          outlined
          style="border-width:1px"
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
      <VCol lg="3" md="3" sm="6">
        <VBtn
          color="pink lighten-3"
          tile
          outlined
          style="border-width:1px"
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
      <VCol lg="3" md="3" sm="6" align="center">
        <BiliobOperationBtn
          :pic="pic"
          :name="title"
          color="green"
          icon="mdi-refresh"
          tile-title="刷新数据"
          tile-sub-title="需要消耗积分：5"
          :request-url="`/user/author/${mid}/data`"
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
    forceFocus: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.v-btn {
  color: #ffffff;
}
</style>
