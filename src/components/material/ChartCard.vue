<template>
  <BiliobCard>
    <Chart
      slot="header"
      theme="card"
      :autoresize="true"
      :options="options"
      style="width:100%; max-height:200px"
    />
    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </BiliobCard>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
