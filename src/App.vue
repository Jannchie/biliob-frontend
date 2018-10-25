<template>
  <div id="app">
    <v-app>
      <nav-bar></nav-bar>
      <Banner></Banner>
      <Container />
    </v-app>
  </div>

</template>

<script>
import NavBar from './components/common/NavBar.vue'
import Container from './components/common/Container.vue'
import Banner from './components/common/Banner.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Container,
    Banner
  }
}

</script>

<style>
  .el-table td {
    padding: 2px 0
  }
</style>
