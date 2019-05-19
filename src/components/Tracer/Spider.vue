<template>
  <MaterialCard
    color="green"
    title="运行中爬虫详细信息"
    text="此处显示的是目前正在运行中的爬虫状态"
  >
    <VDataTable
      :headers="headers"
      :items="spiderTasks"
      hide-actions
    >
      <template
        slot="headerCell"
        slot-scope="{ header }"
      >
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>
      <template
        slot="items"
        slot-scope="{ item }"
      >
        <td>{{ item.taskName }}</td>
        <td>{{ item.computerName }}</td>
        <td>{{ item.crawlCount }}</td>
        <td>{{ item.startTime }}</td>
        <td>{{ item.updateTime }}</td>
        <td>{{ item.status }}</td>
      </template>
    </VDataTable>
  </MaterialCard>
</template>
<script>
export default {
  data() {
    return {
      spiderTasks: Array(),
      headers: [
        { text: "爬虫名称", sortable: false },
        { text: "服务器名称", sortable: false },
        { text: "爬取次数", sortable: false },
        { text: "开始时间", sortable: false },
        { text: "更新时间", sortable: false },
        { text: "状态", sortable: false }
      ]
    };
  },
  mounted() {
    this.axios(`/tracer/spider-tasks?type=1`).then(r => {
      this.spiderTasks = r.data.content;
    });
  }
};
</script>
