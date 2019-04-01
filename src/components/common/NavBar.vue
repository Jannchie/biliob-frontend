<template>
  <nav>
    <VSnackbar
      v-model="snackbar"
      :timeout="3000"
      top
    >
      {{ snackbarText }}
      <VBtn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </VBtn>
    </VSnackbar>
    <VToolbar
      style="background-color: #444"
      class="toolbar"
      dense
    >
      <VToolbarSideIcon
        class="toolbar-item"
        dark
        @click.stop="drawer = !drawer"
      >
        <VIcon>mdi-menu</VIcon>
      </VToolbarSideIcon>
      <VBtn
        class="toolbar-item"
        flat
        dark
        @click.stop="toHomepage"
      >
        <VToolbarTitle class="toolbar-title">
          <img
            class="logo"
            src="../../../public/img/icons/android-chrome-192x192.png"
          >
          BiliOB观测者
        </VToolbarTitle>
      </VBtn>
      <VToolbarItems class="hidden-md-and-down">
        <VBtn
          class="toolbar-item"
          flat
          dark
          @click.stop="toVideo"
        >
          <VIcon>mdi-video-outline</VIcon>视频追踪
        </VBtn>
        <VBtn
          class="toolbar-item"
          flat
          dark
          @click.stop="toAuthor"
        >
          <VIcon>mdi-account-outline</VIcon>UP主追踪
        </VBtn>
        <VBtn
          class="toolbar-item"
          flat
          dark
          @click.stop="toRank"
        >
          <VIcon>mdi-chart-histogram</VIcon>排行榜
        </VBtn>
      </VToolbarItems>
    </VToolbar>
    <VNavigationDrawer
      v-model="drawer"
      fixed
      temporary
    >
      <div
        v-if="logined"
        class="check-in"
      >
        <VBtn
          v-if="checked"
          ripple
          flat
          primary
          dark
          small
          :loading="checkInLoading"
        >
          <VIcon left>
            mdi-check-circle-outline
          </VIcon>已签到
        </VBtn>
        <VBtn
          v-else-if="!checked"
          small
          ripple
          dark
          flat
          primary
          :loading="checkInLoading"
          @click.stop="checkIn"
        >
          <VIcon left>
            mdi-checkbox-blank-circle-outline
          </VIcon>签到
        </VBtn>
      </div>

      <VList
        class="user-info-content"
        style="padding:0"
      >
        <VListTile
          v-if="logined"
          :class="backgroundStyle"
          style="padding-bottom:-20px"
        >

        </VListTile>
        <VListTile v-if="logined">
          <VListTileAvatar>
            <VIcon large>
              mdi-home
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle class="title font-weight-medium">{{ name }}</VListTileTitle>
            <VListTileSubTitle>
              <div style="display:flex;">
                <ExpBadget
                  class="badget"
                  :exp="exp"
                />
                <CreditBadget
                  class="badget"
                  :credit="credit"
                />
              </div>
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VList>
        <VListTile
          v-if="!logined"
          ripple
          @click.stop="toLogin"
        >
          <VListTileAvatar>
            <VIcon>mdi-login-variant</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>登录</VListTileTitle>
            <VListTileSubTitle>或者注册？</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>

      <VList v-if="logined">
        <VListTile
          ripple
          @click.stop="toFavoriteAuthor"
        >
          <VListTileAvatar>
            <VIcon>mdi-account-heart</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>我的关注</VListTileTitle>
            <VListTileSubTitle>查看我关注的UP主</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          ripple
          @click.stop="toFavoriteVideo"
        >
          <VListTileAvatar>
            <VIcon>mdi-star</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>我的收藏</VListTileTitle>
            <VListTileSubTitle>查看我关注的视频</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          ripple
          @click.stop="toRecord"
        >
          <VListTileAvatar>
            <VIcon>mdi-notebook</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>操作记录</VListTileTitle>
            <VListTileSubTitle>身为观测者的观察日记</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VList>
        <VListTile
          ripple
          @click.stop="toEvent"
        >
          <VListTileAvatar>
            <VIcon>mdi-bulletin-board</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>UP主粉丝波动情报</VListTileTitle>
            <VListTileSubTitle>一分钟，我要看到所有的资料</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VList>
        <VListTile
          ripple
          @click.stop="toFaq"
        >
          <VListTileAvatar>
            <VIcon>mdi-help-circle-outline</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>FA♂Q</VListTileTitle>
            <VListTileSubTitle>你们问，我来答</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile
          ripple
          @click.stop="toAbout"
        >
          <VListTileAvatar>
            <VIcon>mdi-information-outline</VIcon>
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>关于</VListTileTitle>
            <VListTileSubTitle>你对这些肯定不感兴趣</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

        <VListTile
          ripple
          @click.stop="toLog"
        >
          <VListTileAvatar>
            <VIcon>mdi-developer-board</VIcon>
          </VListTileAvatar>

          <VListTileContent>
            <VListTileTitle>开发日志</VListTileTitle>
            <VListTileSubTitle>快来看看全新的功能</VListTileSubTitle>
          </VListTileContent>
        </VListTile>

      </VList>
      <VList>
        <VListTile
          ripple
          @click.stop="darkMode"
        >
          <VListTileAvatar>
            <VIcon>{{darkModeIcon}}</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>{{darkModeText}}</VListTileTitle>
            <VListTileSubTitle>Deep ♂ Dark ♂ Fantasy</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VList>
        <VListTile
          ripple
          @click.stop="toUserRank"
        >
          <VListTileAvatar>
            <VIcon>mdi-view-list</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>观测者排行</VListTileTitle>
            <VListTileSubTitle>站内积分榜</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>

      <VList>
        <VListTile
          ripple
          @click.stop="toAndroidPage"
        >
          <VListTileAvatar>
            <VIcon>mdi-android</VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>获取安卓APP</VListTileTitle>
            <VListTileSubTitle>你从未尝试过的船新版本</VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <!-- <div
        :hidden="egg"
        style="position:absolute ;bottom:16px"
      >
        你发现了彩蛋
      </div> -->
    </VNavigationDrawer>
  </nav>
