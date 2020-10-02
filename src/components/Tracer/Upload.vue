<template>
  <VLayout wrap>
    <VFlex lg8>
      <VForm>
        <BiliobCard title="批量上传爬虫任务">
          <h5>选择计划任务的类型</h5>
          <VRadioGroup v-model="type">
            <VRadio
              value="video"
              label="视频"
            />
            <VRadio
              value="author"
              label="作者"
            />
          </VRadioGroup>
          <h5>此处输入计划任务的名称</h5>
          <VTextField
            v-model="name"
            solo
          />
          <h5>此处可以批量输入ID进行爬取</h5>
          <p class="caption">
            如果是作者，输入uid，如果是视频，输入av号。输入纯数字即可，以回车键分开。
          </p>
          <VTextarea
            v-model="originData"
            solo
          />
          <h5>频率设置</h5>
          <VRadioGroup v-model="frequency">
            <VRadio
              label="每6小时一次"
              :value="1"
            />
            <VRadio
              label="每1小时一次"
              :value="2"
            />
            <VRadio
              label="每5分钟一次"
              :value="3"
            />
          </VRadioGroup>
          <VBtn
            color="primary"
            class="white--text"
            :disabled="
              type == '' || name == '' || frequency == -1 || originData == ''
            "
            @click="upload"
          >
            <VIcon left>
              mdi-upload
            </VIcon>上传
          </VBtn>
        </BiliobCard>
      </VForm>
    </VFlex>
    <VFlex lg4>
      <BiliobCard title="已设定任务">
        <VList three-line>
          <VListItem
            v-for="(eachItem, index) in schedules"
            :key="index"
          >
            <VListItemContent>
              <VListItemTitle>{{ eachItem.name }}</VListItemTitle>
              <VListItemSubtitle>
                {{
                  frequencyText(eachItem.frequency)
                }}
              </VListItemSubtitle>
              <VListItemSubtitle>{{ eachItem.owner }}</VListItemSubtitle>
            </VListItemContent>
            <VListItemAction>
              <VBtn
                icon
                @click="deleteSchedule(eachItem)"
              >
                <VIcon color="red darken-1">
                  mdi-delete-circle
                </VIcon>
              </VBtn>
            </VListItemAction>
          </VListItem>
        </VList>
      </BiliobCard>
    </VFlex>
    <MaterialNotification
      style="position: absolute; min-width: 300px"
      :value="alert"
      :type="alertType"
      transition="slide-y-transition"
    >
      {{ alertMsg }}
    </MaterialNotification>
  </VLayout>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      alert: false,
      alertType: "success",
      alertMsg: "",
      name: "",
      frequency: -1,
      originData: "",
      schedules: []
    };
  },
  computed: {
    uploadData() {
      return this.originData.split("\n");
    }
  },
  mounted() {
    this.getSchedules();
  },
  methods: {
    getSchedules() {
      this.axios.get("/admin/upload/schedule").then(r => {
        this.schedules = r.data;
      });
    },
    deleteSchedule(item) {
      this.axios
        .delete(`/admin/schedule/${item.type}`, {
          params: {
            owner: item.owner,
            name: item.name
          }
        })
        .then(r => {
          this.successAlert(r);
        })
        .catch(e => {
          this.failedAlert(e);
        });
    },
    upload() {
      this.axios
        .post("/admin/upload/schedule", {
          idList: this.uploadData,
          type: this.type,
          frequency: this.frequency,
          name: this.name
        })
        .then(r => {
          this.getSchedules();
          this.successAlert(r);
        })
        .catch(e => {
          this.failedAlert(e);
        });
    },
    successAlert(r) {
      this.alertMsg = r.data.msg;
      this.alertType = "success";
      this.alert = true;
      this.getSchedules();
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    failedAlert(e) {
      this.alertMsg = "发生错误！" + e.data.msg;
      this.alertType = "error";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    frequencyText(value) {
      switch (value) {
        case 1:
          return "每六小时采集一次";
        case 2:
          return "每一小时采集一次";
        case 3:
          return "每五分钟采集一次";
        default:
          break;
      }
    }
  }
};
</script>
