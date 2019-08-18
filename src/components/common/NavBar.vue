<template>
  <nav>
    <VSnackbar v-model="snackbar" :timeout="3000" top>
      {{ snackbarText }}
      <VBtn color="pink" text @click="snackbar = false">
        关闭
      </VBtn>
    </VSnackbar>
    <VToolbar style="background-color: #444" class="toolbar" dense>
      <VToolbarSideIcon
        class="toolbar-item"
        dark
        @click.stop="drawer = !drawer"
      >
        <VIcon>mdi-menu</VIcon>
      </VToolbarSideIcon>
      <VBtn class="toolbar-item" text dark @click.stop="toHomepage">
        <VToolbarTitle class="toolbar-title">
          <img
            class="logo"
            src="../../../public/img/icons/android-chrome-192x192.png"
          />
          BiliOB观测者
        </VToolbarTitle>
      </VBtn>
      <VToolbarItems class="hidden-md-and-down">
        <VBtn class="toolbar-item" text dark @click.stop="toVideo">
          <VIcon>mdi-video-outline</VIcon>视频追踪
        </VBtn>
        <VBtn class="toolbar-item" text dark @click.stop="toAuthor">
          <VIcon>mdi-account-outline</VIcon>UP主追踪
        </VBtn>
        <VBtn class="toolbar-item" text dark @click.stop="toRank">
          <VIcon>mdi-chart-histogram</VIcon>排行榜
        </VBtn>
      </VToolbarItems>
    </VToolbar>
    <VNavigationDrawer v-model="drawer" fixed temporary>
      <div v-if="logined" :class="backgroundStyle"></div>
      <div v-if="logined" class="check-in">
        <VBtn
          v-if="checked"
          ripple
          text
          primary
          dark
          small
          :loading="checkInLoading"
        >
          <VIcon left> mdi-check-circle-outline </VIcon>已签到
        </VBtn>
        <VBtn
          v-else-if="!checked"
          small
          ripple
          dark
          text
          primary
          :loading="checkInLoading"
          @click.stop="checkIn"
        >
          <VIcon left> mdi-checkbox-blank-circle-outline </VIcon>签到
        </VBtn>
      </div>

      <VList
        v-if="logined"
        class="user-info-content"
        style="padding:0;margin-top:150px"
      >
        <VListItem>
          <VListItemAvatar>
            <VIcon>
              mdi-home
            </VIcon>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="
                `grey--text text--${brightness}-2 title font-weight-regular`
              "
              >{{ name }}</VListItemTitle
            >
            <VListItemSubtitle>
              <div style="display:flex;">
                <ExpBadget class="badget" :exp="exp" />
                <CreditBadget class="badget" :credit="credit" />
              </div>
            </VListItemSubtitle>
          </VListItemContent>
        </VListItem>
      </VList>
      <VList dense>
        <VListItem
          v-if="!logined"
          class="nav-list-tile"
          ripple
          @click.stop="toLogin"
        >
          <VListItemAvatar>
            <CircleIconBtn>mdi-login-variant</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >登录</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
      </VList>
      <VList v-if="logined" dense>
        <VListItem class="nav-list-tile" ripple @click.stop="toFavoriteAuthor">
          <VListItemAvatar>
            <CircleIconBtn>mdi-account-heart</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >我的关注</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
        <VListItem class="nav-list-tile" ripple @click.stop="toFavoriteVideo">
          <VListItemAvatar>
            <CircleIconBtn>mdi-star</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >我的收藏</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
        <VListItem class="nav-list-tile" ripple @click.stop="toRecord">
          <VListItemAvatar>
            <CircleIconBtn>mdi-notebook</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >操作记录</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
      </VList>
      <VDivider></VDivider>
      <VList dense>
        <VListItem class="nav-list-tile" ripple @click.stop="toEvent">
          <VListItemAvatar>
            <CircleIconBtn>mdi-bulletin-board</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >UP主粉丝波动情报</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
      </VList>

      <VDivider></VDivider>

      <VList dense>
        <VListItem class="nav-list-tile" ripple @click.stop="toUserRank">
          <VListItemAvatar>
            <CircleIconBtn>mdi-view-list</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >观测者排行</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
        <VListItem class="nav-list-tile" ripple @click.stop="toFaq">
          <VListItemAvatar>
            <CircleIconBtn>mdi-help-circle-outline</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >FA♂Q</VListItemTitle
            >
          </VListItemContent>
        </VListItem>

        <VListItem class="nav-list-tile" ripple @click.stop="toAbout">
          <VListItemAvatar>
            <CircleIconBtn>mdi-information-outline</CircleIconBtn>
          </VListItemAvatar>

          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >关于</VListItemTitle
            >
          </VListItemContent>
        </VListItem>

        <VListItem class="nav-list-tile" ripple @click.stop="toLog">
          <VListItemAvatar>
            <CircleIconBtn>mdi-developer-board</CircleIconBtn>
          </VListItemAvatar>

          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >开发日志</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
      </VList>
      <VDivider></VDivider>
      <VList dense>
        <VListItem class="nav-list-tile" ripple @click.stop="toDonate">
          <VListItemAvatar>
            <CircleIconBtn>mdi-currency-cny</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >援助与捐赠</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
      </VList>

      <VList dense>
        <VListItem class="nav-list-tile" ripple @click.stop="darkMode">
          <VListItemAvatar>
            <CircleIconBtn>{{ darkModeIcon }}</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >{{ darkModeText }}</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
      </VList>

      <VList :hidden="isBsl" dense>
        <VListItem class="nav-list-tile" ripple @click.stop="toAndroidPage">
          <VListItemAvatar>
            <CircleIconBtn>mdi-android</CircleIconBtn>
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle
              :class="`font-weight-regular grey--text text--${brightness}-2`"
              >获取安卓APP</VListItemTitle
            >
          </VListItemContent>
        </VListItem>
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
import CircleIconBtn from "./CircleIconBtn";

export default {
  name: "NavBar",
  components: { CreditBadget, ExpBadget, CircleIconBtn },
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
      checkInLoading: true,
      isBsl: false
    };
  },
  computed: {
    brightness() {
      if (this.$store.state.dark) {
        return "lighten";
      } else {
        return "darken";
      }
    },
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
    drawer(drawer) {
      if (drawer) {
        this.fixedBody();
      } else {
        this.looseBody();
      }
    },
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
    if (navigator.userAgent.indexOf("bsl") !== -1) {
      this.isBsl = true;
    }
    if (this.$store.state.dark) {
      this.darkModeIcon = "mdi-weather-sunny";
      this.darkModeText = "日间模式";
      this.backgroundStyle = "aside-pic-dark";
    } else {
      this.backgroundStyle = "aside-pic";
      this.darkModeText = "夜间模式";
      this.darkModeIcon = "mdi-weather-night";
    }
    this.axios.get(`/user/check-in`).then(response => {
      this.$store.commit("checkIn", response.data.status);
      this.checkInLoading = false;
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
    toDonate() {
      this.$router.push("/donate");
    },
    darkMode() {
      this.$store.commit("setDark");
      this.$cookies.set("dark", this.$store.getters.getDark);
    },
    checkIn() {
      this.checkInLoading = true;
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
    },
    fixedBody() {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText +=
        "position:fixed; width:100%; top:-" + scrollTop + "px;";
    },
    looseBody() {
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
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
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0 0;
  padding: 0 0;
  background-image: url("../../../public/img/aside-bright.png");
}

.aside-pic-dark {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
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
.nav-list-tile {
  height: 40px;
}
.badget {
  margin-right: 4px;
}
</style>
