<template>
  <VCard :href="'https://www.bilibili.com/av'+ads.aid">
    <VResponsive>
      <VImg
        :src="ads.pic"
        aspect-ratio="2.75"
      />
    </VResponsive>
    <VCardText>
      <h3>
        {{ ads.title }}
      </h3>
      <div class="sub-text">
        <VIcon small>
          mdi-bookmark-outline
        </VIcon>{{ ads.channel }}<VIcon small>
          mdi-account-box-outline
        </VIcon>{{ ads.author }}
      </div>
    </VCardText>
    <VChip
      small
      color="#FF7FAC"
      class="ad-chip"
      dark
    >
      站长倾情推荐
    </VChip>
  </VCard>
</template>
<script>
export default {
  data() {
    return {
      ads: Object()
    };
  },
  mounted() {
    this.axios.get("/video/ads").then(response => {
      this.ads = response.data;
    });
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
