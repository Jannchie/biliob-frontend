<template>
  <VApp
    @touchstart.native="touchstart"
    @touchmove.native="touchmove"
  >
    <VAppBar
      src="../../../img/06-app-bar.gif"
      app
      hide-on-scroll
      fade-img-on-scroll
      style="z-index: 10"
      dense
    >
      <template v-slot:img="{ props }">
        <VImg
          v-bind="props"
          gradient="to top right, rgba(255,255,255,0.47), rgba(255,255,255,0.8)"
        />
      </template>
      <VAppBarNavIcon @click.stop="showNav = !showNav" />

      <VToolbarTitle style="width: 100%">
        <VRow>
          <VCol>
            <div class="title">
              BiliOB观测者
            </div>
          </VCol>
          <VSpacer />
          <VCol
            v-if="!$vuetify.breakpoint.lgAndUp"
            cols="auto"
          >
            <VBtn
              icon
              small
              style="margin-bottom: auto;"
              @click.stop="$vuetify.goTo('#comment-container')"
            >
              <VIcon>
                mdi-chat
              </VIcon>
            </VBtn>
          </VCol>
        </VRow>
      </VToolbarTitle>

      <VSpacer />

      <template v-slot:extension>
        <VTabs
          id="app-bar-tabs"
          background-color="transparent"
        >
          <VTab
            v-for="(eachTabItem, idx) in appBarTabs"
            :key="idx"
            :to="eachTabItem.path"
          >
            {{ eachTabItem.name }}
          </VTab>
        </VTabs>
      </template>
    </VAppBar>
    <div>
      <VContainer
        class="pa-0"
        style="z-index: 20"
      >
        <BiliobKanban />
        <BiliobNotification />
        <VRow dense>
          <BiliobFab />
        </VRow>

        <div>
          <VNavigationDrawer
            v-model="showNav"
            fixed
            temporary
            style="z-index: 30"
          >
            <VContainer grid-list-md>
              <VLayout v-if="!$store.state.logined">
                <VFlex lg7>
                  <VBtn
                    width="100%"
                    large
                    dark
                    to="/login"
                  >
                    <VIcon left>
                      mdi-login-variant
                    </VIcon>登录
                  </VBtn>
                </VFlex>
                <VFlex lg7>
                  <VBtn
                    width="100%"
                    large
                    text
                    to="/signin"
                  >
                    <VIcon left>
                      mdi-login-variant
                    </VIcon>注册
                  </VBtn>
                </VFlex>
              </VLayout>
              <div v-if="$store.state.logined">
                <VCardActions style="justify-content: flex-end;">
                  <div
                    v-if="$store.state.logined"
                    class="check-in"
                  >
                    <VBtn
                      v-if="$store.state.checked"
                      ripple
                      text
                      primary
                      small
                      :loading="getCheckStatus"
                    >
                      <VIcon left>
                        mdi-check-circle-outline
                      </VIcon>已签到
                    </VBtn>
                    <VBtn
                      v-else
                      id="check-in"
                      small
                      ripple
                      text
                      primary
                      :loading="getCheckStatus"
                      @click.stop="$store.dispatch('checkIn')"
                    >
                      <VIcon left>
                        mdi-checkbox-blank-circle-outline
                      </VIcon>签到
                    </VBtn>
                  </div>
                </VCardActions>
                <BiliobCard to="/user/info">
                  <VCardTitle primary-title>
                    {{ $db.user.nickName }}
                  </VCardTitle>
                  <VCardText>
                    <div>{{ $db.user.role }}</div>
                    <div>{{ $db.user.title }}</div>
                    <div>积分：{{ $db.user.credit }}</div>
                    <div>经验：{{ $db.user.exp }} (#{{ $store.state.userRank }})</div>
                  </VCardText>
                </BiliobCard>
                <VCardActions>
                  <VBtn
                    width="50%"
                    to="/user/author"
                    large
                    text
                  >
                    <div style="display: block; text-align: center;">
                      <div>{{ getUserItemValue("关注") }}</div>
                      <div class="caption">
                        关注
                      </div>
                    </div>
                  </VBtn>
                  <VBtn
                    width="50%"
                    to="/user/video"
                    large
                    text
                  >
                    <div style="display: block; text-align: center;">
                      <div>{{ getUserItemValue("收藏") }}</div>
                      <div class="caption">
                        收藏
                      </div>
                    </div>
                  </VBtn>
                </VCardActions>
                <VDivider />
              </div>
              <VBtn
                v-if="$store.state.logined"
                large
                class="naVBtn"
                text
                block
                :to="`/user/record`"
              >
                <VIcon left>
                  mdi-timetable
                </VIcon>操作记录
              </VBtn>
              <VBtn
                v-if="$store.state.logined"
                large
                class="naVBtn"
                text
                block
                :to="`/user/authorgroup/star`"
              >
                <VIcon left>
                  mdi-star
                </VIcon>我的UP主群组
              </VBtn>
              <VBtn
                v-for="(eachNavItem, navItemIndex) in navItems"
                :key="navItemIndex"
                large
                class="naVBtn"
                text
                block
                :to="eachNavItem.url"
              >
                <VIcon left>
                  {{ eachNavItem.icon }}
                </VIcon>
                {{ eachNavItem.name }}
              </VBtn>
              <VBtn
                large
                class="naVBtn"
                text
                block
                href="https://azz.net/jannchie"
              >
                <VIcon left>
                  mdi-currency-cny
                </VIcon>援助
              </VBtn>
              <VBtn
                large
                class="naVBtn"
                text
                block
                to="/download/app"
              >
                <VIcon left>
                  mdi-application
                </VIcon>APP下载
              </VBtn>
            </VContainer>
          </VNavigationDrawer>
        </div>
      </VContainer>
    </div>
    <!-- <BiliobEnd /> -->
    <VMain>
      <VContainer class="pa-0">
        <BiliobNotice />
        <BiliobMain />
      </VContainer>
    </VMain>
    <BiliobFirstLoadDialog />
    <BiliobInfoDialog />
    <LayoutMasterFooter />
  </VApp>
</template>
<script>
export default {
  data() {
    return {
      touchStartX: 99999,
      snackbar: false,
      collapseOnScroll: true,
      checkInLoading: true,
      showNav: false,
      navItems: [
        {
          name: "首页",
          icon: "mdi-home",
          url: "/"
        },
        {
          name: "观测者排行",
          icon: "mdi-view-list",
          url: "/user/rank"
        },
        {
          name: "观测者议会",
          icon: "mdi-bank",
          url: "/agenda"
        },
        {
          name: "FAQ",
          icon: "mdi-help-circle-outline",
          url: "/faq"
        },
        {
          name: "关于",
          icon: "mdi-information-outline",
          url: "/about"
        },
        {
          name: "开发日志",
          icon: "mdi-developer-board",
          url: "/log"
        }
      ],
      UserItems: [
        {
          name: "关注",
          path: "/user/author"
        },
        {
          name: "收藏",
          path: "/user/video"
        }
      ],
      appBarTabs: [
        { name: "首页", path: "/" },
        { name: "排行榜", path: "/rank" },
        { name: "UP主群组", path: "/authorgroup" },
        { name: "UP主查询", path: "/authorlist" },
        { name: "专题查询", path: "/bangumi" },
        { name: "视频查询", path: "/videolist" },
        // { name: "个人中心", path: "/user" }
        { name: "见齐指数", path: "/index" },
        { name: "小工具", path: "/tools" }
      ],
      commentDom: undefined,
      sponsorDom: undefined,
      mainDom: undefined,
      searchMenu: false,
      user: this.$db.user
    };
  },
  computed: {
    getCheckStatus() {
      if (this.$store.state.checked == undefined) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        let appTabSelect =
          document
            .getElementById("app-bar-tabs")
            .getElementsByClassName("v-tab--active").length == 0;
        if (appTabSelect) {
          document
            .getElementById("app-bar-tabs")
            .getElementsByClassName(
              "v-tabs-slider-wrapper"
            )[0].style.visibility = "hidden";
        } else {
          document
            .getElementById("app-bar-tabs")
            .getElementsByClassName(
              "v-tabs-slider-wrapper"
            )[0].style.visibility = "visible";
        }
      }, 100);
    }
  },
  mounted() {
    this.axios
      .get(`/user/check-in`)
      .then((response) => {
        this.$store.commit("checkIn", response.data.status);
      })
      .catch((e) => {
        if (e.response.status != 401 && e.response.status != 403) {
          this.$store.commit("error");
        }
      });
    this.commentDom = document.getElementById("comment-container");
    this.sponsorDom = document.getElementById("sponsor-container");
    this.mainDom = document.getElementById("main-view");
    // 如果在大屏下，则定时同步大小变化
    if (!this.$vuetify.breakpoint.mdAndDown) {
      setInterval(this.resize, 1000);
    }
  },
  methods: {
    touchstart(e) {
      this.touchStartX = e.targetTouches[0].clientX;
    },
    touchmove(e) {
      if (
        this.touchStartX < 20 &&
        e.targetTouches[0].clientX > this.touchStartX + 10
      ) {
        this.showNav = true;
      } else if (e.targetTouches[0].clientX < this.touchStartX - 10) {
        this.showNav = false;
      }
    },
    getUserItemValue(type) {
      switch (type) {
        case "关注":
          return this.$store.state.favoriteMid.length;
        default:
          return this.$store.state.favoriteAid.length;
      }
    },
    // 同步高度变化
    resize() {
      let comment = document.getElementById("comment-container");
      let sponsor = document.getElementById("sponsor-container");
      let mainView = document.getElementById("main-view");
      if (comment) {
        comment.style.maxHeight =
          Math.max(sponsor.offsetHeight, mainView.offsetHeight) + "px";
      }
    }
  }
};
</script>
<style>
.naVBtn {
  justify-content: left;
}
#comment-container {
  overflow-y: auto;
}

@media (min-width: 1264px) {
  .container {
    max-width: 1625px;
  }
}
</style>
