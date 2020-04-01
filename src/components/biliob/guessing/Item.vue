<template>
  <VCard class="mx-3" width="300px">
    <VCardTitle class="caption">{{ guessing.title }}</VCardTitle>
    <VCardText class="caption">
      已经有{{ guessing.totalUser }}人进行预测; <br />平均预测达成时间为{{
        guessing.avageTime
      }};
      <br />
      {{ state }}
    </VCardText>
    <VCardActions>
      <VDialog v-model="dialog" ext width="500">
        <template v-slot:activator="{ on }">
          <VBtn color="primary" block text dark v-on="on">
            进行预测
          </VBtn>
        </template>

        <VCard>
          <VCardTitle class="headline grey lighten-2" primary-title>
            {{ guessing.title }}
          </VCardTitle>
          <VCardText>
            <VTextField
              v-model="time"
              :hint="formatedTime"
              persistent-hint
              label="预测到达时间"
              :rules="timeRules"
            >
            </VTextField>
            <VSlider
              v-model="credit"
              label="使用积分"
              min="1"
              max="100"
              thumb-label
            >
            </VSlider>
          </VCardText>
          <VDivider></VDivider>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="primary" text @click="submit">
              提交
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  props: {
    guessing: {
      type: Object,
      default() {
        return {
          title: "老番茄何时能破千万粉丝?",
          avageTime: "2020-04-03 09:00",
          totalCredit: 20613,
          totalUser: 32,
          guessingId: "",
          state: 1
        };
      }
    }
  },
  data() {
    return {
      time: this.guessing.avageTime,
      credit: undefined,
      dialog: false,
      timeRules: [
        () => {
          let date = new Date(this.time);
          if (isNaN(date.getTime())) {
            return "无法识别输入的日期";
          } else {
            return true;
          }
        }
      ]
    };
  },
  computed: {
    formatedTime() {
      return this.$timeFormat(this.time, "YYYY-MM-DD HH:mm");
    },
    state() {
      if (this.guessing.state == 1) {
        return "进行中";
      } else if (this.guessing.state == 2) {
        return "结算中";
      } else {
        return "已结束";
      }
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.dialog = false;
      this.axios.post(`user/guessing/${this.guessing.guessingId}`, {
        time: this.time,
        credit: this.credit
      });
    }
  }
};
</script>

<style></style>
