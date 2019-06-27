<template>
  <VApp id="app" :dark="dark">
    <RouterView />
  </VApp>
</template>

<script>
export default {
  name: "App",
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

.el-table td {
  padding: 2px 0;
}
#app {
  overflow-x: hidden;
}
</style>
