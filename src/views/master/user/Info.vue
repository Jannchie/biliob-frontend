<template>
  <BiliobCard title="个人信息" light border="bottom ">
    <VDialog v-model="dialog" persistent max-width="500">
      <VCard>
        <VCardTitle class="headline grey lighten-2" primary-title>
          {{ type }}
        </VCardTitle>

        <VCardText v-if="type == '修改昵称'">
          <VRow>
            <VCol> 注：修改一次需要消耗50点积分 </VCol>
            <VCol cols="12">
              <VTextField
                v-model="newNickName"
                label="新的昵称"
                :counter="20"
                required
                :rules="[rules.required, rules.max]"
                @keyup.enter="submit"
              ></VTextField>
            </VCol>
          </VRow>
        </VCardText>
        <VCardText v-else-if="type == '修改邮箱'">
          <VRow>
            <VCol> 注：修改一次需要消耗50点积分 </VCol>
            <VCol cols="12">
              <VTextField
                v-model="newMail"
                label="新的邮箱"
                :counter="20"
                required
                :rules="[rules.required, rules.max]"
                @keyup.enter="submit"
              ></VTextField>
            </VCol>
          </VRow>
        </VCardText>
        <VDivider></VDivider>
        <VCardActions>
          <div class="flex-grow-1"></div>
          <VBtn color="primary" text @click.native.prevent="dialog = false">
            取消操作
          </VBtn>
          <VBtn color="primary" dark @click.native.prevent="submit()">
            确认修改
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VContainer>
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="title"
            outlined
            disabled
            :counter="20"
            label="头衔"
            messages="根据观测者经验值计算得出"
            required
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="userName"
            disabled
            outlined
            :counter="20"
            label="用户名"
            messages="登陆凭证之一，不可修改。"
            required
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol class="flex-grow-1">
          <VTextField
            v-model="newNickName"
            :counter="20"
            outlined
            label="昵称"
            messages="观测者显示的名称。"
            required
            append-outer-icon="mdi-rename-box"
            @click:append-outer="changeNickName"
          ></VTextField>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="newMail"
            outlined
            :rules="mailRules"
            label="E-mail"
            messages="用于登陆。"
            required
            append-outer-icon="mdi-rename-box"
            @click:append-outer="changeEmail"
          >
          </VTextField>
        </VCol>
      </VRow>
    </VContainer>
  </BiliobCard>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    newNickName: "",
    newMail: "",
    type: "",
    mailRules: [
      value => !!value || "邮箱不得为空",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "这不是一个合法的邮箱！";
      }
    ],
    rules: {
      required: value => !!value || "该项不可或缺！",
      min: v => v.length >= 6 || "再长长长长长点",
      max: v => v.length <= 20 || "太长了！",
      passwdMatch: v => {
        return v === this.password || "貌似两次输入不一致..手速太快了？";
      },
      email: v => {
        return this.mailVerification(v) || "这不是一个合法的邮箱！";
      }
    }
  }),
  computed: {
    userName: function() {
      return this.$store.getters.getUserName;
    },
    nickName: function() {
      return this.$store.getters.getNickName;
    },
    email: function() {
      return this.$store.getters.getMail;
    },
    title: function() {
      return this.$store.getters.getTitle;
    }
  },
  mounted() {
    this.newNickName = this.$store.getters.getNickName;
    this.newMail = this.$store.getters.getMail;
  },
  methods: {
    changeEmail() {
      this.type = "修改邮箱";
      this.dialog = true;
    },
    changeNickName() {
      this.type = "修改昵称";
      this.dialog = true;
    },
    submit() {
      if (this.type == "修改昵称") {
        var url = `/user/nickname`;
        var sameMsg = `新昵称和原昵称相同`;
        var lastValue = this.nickName;
        var newValue = this.newNickName;
        var postData = this.newNickName;
        var set = "setNickName";
      } else if (this.type == "修改邮箱") {
        url = `/user/mail`;
        sameMsg = `新邮箱和原邮箱相同`;
        lastValue = this.mail;
        newValue = this.newMail;
        postData = { mail: this.newMail };
        set = "setMail";
      }
      if (lastValue == newValue) {
        this.$store.commit("showMessage", {
          msg: sameMsg,
          color: "error"
        });
      } else {
        this.axios
          .post(url, postData)
          .then(response => {
            this.msg = response.data.msg;
            this.$store.commit(set, newValue);
            this.$store.commit("showMessage", {
              msg: response.data.msg,
              color: "info"
            });
          })
          .catch(error => {
            this.$store.commit("showMessage", {
              msg: error.response.data.msg,
              color: "error"
            });
          });
      }

      this.dialog = false;
    }
  }
};
</script>
