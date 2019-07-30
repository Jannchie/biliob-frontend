<template>
  <div>
    <BiliobDarkInfo
      v-if="!$slots.header"
      class="py-2 px-5 subtitle my-2"
      border="top"
      >{{ title }}</BiliobDarkInfo
    >
    <slot v-if="$slots.header" style="padding:0px" name="header" />
    <VSheet class="px-5 body-2">
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
