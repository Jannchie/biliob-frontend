<template>
  <div class="mx-3">
    <VBtn text large block @click.stop="to(path)">
      <VListItemAvatar class="my-0">
        <VIcon left>{{ icon }}</VIcon>
      </VListItemAvatar>
      <VListItemContent>
        {{ name }}
      </VListItemContent>
    </VBtn>
  </div>
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
