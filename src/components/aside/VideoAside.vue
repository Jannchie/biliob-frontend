<template>
  <div>
    <slot name="author-operation" />
    <slot name="video-to-bilibili" />
    <slot name="other-video" />
    <slot name="recommand" />
    <slot name="other-link" />
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.aside-card {
}
</style>
