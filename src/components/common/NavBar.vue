<template>
  <nav>
    <v-toolbar class="toolbar">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
    <v-bottom-nav app :active.sync="bottomNav" :value="true" color="rgba(255, 255, 255)" class="hidden-lg-and-up">
      <v-btn color="teal" flat value="video" href="#/video">
        <span>视频追踪</span>
        <v-icon>mdi-video</v-icon>
      </v-btn>
      <v-btn color="teal" flat value="up" href="#/author">
        <span>UP主追踪</span>
        <v-icon>mdi-account-search</v-icon>
      </v-btn>
    </v-bottom-nav>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-tile style="background-color:#FFFFFF" v-if="logined">
          <v-list-tile-avatar>
            <v-icon>mdi-account</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>用户名</v-list-tile-title>
            <v-list-tile-sub-title>简介</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">mdi-settings</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile ripple to="/login" v-if="!logined">
          <v-list-tile-avatar>
            <v-icon>mdi-login</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>登录</v-list-tile-title>
            <v-list-tile-sub-title>或者注册？</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

      <v-list v-if="logined">
        <v-divider></v-divider>
          <v-list-tile ripple to="/faq">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-f-box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>我的关注</v-list-tile-title>
            <v-list-tile-sub-title>查看我关注的UP主</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
          <v-list-tile ripple to="/faq">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-a-box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>我的收藏</v-list-tile-title>
            <v-list-tile-sub-title>查看我关注的视频</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>

      <v-list>
        <v-divider></v-divider>
          <v-list-tile ripple to="/faq" v-if="!logined">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-f-box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>FA♂Q</v-list-tile-title>
            <v-list-tile-sub-title>聊聊想让你知道的事</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
          <v-list-tile ripple to="/faq" v-if="!logined">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-a-box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>关于</v-list-tile-title>
            <v-list-tile-sub-title>一些你不感兴趣的事</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      bottomNav: null,
      drawer: null,
      logined: false
    }
  }
}

</script>
<style>

</style>
