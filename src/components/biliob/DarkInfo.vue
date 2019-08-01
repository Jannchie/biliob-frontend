<template>
  <div>
    <div :class="`dark-info ${border}`">
      <slot v-if="title == ''"></slot>
      <div v-else class="px-5 py-2">{{ title }}</div>
    </div>
    <slot name="body" style="background-color:white"></slot>
  </div>
</template>
<script>
export default {
  props: {
    border: {
      default: "",
      type: String
    },
    title: {
      default: "",
      type: String
    }
  }
};
</script>
