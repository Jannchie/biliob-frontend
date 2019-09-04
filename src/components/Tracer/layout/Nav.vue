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
        <VListItem>
          <VListItemAvatar>
            <img src="../../../../public/img/icons/favicon-32x32.png" />
          </VListItemAvatar>
          <VListItemContent>
            <VListItemTitle class="white--text">
              BiliOB观测者
            </VListItemTitle>
            <VListItemSubtitle>
              管理系统
            </VListItemSubtitle>
          </VListItemContent>
        </VListItem>
      </VList>
    </VContainer>
    <TracerNavItem
      v-for="(eachItem, index) in navItem"
      :key="index"
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
        },
        {
          name: "自定义采集任务",
          icon: "mdi-upload",
          path: "upload"
        }
      ]
    };
  }
};
</script>
