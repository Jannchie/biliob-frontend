<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <BiliobVersusCard></BiliobVersusCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobSiteChart
          :options="siteInfo"
          title="B站全站信息"
        ></BiliobSiteChart>
      </VCol>
    </VRow>
  </VContainer>
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
