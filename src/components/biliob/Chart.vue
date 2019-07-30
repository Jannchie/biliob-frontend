<template>
  <div>
    <BiliobDarkInfo class="py-2 px-5 title my-2" border="top">{{
      title
    }}</BiliobDarkInfo>
    <VLayout :column="this.$vuetify.breakpoint.mdAndDown">
      <VFlex lg8 md12>
        <VResponsive :aspect-ratio="aspectRatio" class="v">
          <VSheet height="100%">
            <Chart
              v-if="!loading"
              :theme="theme"
              :auto-resize="true"
              :options="options"
              style="width:100%; height:100%;"/>
            <VProgressCircular
              v-if="loading"
              :size="80"
              color="primary"
              indeterminate
              class="progress-circular"
            ></VProgressCircular
          ></VSheet>
        </VResponsive>
      </VFlex>
      <VFlex lg4 md12>
        <VSheet tile height="100%">
          <BiliobDarkInfo class="py-2 px-5 subtitle " border="left"
            >24小时内最高在线观看</BiliobDarkInfo
          >
          <p class="title site-aside-value font-weight-bold">
            {{ bigestWatching }}
          </p>
          <BiliobDarkInfo class="py-2 px-5 subtitle " border="left"
            >24小时内最高在线人数</BiliobDarkInfo
          >
          <p class="title site-aside-value font-weight-bold">
            {{ bigestOnline }}
          </p>
        </VSheet>
      </VFlex>
    </VLayout>
  </div>
</template>
<script>
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
    }
  },
  data() {
    return {
      theme: "colorful"
    };
  },
  computed: {
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
    bigestWatching() {
      if (this.options.series != undefined) {
        this.options.series[0].data;
        return `约为${(
          Math.max.apply(null, this.options.series[0].data) / 10000
        ).toFixed(2)}万人`;
      } else {
        return null;
      }
    },
    bigestOnline() {
      if (this.options.series != undefined) {
        this.options.series[1].data;
        return `约为${(
          Math.max.apply(null, this.options.series[1].data) / 10000
        ).toFixed(2)}万人`;
      } else {
        return null;
      }
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
