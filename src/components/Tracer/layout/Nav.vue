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
              监控系统
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VContainer>
    <TracerNavItem
      name="监控仪表盘"
      icon="mdi-monitor-dashboard"
      path="dashboard"
    ></TracerNavItem>
    <TracerNavItem
      name="爬虫服务监控"
      icon="mdi-spider-web"
      path="spider"
    ></TracerNavItem>
  </VNavigationDrawer>
</template>
<script>
export default {
  data() {
    return { mini: false };
  }
};
</script>