</template>
<script>
import CreditBadget from "./CreditBadget.vue";
import ExpBadget from "./ExpBadget.vue";

export default {
  name: "NavBar",
  components: { CreditBadget, ExpBadget },
  data() {
    return {
      egg: false,
      bottomNav: null,
      drawer: false,
      snackbar: false,
      snackbarText: String(),
      bottomNavShow: true,
      offsetTop: 0,
      imgSrc: String(),
      backgroundStyle: String(),
      darkModeText: String(),
      darkModeIcon: String(),
      checkInLoading: true
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
    },
    name: {
      get: function() {
        return this.$store.getters.getUserName;
      },
      set: function() {}
    },
    role: {
      get: function() {
        return this.$store.getters.getRole;
      },
      set: function() {}
    },
    credit: {
      get: function() {
        return this.$store.getters.getCredit;
      },
      set: function() {}
    },
    exp: {
      get: function() {
        return this.$store.getters.getExp;
      },
      set: function() {}
    },
    isDark() {
      if (this.$store.state.dark) {
        return true;
      } else {
        return false;
      }
    },
    checked() {
      return this.$store.getters.getCheckStatus;
    }
  },
  watch: {
    isDark(isDark) {
      if (isDark) {
        this.backgroundStyle = "aside-pic-dark";
        this.darkModeIcon = "mdi-weather-sunny";
        this.darkModeText = "日间模式";
      } else {
        this.backgroundStyle = "aside-pic";
        this.darkModeIcon = "mdi-weather-night";
        this.darkModeText = "夜间模式";
      }
    }
  },

  created() {
    if (this.$store.state.dark) {
      this.darkModeIcon = "mdi-weather-sunny";
      this.darkModeText = "日间模式";
      this.backgroundStyle = "aside-pic-dark";
    } else {
      this.backgroundStyle = "aside-pic";
      this.darkModeText = "夜间模式";
      this.darkModeIcon = "mdi-weather-night";
    }
    this.axios
      .get(`/user`)
      .then(response => {
        this.logined = true;
        this.$store.commit("login");
        this.$store.commit("setRole", response.data.role);
        this.$store.commit("setCredit", response.data.credit);
        this.$store.commit("setExp", response.data.exp);
        this.$store.commit("setUserName", response.data.name);
        this.$store.commit("setFavoriteVideo", response.data.favoriteAid);
        this.$store.commit("setFavoriteAuthor", response.data.favoriteMid);
        this.axios.get(`/user/check-in`).then(response => {
          this.$store.commit("checkIn", response.data.status);
          this.checkInLoading = false;
        });
      })
      .catch(() => {
        this.$store.commit("logout");
        this.logined = false;
      });
    if (this.$cookies.get("dark") == "true") {
      this.$store.commit("setDark");
    }
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
    toRank() {
      this.$router.push("/rank");
    },
    toFavoriteVideo() {
      this.$router.push("/user/video");
    },
    toFavoriteAuthor() {
      this.$router.push("/user/author");
    },
    toEvent() {
      this.$router.push("/event");
    },
    toLog() {
      this.$router.push("/log");
    },
    toHomepage() {
      this.$router.push("/");
    },
    toAbout() {
      this.$router.push("/about");
    },
    toFaq() {
      this.$router.push("/faq");
    },
    toUserRank() {
      this.$router.push("/rank/user");
    },
    toRecord() {
      this.$router.push("/user/record");
    },
    toUser() {
      this.$router.push("/user");
    },
    toAndroidPage() {
      this.$router.push("/download/android");
    },
    darkMode() {
      this.$store.commit("setDark");
      this.$cookies.set("dark", this.$store.getters.getDark);
    },
    checkIn() {
      this.axios
        .post("/user/check-in")
        .then(response => {
          this.snackbarText = response.data.msg;
          this.snackbar = true;
          if (response.data.code == 1) {
            this.$store.commit("setCredit", response.data.data.credit);
            this.$store.commit("setExp", response.data.data.exp);
            this.$store.commit("checkIn", true);
            this.checkInLoading = false;
          }
        })
        .catch(e => e.data.msg);
    }
  }
};
</script>
<style scoped>
.toolbar {
  z-index: 1;
  background-color: #444;
  color: #fff;
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

.aside-pic {
  position: relative;
  left: 0px;
  top: 0px;
  height: 180px;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/aside-bright.png");
}

.aside-pic-dark {
  position: relative;
  left: 0px;
  height: 180px;
  top: 0px;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/aside-dark.png");
}

.user-info-content {
  padding-top: 140px;
}

.check-in {
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 10;
}

.badget {
  margin-right: 4px;
}
</style>
