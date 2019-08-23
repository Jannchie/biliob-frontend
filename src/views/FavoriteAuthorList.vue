<template>
  <FavoriteAuthorListMain slot="main-cards" />
</template>

<script>
import FavoriteAuthorListMain from "../components/main/FavoriteAuthorList.vue";
export default {
  name: "AuthorList",
  components: {
    FavoriteAuthorListMain
  },
  mounted() {
    this.$store.commit("toAuthor");
  }
};
</script>
