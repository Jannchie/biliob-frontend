<template>
  <div id="app">
    <VApp :dark="dark">
      <BottomNav />
      <NavBar @darkMode="darkMode"></NavBar>
      <Banner></Banner>
      <FloatDialog></FloatDialog>
      <Container/>
      <BiliobFooter />
    </VApp>
  </div>
</template>

<script>
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
    Container,
    Banner,
    FloatDialog,
    BiliobFooter,
    BottomNav
  },
  data() {
    return {
      dark: false
    };
  },
  methods: {
    darkMode() {
      this.dark = !this.dark;
    }
  }
};
</script>

<style>
.el-table td {
  padding: 2px 0;
}
</style>
