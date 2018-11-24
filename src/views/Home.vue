
<template>
<v-card>
  <v-card-text>

  <!-- <ChiefRecommend/>
  <Recommend/> -->
  <h3>
    这里是首页
  </h3>
  <h4>
    <br>本站并非官方站点，
    <br>本站不提供视频播放以及下载功能。
    <br>本站所有数据来自于B站公开的数据。
  </h4>
  <div>
    如你所见，现在首页上什么都没有。
    <br>
    但内部的一些功能已经实现了，比如视频和作者的观测。
    <br>
    同时网站还在搭建中，由于运维技术拙计，可能会不时进行停机调试，如果网站功能失效的话可以在B站私信我。
    <br>
    <a href="https://space.bilibili.com/1850091/#/">Jannchie的个人空间</a>
  </div>
  </v-card-text>
</v-card>
</template>
<script>
export default {
  components: {
  },
  mounted () {
    this.$store.commit('toElse')
  }
}
</script>
