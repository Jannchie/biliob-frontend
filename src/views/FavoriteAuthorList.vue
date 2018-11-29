<template>
 <MainLayout>
   <FavoriteAuthorListMain slot="main-cards"></FavoriteAuthorListMain>
   <AuthorListAside slot="aside-cards"></AuthorListAside>
 </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import FavoriteAuthorListMain from "../components/main/FavoriteAuthorList.vue";
import AuthorListAside from "../components/aside/AuthorListAside.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    FavoriteAuthorListMain,
    AuthorListAside
  },
  mounted() {
    this.$store.commit("toAuthor");
  }
};
</script>
