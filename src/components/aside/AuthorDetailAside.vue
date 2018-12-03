<template>
  <div>
    <slot v-if="logined" name="author-operation"></slot>
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
