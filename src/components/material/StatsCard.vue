<template>
  <BiliobCard
    v-bind="$attrs"
    class="v-card--material-stats"
    v-on="$listeners"
  >
    <VCard
      slot="offset"
      :class="`elevation-${elevation}`"
      :color="color"
      class="pa-4"
      dark
    >
      <VIcon size="40">
        {{ icon }}
      </VIcon>
    </VCard>
    <div class="text-xs-right">
      <p
        class="category grey--text font-weight-light"
        v-text="title"
      />
      <h3 class="title display-1 font-weight-light">
        {{ value }} <small>{{ smallValue }}</small>
      </h3>
    </div>

    <template slot="actions">
      <VIcon
        :color="subTextColor"
        size="20"
        class="mr-2"
      >
        {{ subIcon }}
      </VIcon>
      <span
        :class="`${subTextColor}--text`"
        class="caption font-weight-light"
      >{{ subText }}</span>
    </template>
  </BiliobCard>
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
      type: [Number, String],
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
.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 16px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
}
</style>
