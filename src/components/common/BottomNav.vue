<template>
  <VBottomNav
    :active.sync="bottomNav"
    shift
    app
    :value="bottomNavShow"
    class="hidden-lg-and-up"
  >
    <VBtn
      color="red"
      :ripple="false"
      flat
      value="video"
      @click.stop="toVideo"
    >
      <span>视频追踪</span>
      <VIcon>mdi-video-outline</VIcon>
    </VBtn>
    <VBtn
      color="indigo lighten-2"
      :ripple="false"
      flat
      value="up"
      @click.stop="toAuthor"
    >
      <span>UP主追踪</span>
      <VIcon>mdi-account-search-outline</VIcon>
    </VBtn>
    <VBtn
      color="teal"
      :ripple="false"
      flat
      value="rank"
      @click.stop="toRank"
    >
      <span>排行榜</span>
      <VIcon>mdi-chart-histogram</VIcon>
    </VBtn>
  </VBottomNav>
</template>
<script>
export default {
  data() {
    return {
      bottomNavShow: true,
      bottomNav: String()
    };
  },
  created() {
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    toVideo() {
      this.$router.push("/video");
    },
    toAuthor() {
      this.$router.push("/author");
    },
    toRank() {
      this.$router.push("/rank");
    },
    toEvent() {
      this.$router.push("/event");
    },
    onScroll() {
      if (this.offsetTop - window.pageYOffset < 0) {
        this.bottomNavShow = false;
      } else {
        this.bottomNavShow = true;
      }
      this.offsetTop = window.pageYOffset;
    }
  }
};
</script>
