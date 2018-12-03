<template>
  <MainLayout>
    <DetailMain slot="main-cards">
      <AuthorDetail slot="detail"></AuthorDetail>
    </DetailMain>
    <AuthorAside slot="aside-cards">
      <AuthorOperation slot="author-operation"></AuthorOperation>
    </AuthorAside>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import DetailMain from "../components/DetailMain.vue";
import AuthorAside from "../components/aside/AuthorDetailAside.vue";
import AuthorDetail from "../components/main/AuthorDetail.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
export default {
  name: "AuthorList",
  components: {
    MainLayout,
    DetailMain,
    AuthorAside,
    AuthorDetail,
    AuthorOperation
  },
  mounted() {
    this.$store.commit("toAuthor");
  }
};
</script>
