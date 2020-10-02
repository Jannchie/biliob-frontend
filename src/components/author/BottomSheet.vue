<template>
  <VBottomSheet v-model="sheet">
    <VBtn
      slot="activator"
      color="pink lighten-2"
      class=""
      text
      block
      dark
    >
      <VIcon style="margin-right:20px">
        mdi-infinity
      </VIcon>更多操作
    </VBtn>

    <VList two-line>
      <VSubheader>更多操作</VSubheader>
      <VListItem
        :href="url"
        target="_blank"
        class="pink--text lighten-2 text--lighten-2"
        @click="sheet = false"
      >
        <VListItemAvatar>
          <VAvatar size="32px">
            <VIcon class="pink white--text lighten-2 text--lighten-2">
              mdi-home
            </VIcon>
          </VAvatar>
        </VListItemAvatar>
        <VListItemTitle>前往UP主的个人空间</VListItemTitle>
      </VListItem>
      <VListItem
        :href="
          `https://connect.qq.com/widget/shareqq/index.html?url=https://www.biliob.com${this.$route.path}&sharesource=qzone&title=biliob观测者:${name}的历史数据&pics=https:${pic}&summary=快来围观这个UP主的数据变化吧~&desc=这个UP主牛逼坏了`
        "
        target="_blank"
        class="light-primary--text lighten-2 text--lighten-2"
        @click="sheet = false"
      >
        <VListItemAvatar>
          <VAvatar size="32px">
            <VIcon class="light-blue white--text lighten-2 text--lighten-2">
              mdi-qqchat
            </VIcon>
          </VAvatar>
        </VListItemAvatar>
        <VListItemContent>
          <VListItemTitle>分享到QQ群或QQ好友</VListItemTitle>
          <VListItemSubtitle>建议使用电脑端操作</VListItemSubtitle>
        </VListItemContent>
      </VListItem>

      <BottomSheetTile
        color="primary"
        :pic="pic"
        :name="name"
        icon="mdi-refresh"
        tile-title="立即刷新作者数据"
        tile-sub-title="需要消耗积分：5"
        :request-url="`/user/author/${mid}/data`"
      >
        <VCardText slot="card-text">
          立即刷新需要<span class="font-weight-black red--text">消耗5积分</span>。
          <br>
          立即刷新需要数秒至数分钟的操作时间
          <br>
          请稍后刷新页面获取最新的数据！
        </VCardText>
      </BottomSheetTile>

      <BottomSheetTile
        v-if="!forceFocus"
        color="red"
        :pic="pic"
        :name="name"
        icon="mdi-eye"
        tile-title="强行观测该作者"
        tile-sub-title="需要消耗积分：200"
        :request-url="`/user/author/${mid}/status?forceFocus=true`"
      >
        <VCardText slot="card-text">
          强行观测需要<span class="font-weight-black red--text">消耗200积分</span>。
          <br>
          打破取消爬取机制，保持数据每日更新。
          <br>
          目前强行观测后只有管理员能取消操作。
        </VCardText>
      </BottomSheetTile>
    </VList>
  </VBottomSheet>
</template>
<script>
import BottomSheetTile from "../common/BottomSheetTile.vue";
export default {
  components: { BottomSheetTile },
  props: {
    mid: Number(),
    pic: String(),
    name: String(),
    forceFocus: Boolean()
  },
  data: () => ({
    sheet: false,
    dialog: false,
    alertType: "error",
    alertMsg: String(),
    showAlert: false
  }),
  computed: {
    url: function () {
      return `https://space.bilibili.com/${this.mid}`;
    }
  },

  methods: {
    toAuthorSpace() {
      this.sheet = false;
    }
  }
};
</script>
<style scoped>
.dialog-card {
  width: 500px;
}
.v-dialog__container {
  width: 100%;
}
.v-alert {
  margin: 0px;
  position: absolute;
  width: 100%;
}
</style>
