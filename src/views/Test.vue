<template>
  <div>
    <li>
      {{userAgent}}
    </li>
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
    console.log(this.userAgent);
    this.appName = navigator.appName;
    this.appCodeName = navigator.appCodeName;
    this.platform = navigator.platform;
  }
};
</script>
