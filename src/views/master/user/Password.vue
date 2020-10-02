<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <BiliobCard title="修改密码">
          <VForm v-model="valid">
            <VTextField
              v-model="mail"
              :rules="[rules.required, rules.email]"
              label="请输入邮箱"
            />
            <BiliobActiveCodeTextField
              v-model="activeCode"
              :mail="mail"
            />
            <VTextField
              v-model="newPassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="请输入新的密码"
              value
              :counter="20"
              :rules="[rules.required, rules.max, rules.min]"
              hint="至少6个字符"
              @click:append="show = !show"
            />
            <VTextField
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required, rules.min, rules.max, rules.passwdMatch]"
              :counter="20"
              value
              name="input"
              label="请再输入一次密码呗"
              hint="至少6个字符"
              @click:append="show = !show"
            />
          </VForm>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary"
              :disabled="!valid"
              @click="submit"
            >
              <VIcon left>
                mdi-send
              </VIcon>提交 / submit
            </VBtn>
          </VCardActions>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
export default {
  data() {
    return {
      activeCode: "",
      valid: false,
      newPassword: "",
      newPasswordConfirm: "",
      mail: "",
      rules: {
        required: value => !!value || "我必须知道这一项！求求你告诉我吧~",
        min: v => v.length >= 6 || "这么短小的话，也太不安全了吧",
        max: v => v.length <= 20 || "太长了！",
        passwdMatch: v => {
          return v === this.newPassword || "貌似两次输入不一致..手速太快了？";
        },
        email: v => {
          return this.mailVerification(v) || "据我所知，邮箱好像不长这样啊！";
        }
      },
      show: null
    };
  },
  methods: {
    mailVerification(v) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      );
    },
    submit() {
      this.axios.put("/user/password", {
        activationCode: this.activeCode,
        mail: this.mail,
        password: this.newPassword
      });
    }
  }
};
</script>
<style scoped></style>
