<template>
  <div :dark="dark">
    <div
      :class="
        `${color}--text elevation-${elevation} ${
          light ? 'light' : 'dark'
        }-info ${border}`
      "
    >
      <slot v-if="title == ''" />
      <div
        v-else
        class="px-5 py-2"
      >
        {{ title }}
      </div>
    </div>
    <slot name="body" />
  </div>
</template>
<script>
export default {
  props: {
    light: {
      default: false,
      type: Boolean
    },
    color: {
      default: "primary",
      type: String
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
<style lang="scss">
.dark-info {
  background-color: #333;
  font-weight: 400;
}

.light-info {
  font-weight: 400;
}

.dark-info.left {
  border-left: 2px solid;
}
.dark-info.right {
  border-right: 2px solid;
}
.dark-info.top {
  border-top: 2px solid;
}
.dark-info.bottom {
  border-bottom: 2px solid;
}
.light-info.left {
  border-left: 2px solid;
}
.light-info.right {
  border-right: 2px solid;
}
.light-info.top {
  border-top: 2px solid;
}
.light-info.bottom {
  border-bottom: 2px solid;
}
</style>
