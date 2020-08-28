<template>
  <VTimeline
    class="timeline"
    dense
  >
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
            class="mr-2"
            small
            dark
            :color="getColor(eachPost.type)"
          >
            {{ eachPost.title }}
          </VChip>
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
              v-for="eachType in [
                'stone',
                'cloud',
                'feature',
                'fix',
                'beautify'
              ]"
              :key="eachType"
            >
              <div v-if="eachPost.list[eachType] != undefined">
                <div class="body-2 font-weight-bold">
                  <VIcon
                    left
                    small
                  >
                    {{ getListIcon(eachType) }}
                  </VIcon><span style="vertical-align: middle">{{
                    getTypeName(eachType)
                  }}</span>
                </div>
                <li
                  v-for="eachItem in eachPost.list[eachType]"
                  :key="eachItem"
                  class="ml-2"
                  style="list-style-type:circle"
                >
                  {{ eachItem }}
                </li>
              </div>
            </div>
          </div>
        </BiliobCard>
      </VTimelineItem>
    </VSlideYTransition>
  </VTimeline>
</template>
<script>
import log from "@/../public/docs/log.json";

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
    getTypeName(name) {
      switch (name) {
        case "stone":
          return "里程碑";
        case "feature":
          return "特性";
        case "fix":
          return "修复";
        case "beautify":
          return "美化";
        case "cloud":
          return "架构";
        default:
          return "其他";
      }
    },
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
