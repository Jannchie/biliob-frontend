<template>
  <div>
    <NavBar />
    <Banner />
    <FloatDialog />
    <FirstLoadDialog />
    <BottomNav />
    <Container />
    <LayoutFooter />
  </div>
</template>

<script>
import FirstLoadDialog from "@/components/common/FirstLoadDialog.vue";
import BottomNav from "@/components/common/BottomNav.vue";
import NavBar from "@/components/common/NavBar.vue";
import Container from "@/components/common/Container.vue";
import Banner from "@/components/common/Banner.vue";
import FloatDialog from "@/components/common/FloatDialog.vue";

export default {
  name: "HomeSite",
  components: {
    NavBar,
    FirstLoadDialog,
    Container,
    Banner,
    FloatDialog,
    BottomNav
  },
  computed: {
    dark() {
      return this.$store.state.dark;
    }
  }
};
</script>

<style></style>
