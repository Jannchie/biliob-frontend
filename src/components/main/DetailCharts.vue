<template>
  <div>
    <BiliobCard
      :text="subTitle"
      :color="color"
    >
      <BiliobDarkInfo
        slot="offset"
        light
        :elevation="0"
        border="bottom"
      >
        <slot
          v-if="$slots.header"
          name="header"
        />
        <h3
          v-else
          class="px-5 py-1"
        >
          {{ title }}
        </h3>
      </BiliobDarkInfo>
      <VResponsive
        :aspect-ratio="aspectRatio"
        :style="`max-height:${height}px`"
      >
        <Chart
          :autoresize="true"
          :theme="theme"
          :options="options"
        />
        <VProgressCircular
          v-show="loading"
          :size="50"
          width="2"
          color="primary"
          indeterminate
          class="progress-circular"
        />
      </VResponsive>
    </BiliobCard>
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
    height: {
      type: Number,
      default: function() {
        return this.$vuetify.breakpoint.mdAndDown ? 220 : 300;
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
        return "primary";
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
      if (this.options.series == undefined || this.options == undefined) {
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
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
