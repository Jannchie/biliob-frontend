<template>
  <v-card>
    <div>
      <v-alert :value="showAlert" :type="type" transition="scale-transition">
        {{msg}}
      </v-alert>
    </div>
    <v-card-title>
      <div>
        <h3 class="headline mb-1">登录</h3>
        <div>这是一个第三方网站，账号信息和B站并不通用， <br>新用户请点击注册按钮注册一个账号。</div>
      </div>
    </v-card-title>
    <v-card-actions >
      <v-form v-model="valid" style="width:100%">
        <v-text-field :rules="[rules.required]" v-model="name" browser-autocomplete="username" label="用户名" required></v-text-field>
        <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input"
            label="密码"
            :rules="[rules.required,rules.min]"
            v-model="password"
            browser-autocomplete="current-password"
            hint="至少6个字符"
            class="input-group--focused"
            @click:append="show = !show"
          ></v-text-field>
        <center>
          <v-btn color="primary" :disabled="!valid" @click="submit">登录</v-btn>
          <v-btn to="/signin">注册</v-btn>
        </center>
      </v-form>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      valid: null,
      show: null,
      msg: '',
      showAlert: false,
      type: 'success',
      rules: {
        required: value => !!value || '你必须让我知道这个字段的值',
        min: v => v.length >= 6 || '这么短小的话，也太不安全了吧'
      }
    }
  },
  methods: {
    submit () {
      this.axios.post(`${this.apiurl}/login`, {name: this.name, password: this.password}).then(response => {
        this.msg = response.data.msg
        this.type = 'success'
        this.showAlert = true
        setTimeout(() => {
          this.$store.commit('login')
          this.$router.push('/video')
        }, 2000)
      }).catch(error => {
        this.showAlert = true
        this.type = 'error'
        this.msg = error.response.data.msg
      })
    }
  }
}
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
    color: #999;
  }

</style>
