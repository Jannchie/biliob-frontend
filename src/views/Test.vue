<template>
  <div>
    <li>
      {{userAgent}}
    </li>
    <li>
      {{appName}}
    </li>
    <li>
      {{appCodeName}}
    </li>
    <li>
      {{platform}}
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
    this.appName = navigator.appName;
    this.appCodeName = navigator.appCodeName;
    this.platform = navigator.platform;
  }
};
</script>
