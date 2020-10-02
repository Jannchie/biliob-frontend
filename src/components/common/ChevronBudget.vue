<template>
  <span class="caption font-weight-bold grey--text">
    <VIcon
      :class="color"
      small
    >{{ icon }}</VIcon><span :class="color">{{ displayValue }}</span>
  </span>
</template>
<script>
export default {
  props: {
    value: Number()
  },
  computed: {
    icon() {
      if (this.value > 0) {
        return "mdi-chevron-down";
      } else if (this.value < 0) {
        return "mdi-chevron-up";
      } else {
        return "mdi-minus";
      }
    },
    displayValue() {
      return Math.abs(this.value);
    },
    color() {
      if (this.value > 0) {
        return "green--text";
      } else if (this.value < 0) {
        return "red--text";
      } else {
        return "grey--text";
      }
    }
  }
};
</script>

<style scoped></style>
