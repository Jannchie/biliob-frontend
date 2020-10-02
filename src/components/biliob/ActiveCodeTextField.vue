<template>
  <VTextField
    v-model="code"
    label="验证码"
    :counter="6"
    required
    :rules="[rules.required, val => val.length == 6 || '长度不一致']"
    :append-outer-icon="loading ? `mdi-loading` : `mdi-send`"
    @input="$emit('input', code)"
    @click:append-outer="sendActivationCode"
  />
</template>

<script>
export default {
  props: {
    mail: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rules: {
        required: value => !!value || "该项不可或缺！"
      },
      loading: false,
      code: ""
    };
  },
  watch: {
    value(val) {
      this.code = val;
    }
  },
  methods: {
    sendActivationCode() {
      setTimeout(() => {
        this.loading = false;
      }, 60 * 1000);
      if (this.loading == true) {
        this.$store.commit("showMessage", {
          msg: "操作过于频繁",
          color: "warning"
        });
        return;
      }
      this.axios
        .post(`/user/activation-code?mail=${this.mail}`)
        .then(() => {
          this.$store.commit("showMessage", {
            msg: "成功发送验证码",
            color: "success"
          });
        })
        .catch(error => {
          this.errorMsg = error.response.data.msg;
          this.$store.commit("showMessage", {
            msg: this.errorMsg,
            color: "error"
          });
        });
      this.loading = true;
    }
  }
};
</script>

<style>
.mdi-loading {
  -webkit-animation: myRotate 1s linear infinite;
  animation: myRotate 1s linear infinite;
}
@-webkit-keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
