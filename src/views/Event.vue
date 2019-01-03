<template>
    <div>
        <VTimeline class="timeline" dense>
            <VTimelineItem v-for="(eachEvent,index) in eventData" 
                :key="index" fill-dot :color="getColor(eachEvent.type)" :icon="getIcon(eachEvent.type)">
                <VLayout pt-3>
                    <VFlex>
                        <strong>{{eachEvent.type}}</strong>&nbsp;
                        {{eachEvent.date}}<br>
                        
                        <div class="caption mb-2"><strong class="caption mb-1">{{eachEvent.author}}</strong>&nbsp;粉丝数变动率：{{eachEvent.rate}}</div>
                        <div v-if="eachEvent.cause.title != null" class="caption mb-2  text-no-wrap text-truncate">可能原因：发布视频<br>{{eachEvent.cause.title}}</div>
                        
                    </VFlex>
                </VLayout>
            </VTimelineItem>
        </VTimeline>
    </div>
</template>
<script>
var format = require("date-fns/format");
var { convertDateToUTC } = require("../charts/util/convertDateToUTC");
export default {
  data() {
    return {
      eventData: Object()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get("/event").then(response => {
      this.eventData = response.data.content;
      this.eventData.forEach(element => {
        element["date"] = format(
          convertDateToUTC(new Date(element.datetime)),
          "YYYY-MM-DD"
        );
      });
    });
  },
  methods: {
    getColor(type) {
      switch (type) {
        case "III级激增":
          return "red";
        case "II级猛增":
          return "red";
        case "I级增长":
          return "red";

        default:
          return "green";
      }
    },
    getIcon(type) {
      switch (type) {
        case "III级激增":
          return "mdi-emoticon-cool";
        case "II级猛增":
          return "mdi-emoticon-excited";
        case "I级增长":
          return "mdi-emoticon-happy";
        case "III级暴减":
          return "mdi-emoticon-poop";
        case "II级锐减":
          return "mdi-emoticon-dead";
        case "I级减少":
          return "mdi-emoticon-sad";
        default:
          return "mdi-thumb-down";
      }
    }
  }
};
</script>
<style scoped>
.timeline {
  margin: 0 5px;
}
</style>
