<template>
  <VAppBar color="grey lighten-3" text absolute app prominent>
    <VAppBarTitle>
      {{ title }}
    </VAppBarTitle>
  </VAppBar>
</template>

<script>
export default {
  data() {
    return {
      title: String()
    };
  },
  watch: {
    $route(val) {
      this.title = val.name;
    }
  },
  mounted() {
    this.title = this.$route.name;
  }
};
</script>
