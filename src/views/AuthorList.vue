<template>
 <MainLayout>
   <AuthorListMain slot="main-cards"></AuthorListMain>
   <AuthorListAside slot="aside-cards"></AuthorListAside>
 </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import AuthorListMain from "../components/main/AuthorList.vue";
import AuthorListAside from "../components/aside/AuthorListAside.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    AuthorListMain,
    AuthorListAside
  },
  mounted() {
    this.$store.commit("toAuthor");
  }
};
</script>
