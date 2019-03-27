<template>
  <VDataTable
    :headers="headers"
    :items="userRecordData"
    :pagination.sync="pageInfo"
    disable-initial-sort
    :loading="loading"
    no-results-text="目前没有数据"
    rows-per-page-text="每页条数"
    class="elevation-1"
    style="white-space: nowrap"
  >
    <template
      slot="items"
      slot-scope="props"
    >
      <td class="caption text-xs-left">{{ props.item.message }}</td>
      <td class="caption text-xs-left">{{ props.item.datetime }}</td>
      <td class="caption text-xs-center">{{ props.item.credit }}</td>
      <td class="caption text-xs-center">
        <span
          :class="`caption white--text ${getExecuteStatusColor(props.item.executed)} pa-1`"
          style="border-radius: 2px"
        >
          {{executeState(props.item.executed)}}
        </span>
      </td>
    </template>
  </VDataTable>
</template>
<script>
export default {
  props: { userRecordData: Object() },
  data() {
    return {
      loading: true,
      pageInfo: {
        rowsPerPage: 25 // -1 for All
      },
      headers: [
        { text: "内容", value: "message" },
        { text: "时间", value: "datetime" },
        { text: "积分", value: "credit" },
        { text: "状态", value: "executed" }
      ]
    };
  },
  watch: {
    userRecordData() {
      this.loading = false;
    }
  },
  methods: {
    getExecuteStatusColor(status) {
      if (status) {
        return "green";
      } else {
        return "orange";
      }
    },
    executeState(executed) {
      if (executed) {
        return "已执行";
      } else {
        return "未执行";
      }
    }
  }
};
</script>
<style scoped>
</style>
