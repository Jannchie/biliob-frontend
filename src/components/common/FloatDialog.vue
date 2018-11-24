<template>
  <v-dialog v-model="dialog" width="500">
    <float-btn @getType="getType" slot="activator"></float-btn>
    <v-card>
      <v-alert :value="showAlert" :type="alertType" transition="scale-transition">
        {{msg}}
      </v-alert>
      <v-card-title class="headline" primary-title>
        {{title}}
      </v-card-title>
      <v-form>
          <v-card-text v-if="type==='else'">
            如果遇到了任何问题，或者有什么意见或者建议，请联系我：jannchie@gmail.com
          </v-card-text>
        <v-card-text>
          <v-text-field v-if="type!='else'" required v-model="ID" :rules="[rules.required,rules.isNumber]" :label="label"></v-text-field>
        </v-card-text>
        <v-divider v-if="type!='else'"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-model="valid" flat @click="submit" v-if="type!='else'">
            确认添加
          </v-btn>

        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import FloatBtn from './FloatBtn.vue'
export default {
  components: {
    FloatBtn
  },
  data () {
    return {
      dialog: false,
      type: '',
      valid: false,
      title: '这个绿色的按钮还没有做内容，点击视频或者作者的菜单这个按钮会发生变化',
      label: '',
      alertType: 'success',
      ID: null,
      showAlert: false,
      msg: '',
      url: '',
      rules: {
        required: value => !!value || '告诉我要观测什么吧=（づ￣3￣）づ╭❤～',
        isNumber: value => {
          if (!isNaN(value)) {
            return true
          } else {
            return '请输入一串数字嘛Ծ‸Ծ'
          }
        }
      }
    }
  },
  methods: {
    getType (t) {
      this.type = t
      this.dialog = true
      switch (t) {
        case 'video':
          this.title = '观测新的视频'
          this.label = '请输入AV号'
          this.url = `/video`
          break
        case 'author':
          this.title = '观测新的UP主'
          this.label = '请输入UP主ID(数字)'
          this.url = `/author`
          break
        case 'else':
          this.title = 'Jannchie见齐 维护'
          break
      }
    },
    submit () {
      switch (this.type) {
        case 'video':
          this.axios.post(this.url,
            Number(this.ID)
          )
            .then((response) => {
              this.msg = response.data.msg
              this.alertType = 'success'
              this.showAlert = true
              setTimeout(() => { this.showAlert = false }, 1500)
            })
            .catch((error) => {
              this.msg = error.response.data.msg
              this.alertType = 'error'
              this.showAlert = true
              setTimeout(() => { this.showAlert = false }, 1500)
            })
          break
        case 'author':
          this.axios.post(
            this.url, Number(this.ID))
            .then((response) => {
              this.msg = response.data.msg
              this.alertType = 'success'
              this.showAlert = true
              setTimeout(() => { this.showAlert = false }, 1500)
            })
            .catch((error) => {
              this.msg = error.response.data.msg
              this.alertType = 'error'
              this.showAlert = true
              setTimeout(() => { this.showAlert = false }, 1500)
            })
          break
      }
    }
  }
}

</script>
