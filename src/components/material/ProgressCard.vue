
<template>
  <MaterialCard
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
          :value="value/smallValue"
          indeterminate
        ></VProgressLinear>
        <h3 class="category white--text font-weight-light">{{title}}</h3>
      </div>
    </VCard>
    <VDivider
      class="mx-3"
      style="margin-top:4px"
    />
    <VLayout style="margin-bottom:0px;padding-bottom:0px">
      <VFlex
        style="padding-bottom:0px"
        md6
      >
        <div
          class="text-xs-left"
          style="verticalAlign:bottom"
        >
          <VIcon
            :color="subTextColor"
            size="18"
            class="mr-2"
          >
            {{ subIcon }}
          </VIcon>
          <span
            :class="`${subTextColor}--text`"
            class="caption font-weight-light"
          >{{subText}}</span>
        </div>
      </VFlex>
      <VFlex
        style="padding-bottom:0px"
        md6
      >
        <div class="text-xs-right">
          <span class="title display-1 font-weight-light">
            当前进度：{{ value }} /<small>{{ smallValue }}</small>
          </span>
        </div>
      </VFlex>
    </VLayout>
  </MaterialCard>
</template>

<script>
import Card from "./Card";

export default {
  inheritAttrs: false,

  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true
    },
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
      type: String,
      default: undefined
    },
    smallValue: {
      type: String,
      default: undefined
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
