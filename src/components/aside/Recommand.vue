<template>
  <BiliobCard
    :href="'https://www.bilibili.com/av' + ads.aid"
    title="站长倾情推荐"
  >
    <VResponsive>
      <VImg :src="ads.pic" aspect-ratio="2.75" />
    </VResponsive>
    <VCardText>
      <h4 class="font-weight-bold">
        {{ ads.title }}
      </h4>
      <div class="sub-text caption">
        <VIcon small> mdi-bookmark-outline </VIcon>{{ ads.channel
        }}<VIcon small> mdi-account-box-outline </VIcon>{{ ads.author }}
      </div>
    </VCardText>
  </BiliobCard>
</template>
<script>
export default {
  computed: {
    ads() {
      return this.$store.state.ad;
    }
  },
  mounted() {
    if (this.$store.state.ad == undefined) {
      this.$store.dispatch("getAd");
    }
  }
};
</script>
<style scoped>
.ad-chip {
  color: #ffffff;
  position: absolute;
  top: 5px;
}
</style>
