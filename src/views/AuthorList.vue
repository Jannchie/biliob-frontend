<template>
  <MainLayout>
    <AuthorListMain slot="main-cards"></AuthorListMain>
    <AuthorListAside slot="aside-cards">
      <OtherLink slot="link"></OtherLink>
    </AuthorListAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import AuthorListMain from "../components/main/AuthorList.vue";
import AuthorListAside from "../components/aside/AuthorListAside.vue";
import OtherLink from "../components/aside/OtherLink.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    AuthorListMain,
    AuthorListAside,
    OtherLink
  },
  mounted() {
    this.$store.commit("toAuthor");
  }
};
</script>
