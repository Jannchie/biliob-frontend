<template>
  <div>
    <slot name="author-operation" />
    <slot name="author-to-space" />
    <slot name="author-latest-video" />
    <slot name="author-video" />
    <slot name="other-link" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return { logined: this.$store.getters.getLoginState };
  }
};
</script>
