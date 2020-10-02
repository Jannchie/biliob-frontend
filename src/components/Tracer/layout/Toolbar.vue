<template>
  <VAppBar
    dark
    absolute
    app
    prominent
  >
    <VToolbarTitle> {{ title }}</VToolbarTitle>
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
