<template>
  <BiliobCard title="个人信息" light border="bottom ">
    <VDialog v-model="dialog" persistent max-width="500">
      <VCard>
        <VCardTitle class="headline grey lighten-2" primary-title>
          修改昵称
        </VCardTitle>

        <VCardText>
          <VRow>
            <VCol> 注：修改一次昵称需要消耗60点积分 </VCol>
            <VCol cols="12">
              <VTextField
                v-model="newNickName"
                :counter="20"
                label="新的昵称"
                messages="输入新的昵称"
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
            v-model="nickName"
            :counter="20"
            label="昵称"
            disabled
            messages="观测者显示的名称。"
            required
          ></VTextField>
        </VCol>
        <VCol cols="auto">
          <VBtn text color="primary" block large @click="changeNickName">
            <VIcon left dark>mdi-rename-box</VIcon>修改昵称</VBtn
          >
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="email"
            :rules="mailRules"
            label="E-mail"
            messages="用于登陆或者密码找回。"
            disabled
            required
          >
            <!-- <template v-slot:append-outer>
                <VBtn to=""> 123</VBtn>
              </template> -->
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
    mailRules: [
      value => !!value || "邮箱不得为空~",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "这不是一个合法的邮箱！";
      }
    ],
    rules: {
      required: value => !!value || "我必须知道这一项！求求你告诉我吧~",
      min: v => v.length >= 6 || "这么短小的话，也太不安全了吧",
      max: v => v.length <= 20 || "太长了！",
      passwdMatch: v => {
        return v === this.password || "貌似两次输入不一致..手速太快了？";
      },
      email: v => {
        return this.mailVerification(v) || "据我所知，邮箱好像不长这样啊！";
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
  methods: {
    changeEmail() {
      this.dialog = true;
    },
    changeNickName() {
      this.dialog = true;
    },
    submit() {
      if (this.nickName == this.newNickName) {
        this.$store.commit("showMessage", {
          msg: "新昵称和原昵称相同",
          color: "error"
        });
      } else {
        this.axios
          .post(`/user/nickname`, this.newNickName)
          .then(response => {
            this.msg = response.data.msg;
            this.$store.commit("setNickName", response.data.data.nickName);
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
