<template>
  <BiliobCard title="UP主历史成就">
    <VTimeline dense>
      <VTimelineItem
        v-for="(achievement, i) in sortedAchievements"
        :key="i"
        :icon="
          achievement.level == 10
            ? 'mdi-nuke'
            : `mdi-numeric-${achievement.level}`
        "
        :small="achievement.level < 5 ? true : false"
        :color="getColor(achievement)"
      >
        <div>
          <h4
            :class="`${getColor(achievement)}--text`"
            style="overflow:hidden; text-overflow: ellipsis;"
          >
            {{ achievement.name }}
          </h4>
          <div
            class="text--secondary"
            style="overflow:hidden; text-overflow: ellipsis;"
          >
            {{ achievement.desc }}
            <span v-if="achievement.value != 0">
              （ 观测检定值
              {{ $numberFormat(achievement.value, false, 0) }}）</span>
          </div>
          <div
            class="text--disabled"
            style="overflow:hidden; text-overflow: ellipsis;"
          >
            {{
              achievement.date == undefined
                ? "遥远的过去"
                : $timeFormat(
                  achievement.date.replace("+00:00", "+0800"),
                  "YYYY-MM-DD HH:mm:ss"
                )
            }}
          </div>
        </div>
      </VTimelineItem>
    </VTimeline>
  </BiliobCard>
</template>
<script>
export default {
  props: {
    authorData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      sortedAchievements: []
    };
  },
  mounted() {
    this.sortedAchievements = this.authorData.achievements.sort((a, b) => {
      if (a.date == b.date) {
        return b.level - a.level;
      } else {
        return a.date - b.date;
      }
    });
  },
  methods: {
    getColor(achievement) {
      if (achievement.code >= 4000 && achievement.code < 5000) {
        return "green";
      }
      switch (achievement.level) {
        case 10:
          return "red";
        case 9:
          return "orange";
        case 8:
          return "purple";
        case 7:
          return "blue";
        case 6:
          return "blue";
        case 5:
          return "blue";
        case 4:
          return "blue";
        default:
          return "cyan";
      }
    }
  }
};
</script>
