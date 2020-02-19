<template>
  <div :dark="dark">
    <div
      :class="
        `elevation-${elevation} ${light ? 'light' : 'dark'}-info ${border}`
      "
    >
      <slot v-if="title == ''"></slot>
      <div v-else class="px-5 py-2">{{ title }}</div>
    </div>
    <slot name="body" style="background-color:white"></slot>
  </div>
</template>
<script>
export default {
  props: {
    light: {
      default: false,
      type: Boolean
    },
    border: {
      default: "",
      type: String
    },
    title: {
      default: "",
      type: String
    },
    dark: {
      default: true,
      type: Boolean
    },
    elevation: {
      default: 0,
      type: [Number, String]
    }
  }
};
</script>
