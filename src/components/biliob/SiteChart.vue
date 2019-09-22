<template>
  <BiliobCard :title="title" light border="bottom">
    <VLayout :column="this.$vuetify.breakpoint.mdAndDown">
      <VFlex lg8 md12>
        <div height="100%" class="pa-5">
          <Chart
            v-if="!loading"
            :theme="theme"
            :auto-resize="true"
            :options="options"
            :style="`height:${height}px; width:100%; `"
          />
        </div>
      </VFlex>
      <VFlex lg4 md12>
        <div tile height="100%" class="pa-5">
          <BiliobDarkInfo class="subtitle inline" border="left">
            <div class="py-0 px-3 caption">
              24小时内最高在线观看
            </div>
          </BiliobDarkInfo>
          <p class="title site-aside-value font-weight-bold">
            {{ bigestWatching }}
          </p>
          <BiliobDarkInfo class="subtitle inline" border="left">
            <div class="py-0 px-3 caption ">
              24小时内最高在线人数
            </div>
          </BiliobDarkInfo>
          <p class="title site-aside-value font-weight-bold">
            {{ bigestOnline }}
          </p>
          <BiliobDarkInfo class="subtitle inline" border="left">
            <div class="py-0 px-3 caption ">
              本月最值
            </div>
          </BiliobDarkInfo>
          <p class="title site-aside-value font-weight-bold">
            {{ currentMonthTop }}
          </p>
          <BiliobDarkInfo class="subtitle inline" border="left">
            <div class="py-0 px-3 caption ">
              环比上月
            </div>
          </BiliobDarkInfo>
          <p class="title site-aside-value font-weight-bold">
            {{ compareWithLastMonth }}
          </p>
          <BiliobDarkInfo class="subtitle inline" border="left">
            <div class="py-0 px-3 caption ">
              环比去年
            </div>
          </BiliobDarkInfo>
          <p class="title site-aside-value font-weight-bold">
            {{ compareWithLastYear }}
          </p>
        </div>
      </VFlex>
    </VLayout>
  </BiliobCard>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    title: {
      type: String,
      default: function() {
        return "";
      }
    },
    subTitle: {
      type: String,
      default: function() {
        return "";
      }
    },
    color: {
      type: String,
      default: function() {
        return "deepblue";
      }
    },
    height: {
      type: Number,
      default: function() {
        return this.$vuetify.breakpoint.mdAndUp ? 350 : 200;
      }
    }
  },
  data() {
    return {
      theme: "colorful",
      siteGroupInfo: undefined
    };
  },
  computed: {
    ...mapGetters([
      "bigestWatching",
      "bigestOnline",
      "currentMonthTop",
      "compareWithLastMonth",
      "compareWithLastYear"
    ]),
    isDark() {
      return this.$store.state.dark;
    },

    aspectRatio() {
      if (document.body.clientWidth > 768) {
        return 2;
      } else {
        return 5 / 3;
      }
    },
    items() {
      if (this.options == {}) {
        return [];
      }
      let o = [];
      for (let index = 0; index < this.options.xAxis.data.length; index++) {
        o.push([
          this.options.xAxis.data[index],
          this.options.series[0].data[index],
          this.options.series[1].data[index]
        ]);
      }
      return o;
    },

    loading() {
      if (this.options.series == undefined) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    isDark(val) {
      if (val) {
        this.theme = "mydark";
      } else {
        this.theme = "colorful";
      }
    }
  },
  mounted() {
    if (this.$store.state.dark) {
      this.theme = "mydark";
    } else {
      this.theme = "colorful";
    }
  }
};
</script>

<style scoped>
.progress-circular {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
}
.site-aside-value {
  text-align: end;
}
</style>
