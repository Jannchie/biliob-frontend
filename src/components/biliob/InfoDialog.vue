<template>
  <VDialog persistent :value="show" width="500">
    <VCard>
      <VCardTitle>
        <VCard dark color="red" class="info-offset">
          <VIcon size="24px" class="ma-4">mdi-skull-crossbones</VIcon
          >服务器出现异常
        </VCard>
      </VCardTitle>
      <VCardText>
        如果你看到这段文字，说明出现了两种情况。
        <li>网站炸了</li>
        <li>网站正在维护中</li>
        由于这是一个个人维护的项目，修复问题需要一定的时间成本。
        <br />
        我很有可能已经发现了问题所在，并已在着手修复。
        <br />
        但以防我真的没有发现出现问题，可以通过邮件向我报告问题。
        <address>
          邮箱地址：jannchie@gmail.com
        </address>
      </VCardText>
      <!-- <VCardActions>
        <VBtn @click.stop="show = false"> CLOSE </VBtn>
      </VCardActions> -->
    </VCard>
  </VDialog>
</template>
<script>
export default {
  computed: {
    show() {
      if (this.$store.getters.isError) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.axios.get(`/site/alert`).then(() => {
      //   this.$store.commit("error");
    });
  }
};
</script>
<style scoped>
.info-offset {
  background: linear-gradient(60deg, #00000011, #ffffff44);
  width: 100%;
  z-index: 3;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.05),
    0px 12px 17px 2px rgba(0, 0, 0, 0.05), 0px 5px 22px 4px rgba(0, 0, 0, 0.05);
}
</style>
