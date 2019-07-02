<template>
  <div>
    <li>
      {{ userAgent }}
    </li>

    <MaterialStatsCard
      icon="mdi-store"
      title="Revenue"
      value="$34,245"
      sub-icon="mdi-calendar"
      sub-text="Last 24 Hours"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      userAgent: String(),
      appName: String(),
      appCodeName: String(),
      platform: String()
    };
  },
  mounted() {
    this.userAgent = navigator.userAgent;
    this.appName = navigator.appName;
    this.appCodeName = navigator.appCodeName;
    this.platform = navigator.platform;
    this.axios
      .get("https://api.bilibili.com/x/web-interface/view?aid=17486449")
      .then(r => {
        alert(r);
      });
  }
};
</script>
