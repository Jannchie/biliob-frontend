<template>
  <FavoriteVideoListMain slot="main-cards" />
</template>

<script>
import FavoriteVideoListMain from "@/components/main/FavoriteVideoList.vue";
export default {
  name: "VideoList",
  components: { FavoriteVideoListMain },
  mounted() {
    this.$store.commit("toVideo");
  }
};
</script>
