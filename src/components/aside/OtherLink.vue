<template>
  <BiliobCard title="更多链接" class="body-1">
    <a target="_blank" href="https://github.com/Jannchie">
      <VIcon style="vertical-align: middle;margin-right:5px">
        mdi-github-face </VIcon
      ><span :class="`grey--text text--${brightness}-3`">Jannchie</span>
    </a>
    <br />
    <VIcon style="vertical-align: middle;margin-right:5px"> mdi-gmail </VIcon
    ><span :class="`grey--text text--${brightness}-3`">
      jannchie@gmail.com </span
    ><br />
    <span>
      <a
        target="_blank"
        href="https://jq.qq.com/?_wv=1027&k=593vDCo"
        :class="`grey--text text--${brightness}-3`"
      >
        <VIcon style="vertical-align: middle;margin-right:5px">
          mdi-qqchat </VIcon
        >Chie的魔法后花园
      </a>
    </span>
    <br />
    <a
      target="_blank"
      href="https://space.bilibili.com/1850091"
      :class="`grey--text text--${brightness}-3`"
    >
      <VIcon style="vertical-align: middle;margin-right:5px">
        mdi-link-variant </VIcon
      >Jannchie见齐的B站个人空间
    </a>
    <br />
    <a
      target="_blank"
      href="https://jannchie.github.io/"
      :class="`grey--text text--${brightness}-3`"
    >
      <VIcon style="vertical-align: middle;margin-right:5px">
        mdi-link-variant </VIcon
      >Jannchie's Tech Blog </a
    ><br />

    <span>
      <a
        target="_blank"
        href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=z82eczgc"
        :class="`grey--text text--${brightness}-3`"
      >
        <VIcon style="vertical-align: middle;margin-right:5px">
          mdi-weather-cloudy </VIcon
        >服务器提供商 阿里云 </a
      ><br />
    </span>
    <span>
      <a
        target="_blank"
        href="https://cloud.tencent.com/redirect.php?redirect=1005&cps_key=7db3d9f0ef080a24be84d44938108742&from=console"
        :class="`grey--text text--${brightness}-3`"
      >
        <VIcon style="vertical-align: middle;margin-right:5px">
          mdi-weather-cloudy </VIcon
        >服务器提供商 腾讯云 </a
      ><br />
    </span>
    <span>
      <a
        href="https://www.vultr.com/?ref=7540103"
        target="_blank"
        :class="`grey--text text--${brightness}-3`"
      >
        <VIcon style="vertical-align: middle;margin-right:5px">
          mdi-weather-cloudy </VIcon
        >服务器提供商 Vultr </a
      ><br />
    </span>
    <span>
      <a
        target="_blank"
        href="http://www.i-mp.cn/"
        :class="`grey--text text--${brightness}-3`"
      >
        <VIcon style="vertical-align: middle;margin-right:5px">
          mdi-language-python-text </VIcon
        >激情赞助 蔚文印刷
      </a>
      <br />
      <a
        target="_blank"
        href="https://www.kanbilibili.com/"
        :class="`grey--text text--${brightness}-3`"
      >
        <VIcon style="vertical-align: middle;margin-right:5px">
          mdi-language-python-text </VIcon
        >数据合作 Kanbilibili
      </a>
      <br />
    </span>
    <br />
    <VDivider />
    <br />
    <span :class="`grey--text text--${brightness}-3`">
      互联网ICP备案：浙ICP备17035172号-2
    </span>
    <br />
    <!-- <span @click.stop="toTracer">后台管理系统</span> -->
    <br />
  </BiliobCard>
</template>
<script>
export default {
  computed: {
    brightness() {
      if (this.$store.state.dark) {
        return "lighten";
      } else {
        return "darken";
      }
    }
  },
  methods: {
    toTracer() {
      this.$router.push(`/admin/tracer`);
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
span {
  text-decoration: none;
}
a:hover {
  color: #222;
  text-align: center;
  text-justify: auto;
}
.box {
  vertical-align: middle;
  margin-right: 5px;
}
</style>
