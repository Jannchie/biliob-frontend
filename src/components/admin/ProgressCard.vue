<template>
  <VCard class="admin-card">
    <VCard
      max-width="calc(100% - 32px)"
      dark
      :color="color"
      class="offset"
      style="box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.05), 0px 12px 17px 2px rgba(0, 0, 0, 0.05), 0px 5px 22px 4px rgba(0, 0, 0, 0.05) !important"
    >
      <VContainer class="py-2">
        <VRow>
          <VCol cols="12">
            <VProgressLinear
              color="white"
              :value="percent"
              :indeterminate="indeterminate && value != 0"
            />
          </VCol>
        </VRow>
        <VRow dense>
          <VCol>
            {{ title }}
          </VCol>
          <VCol cols="auto">
            剩余进度：{{ value }}
            <span v-if="typeof smallValue == Number">
              /
              <span class="caption">{{ smallValue }}</span>
            </span>
          </VCol>
        </VRow>
      </VContainer>
    </VCard>
    <div class="px-4 pb-4">
      <VDivider class="pb-2" />
      <VIcon
        color="grey"
        small
      >
        {{ subIcon }}
      </VIcon><span class="grey--text caption mx-2">{{ subText }}</span>
    </div>
  </VCard>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary"
    },
    elevation: {
      type: [Number, String],
      default: 1
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

<style lang="scss" scoped>
.admin-card {
  margin-top: 30px;
}
.offset {
  background: linear-gradient(60deg, #00000011, #ffffff44);
  min-width: calc(100% - 32px);
  max-width: calc(100% - 32px);
  top: -16px;
  left: 16px;
}
</style>
