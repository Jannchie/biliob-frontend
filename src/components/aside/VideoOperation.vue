<template>
  <BiliobCard border="bottom">
    <BiliobOperationBtn
      :pic="pic"
      :name="title"
      color="green"
      icon="mdi-refresh"
      tile-title="立即刷新视频数据"
      tile-sub-title="需要消耗积分：1"
      :request-url="`/user/video/${aid}/data`"
    >
      <VCardText slot="card-text">
        立即刷新视频数据<span class="font-weight-black green--text"
          >消耗1积分</span
        >。
        <br />
        立即刷新需要数秒至数分钟的操作时间
        <br />
        请稍后刷新页面获取最新的数据！
      </VCardText>
    </BiliobOperationBtn>
    <BiliobOperationBtn
      :pic="pic"
      :name="title"
      color="red"
      icon="mdi-message-bulleted"
      tile-title="更新视频弹幕统计"
      tile-sub-title="需要消耗积分：10"
      :request-url="`/user/video/${aid}/danmaku`"
    >
      <VCardText slot="card-text">
        更新视频弹幕统计<span class="font-weight-black red--text"
          >消耗10积分</span
        >。
        <br />
        能够根据关键词生成词云。
        <br />
        能够分析弹幕密度。
      </VCardText>
    </BiliobOperationBtn>
    <VBtn
      class="ma-2"
      color="blue"
      block
      outlined
      tile
      :href="
        `https://connect.qq.com/widget/shareqq/index.html?url=www.biliob.com${
          $route.path
        }&sharesource=qzone&title=biliob观测者:视频《${title}》的历史数据&pics=https:${pic}&summary=快来围观这个视频的数据变化吧~&desc=`
      "
    >
      <VIcon left>
        mdi-qqchat
      </VIcon>
      通过QQ分享该页面</VBtn
    >
    <VBtn
      class="ma-2"
      color="pink"
      block
      outlined
      tile
      :href="`https://www.bilibili.com/av${aid}`"
    >
      <VIcon left>
        mdi-play-box-outline
      </VIcon>
      前往视频播放页面</VBtn
    >
  </BiliobCard>
</template>
<script>
export default {
  props: {
    aid: Number(),
    pic: String(),
    title: String()
  }
};
</script>

<style scoped>
.v-btn {
  color: #ffffff;
}
</style>
