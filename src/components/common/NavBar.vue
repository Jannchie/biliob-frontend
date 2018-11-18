<template>
  <nav>
    <v-toolbar class="toolbar">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>BiliOB观测者</v-toolbar-title>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn flat @click.stop="toVideo">视频追踪</v-btn>
        <v-btn flat @click.stop="toAuthor">UP主追踪</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn flat href="#/">登陆之类的</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-bottom-nav app :active.sync="bottomNav" :value="true" color="rgba(255, 255, 255)" class="hidden-lg-and-up">
      <v-btn color="teal" flat value="video" @click.stop="toVideo">
        <span>视频追踪</span>
        <v-icon>mdi-video</v-icon>
      </v-btn>
      <v-btn color="teal" flat value="up" @click.stop="toAuthor">
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
            <v-list-tile-title>{{name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{role}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">mdi-settings</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile ripple @click.stop="toLogin" v-if="!logined">
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
        <v-list-tile ripple @click.stop="toFavoriteAuthor">
          <v-list-tile-avatar>
            <v-icon>mdi-face</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>我的关注</v-list-tile-title>
            <v-list-tile-sub-title>查看我关注的UP主</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile ripple @click.stop="toFavoriteVideo">
          <v-list-tile-avatar>
            <v-icon>mdi-star</v-icon>
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
        <v-list-tile ripple to="/faq">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-f-box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>FA♂Q</v-list-tile-title>
            <v-list-tile-sub-title>聊聊想让你知道的事</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile ripple to="/about">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-a-box</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>关于</v-list-tile-title>
            <v-list-tile-sub-title>一些你不感兴趣的事</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile ripple  @click.stop="toLog">
          <v-list-tile-avatar>
            <v-icon>mdi-alpha-l-box</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>开发日志</v-list-tile-title>
            <v-list-tile-sub-title>快来看看全新的功能</v-list-tile-sub-title>
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
      name: '',
      role: ''
    }
  },
  mounted () {
    this.axios.get(`/user`).then((response) => {
      this.logined = true
      this.$store.commit('login')
      this.name = response.data.name
      this.role = response.data.role
    }).catch(e => {
      this.$store.commit('logout')
      this.logined = false
    })
  },
  watch: {
    logined: function () {
      this.axios.get(`/user`).then((response) => {
        this.$store.commit('login')
        this.name = response.data.name
        this.role = response.data.role
      }).catch(e => {
        this.$store.commit('logout')
      })
    }
  },
  computed: {
    logined: {
      // getter
      get: function () {
        return this.$store.getters.getLoginState
      },
      // setter
      set: function (newValue) {
        this.$store.commit('logout')
      }
    }
  },
  methods: {
    toVideo () {
      this.$store.commit('toVideo')
      this.$router.push('/video')
    },
    toAuthor () {
      this.$store.commit('toAuthor')
      this.$router.push('/author')
    },
    toLogin () {
      this.$store.commit('toLogin')
      this.$router.push('/login')
    },
    toFavoriteVideo () {
      this.$store.commit('toFavoriteVideo')
      this.$router.push('/user/video')
    },
    toFavoriteAuthor () {
      this.$store.commit('toFavoriteAuthor')
      this.$router.push('/user/author')
    },
    toLog () {
      this.$store.commit('toLog')
      this.$router.push('/log')
    }
  }
}

</script>
<style>

</style>
