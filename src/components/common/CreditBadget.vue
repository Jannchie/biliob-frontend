<template>
  <span style="display:flex;font-size:8px">
    <div
      :class="deepColor"
      style="border-radius:3px 0 0 3px;padding:1px 5px;color:#fff"
    >
      积分
    </div>
    <div :class="lightColor" style="border-radius:0 3px 3px 0;padding:1px 5px;">
      {{ credit }}
    </div>
  </span>
</template>
<script>
export default {
  props: {
    credit: Number()
  },
  computed: {
    color() {
      let v = this.credit;
      if (v < 50) {
        return "blue-grey";
      } else if (v < 100) {
        return "green";
      } else if (v < 200) {
        return "primary";
      } else if (v < 300) {
        return "indigo";
      } else if (v < 500) {
        return "purple";
      } else if (v < 1000) {
        return "pink";
      } else {
        return "red";
      }
    },
    deepColor() {
      return this.color + " darken-2";
    },
    lightColor() {
      return this.color + " lighten-4 " + this.color + "--text";
    }
  }
};
</script>
