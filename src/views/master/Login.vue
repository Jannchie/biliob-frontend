<template>
  <VContainer>
    <VRow justify="center">
      <VCol
        cols="12"
        lg="6"
      >
        <BiliobCard
          title="登录 - BiliOB"
          light
          border="bottom"
          style="height:100%"
        >
          <VCardText class="caption text-center">
            <VImg
              max-height="80"
              contain
              lazy-src="./img/icons/android-chrome-192x192.png"
              src="./img/icons/android-chrome-192x192.png"
            />
            这是一个由Jannchie见齐维护的第三方网站，
            <br>BiliOB观测者的账号信息和B站并不互通，
            <br>新用户请点击注册按钮注册一个账号。
          </VCardText>
          <VCardActions>
            <VForm
              v-model="valid"
              style="width:100%"
            >
              <VTextField
                v-model="name"
                prepend-icon="mdi-clipboard-account"
                :rules="[rules.required]"
                autocomplete="username"
                label="用户名/邮箱"
                required
              />
              <VTextField
                v-model="password"
                prepend-icon="mdi-lock-question"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="input"
                label="密码"
                :rules="[rules.required, rules.min]"
                autocomplete="current-password"
                hint="至少6个字符"
                class="input-group--focused"
                @keyup.enter="submit"
                @click:append="show = !show"
              />
              <Center>
                <VBtn
                  color="primary"
                  :disabled="!valid"
                  @click="submit"
                >
                  登录
                </VBtn>
                <VBtn to="/signin">
                  注册
                </VBtn>
              </Center>
            </VForm>
          </VCardActions>
          <VCardActions>
            <VBtn
              small
              to="/privacy"
              text
            >
              隐私权政策
            </VBtn>
            <VBtn
              small
              to="/password"
              text
            >
              忘记密码？
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
      name: "",
      password: "",
      valid: null,
      show: null,
      msg: "",
      showAlert: false,
      type: "success",
      rules: {
        required: (value) => !!value || "我感受到了虚无！",
        min: (v) => v.length >= 6 || "长度..并不够..."
      }
    };
  },
  created() {
    document.onkeydown = function () {
      var key = window.event.keyCode;
      if (key == 13) {
        this.submit();
      }
    };
  },
  mounted() {
    this.$store.commit("toElse");
  },
  methods: {
    submit() {
      if (!this.valid) {
        return;
      }
      this.axios
        .post(`/login`, {
          name: this.name,
          password: this.password
        })
        .then((res) => {
          this.$store.dispatch("login");
          this.$router.push("/");
          console.log(res);
          localStorage.setItem("token", res.data.data);
        })
        .catch((error) => {
          this.$store.commit("showMessage", {
            msg: error.response.data.msg,
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
.v-alert {
  margin: 0px;
  position: absolute;
  left: 15px;
  right: 15px;
}
</style>
