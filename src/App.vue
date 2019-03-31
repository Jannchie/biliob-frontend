<template>
  <div id="app">
    <VApp :dark="dark">
      <FirstLoadDialog />
      <BottomNav />
      <FloatDialog />
      <NavBar />
      <Banner />
      <Container />
      <BiliobFooter />
    </VApp>
  </div>
</template>

<script>
import FirstLoadDialog from "./components/common/FirstLoadDialog.vue";
import BiliobFooter from "./components/common/BiliobFooter.vue";
import BottomNav from "./components/common/BottomNav.vue";
import NavBar from "./components/common/NavBar.vue";
import Container from "./components/common/Container.vue";
import Banner from "./components/common/Banner.vue";
import FloatDialog from "./components/common/FloatDialog.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FirstLoadDialog,
    Container,
    Banner,
    FloatDialog,
    BiliobFooter,
    BottomNav
  },
  computed: {
    dark() {
      return this.$store.state.dark;
    }
  }
};
</script>

<style>
.el-table td {
  padding: 2px 0;
}
#app {
  overflow-x: hidden;
}
</style>
