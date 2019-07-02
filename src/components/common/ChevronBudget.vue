<template>
  <div class="caption font-weight-bold grey--text text--darken-2">
    <VIcon :class="color" small>{{ icon }}</VIcon
    ><span :class="color">{{ value }}</span>
  </div>
</template>
<script>
export default {
  props: {
    value: Number()
  },
  computed: {
    icon() {
      if (this.value > 0) {
        return "mdi-chevron-up";
      } else if (this.value < 0) {
        return "mdi-chevron-down";
      } else {
        return "mdi-minus";
      }
    },
    color() {
      if (this.value > 0) {
        return "red--text";
      } else if (this.value < 0) {
        return "green--text";
      } else {
        return "grey--text";
      }
    }
  }
};
</script>

<style scoped></style>
