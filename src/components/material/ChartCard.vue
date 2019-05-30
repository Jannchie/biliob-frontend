<template>
  <MaterialCard>
    <VResponsive
      slot="header"
      :aspect-ratio="16/9"
    >
      <Chart
        theme="card"
        :auto-resize="true"
        :options="options"
        style="width:100%; max-height:200px"
      />
    </VResponsive>
    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </MaterialCard>
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
