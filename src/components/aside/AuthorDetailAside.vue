<template>
  <div>
    <slot name="author-operation"></slot>
    <slot name="author-to-space"></slot>
    <slot name="author-latest-video"></slot>
    <slot name="author-video"></slot>
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
