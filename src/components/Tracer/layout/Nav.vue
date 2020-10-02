<template>
  <VNavigationDrawer
    v-model="drawer"
    app
    dark
  >
    <VList two-line>
      <VListItem class="mx-3">
        <VListItemAvatar>
          <img src="../../../../public/img/icons/favicon-32x32.png">
        </VListItemAvatar>
        <VListItemContent>
          <VListItemTitle class="white--text">
            <h1 class="title">
              BiliOB观测者
            </h1>
          </VListItemTitle>
          <VListItemSubtitle :v-model="drawer">
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
    />
  </VNavigationDrawer>
</template>
<script>
//获取鼠标在页面中的位置
export default {
  data() {
    return {
      drawer: null,
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
  },
  mounted() {
    window.onmousemove = event => {
      var posx = 0;
      if (event.pageX) {
        posx = event.pageX;
      } else if (event.clientX || event.clientY) {
        posx =
          event.clientX +
          document.documentElement.scrollLeft +
          document.body.scrollLeft;
      }

      if (posx < 10) {
        this.drawer = true;
      } else if (posx > 600) {
        this.drawer = false;
      }
    };
  },
  destroyed() {
    window.onmousemove = undefined;
  }
};
</script>
