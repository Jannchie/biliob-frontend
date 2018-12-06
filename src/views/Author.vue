<template>
  <MainLayout>
    <AuthorMain slot="main-cards">
        <AuthorDetailChannel slot="channel" :channels="authorData.channels"></AuthorDetailChannel>
        <AuthorDetailFansChart slot="fans" :author-data="authorData"></AuthorDetailFansChart>
        <AuthorDetailFansRateChart slot="fans-rate" :author-data="authorData"></AuthorDetailFansRateChart>
    </AuthorMain>
    <AuthorAside slot="aside-cards">
      <AuthorOperation slot="author-operation" :author-data="authorData"></AuthorOperation>
    </AuthorAside>
  </MainLayout>
</template>

<script>
import AuthorMain from "../components/main/AuthorMain.vue";
import AuthorDetailFansChart from "../components/main/AuthorDetailFansChart.vue";
import AuthorDetailFansRateChart from "../components/main/AuthorDetailFansRateChart.vue";
import MainLayout from "../components/common/MainLayout.vue";
import AuthorAside from "../components/aside/AuthorDetailAside.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
import AuthorDetailChannel from "../components/main/AuthorDetailChannel.vue";
export default {
  name: "AuthorList",
  components: {
    AuthorMain,
    MainLayout,
    AuthorAside,
    AuthorDetailFansChart,
    AuthorDetailFansRateChart,
    AuthorOperation,
    AuthorDetailChannel
  },
  data() {
    return {
      authorData: Object()
    };
  },
  mounted() {
    this.$store.commit("toAuthor");
    this.axios.get("/author/" + this.$route.params.mid).then(response => {
      this.authorData = response.data;
    });
  }
};
</script>
