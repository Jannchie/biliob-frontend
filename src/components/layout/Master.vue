<template>
  <VApp>
    <VAppBar
      app
      hide-on-scroll
      color="#333"
      dark
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      dense
    >
      <template v-slot:img="{ props }">
        <VImg v-bind="props" gradient="to top right, #222222CC, #333333"></VImg>
      </template>
      <VAppBarNavIcon @click.stop="showNav = !showNav"></VAppBarNavIcon>

      <VToolbarTitle> <h1 class="title">BiliOB观测者</h1></VToolbarTitle>

      <VSpacer></VSpacer>

      <template v-slot:extension>
        <VTabs id="app-bar-tabs" background-color="transparent">
          <VTab
            v-for="(eachTabItem, idx) in appBarTabs"
            :key="idx"
            :to="eachTabItem.path"
            >{{ eachTabItem.name }}</VTab
          >
        </VTabs>
      </template>
    </VAppBar>
    <!-- <VParallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <div style="text-align:center" class="display-4"></div>
    </VParallax> -->

    <div>
      <VContainer class="py-0">
        <VRow dense>
          <BiliobFab />
        </VRow>
        <div>
          <VNavigationDrawer v-model="showNav" fixed temporary>
            <VContainer grid-list-md>
              <VLayout v-if="!$store.state.logined">
                <VFlex lg7>
                  <VBtn width="100%" large dark to="/login"
                    ><VIcon left> mdi-login-variant </VIcon>登录</VBtn
                  >
                </VFlex>
                <VFlex lg7>
                  <VBtn width="100%" large text to="/signin"
                    ><VIcon left> mdi-login-variant </VIcon>注册</VBtn
                  >
                </VFlex>
              </VLayout>
              <div v-if="$store.state.logined">
                <VCardActions style="justify-content:flex-end">
                  <div v-if="$store.state.logined" class="check-in">
                    <VBtn
                      v-if="$store.state.checked"
                      ripple
                      text
                      primary
                      small
                      :loading="getCheckStatus"
                    >
                      <VIcon left> mdi-check-circle-outline </VIcon>已签到
                    </VBtn>
                    <VBtn
                      v-else
                      small
                      ripple
                      text
                      primary
                      :loading="getCheckStatus"
                      @click.stop="$store.dispatch('checkIn')"
                    >
                      <VIcon left> mdi-checkbox-blank-circle-outline </VIcon
                      >签到
                    </VBtn>
                  </div>
                </VCardActions>
                <BiliobCard to="/user/info">
                  <VCardTitle primary-title>{{
                    $store.state.nickName
                  }}</VCardTitle>
                  <VCardText
                    ><div>
                      {{ $store.state.role }}
                    </div>
                    <div>
                      {{ $store.state.title }}
                    </div>
                    <div>积分：{{ $store.state.credit }}</div>
                    <div>
                      经验：{{ $store.state.exp }} (#{{
                        $store.state.userRank
                      }})
                    </div>
                  </VCardText>
                </BiliobCard>
                <VCardActions>
                  <VBtn width="50%" to="/user/author" large text>
                    <div style="display:block; text-align:center;">
                      <div>{{ getUserItemValue("关注") }}</div>
                      <div class="caption">关注</div>
                    </div>
                  </VBtn>
                  <VBtn width="50%" to="/user/video" large text>
                    <div style="display:block; text-align:center;">
                      <div>{{ getUserItemValue("收藏") }}</div>
                      <div class="caption">收藏</div>
                    </div>
                  </VBtn>
                </VCardActions>
                <VDivider></VDivider>
              </div>
              <VBtn
                v-if="$store.state.logined"
                large
                class="naVBtn"
                text
                block
                :to="`/user/record`"
                ><VIcon left>mdi-timetable</VIcon>操作记录</VBtn
              >
              <VBtn
                v-for="(eachNavItem, navItemIndex) in navItems"
                :key="navItemIndex"
                large
                class="naVBtn"
                text
                block
                :to="eachNavItem.url"
                ><VIcon left>{{ eachNavItem.icon }}</VIcon
                >{{ eachNavItem.name }}</VBtn
              >
              <VBtn
                large
                class="naVBtn"
                text
                block
                href="https://azz.net/jannchie"
                ><VIcon left>mdi-currency-cny</VIcon> 援助</VBtn
              >
            </VContainer>
          </VNavigationDrawer>
        </div>
      </VContainer>
    </div>
    <VContent>
      <VContainer class="pa-0">
        <VRow justify="center" dense style="position: relative;">
          <VSpacer lg="2" cols="0"></VSpacer>
          <VCol lg="7" cols="12">
            <VSlideYTransition mode="out-in">
              <RouterView id="main-view" key="master" />
            </VSlideYTransition>
          </VCol>
          <VCol lg="3" cols="12">
            <VSlideYTransition mode="out-in">
              <BiliobComment
                v-if="
                  -1 == ['/login', '/sign'].indexOf(this.$route.path) &&
                    this.$route.path.indexOf('user') == -1
                "
                id="comment-container"
              >
              </BiliobComment>
            </VSlideYTransition>
          </VCol>
        </VRow>
      </VContainer>
    </VContent>
    <BiliobFirstLoadDialog />
    <BiliobInfoDialog />
    <BiliobNotification />
    <LayoutMasterFooter />
  </VApp>
</template>
<script>
export default {
  data() {
    return {
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
        { name: "UP主查询", path: "/authorlist" },
        { name: "视频查询", path: "/videolist" }
        // { name: "个人中心", path: "/user" }
        // { name: "话题指数", path: "/index" }
      ]
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
      .then(response => {
        this.$store.commit("checkIn", response.data.status);
      })
      .catch(e => {
        if (e.response.status != 401 && e.response.status != 403) {
          this.$store.commit("error");
        }
      });
    // 如果在大屏下，则定时同步大小变化
    if (this.$vuetify.breakpoint.lgAndUp) {
      setInterval(this.resize, 1000);
    }
  },
  methods: {
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
      let mainView = document.getElementById("main-view");
      if (comment && mainView) {
        comment.style.maxHeight = mainView.offsetHeight + "px";
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
</style>
