<template>
    <VBottomNav :color="transparent" :active.sync="bottomNav" shift app :value="bottomNavShow" class="hidden-lg-and-up">
      <VBtn color="red" flat value="video" @click.stop="toVideo">
        <span>视频追踪</span>
        <VIcon>mdi-video</VIcon>
      </VBtn>
      <VBtn color="indigo" flat value="up" @click.stop="toAuthor">
        <span>UP主追踪</span>
        <VIcon>mdi-account-search</VIcon>
      </VBtn>
      <VBtn color="teal" flat value="rank" @click.stop="toRank">
        <span>排行榜</span>
        <VIcon>mdi-chart-bar</VIcon>
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
