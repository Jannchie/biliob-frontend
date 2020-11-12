<template>
  <VSlideYTransition>
    <VSkeletonLoader
      v-if="loading"
      :class="`elevation-${elevation}`"
      type="card"
    />
    <VCard
      v-else
      tile
      v-bind="$attrs"
      :class="`elevation-${elevation}`"
      v-on="$listeners"
    >
      <div
        v-if="hasOffset"
        :inline="inline"
        :offset="offset"
        :icon="icon"
      >
        <BiliobDarkInfo
          v-if="!$slots.offset"
          :elevation="0"
          :border="border"
          :dark="dark"
          :color="color"
          :light="light"
        >
          <slot
            v-if="!title && !text"
            name="header"
          />
          <h3
            v-else
            class="px-5 py-1"
          >
            {{ title }}
          </h3>
        </BiliobDarkInfo>
        <slot
          v-else
          name="offset"
        />
      </div>
      <VCardText
        style="height: 100%;"
        :class="cardPadding"
      >
        <slot />
      </VCardText>
      <VDivider
        v-if="$slots.actions"
        class="mx-3"
      />

      <VCardActions v-if="$slots.actions">
        <slot name="actions" />
      </VCardActions>
    </VCard>
  </VSlideYTransition>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
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
      default: "bottom"
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
      default: function () {
        return "";
      }
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: true
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
