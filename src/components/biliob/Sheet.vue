<template>
  <div>
    <BiliobDarkInfo
      v-if="!$slots.header"
      :elevation="0"
      :class="`subtitle `"
      border="top"
    >
      {{ title }}
    </BiliobDarkInfo>
    <slot
      v-if="$slots.header"
      style="padding:0px"
      name="header"
    />
    <VSheet :class="`${px} body-2`">
      <slot />
    </VSheet>
  </div>
</template>
<script>
export default {
  props: {
    title: { default: "标题载入中..", type: String },
    px: { default: "0", type: String },
    padding: { default: "px-5", type: String }
  },
  data() {
    return {};
  }
};
</script>
