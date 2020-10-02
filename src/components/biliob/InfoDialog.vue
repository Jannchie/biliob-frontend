<template>
  <VDialog
    persistent
    :value="show"
    width="500"
  >
    <VCard>
      <VCardTitle>
        <VCard
          dark
          color="warning"
          class="info-offset"
        >
          <VIcon
            size="24px"
            class="ma-4"
          >
            mdi-power
          </VIcon>服务器临时维护中
        </VCard>
      </VCardTitle>
      <VCardText>
        为了提供更好的服务，
        <br>
        服务器正在升级。
        <br>
        请稍后进行访问。
        <br>
        你也可以通过邮件向我报告问题。
        <br>
        <address>
          邮箱地址：jannchie@gmail.com
        </address>
        <br>
        <VDivider />
        <br>
        很抱歉对您造成了不便。
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
    // this.axios.get(`/site/alert`).then(() => {
    //   //   this.$store.commit("error");
    // });
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
