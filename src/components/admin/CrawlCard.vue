<template>
  <AdminProgressCard
    :value="value"
    :title="title"
    small-value="个"
    icon="mdi-account"
    sub-icon="mdi-check-circle"
    :sub-text="getStatus(value)"
    :sub-text-color="getColor(value)"
    :color="getColor(value)"
    indeterminate
  />
</template>
<script>
export default {
  props: { value: Number(), title: String() },
  methods: {
    getStatus(value) {
      if (value === "0" || value === 0 || value === "") {
        return "队列空闲中";
      } else {
        return "正在消化爬取队列";
      }
    },
    getColor(value) {
      if (value === "0" || value === 0 || value === "") {
        return "green";
      } else {
        return "orange";
      }
    }
  }
};
</script>
