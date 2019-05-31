<template>
  <VNavigationDrawer
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <VContainer>

      <VList two-line>
        <VListTile>
          <VListTileAvatar>
            <img src="../../../../public/img/icons/favicon-32x32.png" />
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle class="white--text">
              BiliOB观测者
            </VListTileTitle>
            <VListTileSubTitle>
              管理系统
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VContainer>
    <TracerNavItem
      v-for="eachItem in navItem"
      :key="eachItem.name"
      :name="eachItem.name"
      :icon="eachItem.icon"
      :path="eachItem.path"
    ></TracerNavItem>
  </VNavigationDrawer>
</template>
<script>
export default {
  data() {
    return {
      navItem: [
        {
          name: "仪表盘",
          icon: "mdi-monitor-dashboard",
          path: "dashboard"
        },
        {
          name: "计划任务",
          icon: "mdi-timer",
          path: "schedule"
        },
        {
          name: "爬虫服务概览",
          icon: "mdi-spider-web",
          path: "spider"
        },
        {
          name: "观测者概览",
          icon: "mdi-account",
          path: "user"
        }
      ]
    };
  }
};
</script>
