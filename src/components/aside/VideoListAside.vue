<template>
  <div>
    <MaterialCard
      class="card"
      title="数据说明"
    >
      <div class="caption">
        <li>这里可以查询所有<span class="green--text">正在追踪</span>的视频数据。</li>
        <li>
          <span
            class="white--text px-1 "
            style="background-color:#22AA77;border-radius:2px;margin-right:5px"
          >
            观测中
          </span>
          一天更新一次视频的数据。
        </li>
        <li><span
            class="white--text px-1 "
            style="background-color:#FF5722;border-radius:2px;margin-right:5px"
          >保守观测</span>
          变化幅度太小的视频数据将每周更新一次，但可以手动刷新。
        </li>
        <li>
          <span
            class="white--text px-1 "
            style="background-color:#1188CC;border-radius:2px;margin-right:5px"
          >
            强行观测
          </span>
          消耗200积分，可以强行每日更新视频的数据，即使它本已进入保守观测组。
        </li>
        <VDivider class="my-2"></VDivider>
        <div>
          目前，如果视频<span>同时在线人数达到全站前20</span>，那么该视频的数据更新频率会强行加快到<span>每10分钟采集一次</span>。以此获取更加精密实时的数据。
        </div>
      </div>
    </MaterialCard>
    <slot name="link" />
  </div>
</template>

<script>
export default {
  components: {}
};
</script>
