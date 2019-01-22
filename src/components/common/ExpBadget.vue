<template>
  <span style="display:flex;font-size:8px">
    <div
      :class="deepColor"
      style="border-radius:3px 0 0 5px;padding:1px 5px;color:#fff"
    >
      {{ name }}
    </div>
    <div
      :class="lightColor "
      style="border-radius:0 5px 5px 0;padding:1px 5px;"
    >
      {{exp}}
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
      if (v < 50) {
        return "green";
      } else if (v < 100) {
        return "teal";
      } else if (v < 150) {
        return "teal";
      } else if (v < 300) {
        return "blue";
      } else if (v < 500) {
        return "blue";
      } else if (v < 1000) {
        return "deep-purple";
      } else {
        return "red";
      }
    },
    name() {
      let v = this.exp;
      if (v < 50) {
        return "初心観測者";
      } else if (v < 100) {
        return "见习観測者";
      } else if (v < 150) {
        return "孤独的観測者";
      } else if (v < 300) {
        return "孤独的観測者";
      } else if (v < 500) {
        return "孤独的観測者";
      } else if (v < 1000) {
        return "孤独的観測者";
      } else {
        return "与天同行的観測者";
      }
    },
    deepColor() {
      return this.color + " darken-1";
    },
    lightColor() {
      return this.color + " lighten-4 " + this.color + "--text text--darken-2";
    }
  }
};
</script>
