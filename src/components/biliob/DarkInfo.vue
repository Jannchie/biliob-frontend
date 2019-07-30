<template>
  <div :class="`dark-info ${border}`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    border: {
      default: "",
      type: String
    }
  }
};
</script>
