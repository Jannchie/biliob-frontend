<template>
  <div>
    <BiliobDarkInfo class="py-2 px-5 subtitle my-2" border="top">{{
      title
    }}</BiliobDarkInfo>
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
