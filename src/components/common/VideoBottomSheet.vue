.<template>
  <VBottomSheet v-model="sheet">

    <VBtn
      slot="activator"
      color="pink lighten-2"
      flat
      block
      dark
    >
      <VIcon style="margin-right:20px">mdi-infinity</VIcon>更多操作
    </VBtn>

    <VList two-line>
      <VSubheader>更多操作</VSubheader>
      <VListTile
        :href="url"
        target="_blank"
        class="pink--text lighten-2 text--lighten-2"
        @click="sheet = false"
      >
        <VListTileAvatar>
          <VAvatar size="32px">
            <VIcon class="pink white--text lighten-2 text--lighten-2">mdi-video</VIcon>
          </VAvatar>
        </VListTileAvatar>
        <VListTileTitle>前往视频播放页面</VListTileTitle>
      </VListTile>
      <VDialog
        key="dialog"
        v-model="dialog"
        width="500px"
      >
        <VListTile
          slot="activator"
          style="width:100%"
          class="blue--text lighten-2 text--lighten-2"
          @click="dialog = true"
        >
          <VListTileAvatar>
            <VAvatar size="32px">
              <VIcon class="blue white--text lighten-2 text--lighten-2">mdi-refresh</VIcon>
            </VAvatar>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>立即刷新视频数据</VListTileTitle>
            <VListTileSubTitle>需要消耗积分：1</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
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
            立即刷新需要<span class="font-weight-black red--text">消耗1积分</span>。
            <br>
            立即刷新需要数秒至数分钟的操作时间
            <br>
            请稍后刷新页面获取最新的数据！
          </VCardText>
          <VDivider></VDivider>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn
              color="primary"
              flat
              outline
              :disabled="showAlert"
              @click="refresh"
            >
              LET's DO IT!
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
      <VListTile
        :href="`https://connect.qq.com/widget/shareqq/index.html?url=www.biliob.com${this.$route.path}&sharesource=qzone&title=biliob观测者:视频《${this.title}》的历史数据&pics=https:${this.pic}&summary=快来围观这个视频的数据变化吧~&desc=`"
        target="_blank"
        class="light-blue--text lighten-2 text--lighten-2"
        @click="sheet = false"
      >
        <VListTileAvatar>
          <VAvatar size="32px">
            <VIcon class="light-blue white--text lighten-2 text--lighten-2">mdi-qqchat</VIcon>
          </VAvatar>
        </VListTileAvatar>
        <VListTileContent>
          <VListTileTitle>分享到QQ群或QQ好友</VListTileTitle>
          <VListTileSubTitle>建议使用电脑端操作</VListTileSubTitle>
        </VListTileContent>
      </VListTile>
    </VList>
  </VBottomSheet>
</template>
<script>
export default {
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
          this.alertMsg = `操作成功！当前积分：${
            response.data.data.credit
          }(-1)，当前经验：${response.data.data.exp}(+1)`;
          this.$store.commit("setCredit", response.data.data.credit);
          this.$store.commit("setExp", response.data.data.exp);
          setTimeout(() => {
            this.sheet = false;
            this.dialog = false;
            this.showAlert = false;
          }, 2000);
        })
        .catch(e => {
          console.log(e);
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
