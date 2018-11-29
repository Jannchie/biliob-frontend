<template>
  <nav>
    <VToolbar class="toolbar">
      <VToolbarSideIcon
        @click.stop="drawer = !drawer;"
      ></VToolbarSideIcon>
      <VToolbarTitle>BiliOB观测者</VToolbarTitle>
      <VToolbarItems class="hidden-md-and-down">
        <VBtn flat @click.stop="toVideo">视频追踪</VBtn>
        <VBtn flat @click.stop="toAuthor">UP主追踪</VBtn>
      </VToolbarItems>
      <VSpacer></VSpacer>
      <VToolbarItems class="hidden-md-and-down">
        <VBtn flat href="/">登陆之类的</VBtn>
      </VToolbarItems>
    </VToolbar>
    <VBottomNav
      app
      :active.sync="bottomNav"
      :value="true"
      color="rgba(255, 255, 255)"
      class="hidden-lg-and-up"
    >
      <VBtn color="teal" flat value="video" @click.stop="toVideo">
        <span>视频追踪</span>
        <VIcon>mdi-video</VIcon>
      </VBtn>
      <VBtn color="teal" flat value="up" @click.stop="toAuthor">
        <span>UP主追踪</span>
        <VIcon>mdi-account-search</VIcon>
      </VBtn>
    </VBottomNav>
    <VNavigationDrawer v-model="drawer" absolute temporary>
      <VList>
        <VListTile v-if="logined" style="background-color:#FFFFFF">
          <VListTileAvatar>
            <VIcon>mdi-account</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{ name }}</VListTileTitle>
            <VListTileSubTitle>{{ role }}</VListTileSubTitle>
          </VListTileContent>
          <VListTileAction>
            <VBtn icon ripple>
              <VIcon color="grey lighten-1">mdi-settings</VIcon>
            </VBtn>
          </VListTileAction>
        </VListTile>

        <VListTile v-if="!logined" ripple @click.stop="toLogin">
          <VListTileAvatar> <VIcon>mdi-login</VIcon> </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>登录</VListTileTitle>
            <VListTileSubTitle>或者注册？</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>

      <VList v-if="logined">
        <VDivider></VDivider>
        <VListTile ripple @click.stop="toFavoriteAuthor">
          <VListTileAvatar> <VIcon>mdi-face</VIcon> </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>我的关注</VListTileTitle>
            <VListTileSubTitle>查看我关注的UP主</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VDivider></VDivider>
        <VListTile ripple @click.stop="toFavoriteVideo">
          <VListTileAvatar> <VIcon>mdi-star</VIcon> </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>我的收藏</VListTileTitle>
            <VListTileSubTitle>查看我关注的视频</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VDivider></VDivider>
      </VList>

      <VList>
        <VDivider></VDivider>
        <VListTile ripple to="/faq">
          <VListTileAvatar>
            <VIcon>mdi-alpha-f-box</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>FA♂Q</VListTileTitle>
            <VListTileSubTitle>聊聊想让你知道的事</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VDivider></VDivider>

        <VListTile ripple to="/about">
          <VListTileAvatar>
            <VIcon>mdi-alpha-a-box</VIcon>
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>关于</VListTileTitle>
            <VListTileSubTitle>一些你不感兴趣的事</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile ripple @click.stop="toLog">
          <VListTileAvatar>
            <VIcon>mdi-alpha-l-box</VIcon>
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>开发日志</VListTileTitle>
            <VListTileSubTitle>快来看看全新的功能</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VDivider></VDivider>
      </VList>
    </VNavigationDrawer>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      bottomNav: null,
      drawer: null,
      name: "",
      role: ""
    };
  },
  computed: {
    logined: {
      // getter
      get: function() {
        return this.$store.getters.getLoginState;
      },
      // setter
      set: function() {
        this.$store.commit("logout");
      }
    }
  },
  watch: {
    logined: function() {
      this.axios
        .get(`/user`)
        .then(response => {
          this.$store.commit("login");
          this.name = response.data.name;
          this.role = response.data.role;
        })
        .catch(() => {
          this.$store.commit("logout");
        });
    }
  },
  mounted() {
    this.axios
      .get(`/user`)
      .then(response => {
        this.logined = true;
        this.$store.commit("login");
        this.name = response.data.name;
        this.role = response.data.role;
      })
      .catch(() => {
        this.$store.commit("logout");
        this.logined = false;
      });
  },
  methods: {
    toVideo() {
      this.$router.push("/video");
    },
    toAuthor() {
      this.$router.push("/author");
    },
    toLogin() {
      this.$router.push("/login");
    },
    toFavoriteVideo() {
      this.$router.push("/user/video");
    },
    toFavoriteAuthor() {
      this.$router.push("/user/author");
    },
    toLog() {
      this.$router.push("/log");
    }
  }
};
</script>
