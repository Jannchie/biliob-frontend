<template>
  <div>
    <VAppBar
      fixed
      app
      color="#333"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      dense
    >
      <template v-slot:img="{ props }">
        <VImg v-bind="props" gradient="to top right, #222222CC, #333333"></VImg>
      </template>
      <VAppBarNavIcon @click.stop="showNav = !showNav"></VAppBarNavIcon>

      <VToolbarTitle>BiliOB观测者</VToolbarTitle>

      <VSpacer></VSpacer>

      <!-- <VBtn icon>
        <VIcon>mdi-heart</VIcon>
      </VBtn> -->

      <!-- <VBtn icon>
        <VIcon>mdi-magnify</VIcon>
      </VBtn> -->

      <!-- <VMenu left bottom>
        <template v-slot:activator="{ on }">
          <VBtn icon v-on="on">
            <VIcon>mdi-dots-vertical</VIcon>
          </VBtn>
        </template>

        <VList>
          <VListItem v-for="n in 5" :key="n" @click="() => {}">
            <VListItemTitle>Option {{ n }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu> -->
      <template v-slot:extension>
        <VTabs background-color="transparent">
          <VTab
            v-for="(eachTabItem, idx) in appBarTabs"
            :key="idx"
            :to="eachTabItem.path"
            >{{ eachTabItem.name }}</VTab
          >
        </VTabs>
      </template>
    </VAppBar>
    <div style="height:192px"></div>
    <!-- <VParallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <div style="text-align:center" class="display-4"></div>
    </VParallax> -->

    <div>
      <VContainer class="py-0">
        <VRow>
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
                <VCardTitle primary-title>{{
                  $store.state.userName
                }}</VCardTitle>
                <VCardText
                  ><div>
                    {{ $store.state.role }}
                  </div>
                  <div>积分：{{ $store.state.credit }}</div>
                  <div>经验：{{ $store.state.exp }}</div>
                </VCardText>
                <VDivider></VDivider>
                <VCardActions>
                  <VBtn
                    v-for="(eachUserItem, userItemIdx) in UserItems"
                    :key="userItemIdx"
                    width="50%"
                    :to="eachUserItem.path"
                    large
                    text
                  >
                    <div style="display:block; text-align:center;">
                      <div>{{ getUserItemValue(eachUserItem.name) }}</div>
                      <div class="caption">{{ eachUserItem.name }}</div>
                    </div>
                  </VBtn>
                </VCardActions>
                <VDivider></VDivider>
              </div>
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
    <VContainer class="pa-0">
      <VLayout justify-center>
        <VFlex lg8 md12>
          <VSlideYTransition mode="out-in">
            <RouterView style="min-height:800px" />
          </VSlideYTransition>
        </VFlex>
      </VLayout>
    </VContainer>
    <CommonFirstLoadDialog />

    <VSnackbar v-model="snackbar" top color="info">
      <div>这里是消息内容</div>
      <VBtn text @click="snackbar = false">
        关闭
      </VBtn>
    </VSnackbar>
    <LayoutMasterFooter />
  </div>
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
        { name: "UP主查询", path: "/author" },
        { name: "视频查询", path: "/video" }
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
  mounted() {
    this.axios.get(`/user/check-in`).then(response => {
      this.$store.commit("checkIn", response.data.status);
    });
  },
  methods: {
    getUserItemValue(type) {
      switch (type) {
        case "关注":
          return this.$store.state.favoriteMid.length;
        default:
          return this.$store.state.favoriteAid.length;
      }
    }
  }
};
</script>
<style>
.naVBtn {
  justify-content: right;
}
@media only screen and (min-width: 960px) {
  .container {
    max-width: 1600px;
  }
}
</style>
