<template>
  <div>
    <slot name="author-info"></slot>
    <slot name="other-video"></slot>
    <slot name="recommand"></slot>
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
