<template>
  <span style="display:flex;font-size:8px">
    <div
      :class="deepColor"
      style="border-radius:3px 0 0 3px;padding:1px 5px;color:#fff"
    >
      {{ name }}
    </div>
    <div :class="lightColor" style="border-radius:0 3px 3px 0;padding:1px 5px;">
      {{ exp }}
    </div>
  </span>
</template>
<script>
export default {
  props: {
    exp: Number()
  },
  computed: {
    color() {
      let v = this.exp;
      if (v < 100) {
        return "green";
      } else if (v < 200) {
        return "teal";
      } else if (v < 1280) {
        return "primary";
      } else if (v < 2560) {
        return "deep-orange";
      } else if (v < 5120) {
        return "pink";
      } else {
        return "red";
      }
    },
    name() {
      let v = this.exp;
      if (v < 100) {
        return "寻踪觅迹的初心者";
      } else if (v < 200) {
        return "沉浮信海的彷徨者";
      } else if (v < 1280) {
        return "本心不渝的追寻者";
      } else if (v < 2560) {
        return "洞悉法度的观想者";
      } else if (v < 5120) {
        return "与天同行的观测者";
      } else {
        return "观测站的管理者";
      }
    },
    deepColor() {
      return this.color + " darken-1";
    },
    lightColor() {
      return this.color + " lighten-4 " + this.color + "--text";
    }
  }
};
</script>
