<template>
  <VDialog :value="show" width="500">
    <VCard>
      <VCardText
        class="md-2 headline blue darken-2 white--text font-weight-black"
        primary-title
      >
        这里是BiliOB观测者
      </VCardText>

      <VCardText>
        <span display="flex">
          <span class="blue white--text darken-2" style="padding:1px 5px;"
            >版本</span
          >
          <span
            class="grey white--text darken-2"
            style="padding:1px 5px;margin-right:10px"
            >{{ log.version }}</span
          >
        </span>
        <span display="flex">
          <span class="green white--text darken-2" style="padding:1px 5px;"
            >日期</span
          >
          <span
            class="grey white--text darken-2"
            style="padding:1px 5px;margin-right:10px;"
            >{{ log.date }}</span
          >
        </span>
        <div
          class="subheading font-weight-black"
          style="margin-top:10px;margin-bottom:5px"
        >
          近期更新内容
        </div>
        <div class="caption mb-2">
          <div v-for="eachLine in log.list" :key="eachLine.text" type="circle">
            <VIcon small>{{ getListIcon(eachLine.type) }}</VIcon>
            {{ eachLine.text }}
          </div>
        </div>
      </VCardText>

      <VDivider></VDivider>

      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="primary" text @click="show = false">
          I got it
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<script>
import log from "../../../static/log.json";

export default {
  data() {
    return { show: Boolean(), log: Object() };
  },
  mounted() {
    this.show = false;
    this.log = log[log.length - 1];

    if (this.$cookies.get("ver") != this.log.version) {
      this.show = true;
      this.$cookies.set("ver", this.log.version, Infinity);
    }
  },
  methods: {
    getIcon: function(type) {
      switch (type) {
        case "holyshit":
          return "mdi-nuke";
        case "important":
          return "mdi-chess-queen";
        case "ordinary":
          return "mdi-chess-rook";
        case "unimportant":
          return "mdi-chess-pawn";
        default:
          break;
      }
    },
    getListIcon: function(type) {
      switch (type) {
        case "feature":
          return "mdi-lightbulb-on";
        case "fix":
          return "mdi-bug";
        case "beautify":
          return "mdi-flower";
        case "stone":
          return "mdi-rocket";
        case "cloud":
          return "mdi-cloud";
        default:
          break;
      }
    }
  }
};
</script>
