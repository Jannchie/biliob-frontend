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
    },
    groupDataNow() {
      return this.$store.state.siteGroupInfo[0];
    },
    groupDataMonthAgo() {
      return this.$store.state.siteGroupInfo[1];
    },
    groupDataYearAgo() {
      return this.$store.state.siteGroupInfo[
        this.$store.state.siteGroupInfo.length - 1
      ];
    }
  },
  mounted() {
    this.$store.dispatch("getSiteInfo");
    this.$store.dispatch("getSiteGroupInfo");
  }
};
</script>
