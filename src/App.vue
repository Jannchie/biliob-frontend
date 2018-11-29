<template>
  <div id="app">
    <VApp>
      <NavBar></NavBar>
      <Banner></Banner>
      <FloatDialog></FloatDialog>
      <Container />
    </VApp>
  </div>
</template>

<script>
import NavBar from "./components/common/NavBar.vue";
import Container from "./components/common/Container.vue";
import Banner from "./components/common/Banner.vue";
import FloatDialog from "./components/common/FloatDialog.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Container,
    Banner,
    FloatDialog
  }
};
</script>

<style>
.el-table td {
  padding: 2px 0;
}
</style>
