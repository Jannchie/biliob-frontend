.<template>
  <VBottomSheet v-model="sheet">
    <VBtn
      slot="activator"
      color="pink lighten-2"
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
            <VIcon
              class="pink white--text lighten-2 text--lighten-2"
            >
              mdi-video
            </VIcon>
          </VAvatar>
        </VListItemAvatar>
        <VListItemTitle>前往视频播放页面</VListItemTitle>
      </VListItem>

      <BottomSheetTile
        :pic="pic"
        :name="title"
        color="red"
        icon="mdi-message-bulleted"
        tile-title="更新视频弹幕统计"
        tile-sub-title="需要消耗积分：10"
        :request-url="`/user/video/${aid}/danmaku`"
      >
        <VCardText slot="card-text">
          更新视频弹幕统计<span
            class="font-weight-black red--text"
          >消耗10积分</span>。
          <br>
          能够根据关键词生成词云。
          <br>
          能够分析弹幕密度。
        </VCardText>
      </BottomSheetTile>

      <VDialog
        key="dialog"
        v-model="dialog"
        width="500px"
      >
        <VListItem
          slot="activator"
          style="width:100%"
          class="primary--text lighten-2 text--lighten-2"
          @click="dialog = true"
        >
          <VListItemAvatar>
            <VAvatar size="32px">
              <VIcon
                class="blue white--text lighten-2 text--lighten-2"
              >
                mdi-refresh
              </VIcon>
            </VAvatar>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle>立即刷新视频数据</VListItemTitle>
            <VListItemSubtitle>需要消耗积分：1</VListItemSubtitle>
          </VListItemContent>
        </VListItem>
        <VCard>
          <VAlert
            :value="showAlert"
            :type="alertType"
            transition="slide-y-transition"
          >
            {{ alertMsg }}
          </VAlert>
          <VCardTitle
            class="headline blue lighten-1 font-weight-black white--text"
            primary-title
          >
            立即刷新视频信息？
          </VCardTitle>
          <VCardText>
            立即刷新需要<span
              class="font-weight-black red--text"
            >消耗1积分</span>。
            <br>
            立即刷新需要数秒至数分钟的操作时间
            <br>
            请稍后刷新页面获取最新的数据！
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary"
              text
              outlined
              style="border-width:1px"
              :disabled="showAlert"
              @click="refresh"
            >
              LET's DO IT!
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>

      <VListItem
        :href="
          `https://connect.qq.com/widget/shareqq/index.html?url=www.biliob.com${$route.path}&sharesource=qzone&title=biliob观测者:视频《${title}》的历史数据&pics=https:${pic}&summary=快来围观这个视频的数据变化吧~&desc=`
        "
        target="_blank"
        class="light-primary--text lighten-2 text--lighten-2"
        @click="sheet = false"
      >
        <VListItemAvatar>
          <VAvatar size="32px">
            <VIcon
              class="light-blue white--text lighten-2 text--lighten-2"
            >
              mdi-qqchat
            </VIcon>
          </VAvatar>
        </VListItemAvatar>
        <VListItemContent>
          <VListItemTitle>分享到QQ群或QQ好友</VListItemTitle>
          <VListItemSubtitle>建议使用电脑端操作</VListItemSubtitle>
        </VListItemContent>
      </VListItem>
    </VList>
  </VBottomSheet>
</template>
<script>
import BottomSheetTile from "./BottomSheetTile.vue";
export default {
  components: { BottomSheetTile },
  props: {
    aid: Number(),
    pic: String(),
    title: String()
  },
  data: () => ({
    sheet: false,
    dialog: false,
    alertType: "error",
    alertMsg: String(),
    showAlert: false
  }),
  computed: {
    url: function() {
      return `https://www.bilibili.com/av${this.aid}`;
    }
  },
  methods: {
    toAuthorSpace() {
      this.sheet = false;
    },
    refresh() {
      this.axios
        .put(`/user/video/${this.aid}/data`)
        .then(response => {
          this.showAlert = true;
          this.alertType = "success";
          this.alertMsg = `操作成功！当前积分：${response.data.user.credit}，当前经验：${response.data.user.exp}`;
          this.$store.commit("setCredit", response.data.user.credit);
          this.$store.commit("setExp", response.data.user.exp);
          setTimeout(() => {
            this.sheet = false;
            this.dialog = false;
            this.showAlert = false;
          }, 2000);
        })
        .catch(() => {
          this.showAlert = true;
          this.alertType = "error";
          this.alertMsg = "请检查登录状态或积分余额！";
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
        });
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
