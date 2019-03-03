<template>
  <VTimeline
    class="timeline"
    dense
  >
    <VSlideYTransition group>
      <VTimelineItem
        v-for="(eachPost,index) in timelinePost"
        :key="index"
        :color="getColor(eachPost.type)"
        :icon="getIcon(eachPost.type)"
        :large="isLarge(eachPost.type)"
      >
        <VLayout pt-3>
          <VFlex>
            <strong>{{ eachPost.title }}</strong><span
              class="grey white--text darken-2"
              style="border-radius:3px;padding:1px 5px;margin:0px 5px"
            >{{eachPost.version}}</span>
            <br>
            <strong class="caption mb-1">
              {{ eachPost.date }}
            </strong>
            <div class="caption mb-2">
              <div
                v-for="eachLine in eachPost.list"
                :key="eachLine.text"
                type="circle"
              >
                <VIcon small>{{getListIcon(eachLine.type)}}</VIcon>
                {{ eachLine.text }}
              </div>
            </div>
          </VFlex>
        </VLayout>
      </VTimelineItem>
    </VSlideYTransition>
  </VTimeline>
</template>
<script>
import log from "../../static/log.json";

export default {
  data() {
    return {
      timelinePost: log
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.timelinePost.reverse();
  },
  methods: {
    isLarge: function(type) {
      let isSmall;
      type === "holyshit" || type === "important"
        ? (isSmall = true)
        : (isSmall = false);
      return isSmall;
    },
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
    },
    getColor: function(type) {
      switch (type) {
        case "ordinary":
          return "orange lighten-1";
        case "unimportant":
          return "green lighten-1";
        case "holyshit":
          return "red lighten-1";
        case "important":
          return "blue lighten-1";
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.timeline {
  margin: 0 10px;
}
</style>
