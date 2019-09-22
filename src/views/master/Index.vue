<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VSlideYTransition>
          <BiliobVersusCard></BiliobVersusCard>
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <VSlideYTransition>
          <BiliobEventSlideCard
            v-if="this.$store.state.event.recentEvent != undefined"
          >
          </BiliobEventSlideCard>
        </VSlideYTransition>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <VSlideYTransition>
          <BiliobSiteChart
            v-if="this.$store.state.site.siteInfo != undefined"
            :options="siteInfo"
            title="B站全站信息"
          ></BiliobSiteChart>
        </VSlideYTransition>
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
    if (this.$store.state.event.recentEvent == undefined) {
      this.$store.dispatch("getRecentEvent");
    }
    if (this.$store.state.site.siteGroupInfo == undefined) {
      this.$store.dispatch("getSiteGroupInfo");
    }
  }
};
</script>
