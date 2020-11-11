<template>
  <h6 :class="`caption pt-2 text--lighten-1 ${color}--text`">
    <span v-if="user.role.indexOf('研究员') != -1">
      {{ user.title }}
    </span>
    <span v-else>
      {{ user.role }}
    </span>
    (#{{ user.ban ? "-" : user.rank }}) / {{ user.nickName }}
  </h6>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    color() {
      switch (this.user.name) {
        case "cake":
          return "pink";
        default:
          break;
      }
      switch (this.user.role) {
        case "系统测试员":
          return "pink";
        case "见齐":
          return "pink";
      }
      switch (this.user.title) {
        case "管理者":
          return "red";
        case "观测者":
          return "orange";
        case "观想者":
          return "purple";
        case "追寻者":
          return "blue";
        case "彷徨者":
          return "green";
        case "初心者":
          return "grey";
        default:
          return "grey";
      }
    }
  }
};
</script>

<style></style>
