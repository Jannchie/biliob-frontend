<template>
  <VFooter height="82px">
    <div>
      <span v-for="link in links" :key="link.name" style="text-align:center">
        <a :href="link.Link" class="body-2 mr-2 tertiary--text footer-links">{{
          link.name
        }}</a>
      </span>
    </div>
    <VSpacer />
    <span class="body-2">
      &copy;
      {{ new Date().getFullYear() }}
      <a
        class="tertiary--text"
        href="https://www.github.com/jannchie"
        target="_blank"
        >Jannchie</a
      >, made with
      <VIcon color="tertiary" size="17">mdi-heart</VIcon>
      for BILIBILI
    </span>
  </VFooter>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "管理系统", Link: "/tracer/dashboard" },
      { name: "站长B站个人空间", Link: "https://space.bilibili.com/1850091" },
      { name: "站长博客", Link: "http://jannchie.github.io" }
    ]
  })
};
</script>

<style scoped>
#core-footer {
  z-index: 0;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
@media (max-width: 550px) {
  .footer-items,
  .copyright {
    width: unset;
    text-align: center;
  }
}
</style>
