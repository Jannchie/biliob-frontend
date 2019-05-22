<template>
  <VToolbar
    color="grey lighten-3"
    flat
    absolute
    app
    prominent
  >
    <VToolbarTitle>
      {{title}}
    </VToolbarTitle>
  </VToolbar>
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
