<template>
  <nav >
    <VToolbar class="toolbar" dense>
      <VToolbarSideIcon class="toolbar-item" dark @click.stop="drawer = !drawer"></VToolbarSideIcon>
      <VBtn class="toolbar-item" flat dark @click.stop="toHomepage">
        <VToolbarTitle class="toolbar-title"><img class="logo" src="../../../public/img/icons/android-chrome-192x192.png"> BiliOB观测者</VToolbarTitle>
      </VBtn>
      <VToolbarItems class="hidden-md-and-down">
        <VBtn class="toolbar-item" flat dark @click.stop="toVideo">视频追踪</VBtn>
        <VBtn class="toolbar-item" flat dark @click.stop="toAuthor">UP主追踪</VBtn>
      </VToolbarItems>
    </VToolbar>

    <VNavigationDrawer v-model="drawer" absolute temporary>
      <VList>
        <VListTile v-if="logined" style="background-color:#FFFFFF">
          <VListTileAvatar>
            <VIcon>mdi-account</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{name}}</VListTileTitle>
            <VListTileSubTitle>{{role}}</VListTileSubTitle>
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
            <VIcon>mdi-help-circle-outline</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>FA♂Q</VListTileTitle>
            <VListTileSubTitle>施工中</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile ripple to="/about">
          <VListTileAvatar>
            <VIcon>mdi-information-outline</VIcon>
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>关于</VListTileTitle>
            <VListTileSubTitle>施工中</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile ripple @click.stop="toLog">
          <VListTileAvatar>
            <VIcon>mdi-developer-board</VIcon>
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>开发日志</VListTileTitle>
            <VListTileSubTitle>快来看看全新的功能</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VDivider></VDivider>
      </VList>
    </VNavigationDrawer>
        <VBottomNav app :active.sync="bottomNav"  :value="bottomNavShow" class="hidden-lg-and-up">
      <VBtn color="teal" flat value="video" @click.stop="toVideo">
        <span>视频追踪</span>
        <VIcon>mdi-video</VIcon>
      </VBtn>
      <VBtn color="teal" flat value="up" @click.stop="toAuthor">
        <span>UP主追踪</span>
        <VIcon>mdi-account-search</VIcon>
      </VBtn>
    </VBottomNav>
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
      role: "",
      bottomNavShow: true,
      offsetTop: 0
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
          this.$store.commit("setFavoriteVideo", response.data.favoriteAid);
          this.$store.commit("setFavoriteAuthor", response.data.favoriteMid);
        })
        .catch(() => {
          this.$store.commit("logout");
        });
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll, true);
  },
  mounted() {
    this.axios
      .get(`/user`)
      .then(response => {
        this.logined = true;
        this.$store.commit("login");
        this.name = response.data.name;
        this.role = response.data.role;
        this.$store.commit("setFavoriteVideo", response.data.favoriteAid);
        this.$store.commit("setFavoriteAuthor", response.data.favoriteMid);
      })
      .catch(error => {
        console.log(error);
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
    },
    toHomepage() {
      this.$router.push("/");
    },
    onScroll() {
      if (this.offsetTop - window.pageYOffset < 0) {
        this.bottomNavShow = false;
      } else {
        this.bottomNavShow = true;
      }
      this.offsetTop = window.pageYOffset;
    }
  }
};
</script>
<style scoped>
.toolbar {
  z-index: 1;
  background-color: #383e44;
  background: -webkit-linear-gradient(#383e44, rgb(44, 44, 44));
  background: -o-linear-gradient(#383e44, rgb(44, 44, 44));
  background: -moz-linear-gradient(#383e44, rgb(44, 44, 44));
  background: linear-gradient(#383e44, rgb(44, 44, 44));
  color: #ffffff;
}

.logo {
  width: 32px;
  vertical-align: bottom;
}

.v-list__tile__sub-title {
  font-weight: 400;
}
.v-list__tile__title {
  font-weight: 400;
}
</style>
