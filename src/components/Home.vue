<template>
  <el-row>
    <el-col :span="10">
      <el-card style="margin:5px " class="top-card">
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-row>
        <el-col :span="8" v-for="(item, index) in items" :key="index">
          <el-card class="small-card" style="margin:5px">
            <div>
              <span class="card-title">{{item.name}}</span>
              <div>
                <time class="time">{{ item.currentDate }}</time>
                <el-button type="text" class="card-button">详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        items: [{
          name: "项目名称1",
          currentDate: new Date(),
        }, {
          name: "项目名称2",
          currentDate: new Date(),
        }, {
          name: "项目名称3",
          currentDate: new Date(),
        }, {
          name: "项目名称4",
          currentDate: new Date(),
        }, {
          name: "项目名称5",
          currentDate: new Date(),
        }]
      };
    }
  }
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