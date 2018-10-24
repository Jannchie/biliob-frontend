<template>
  <div id="app">
    <Nav></Nav>
    <Banner></Banner>
    <Container/>
  </div>

</template>

<script>

import Nav from './components/Nav.vue'
import Container from './components/Container.vue'
import Banner from './components/Banner.vue'

export default {
  name: 'app',
  components: {
    Nav, Container, Banner
  }
}
</script>

<style>

.el-table td{padding: 2px 0}

</style>
