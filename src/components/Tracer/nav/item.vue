<template>
  <VListItem
    class="mx-3"
    text
    large
    block
    @click.stop="to(path)"
  >
    <VListItemAvatar class="my-0">
      <VIcon>{{ icon }}</VIcon>
    </VListItemAvatar>
    <VListItemContent>
      <VListItemTitle class="white--text">
        {{ name }}
      </VListItemTitle>
    </VListItemContent>
  </VListItem>
</template>
<script>
export default {
  props: { name: String(), icon: String(), path: String() },
  methods: {
    to(path) {
      let basePath =
        (this.path == "user" || this.path == "upload") &&
        this.$store.state.role !== "管理员"
          ? "/tracer/no-role"
          : `/tracer/${path}`;
      if (this.$route.path == basePath) {
        return;
      }
      this.$router.push(basePath);
    }
  }
};
</script>
