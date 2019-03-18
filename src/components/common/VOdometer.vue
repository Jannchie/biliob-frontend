<template>
  <span :class="className"></span>
</template>

<script>
var Odometer = require("odometer/odometer.min.js");
import "odometer/themes/odometer-theme-car.css";
import "odometer/themes/odometer-theme-default.css";
import "odometer/themes/odometer-theme-digital.css";
import "odometer/themes/odometer-theme-minimal.css";
import "odometer/themes/odometer-theme-plaza.css";
import "odometer/themes/odometer-theme-slot-machine.css";
import "odometer/themes/odometer-theme-train-station.css";
export default {
  name: "VOdometer",
  props: {
    value: { type: Number, default: () => 0 },
    theme: { type: String, default: () => "default" },
    format: { type: String, default: () => "(,ddd)" },
    duration: { type: Number, default: () => 5000 },
    className: { type: String, default: () => "odometer" },
    animation: { type: String, default: () => "" },
    formatFunction: { type: Function, default: val => val }
  },
  data: () => ({
    instance: null
  }),
  watch: {
    value: {
      handler(value) {
        if (this.instance && this.instance.update) {
          this.instance.update(value);
        }
      },
      deep: false
    }
  },
  mounted() {
    this.instance = new Odometer({
      el: this.$el,
      value: this.value,
      theme: this.theme,
      format: this.format,
      duration: this.duration,
      animation: this.animation
    });
    this.instance.render();
  }
};
</script>
