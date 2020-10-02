<template>
  <span :class="className" />
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
    theme: { type: String, default: () => "minimal" },
    format: { type: String, default: () => "(,ddd)" },
    duration: { type: Number, default: () => 500 },
    className: { type: String, default: () => "v-odometer" },
    animation: { type: String, default: () => "" },
    formatFunction: { type: Function, default: val => val }
  },
  data: () => ({
    instance: null,
    coldDown: false
  }),
  watch: {
    value: {
      handler(value) {
        if (this.instance && this.instance.update) {
          if (this.coldDown) {
            setTimeout(() => {
              this.instance.update(value);
            }, 1000);
          } else {
            setTimeout(() => {
              this.coldDown = false;
            }, 1000);
            this.coldDown = true;
            this.instance.update(value);
          }
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
<style>
.odometer.odometer-animating-up .odometer-ribbon-inner,
.odometer.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
  -webkit-transition-duration: 1s !important;
  -moz-transition-duration: 1s !important;
  -ms-transition-duration: 1s !important;
  -o-transition-duration: 1s !important;
  transition-duration: 1s !important;
}
</style>
