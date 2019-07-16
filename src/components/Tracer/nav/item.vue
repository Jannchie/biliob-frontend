<template>
  <div class="mx-3">
    <VBtn flat large block @click.stop="to(path)">
      <VListTileAvatar>
        <VIcon left>{{ icon }}</VIcon>
      </VListTileAvatar>
      <VListTileContent>
        {{ name }}
      </VListTileContent>
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
      this.$router.push(basePath);
    }
  }
};
</script>
