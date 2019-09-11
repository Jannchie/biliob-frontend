<template>
  <VCard
    tile
    v-bind="$attrs"
    :class="`elevation-${elevation}`"
    v-on="$listeners"
  >
    <div v-if="hasOffset" :inline="inline" :offset="offset" :icon="icon">
      <BiliobDarkInfo
        v-if="!$slots.offset"
        :elevation="0"
        :border="border"
        :dark="dark"
        :light="light"
      >
        <slot v-if="!title && !text" name="header" />
        <div v-else class="title font-weight-light px-5 py-1">
          {{ title }}
        </div>
      </BiliobDarkInfo>
      <slot v-else name="offset" />
    </div>
    <VCardText style="height: 100%" :class="cardPadding">
      <slot />
    </VCardText>
    <VDivider v-if="$slots.actions" class="mx-3" />

    <VCardActions v-if="$slots.actions">
      <slot name="actions" />
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: "deepblue"
    },
    elevation: {
      type: [Number, String],
      default: 3
    },
    inline: {
      type: Boolean,
      default: false
    },
    border: {
      type: String,
      default: "None"
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    cardPadding: {
      type: String,
      default: function() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return "pa-2";
        } else {
          return "pa-1";
        }
      }
    },
    dark: {
      type: Boolean,
      default: true
    },
    light: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasOffset() {
      return (
        this.$slots.header || this.$slots.offset || this.title || this.text
      );
    }
  }
};
</script>
