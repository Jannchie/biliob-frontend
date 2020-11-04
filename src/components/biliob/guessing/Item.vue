<template>
  <VCard class="mx-1">
    <VCardTitle class="caption">
      <div style="min-height: 40px">
        {{ guessing.title }}
      </div>
    </VCardTitle>

    <VCardText class="caption pb-0">
      已经有
      <span class="primary--text">{{ guessing.totalUser }}</span>
      人进行预测;
      <br>
      累计积分
      <span class="primary--text">{{ guessing.totalCredit }}</span>
      ;
      <br>
      <br>
      <div v-if="guessing.state == 4">
        观测到的达成时间为:
        <br>
        <span color="primary">{{
          $timeFormat(
            guessing.reachDate.replace("+00:00", "+08:00"),
            "YYYY-MM-DD HH:mm"
          )
        }}
        </span>
        <br>
      </div>
      <div v-else>
        平均预测达成时间为:
        <br>
        <span color="primary">{{ formatedAvageTime }} </span>
        <br>
      </div>
      <span :class="`${stateColor}`"> ● {{ state }} </span>
    </VCardText>
    <VCardActions class="pt-0">
      <VDialog
        v-if="guessing.state == 4"
        v-model="resultDialog"
      >
        <template v-slot:activator="{ on }">
          <VBtn
            color="primary"
            block
            text
            dark
            v-on="on"
          >
            查看结果
          </VBtn>
        </template>

        <VCard>
          <VCardTitle> 观测者预测结果 </VCardTitle>
          <VCardText>
            公式：预测分数 ∝ 总消耗积分 × （(提前预测时间) ÷ | 预测偏差时间 |)
            <br>
            根据预测分数按一定比例分配总积分池。
            <br>
            最多亏损47%的积分。
          </VCardText>
          <VDataTable
            :headers="[
              {
                text: '名称',
                align: 'start',
                sortable: false,
                value: 'name'
              },
              {
                text: '平均发布预测时间',
                align: 'start',
                value: 'averageCreateTime'
              },
              {
                text: '平均预测时间',
                align: 'start',
                value: 'averageDate'
              },
              {
                text: '总下注积分',
                align: 'start',
                value: 'credit'
              },
              {
                text: '收益',
                align: 'start',
                value: 'revenue'
              },
              {
                text: '净收益',
                align: 'start',
                value: 'summary'
              },
              {
                text: '收益率',
                align: 'start',
                value: 'rate'
              }
            ]"
            :items="guessing.result"
          />
        </VCard>
      </VDialog>
      <VDialog
        v-model="dialog"
        ext
        width="500"
      >
        <template v-slot:activator="{ on }">
          <VBtn
            color="primary"
            :disabled="guessing.state != 1"
            block
            text
            dark
            v-on="on"
          >
            加入预测
          </VBtn>
        </template>

        <VCard>
          <VCardTitle
            class="title grey lighten-2"
            primary-title
          >
            {{ guessing.title }}
          </VCardTitle>
          <VCardText class="mt-4">
            赌上积分进行预测吧！
            <br>
            根据预测的偏差程度，将会进行一定的积分返还。
            <br>
            时间以北京时间为准。
            <VTextField
              v-model="time"
              :hint="formatedTime"
              persistent-hint
              label="预测到达时间"
              :rules="timeRules"
            />
            <VSlider
              v-model="credit"
              label="使用积分"
              :min="1"
              :max="100"
              thumb-label
            />
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary"
              text
              @click="submit"
            >
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
          title: "载入中",
          avageTime: "载入中",
          totalCredit: 0,
          totalUser: 0,
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
      resultDialog: false,
      timeRules: [
        () => {
          let date = new Date(this.time);
          if (isNaN(date.getTime())) {
            return "无法识别输入的日期";
          } else {
            let localOffset = new Date().getTimezoneOffset() / 60;
            let offset = -8 - localOffset;
            let now = new Date();
            now.setHours(now.getHours() - offset);
            if (date.getTime() - now < 0) {
              return "该时间小于当前时间";
            }
            return true;
          }
        }
      ]
    };
  },
  computed: {
    formatedAvageTime() {
      if (this.guessing.averageTime == null) {
        return "未知";
      }
      return this.$timeFormat(this.guessing.averageTime, "YYYY-MM-DD HH:mm");
    },
    formatedTime() {
      return this.$timeFormat(this.time, "YYYY-MM-DD HH:mm");
    },
    stateColor() {
      if (this.guessing.state == 1) {
        return "green--text";
      } else if (this.guessing.state == 2) {
        return "orange--text";
      } else if (this.guessing.state == 3) {
        return "primary--text";
      } else {
        return "red--text";
      }
    },
    state() {
      if (this.guessing.state == 1) {
        return "进行中";
      } else if (this.guessing.state == 2) {
        return "已闭盘";
      } else if (this.guessing.state == 3) {
        return "结算中";
      } else {
        return "已结束";
      }
    }
  },
  mounted() {
    if (this.guessing.result != null)
      this.guessing.result.forEach((e) => {
        e.summary = (e.revenue - e.credit).toFixed(2);
        e.rate = (e.revenue / e.credit).toFixed(2);
        e.averageDate = this.$timeFormat(e.averageDate, "YYYY-MM-DD HH:mm");
        e.averageCreateTime = this.$timeFormat(
          e.averageCreateTime,
          "YYYY-MM-DD HH:mm"
        );
      });
  },
  methods: {
    submit() {
      this.dialog = false;
      this.axios.post(`/author/fans-guessing/${this.guessing.guessingId}`, {
        guessingDate: this.formatedTime,
        credit: this.credit
      });
    }
  }
};
</script>

<style></style>
