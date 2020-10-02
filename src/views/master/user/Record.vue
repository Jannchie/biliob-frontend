<template>
  <BiliobCard>
    <VDataTable
      :items-per-page="30"
      :headers="headers"
      :items="userRecords"
    />
  </BiliobCard>
</template>

<script>
export default {
  data() {
    return {
      userRecords: []
    };
  }
};
</script>
<script>
export default {
  props: { userRecordData: Object() },
  data() {
    return {
      loading: true,
      pageInfo: {
        rowsPerPage: 25 // -1 for All
      },
      userRecords: [],
      headers: [
        { text: "内容", value: "message" },
        { text: "时间", value: "datetime" },
        { text: "积分", value: "credit" },
        { text: "状态", value: "state" }
      ]
    };
  },
  mounted() {
    this.axios.get(`/user/record`).then(response => {
      this.userRecords = response.data;
      this.userRecords.forEach(element => {
        if (element.createTime != undefined) {
          element.datetime = this.$timeFormat(
            element.createTime,
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        let state = "未执行";
        if (element.executed == true) {
          state = "已执行";
        }
        element["state"] = state;
      });
    });
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
