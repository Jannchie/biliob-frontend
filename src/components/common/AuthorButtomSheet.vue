<template>
  <VBottomSheet v-model="sheet">

    <VBtn
      slot="activator"
      color="pink"
      flat
      block
      dark
    >
      <VIcon style="margin-right:20px">mdi-infinity</VIcon>更多操作
    </VBtn>

    <VList two-line>
      <VSubheader>操作</VSubheader>
      <VListTile
        :href="url"
        target="_blank"
        @click="sheet = false"
      >
        <VListTileAvatar>
          <VAvatar size="32px">
            <VIcon>mdi-home</VIcon>
          </VAvatar>
        </VListTileAvatar>
        <VListTileTitle>前往UP主的个人空间</VListTileTitle>
      </VListTile>
      <VDialog
        v-model="dialog"
        width="500px"
      >
        <VListTile
          slot="activator"
          style="width:100%"
          @click="dialog = true"
        >
          <VListTileAvatar>
            <VAvatar size="32px">
              <VIcon>mdi-refresh</VIcon>
            </VAvatar>
          </VListTileAvatar>
          <VListTileTitle>立即刷新作者数据</VListTileTitle>
          <VListTileSubTitle>需要消耗积分：5</VListTileSubTitle>
        </VListTile>
        <VCard>
          <VCardTitle
            class="headline grey lighten-2 font-weight-black"
            primary-title
          >
            是否要立即刷新作者信息？
          </VCardTitle>
          <VCardText>
            立即刷新需要消耗5积分
          </VCardText>
          <VDivider></VDivider>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn
              color="
            primary"
              flat
              @click="refresh"
            >
              确定
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VList>
  </VBottomSheet>
</template>
<script>
export default {
  props: {
    mid: Number()
  },
  data: () => ({
    sheet: false,
    dialog: false,
    tiles: [{ img: "google.png", title: "Google+" }]
  }),
  computed: {
    url: function() {
      return `https://space.bilibili.com/${this.mid}`;
    }
  },
  methods: {
    toAuthorSpace() {
      this.sheet = false;
    },
    refresh() {
      this.dialog = false;
      this.sheet = false;
      this.axios.put(`/user/author/${this.mid}/data`);
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
</style>
