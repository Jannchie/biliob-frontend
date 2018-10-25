<template>
      <nav>
    <v-toolbar dense>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>BiliOB观测者</v-toolbar-title>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn flat href="#/video">视频追踪</v-btn>
        <v-btn flat href="#/author">UP主追踪</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn flat href="#/">登陆之类的</v-btn>
      </v-toolbar-items>
    </v-toolbar>
      <v-bottom-nav  app :active.sync="bottomNav" :value="true" color="rgba(255, 255, 255)" class="hidden-lg-and-up">
        <v-btn color="teal" flat value="video"  href="#/video">
          <span>视频追踪</span>
          <v-icon>mdi-video</v-icon>
        </v-btn>
        <v-btn color="teal" flat value="up" href="#/author">
          <span>UP主追踪</span>
          <v-icon>mdi-account-search</v-icon>
        </v-btn>
      </v-bottom-nav>
      </nav>
</template>
<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      bottomNav: null
    }
  }
}
</script>
<style>

</style>
