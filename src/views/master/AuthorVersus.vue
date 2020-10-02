<template>
  <VContainer>
    <VRow>
      <VCol>
        <BiliobCard
          light
          border="bottom"
          title="榜首粉丝实时差距"
        >
          <VRow>
            <VCol class="text-center">
              <div>粉丝数</div>
              <VOdometer
                class="font-weight-black blue--text text--darken-1 sub-title"
                :value="aFans"
                format="(,ddd).d"
              />
              <div style="text-align: center">
                <VAvatar
                  :size="100"
                  @click.stop="jumpToAuthorPage(aMid)"
                >
                  <VImg
                    :src="zipPic(aFace.replace('http:', ''))"
                    :lazy-src="zipPic(aFace.replace('http:', ''))"
                  />
                </VAvatar>
              </div>
              <div
                :class="`title grey--text `"
                style="text-align: center; margin-top: 10px"
              >
                {{ aName }}
              </div>
            </VCol>
            <VCol class="text-center vs-text">
              <div
                v-if="$vuetify.breakpoint.mdAndDown"
                class="display-3 font-weight-black red--text "
              >
                VS
              </div>
              <div
                v-if="$vuetify.breakpoint.lgAndUp"
                class="display-4 font-weight-black red--text "
              >
                VS
              </div>
              <div class="title">
                实时差距
              </div>
              <div>
                <CommonVOdometer
                  class="font-weight-black blue--text text--darken-1 title"
                  :value="deltaFans"
                  format="(,ddd).d"
                />
              </div>
            </VCol>
            <VCol class="text-center">
              <div>粉丝数</div>
              <VOdometer
                class="font-weight-black blue--text text--darken-1 sub-title"
                :value="bFans"
                format="(,ddd).d"
              />
              <div style="text-align: center">
                <VAvatar
                  size="100"
                  style="text-align: center"
                  @click.stop="jumpToAuthorPage(bMid)"
                >
                  <VImg
                    :src="zipPic(bFace.replace('http:', ''))"
                    :lazy-src="zipPic(bFace.replace('http:', ''))"
                  />
                </VAvatar>
              </div>
              <div
                :class="`title grey--text `"
                style="text-align: center; margin-top: 10px"
              >
                {{ bName }}
              </div>
            </VCol>
          </VRow>
        </BiliobCard>
      </VCol>
    </VRow>

    <DetailCharts
      title="实时粉丝数变化 - 十分钟变化情况"
      :sub-sub-title="`${aName} VS ${bName}`"
      :options="fansVersusOptions"
    />
  </VContainer>
</template>
<script>
// var format = require("date-fns/format");
import VOdometer from "@/components/common/VOdometer.vue";
import getOptions from "@/charts/author-fans-versus.js";
import DetailCharts from "@/components/main/DetailCharts.vue";
export default {
  components: { VOdometer, DetailCharts },
  data() {
    return {
      aOfficial: String(),
      aName: String(),
      aFace: String(),
      bOfficial: String(),
      bName: String(),
      bFace: String(),
      aData: [],
      bData: [],
      counter: 0,
      fansVersusOptions: Object(),
      aggregateParam: 60
    };
  },
  computed: {
    deltaFans() {
      if (this.aFans != 0 && this.bFans != 0) {
        return this.aFans - this.bFans;
      } else {
        return 0;
      }
    },
    aMid() {
      return this.$route.query.aMid;
    },
    bMid() {
      return this.$route.query.bMid;
    },
    aFans() {
      if (this.aData.length == 0) {
        return 0;
      }
      return this.aData[0].fans;
    },
    bFans() {
      if (this.aData.length == 0) {
        return 0;
      }
      return this.bData[0].fans;
    }
  },
  mounted() {
    this.axios.get(`/author/top`).then(r => {
      this.aName = r.data[0].name;
      this.aFace = r.data[0].face;
      this.aData = r.data[0].data;
      this.bName = r.data[1].name;
      this.bFace = r.data[1].face;
      this.bData = r.data[1].data;
      this.fansVersusOptions = getOptions(
        this.aData,
        this.bData,
        this.aName,
        this.bName
      );
    });
    const timer = setInterval(this.refresh, 60000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    jumpToAuthorPage(mid) {
      this.$router.push(`/author/${mid}`);
    },
    refresh() {
      this.axios.get(`/author/top/refresh`).then(r => {
        this.aName = r.data[0].name;
        this.aFace = r.data[0].face;
        this.bName = r.data[1].name;
        this.bFace = r.data[1].face;
        // 交换
        if (r.data[0].name != this.aName) {
          var temp = this.aData;
          this.aData = this.bData;
          this.bData = temp;
        }
        this.aData.unshift(r.data[0].data[0]);
        this.bData.unshift(r.data[1].data[0]);
        this.fansVersusOptions = getOptions(
          this.aData,
          this.bData,
          this.aName,
          this.bName
        );
      });
    }
  }
};
</script>
