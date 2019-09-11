<template>
  <VTimeline class="timeline" dense>
    <VSlideYTransition group>
      <VTimelineItem
        v-for="(eachPost, index) in timelinePost"
        :key="index"
        :color="getColor(eachPost.type)"
        :icon="getIcon(eachPost.type)"
        :small="isSmall(eachPost.type)"
        :large="isLarge(eachPost.type)"
      >
        <BiliobCard>
          <VChip
            style="position: absolute; top: -10px"
            class="mr-2 elevation-3"
            small
            dark
            :color="getColor(eachPost.type)"
          >
            {{ eachPost.title }}</VChip
          >
          <div class="subheading mt-2">
            <span class="px-1">
              {{ eachPost.version }}
            </span>
            <span class="px-1">
              {{ eachPost.date }}
            </span>
          </div>
          <div class="caption mb-2">
            <div
              v-for="eachLine in eachPost.list"
              :key="eachLine.text"
              type="circle"
            >
              <VIcon small>{{ getListIcon(eachLine.type) }}</VIcon
              ><span style="vertical-align: middle">
                {{ eachLine.text }}
              </span>
            </div>
          </div>
        </BiliobCard>
      </VTimelineItem>
    </VSlideYTransition>
  </VTimeline>
</template>
<script>
import log from "@/../static/log.json";

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
      let isLarge;
      type === "holyshit" ? (isLarge = true) : (isLarge = false);
      return isLarge;
    },
    isSmall: function(type) {
      let isSmall;
      type === "unimportant" ? (isSmall = true) : (isSmall = false);
      return isSmall;
    },
    getIcon: function(type) {
      switch (type) {
        case "holyshit":
          return "mdi-nuke";
        case "important":
          return "mdi-flag";
        case "ordinary":
          return "mdi-chess-rook";
        case "unimportant":
          return "";
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
