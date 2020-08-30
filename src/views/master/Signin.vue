<template>
  <VLayout justify-center>
    <VFlex
      lg5
      md12
    >
      <BiliobCard title="注册">
        <div style="position: absolute;left:15px;right:15px;">
          <MaterialNotification
            :value="alertSuccess"
            type="success"
            transition="scale-transition"
          >
            恭喜！操作成功！
          </MaterialNotification>
          <MaterialNotification
            :value="alertError"
            type="error"
            transition="scale-transition"
          >
            抱歉！{{ errorMsg }}!
          </MaterialNotification>
        </div>

        <div>
          <div class="body-1">
            这是一个第三方网站，账号信息和B站并不通用。
            <br>登录后可以自主添加视频追踪，还能够实现关注UP主和收藏视频的功能。
            <br>登录后还能签到获取积分，消耗积分获取更多数据情报。
          </div>
        </div>
        <VCardActions>
          <VForm
            v-model="valid"
            style="width:100%"
          >
            <VTextField
              v-model="name"
              :rules="[rules.required, rules.max]"
              :counter="50"
              label="请输入用户名"
            />
            <VTextField
              v-model="mail"
              :readonly="mailDisabled"
              :rules="[rules.required, rules.email]"
              label="请输入邮箱"
            />
            <VLayout>
              <VFlex md8>
                <VTextField
                  v-model="activationCode"
                  :rules="[rules.required]"
                  label="请输入验证激活码"
                />
              </VFlex>
              <VFlex
                md4
                class="align-self-center"
              >
                <VBtn
                  text
                  :loading="loading"
                  color="primary"
                  :disabled="!mailVerification(mail)"
                  @click.stop="sendActivationCode"
                >
                  向邮箱发送验证码
                </VBtn>
              </VFlex>
            </VLayout>
            <VTextField
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="请输入密码"
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
            <Center>
              <VBtn
                color="primary"
                :disabled="!valid"
                @click="submit"
              >
                注册
              </VBtn>
            </Center>
          </VForm>
        </VCardActions>
      </BiliobCard>
    </VFlex>
  </VLayout>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      mail: "",
      valid: false,
      show: null,
      alertSuccess: false,
      alertError: false,
      errorMsg: "",
      mailDisabled: false,
      loading: false,
      loader: "",
      activationCode: "",
      rules: {
        required: (value) => !!value || "我必须知道这一项！求求你告诉我吧~",
        min: (v) => v.length >= 6 || "这么短小的话，也太不安全了吧",
        max: (v) => v.length <= 50 || "太长了！",
        passwdMatch: (v) => {
          return v === this.password || "貌似两次输入不一致..手速太快了？";
        },
        email: (v) => {
          return this.mailVerification(v) || "据我所知，邮箱好像不长这样啊！";
        }
      }
    };
  },
  mounted() {
    this.$store.commit("toElse");
  },
  methods: {
    mailVerification(v) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      );
    },
    submit() {
      this.axios
        .post("/user", {
          name: this.name,
          password: this.password,
          activationCode: this.activationCode,
          mail: this.mail
        })
        .then(() => {
          this.alertSuccess = true;
          this.alertError = false;
          this.logined = true;
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch((error) => {
          this.alertError = true;
          this.errorMsg = error.response.data.msg;
          setTimeout(() => {
            this.alertError = false;
          }, 2000);
        });
    },
    sendActivationCode() {
      this.mailDisabled = true;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 60 * 1000);
      this.axios
        .post(`/user/activation-code?mail=${this.mail}`)
        .then(() => {
          this.$store.commit("showMessage", {
            msg: "成功发送验证码",
            color: "success"
          });
        })
        .catch((error) => {
          this.errorMsg = error.response.data.msg;
          this.$store.commit("showMessage", {
            msg: this.errorMsg,
            color: "error"
          });
        });
    }
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
}
</style>
