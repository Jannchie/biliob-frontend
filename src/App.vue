<template>
  <VApp id="app" :dark="dark">
    <RouterView key="main" />
  </VApp>
</template>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "欢迎来到BiliOB观测者。在这里可以查询到UP主的排名等信息，我们将为您持续观测B站UP主和其作品的数据变化，并对视频各个指标的情报进行分析。"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: this.$baseKeywords
        }
      ]
    };
  },
  computed: {
    dark() {
      return this.$store.state.dark;
    }
  },
  mounted() {
    this.$store.dispatch("login");
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";
.theme--light.v-application {
  background-color: #f8f8f8;
}
.v-application {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}

.container {
  padding: 8px;
}
</style>
