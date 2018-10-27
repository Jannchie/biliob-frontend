<template>
  <v-card>
    <v-card-title>
      <div>
        <h3 class="headline mb-1">注册</h3>
        <div>这是一个第三方网站，账号信息和B站并不通用， <br>这是一个个人项目，所以账号的这个账号仅可用于该站点。</div>
      </div>
    </v-card-title>
    <v-card-actions >
      <v-form v-model="valid" style="width:100%">
        <v-text-field v-model="name" :rules="[rules.required]" label="请输入用户名"></v-text-field>
        <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            label="请输入密码"
            :rules="[rules.required]"
            @click:append="show = !show"
            hint="至少6个字符"
            v-model="password"
          ></v-text-field>
        <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required, rules.min,rules.passwdMatch]"
            name="input"
            label="请再输入一次密码呗"
            hint="至少6个字符"
            @click:append="show = !show"
          ></v-text-field>
        <center>
          <v-btn color="primary" :disabled="!valid" @click="submit">注册</v-btn>
        </center>
      </v-form>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      password: null,
      valid: false,
      show: null,
      rules: {
        required: value => !!value || '你必须让我知道这个字段的值',
        min: v => v.length >= 6 || '这么短小的话，也太不安全了吧',
        passwdMatch: (v) => {
          return (v === this.password) || '貌似两次输入不一致..手速太快了？'
        }
      }
    }
  },
  methods: {
    submit () {
      this.axios.post(this.apiurl + '/user', {
        name: this.name,
        password: this.password
      }).then((response) => {
        this.videoList = response.data
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
