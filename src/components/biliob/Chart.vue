<template>
  <div>
    <BiliobDarkInfo class="py-2 px-5 title my-2" border="top">{{
      title
    }}</BiliobDarkInfo>
    <VLayout>
      <VFlex>
        <VResponsive :aspect-ratio="aspectRatio">
          <Chart
            v-if="!loading"
            :theme="theme"
            :auto-resize="true"
            :options="options"
            style="width:100%; height:100%;"
          />
          <VProgressCircular
            v-if="loading"
            :size="80"
            color="primary"
            indeterminate
            class="progress-circular"
          ></VProgressCircular>
        </VResponsive>
        <slot></slot>
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
.progress-circular {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
}
</style>
