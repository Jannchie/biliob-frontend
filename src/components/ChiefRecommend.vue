<template>
  <div>首屏</div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: "项目名称1",
          currentDate: new Date()
        },
        {
          name: "项目名称2",
          currentDate: new Date()
        },
        {
          name: "项目名称3",
          currentDate: new Date()
        },
        {
          name: "项目名称4",
          currentDate: new Date()
        },
        {
          name: "项目名称5",
          currentDate: new Date()
        },
        {
          name: "项目名称6",
          currentDate: new Date()
        }
      ]
    };
  }
};
</script>

<style>
.small-card {
  height: 100px;
}

.top-card {
  height: 212px;
}

.card-button {
  float: right;
}

.card-title {
  font-size: 18px;
}

.time {
  font-size: 13px;
  color: #999;
}
</style>
