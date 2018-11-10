<template>
  <div id="app">
    <v-app>
      <nav-bar></nav-bar>
      <Banner></Banner>
      <float-dialog></float-dialog>
      <Container />
    </v-app>
  </div>

</template>

<script>
import NavBar from './components/common/NavBar.vue'
import Container from './components/common/Container.vue'
import Banner from './components/common/Banner.vue'
import FloatDialog from './components/common/FloatDialog.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Container,
    Banner,
    FloatDialog
  }
}

</script>

<style>
  .el-table td {
    padding: 2px 0
  }

</style>
