<template>
  <VCard style="margin-bottom:5px">
    <VCardText style="display:flex">
      <div class="index-div">
        <div :class="`${color}--text text--lighten-2`">RANK</div>
        <h1 :class="`display-2 font-weight-black ${color}--text text--darken-2`">{{formatedIndex}}</h1>
      </div>
      <div style="display:flex;flex-direction:column">
        <div
          class="name-div"
          style="flex:99"
        >
          <span :class="`title font-weight-black ${color}--text`">{{name}}</span>
          <RoleBadget :role="role" />
          <div :class="`subheading font-weight-black ${color}--text text--darken-4`">
            <span>EXP </span>{{exp}}
          </div>
        </div>
      </div>
      <div class="caption grey--text date-div">{{formatedDate}}</div>

      <div
        style="z-index:1"
        :class="`${color}--text text--lighten-5 display-1 font-weight-black title-div`"
      >{{title}}</div>
    </VCardText>
  </VCard>
</template>
<script>
import RoleBadget from "./RoleBadget.vue";
var format = require("date-fns/format");
export default {
  components: { RoleBadget },
  props: {
    index: Number(),
    exp: Number(),
    name: String(),
    role: String(),
    createTime: String()
  },
  computed: {
    formatedDate() {
      return format(this.createTime, "注册时间 YYYY-MM-DD HH:MM:SS");
    },
    formatedIndex() {
      return (Array(2).join(0) + (this.index + 1)).slice(-2);
    },
    color() {
      let v = this.exp;
      if (v < 100) {
        return "green";
      } else if (v < 200) {
        return "teal";
      } else if (v < 1280) {
        return "blue";
      } else if (v < 2560) {
        return "deep-orange";
      } else if (v < 5120) {
        return "pink";
      } else {
        return "red";
      }
    },
    title() {
      let v = this.exp;
      if (v < 100) {
        return "寻踪觅迹的初心者";
      } else if (v < 200) {
        return "沉浮信海的彷徨者";
      } else if (v < 1280) {
        return "本心不渝的追寻者";
      } else if (v < 2560) {
        return "洞悉法度的观想者";
      } else if (v < 5120) {
        return "与天同行的观测者";
      } else {
        return "观测站的管理员";
      }
    }
  },
  methods: {
    PrefixInteger(num, n) {
      return (Array(n).join(0) + (num + 1)).slice(-n);
    }
  }
};
</script>
<style scoped>
.index-div {
  text-align: center;
  margin-right: 16px;
  z-index: 2;
}
.name-div {
  vertical-align: top;
  z-index: 2;
}
.date-div {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
}
.title-div {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
}
</style>
