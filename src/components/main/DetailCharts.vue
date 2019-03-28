<template>
  <VCard class="card">
    <VResponsive :aspect-ratio="aspectRatio">
      <div></div>
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
  </VCard>
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
      },
      required: true
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
</style>
