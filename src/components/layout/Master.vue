<template>
  <div>
    <VAppBar>
      <VAppBarNavIcon @click.stop="showNav = !showNav"></VAppBarNavIcon>

      <VToolbarTitle>BiliOB观测者</VToolbarTitle>

      <VSpacer></VSpacer>

      <VBtn icon>
        <VIcon>mdi-heart</VIcon>
      </VBtn>

      <VBtn icon>
        <VIcon>mdi-magnify</VIcon>
      </VBtn>

      <VMenu left bottom>
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
      </VMenu>
    </VAppBar>
    <VNavigationDrawer v-model="showNav" absolute bottom temporary>
      <VContainer>
        <VBtn color="primary" text><VIcon>mdi-check</VIcon>签到</VBtn>

        <VBtn
          v-for="(eachNavItem, index) in navItems"
          :key="index"
          large
          class="nav-btn"
          text
          block
          ><VIcon left>{{ eachNavItem.icon }}</VIcon
          >{{ eachNavItem.name }}</VBtn
        >
      </VContainer>
    </VNavigationDrawer>
    <RouterView> </RouterView>

    <LayoutMasterFooter />
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNav: false,
      navItems: [
        {
          name: "首页",
          icon: "mdi-home"
        },
        {
          name: "个人空间",
          icon: "mdi-home"
        },
        {
          name: "观测者排行",
          icon: "mdi-view-list"
        },
        {
          name: "FA♂Q",
          icon: "mdi-help-circle-outline"
        },
        {
          name: "关于",
          icon: "mdi-information-outline"
        },
        {
          name: "援助",
          icon: "mdi-currency-cny"
        }
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
