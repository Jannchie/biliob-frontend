<template>
  <VLayout justify-center>
    <VFlex md12>
      <BiliobVersusCard></BiliobVersusCard>
      <BiliobChart :options="siteInfo" title="B站全站信息"></BiliobChart>
    </VFlex>
  </VLayout>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    siteInfo() {
      return this.$store.state.siteInfo;
    }
  },
  mounted() {
    this.$store.dispatch("getSiteInfo");
  }
};
</script>
