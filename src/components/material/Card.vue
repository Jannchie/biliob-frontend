<template>
  <VCard
    v-bind="$attrs"
    :style="styles"
    :class="`elevation-${elevation}`"
    v-on="$listeners"
  >
    <HelperOffset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
      :icon="icon"
    >
      <VCard
        v-if="!$slots.offset"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <slot
          v-if="!title && !text"
          style="padding:0px"
          name="header"
        />
        <span v-else>
          <div class="">
            <p
              class="title font-weight-light mb-2"
              v-text="title"
            />
            <p
              class="category font-weight-thin"
              v-text="text"
            />
          </div>
        </span>
      </VCard>
      <slot
        v-else
        name="offset"
      />
    </HelperOffset>

    <VCardText :class="cardPadding + ' material-card-content'">
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
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: "primary"
    },
    elevation: {
      type: [Number, String],
      default: 2
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
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
      default: ""
    }
  },

  computed: {
    hasOffset() {
      return (
        this.$slots.header || this.$slots.offset || this.title || this.text
      );
    },
    styles() {
      if (!this.hasOffset) return null;

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      };
    }
  }
};
</script>

<style lang="scss">
.v-card--material {
  &__header {
    &.v-card {
      border-radius: 4px;
    }
  }
}
@media only screen and (min-width: 1029px) {
  .material-card-content {
    padding: 15px;
  }
}
@media only screen and (max-width: 1029px) {
  .material-card-content {
    padding: 15 2px;
  }
}
</style>
