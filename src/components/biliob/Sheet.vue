<template>
  <div>
    <BiliobDarkInfo
      v-if="!$slots.header"
      :elevation="0"
      class="subtitle"
      border="top"
      >{{ title }}</BiliobDarkInfo
    >
    <slot v-if="$slots.header" style="padding:0px" name="header" />
    <VSheet class="px-5 body-2 elevation-3">
      <slot></slot>
    </VSheet>
  </div>
</template>
<script>
export default {
  props: {
    title: { default: "标题载入中..", type: String }
  },
  data() {
    return {};
  }
};
</script>
