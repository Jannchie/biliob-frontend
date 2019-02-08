<template>
  <div>
    <slot name="author-operation" />
    <slot name="video-to-bilibili" />
    <slot name="other-video" />
    <slot name="recommand" />
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.aside-card {
  margin-bottom: 5px;
}
</style>
