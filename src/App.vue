<template>
  <div id="app">
    <Nav></Nav>
    <Banner></Banner>
    <Container/>
  </div>

</template>

<script>

import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue'
import Container from './components/Container.vue'
import Banner from './components/Banner.vue'

export default {
  name: 'app',
  components: {
    HelloWorld, Nav, Container, Banner
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
