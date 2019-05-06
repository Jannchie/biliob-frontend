<template>
  <div>
    <MaterialCard
      :title="title"
      :text="subTitle"
      :color="color"
      :card-padding="'pa-0'"
      class="card elevation-10 pa-0"
    >
      <VResponsive
        :aspect-ratio="aspectRatio"
        style="margin-top:30px"
      >
        <VProgressCircular
          v-show="loading"
          :size="50"
          color="primary"
          indeterminate
          class="progress-circular"
        ></VProgressCircular>
        <Chart
          v-show="!loading"
          :theme="theme"
          :auto-resize="true"
          :options="options"
          style="width:100%;height:100%;"
        />
      </VResponsive>
    </MaterialCard>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {
          a: 1
        };
      }
    },
    title: {
      type: String,
      default: function() {
        return "华丽的标题";
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
      videoData: {},
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
.video-img {
  height: 70px;
  border-radius: 4px;
}
.progress-circular {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
}
.chart-title {
  width: 98%;
  margin: auto;
  position: relative;
  border-radius: 8px;
  margin-bottom: -80px;
}
</style>
