<template>
  <VFooter height="82">
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links"
        >{{ link.name }}</a>
      </span>
    </div>
    <VSpacer />
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://www.github.com/jannchie"
        target="_blank"
      >Jannchie</a>, made with
      <VIcon
        color="tertiary"
        size="17"
      >mdi-heart</VIcon>
      for the Bilibili
    </span>
  </VFooter>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "监控系统", Link: "/tracer/dashboard" },
      { name: "作者B站个人空间", Link: "https://space.bilibili.com/1850091" },
      { name: "作者博客", Link: "http://jannchie.github.io" }
    ]
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
