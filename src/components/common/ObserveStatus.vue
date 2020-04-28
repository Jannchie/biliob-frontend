<template>
  <span>
    <span :class="`${color}--text caption subtext`">
      <VIcon :color="color" small>
        {{ icon }}
      </VIcon>
      {{ text }}
    </span>
  </span>
</template>
<script>
export default {
  props: { object: Object() },
  data: function() {
    return {
      color: "",
      icon: "",
      text: ""
    };
  },
  mounted() {
    let interval = this.object.obInterval;
    if (interval != undefined) {
      if (interval < 3600) {
        this.text = `${this.$numberFormat(interval / 60)} Min`;
      } else {
        this.text = `${this.$numberFormat(interval / 3600)} Hour`;
      }
      if (interval < 3600) {
        this.color = "orange";
        this.icon = "mdi-eye-outline";
        this.icon = "mdi-eye";
      } else if (interval < 86400) {
        this.color = "purple";
        this.icon = "mdi-eye-outline";
      } else {
        this.color = "blue";
        this.icon = "mdi-eye-outline";
      }
    } else {
      if (this.object.forceFocus) {
        this.text = "强行观测";
        this.color = "orange";
        this.icon = "mdi-eye";
      } else if (this.object.focus) {
        this.text = "正在观测";
        this.color = "blue";
        this.icon = "mdi-eye-outline";
      } else {
        this.text = "观测离线";
        this.color = "red";
        this.icon = "mdi-eye-off-outline";
      }
    }
  }
};
</script>
