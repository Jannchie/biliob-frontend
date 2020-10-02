<template>
  <span display="flex">
    <span
      :class="`${leftColor} caption white--text darken-2`"
      style="padding:1px 5px;"
    >{{ leftText }}</span>
    <span
      :class="`${rightColor} caption white--text darken-2`"
      style="padding:1px 5px"
    >{{ rightText }}</span>
  </span>
</template>

<script>
export default {
  props: {
    leftText: String(),
    rightText: String(),
    leftColor: String(),
    rightColor: String()
  }
};
</script>
