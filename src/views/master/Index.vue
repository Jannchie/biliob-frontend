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
      if (this.$store.state.site.siteInfo == undefined) {
        return {};
      }
      return this.$store.state.site.siteInfo;
    }
  },
  mounted() {
    if (this.$store.state.site.siteInfo == undefined) {
      this.$store.dispatch("getSiteInfo");
    }
    if (this.$store.state.site.siteGroupInfo == undefined) {
      this.$store.dispatch("getSiteGroupInfo");
    }
  }
};
</script>
