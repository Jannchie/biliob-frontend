<template>
  <div>
    <VSpeedDial v-model="fab" fixed bottom right>
      <template v-slot:activator>
        <VBtn v-model="fab" color="primary" dark fab>
          <VIcon v-if="fab">mdi-close</VIcon>
          <VIcon v-else>mdi-plus</VIcon>
        </VBtn>
      </template>
      <VBtn fab dark small color="green" @click="getDialog(1)">
        <VIcon>mdi-account-plus</VIcon>
      </VBtn>
      <VBtn fab dark small color="indigo" @click="getDialog(2)">
        <VIcon>mdi-video-plus</VIcon>
      </VBtn>
    </VSpeedDial>
    <VDialog v-model="dialog" max-width="500px">
      <VCard>
        <VAlert
          style="position: absolute; width:100%"
          :value="showAlert"
          :type="alertType"
          transition="scale-transition"
        >
          {{ msg }}
        </VAlert>
        <VCardTitle> {{ title }}</VCardTitle>
        <VCardText>
          <VTextField
            v-model="ID"
            :label="label"
            required
            :rules="[rules.required]"
          ></VTextField>
          <small class="grey--text">{{ hint }}</small>
        </VCardText>
        <VCardActions>
          <div class="flex-grow-1"></div>
          <VBtn text color="primary" @click="submit()">提交</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fab: false,
      ID: "",
      dialog: false,
      alertType: "success",
      showAlert: false,
      title: "标题",
      hint: "小字的提示",
      msg: "小字的提示",
      label: "",
      type: 1,
      url: "",
      rules: {
        required: value => value != "" || "告诉我要观测什么吧"
      }
    };
  },
  methods: {
    getVideoUrl() {
      console.log(this.ID);
      var re = /^[0-9]+$/;
      this.ID = this.ID.replace(/^av/i, "");
      this.ID = this.ID.replace(/^BV/i, "");
      if (re.test(this.ID)) {
        return `/video/v2/av${this.ID}`;
      } else {
        return `/video/v2/BV${this.ID}`;
      }
    },
    getDialog(index) {
      switch (index) {
        case 1:
          this.title = "观测新的UP主";
          this.label = "请输入UP主ID(数字)";
          this.hint = "UP主的ID可以从UP主个人空间找到~";
          this.url = `/author`;
          this.type = 1;
          break;
        case 2:
          this.title = "观测新的视频";
          this.label = "请输入AV号或者BV号";
          this.hint = "视频的BV号可以在视频播放页面找到~";
          this.url = this.videoUrl;
          this.type = 2;
          break;
      }
      this.dialog = !this.dialog;
    },
    submit() {
      if (this.type == 1) {
        this.axios.post(this.url, Number(this.ID));
      } else {
        this.axios.post(this.getVideoUrl());
      }
      this.dialog = false;
    }
  }
};
</script>
<style scoped></style>
