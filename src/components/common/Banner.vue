<template>
  <VCard style="margin-bottom:20px">
    <div :class="backgroundStyle">
      <img height="188px">
    </div>
  </VCard>
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
  },
  mounted() {
    if (this.$store.state.dark) {
      this.backgroundStyle = "banner-dark hidden-md-and-down";
    } else {
      this.backgroundStyle = "banner hidden-md-and-down";
    }
  }
};
</script>

<style>
.banner {
  left: 0px;
  top: 0px;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/banner.png");
  background-position: center;
}
.banner-dark {
  left: 0px;
  top: 0px;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/banner-dark.png");
  background-position: center;
}
@-webkit-keyframes scrollGood {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-320px);
  }
}
@-moz-keyframes scrollGood {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-320px);
  }
}
@keyframes scrollGood {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-320px);
  }
}
</style>
