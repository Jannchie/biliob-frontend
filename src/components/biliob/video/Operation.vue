<template>
  <BiliobCard
    light
    border="bottom"
  >
    <VRow dense>
      <VCol
        cols="6"
        lg="3"
      >
        <BiliobOperationBtn
          disabled
          :pic="pic"
          :name="title"
          color="green"
          icon="mdi-refresh"
          tile-title="刷新数据"
          tile-sub-title="需要消耗积分：1"
          :request-url="`/user/video/BV${$route.params.aid}/data`"
        >
          <VCardText
            slot="card-text"
            class="mt-2"
          >
            立即刷新视频数据<span
              class="font-weight-black green--text"
            >消耗1积分</span>。
            <br>
            立即刷新需要数秒至数分钟的操作时间
            <br>
            请稍后刷新页面获取最新的数据！
          </VCardText>
        </BiliobOperationBtn>
      </VCol>
      <VCol
        cols="6"
        lg="3"
      >
        <BiliobOperationBtn
          disabled
          :pic="pic"
          :name="title"
          color="red"
          icon="mdi-message-bulleted"
          tile-title="更新弹幕"
          tile-sub-title="需要消耗积分：10"
          :request-url="`/user/video/${$route.params.aid}/danmaku`"
        >
          <VCardText
            slot="card-text"
            class="mt-2"
          >
            更新视频弹幕统计<span
              class="font-weight-black red--text"
            >消耗10积分</span>。
            <br>
            能够根据关键词生成词云。
            <br>
            能够分析弹幕密度。
          </VCardText>
        </BiliobOperationBtn>
      </VCol>
      <VCol
        cols="6"
        lg="3"
      >
        <VBtn
          color="primary"
          block
          outlined
          style="border-width:1px"
          large
          tile
          :href="
            `https://connect.qq.com/widget/shareqq/index.html?url=www.biliob.com${$route.path}&sharesource=qzone&title=biliob观测者:视频《${title}》的历史数据&pics=https:${pic}&summary=快来围观这个视频的数据变化吧~&desc=`
          "
        >
          <VIcon left>
            mdi-qqchat
          </VIcon>
          QQ分享
        </VBtn>
      </VCol>
      <VCol
        cols="6"
        lg="3"
      >
        <VBtn
          color="pink"
          large
          block
          outlined
          style="border-width:1px"
          tile
          :href="`https://www.bilibili.com/av${$route.params.aid}`"
        >
          <VIcon left>
            mdi-play-box-outline
          </VIcon>
          前往播放页
        </VBtn>
      </VCol>
    </VRow>
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
