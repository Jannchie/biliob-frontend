<template>
  <VDialog
    v-model="dialog"
    width="500px"
  >
    <VListItem
      slot="activator"
      style="width:100%"
      :class="color + '--text lighten-2 text--lighten-2'"
      @click="dialog = true"
    >
      <VListItemAvatar>
        <VAvatar size="32px">
          <VIcon :class="color + ' white--text lighten-2 text--lighten-2'">
            {{
              icon
            }}
          </VIcon>
        </VAvatar>
      </VListItemAvatar>
      <VListItemContent>
        <VListItemTitle>{{ tileTitle }}</VListItemTitle>
        <VListItemSubtitle>{{ tileSubTitle }}</VListItemSubtitle>
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
        :class="
          'headline ' + color + ' lighten-1 font-weight-black white--text'
        "
        primary-title
      >
        {{ tileTitle }}?
      </VCardTitle>
      <slot name="card-text" />
      <VDivider />
      <VCardActions :value="!showAlert">
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
</template>
<script>
export default {
  props: {
    color: String(),
    pic: String(),
    name: String(),
    requestUrl: String(),
    tileTitle: String(),
    tileSubTitle: String(),
    icon: String(),
    forceFocus: Boolean()
  },
  data: () => ({
    sheet: false,
    dialog: false,
    alertType: "error",
    alertMsg: String(),
    showAlert: false
  }),
  methods: {
    toAuthorSpace() {
      this.sheet = false;
    },
    refresh() {
      this.axios
        .put(this.requestUrl)
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
