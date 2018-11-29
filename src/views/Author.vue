<template>
  <MainLayout>
    <DetailMain slot="main-cards">
      <AuthorDetail slot="detail"></AuthorDetail>
    </DetailMain>
    <AuthorAside slot="aside-cards"></AuthorAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import DetailMain from "../components/DetailMain.vue";
import AuthorAside from "../components/aside/AuthorDetailAside.vue";
import AuthorDetail from "../components/main/AuthorDetail.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    DetailMain,
    AuthorAside,
    AuthorDetail
  },
  mounted() {
    this.$store.commit("toAuthor");
  }
};
</script>
