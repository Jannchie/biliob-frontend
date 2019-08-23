<template>
  <span :class="`badget white--text caption ${roleBadgetColor}`">
    <VIcon small>mdi-account</VIcon> {{ role }}
  </span>
</template>
<script>
export default {
  props: {
    role: String()
  },
  computed: {
    roleBadgetColor() {
      if (this.role == "普通用户") {
        return "green";
      } else if (this.role == "管理员") {
        return "red";
      } else {
        return "primary";
      }
    }
  }
};
</script>

<style scoped>
.badget {
  padding: 1px 6px 1px 6px;
  margin-left: 10px;
  border-radius: 10px;
}
</style>
