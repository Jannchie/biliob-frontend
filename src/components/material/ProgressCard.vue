<template>
  <BiliobCard
    v-bind="$attrs"
    style="margin-top:25px;height:127px;padding-bottom:0px"
    class="progress-card"
    v-on="$listeners"
  >
    <VCard
      slot="offset"
      :class="`progress-card elevation-${elevation}`"
      style="height: 85px;padding: 15px !important;"
      :color="color"
      dark
    >
      <div>
        <VProgressLinear
          color="white"
          class="my-2"
          :value="percent"
          :indeterminate="indeterminate && value != 0"
        ></VProgressLinear>
        <VLayout>
          <VFlex md6>
            <div class="subtitle white--text font-weight-light">
              {{ title }}
            </div>
          </VFlex>
          <VFlex md6>
            <div
              v-if="!indeterminate"
              class="subtitle white--text font-weight-light text-xs-right"
            >
              <CommonVOdometer
                theme="minimal"
                format=""
                :value="percent"
              ></CommonVOdometer
              >%
            </div>
            <div
              v-else
              class="subtitle white--text font-weight-light text-xs-right"
            >
              <div v-if="value == 0"><VIcon>mdi-check</VIcon>已清空列表</div>
              <div v-if="value != 0">
                <VIcon>mdi-spin</VIcon>
                剩余任务数量：
                <CommonVOdometer
                  theme="minimal"
                  format=""
                  :value="value"
                ></CommonVOdometer>
              </div>
            </div>
          </VFlex>
        </VLayout>
      </div>
    </VCard>
    <VDivider
      class="
                mx-3"
      style="margin-top:4px"
    />
    <VLayout style="margin-bottom:0px;padding-bottom:0px">
      <VFlex style="padding-bottom:0px" md6>
        <div class="text-xs-left" style="verticalAlign:bottom">
          <VIcon :color="subTextColor" size="18" class="mr-2">
            {{ subIcon }}
          </VIcon>
          <span
            :class="`${subTextColor}--text`"
            class="caption font-weight-light"
            >{{ subText }}</span
          >
        </div>
      </VFlex>
      <VFlex style="padding-bottom:0px" md6>
        <div v-if="!indeterminate" class="text-xs-right">
          <span class="title display-1 font-weight-light">
            当前进度：<CommonVOdometer
              theme="minimal"
              format=""
              :value="value"
            ></CommonVOdometer>
            /<small>{{ smallValue }}</small>
          </span>
        </div>
      </VFlex>
    </VLayout>
  </BiliobCard>
</template>

<script>
import Card from "./Card";

export default {
  props: {
    ...Card.props,
    subIcon: {
      type: String,
      default: undefined
    },
    subIconColor: {
      type: String,
      default: undefined
    },
    subTextColor: {
      type: String,
      default: undefined
    },
    subText: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    smallValue: {
      type: [String, Number],
      default: undefined
    },
    indeterminate: { type: Boolean, default: false }
  },
  data() {
    return {
      percent: Number()
    };
  },
  watch: {
    value() {
      if (this.indeterminate === true && this.value === 0) {
        this.percent = 100;
      } else {
        this.percent = (this.value / this.smallValue) * 100;
      }
    }
  },
  mounted() {
    if (this.indeterminate === true && this.value === 0) {
      this.percent = 100;
    } else {
      this.percent = (this.value / this.smallValue) * 100;
    }
  }
};
</script>

<style lang="scss">
.progress-card {
  .v-card__text {
    margin: 0px;
    padding-bottom: 0px;
  }
}
</style>
