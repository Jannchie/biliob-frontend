<template>
  <VNavigationDrawer
    expand-on-hover
    permanent
    disable-resize-watcher
    :v-model="true"
    app
    dark
  >
    <VList two-line>
      <VListItem class="mx-3">
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
      drawer: true,
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
          name: "爬虫服务",
          icon: "mdi-spider-web",
          path: "spider"
        },
        {
          name: "观测者管理",
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
