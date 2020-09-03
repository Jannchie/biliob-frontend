<template>
  <div>
    <VSpeedDial
      v-model="fab"
      fixed
      bottom
      right
    >
      <template v-slot:activator>
        <VFabTransition>
          <VBtn
            v-if="offset > 470"
            key="top"
            v-model="fab"
            color="red"
            dark
            fab
            @click.stop="$vuetify.goTo(0)"
          >
            <VIcon>mdi-rocket</VIcon>
          </VBtn>
          <VBtn
            v-else-if="showAdd"
            key="add"
            v-model="fab"
            color="blue"
            dark
            fab
          >
            <VIcon :class="fab?'rotated':''">
              mdi-plus
            </VIcon>
          </VBtn>
        </VFabTransition>
      </template>

      <VBtn
        v-if="switchs.author"
        fab
        dark
        small
        color="green"
        @click="getDialog(1)"
      >
        <VIcon>mdi-account-plus</VIcon>
      </VBtn>
      <VBtn
        v-if="switchs.video"
        fab
        dark
        small
        color="indigo"
        @click="getDialog(2)"
      >
        <VIcon>mdi-video-plus</VIcon>
      </VBtn>
      <VBtn
        v-if="switchs.agenda"
        fab
        dark
        small
        color="red"
        @click="agendaDialog = true"
      >
        <VIcon>mdi-pencil-plus-outline</VIcon>
      </VBtn>
    </VSpeedDial>
    <VDialog
      v-model="dialog"
      max-width="500px"
    >
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
          />
          <small class="grey--text">{{ hint }}</small>
        </VCardText>
        <VCardActions>
          <div class="flex-grow-1" />
          <VBtn
            text
            color="primary"
            @click="submit()"
          >
            提交
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog
      v-model="agendaDialog"
      max-width="500px"
    >
      <BiliobAgendaFormCard @close="agendaDialog = false" />
    </VDialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showAdd: false,
      fab: false,
      ID: "",
      offset: 0,
      switchs: {
        video: false,
        author: false,
        agenda: false
      },
      agendaDialog: false,
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
        required: (value) => value != "" || "告诉我要观测什么吧"
      }
    };
  },
  watch: {
    "$route.path": function (val) {
      this.switchs.video =
        val == "/" || val.indexOf("video") != -1 ? true : false;
      this.switchs.author =
        val == "/" || val.indexOf("author") != -1 || val.indexOf("fans") != -1
          ? true
          : false;
      this.switchs.agenda = val.indexOf("agenda") != -1 ? true : false;
      if (
        Object.values(this.switchs).reduce((x, b) => {
          return x || b;
        }, false)
      ) {
        this.showAdd = true;
      } else {
        this.showAdd = false;
      }
    }
  },
  mounted() {
    this.updateOptions(this.$route.path);
    this.$addEvent(window, "scroll", () => {
      this.offset = window.pageYOffset;
    });
  },
  methods: {
    updateOptions(val) {
      this.switchs.video =
        val == "/" || val.indexOf("video") != -1 ? true : false;
      this.switchs.author =
        val == "/" || val.indexOf("author") != -1 || val.indexOf("fans") != -1
          ? true
          : false;
      this.switchs.agenda = val.indexOf("agenda") != -1 ? true : false;
      if (
        Object.values(this.switchs).reduce((x, b) => {
          return x || b;
        }, false)
      ) {
        this.showAdd = true;
      } else {
        this.showAdd = false;
      }
    },
    getVideoUrl() {
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
<style scoped>
.rotated {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: -webkit-transform 0.1s linear;
  transition: transform 0.1s linear;
}
</style>
