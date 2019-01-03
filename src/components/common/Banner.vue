<template>
<div :class="backgroundStyle">
  <img height="188px"/>
</div>
</template>
<script>
export default {
  name: "Banner",
  data() {
    return { backgroundStyle: String() };
  },
  computed: {
    isDark() {
      return this.$store.state.dark;
    }
  },
  watch: {
    isDark(isDark) {
      if (isDark) {
        this.backgroundStyle = "banner-dark hidden-md-and-down";
      } else {
        this.backgroundStyle = "banner hidden-md-and-down";
      }
    }
  }
};
</script>

<style>
.banner {
  position: relative;
  left: 0px;
  top: 0px;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/banner.png");
  background-position: center;
}
.banner-dark {
  position: relative;
  left: 0px;
  top: 0px;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/banner-dark.png");
  background-position: center;
}
</style>
