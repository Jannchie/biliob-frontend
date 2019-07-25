<template>
  <div>
    <VAppBar
      fixed
      app
      color="#444"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      dense
    >
      <template v-slot:img="{ props }">
        <VImg
          v-bind="props"
          gradient="to top right, #222222CC, #444444CC"
        ></VImg>
      </template>
      <VAppBarNavIcon @click.stop="showNav = !showNav"></VAppBarNavIcon>

      <VToolbarTitle>BiliOB观测者</VToolbarTitle>

      <VSpacer></VSpacer>

      <VBtn icon>
        <VIcon>mdi-heart</VIcon>
      </VBtn>

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

    <div>
      <VContainer>
        <VSheet>
          <VNavigationDrawer v-model="showNav" fixed temporary>
            <VContainer>
              <VSheet>
                <VCardActions style="justify-content:flex-end">
                  <VBtn color="primary" text><VIcon>mdi-check</VIcon>签到</VBtn>
                </VCardActions>
                <VCardTitle primary-title>Jannchie</VCardTitle>
                <VCardText
                  ><div>
                    观测站的管理员
                  </div>
                  <div>
                    积分：100
                  </div>
                </VCardText>
                <VDivider></VDivider>
                <VCardActions>
                  <VBtn
                    v-for="(eachUserItem, index) in UserItems"
                    :key="index"
                    width="50%"
                    large
                    text
                  >
                    <div style="display:block">
                      <div>{{ eachUserItem.value }}</div>
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
    <div style="height:192px"></div>
    <VContainer>
      <VLayout justify-center>
        <VFlex lg8>
          <RouterView> </RouterView>
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
      showNav: false,
      navItems: [
        {
          name: "首页",
          icon: "mdi-home",
          url: "/index"
        },
        {
          name: "个人空间",
          icon: "mdi-home",
          url: "/home"
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
          value: 123
        },
        {
          name: "收藏",
          value: 456
        }
      ],
      appBarTabs: [
        { name: "首页", path: "/" },
        { name: "排行榜", path: "/rank" },
        { name: "数据检索", path: "/data" },
        { name: "话题指数", path: "/index" }
      ]
    };
  }
};
</script>
<style>
.nav-btn {
  justify-content: right;
}
</style>
