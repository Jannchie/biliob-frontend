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
        <VTabs align-with-title background-color="transparent">
          <VTab
            v-for="(eachTabItem, index) in appBarTabs"
            :key="index"
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
      <VContainer>
        <VSheet>
          <VNavigationDrawer v-model="showNav" fixed temporary>
            <VContainer grid-list-md>
              <VLayout v-if="!$store.state.logined">
                <VFlex lg6>
                  <VBtn width="100%" large dark to="/login"
                    ><VIcon left> mdi-login-variant </VIcon>登录</VBtn
                  >
                </VFlex>
                <VFlex lg6>
                  <VBtn width="100%" large text to="/signin"
                    ><VIcon left> mdi-login-variant </VIcon>注册</VBtn
                  >
                </VFlex>
              </VLayout>
              <VSheet v-if="$store.state.logined">
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
                <VCardTitle primary-title>Jannchie</VCardTitle>
                <VCardText
                  ><div>
                    {{ $store.state.role }}
                  </div>
                  <div>积分：{{ $store.state.credit }}</div>
                </VCardText>
                <VDivider></VDivider>
                <VCardActions>
                  <VBtn
                    v-for="(eachUserItem, index) in UserItems"
                    :key="index"
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
              </VSheet>
              <VBtn
                v-for="(eachNavItem, index) in navItems"
                :key="index"
                large
                class="nav-btn"
                text
                block
                :to="eachNavItem.url"
                ><VIcon left>{{ eachNavItem.icon }}</VIcon
                >{{ eachNavItem.name }}</VBtn
              >
            </VContainer>
          </VNavigationDrawer>
        </VSheet>
      </VContainer>
    </div>
    <VContainer class="pa-0">
      <VLayout justify-center>
        <VFlex lg8>
          <VSlideYTransition mode="out-in">
            <RouterView />
          </VSlideYTransition>
        </VFlex>
      </VLayout>
    </VContainer>
    <LayoutMasterFooter />
  </div>
</template>
<script>
export default {
  data() {
    return {
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
          name: "援助",
          icon: "mdi-currency-cny",
          url: "/donate"
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
        { name: "视频查询", path: "/video" },
        { name: "话题指数", path: "/index" }
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
.nav-btn {
  justify-content: right;
}
</style>
