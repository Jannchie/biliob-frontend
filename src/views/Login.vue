<template>
  <VLayout justify-center>
    <VFlex lg5 md12>
      <BiliobDarkInfo title="登录" border="bottom">
        <div slot="body">
          <div>
            <MaterialNotification
              :value="showAlert"
              :type="type"
              transition="slide-y-transition"
            >
              {{ msg }}
            </MaterialNotification>
          </div>
          <VCardTitle>
            <div>
              <div class="body-1">
                这是一个第三方网站，账号信息和B站并不通用，
                <br />新用户请点击注册按钮注册一个账号。
              </div>
            </div>
          </VCardTitle>
          <VCardActions>
            <VForm v-model="valid" style="width:100%">
              <VTextField
                v-model="name"
                :rules="[rules.required]"
                autocomplete="username"
                label="用户名/邮箱"
                required
              />
              <VTextField
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="input"
                label="密码"
                :rules="[rules.required, rules.min]"
                autocomplete="current-password"
                hint="至少6个字符"
                class="input-group--focused"
                @click:append="show = !show"
              />
              <Center>
                <VBtn color="primary" :disabled="!valid" @click="submit">
                  登录
                </VBtn>
                <VBtn to="/signin">
                  注册
                </VBtn>
              </Center>
            </VForm>
          </VCardActions>
        </div>
      </BiliobDarkInfo>
    </VFlex>
  </VLayout>
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
        required: value => !!value || "求求你告诉我吧o(╥﹏╥)o",
        min: v => v.length >= 6 || "这么短小的嘛OωO"
      }
    };
  },
  mounted() {
    this.$store.commit("toElse");
  },
  methods: {
    submit() {
      this.axios
        .post(`/login`, {
          name: this.name,
          password: this.password
        })
        .then(response => {
          this.msg = response.data.msg;
          this.type = "success";
          this.showAlert = true;
          this.$store.commit("login");
          this.$store.commit("setUserName", response.data.data.name);
          this.$store.commit("setRole", response.data.data.role);
          this.$store.commit("setCredit", response.data.data.credit);
          this.$store.commit(
            "setFavoriteVideo",
            response.data.data.favoriteAid
          );
          this.$store.commit(
            "setFavoriteAuthor",
            response.data.data.favoriteMid
          );
          setTimeout(() => {
            window.location.href = "https://www.biliob.com";
          }, 2000);
        })
        .catch(error => {
          this.showAlert = true;
          this.type = "error";
          this.msg = error.response.data.msg;
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
