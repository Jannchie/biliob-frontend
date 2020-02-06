<template>
  <CommonMainLayout reverse>
    <div
      slot="aside-cards"
      :class="$vuetify.breakpoint.mdAndDown ? 'mx-0' : 'mx-2'"
    >
      <BiliobCard border="bottom" title="目录" class="title mb-2">
        <div>
          <ol
            v-for="(eachCatalog, catalogIndex) in questionCards"
            slot="body"
            :key="catalogIndex"
            class="body-2  mb-2"
          >
            <a :href="`#${eachCatalog.catalogName}`">{{
              eachCatalog.catalogName
            }}</a>
            <li
              v-for="(eachQuestion,
              questionIndex) in eachCatalog.catalogQuestions"
              :id="eachQuestion.question"
              :key="questionIndex"
              class="caption"
            >
              <a :href="`#${eachQuestion.question}`">{{
                eachQuestion.question
              }}</a>
            </li>
            <VDivider></VDivider>
          </ol>
        </div>
      </BiliobCard>
    </div>
    <div slot="main-cards">
      <BiliobCard
        v-for="(eachCatalog, catalogIndex) in questionCards"
        :key="catalogIndex"
        border="bottom"
        class="mb-1 title"
        :title="eachCatalog.catalogName"
      >
        <div>
          <div
            v-for="(eachQuestion,
            questionIndex) in eachCatalog.catalogQuestions"
            :key="questionIndex"
          >
            <div
              :id="eachQuestion.question"
              class="body-2 font-weight-regular blue--text text--darken-3"
            >
              问题{{ questionIndex + 1 }}：{{ eachQuestion.question }}
            </div>
            <div
              v-for="(eachParagraph, pIndex) in eachQuestion.answer"
              :key="pIndex"
              class="body-2 "
            >
              {{ eachParagraph }}
            </div>
          </div>
        </div>
      </BiliobCard>
    </div>
  </CommonMainLayout>
</template>
<script>
export default {
  data() {
    return {
      questionCards: [
        {
          catalogName: "BiliOB观测者哲学三问",
          catalogQuestions: [
            {
              question: "BiliOB观测者是什么？",
              answer: [
                "BiliOB观测者是由Jannchie见齐创建并维护的一个Web应用程序。",
                "BiliOB观测者是一个观测Bilibili上的UP主与其视频的各个指标的数据及其变化趋势的第三方网站。",
                "在这里，你可以自由添加UP主或视频观测，了解到最新的榜单和粉丝变动情报。"
              ]
            },
            {
              question: "BiliOB从哪里来？",
              answer: [
                "BiliOB观测者由Jannchie见齐创建并维护。",
                "BiliOB观测者的所有数据来自于B站官方正在使用的API。",
                "BiliOB观测者的资金支持主要来自于B站创作激励计划、高能联盟计划、以及直播礼物和充电。"
              ]
            },
            {
              question: "BiliOB到哪里去？",
              answer: [
                "BiliOB观测者通过搜集并观测B站的UP主、视频等数据，给UP主作为参考，了解自己作品的受欢迎程度。从而帮助作者创作更加优秀的作品。",
                "BiliOB观测者能够持续观测B站数据，记录B站的发展历程以及各个时期的热点情况。",
                "另一方面，通过观测这些数据，能够了解到B站的最新动态。这些数据本身就非常具有观赏性。"
              ]
            }
          ]
        },
        {
          catalogName: "积分相关问题",
          catalogQuestions: [
            {
              question: "如何获得积分和经验？",
              answer: [
                "目前，每日签到可以获得10点积分和经验值。",
                "消耗积分可以增加等量的经验。"
              ]
            },
            {
              question: "签到间隔时间是多长？",
              answer: ["已注册的用户，每隔8小时就可以签到一次。"]
            },
            {
              question: "积分可以用来做什么？",
              answer: [
                "积分可以用于强制追踪up主、增加追踪频率、进行视频弹幕分析等功能。",
                "消耗积分获得经验，可以提升观测者的排行。"
              ]
            }
          ]
        },
        {
          catalogName: "等级相关问题",
          catalogQuestions: [
            {
              question: "BiliOB观测者的等级有什么用？",
              answer: [
                "等级目前起到装饰作用（没什么用",
                "侧边栏中，观测者排行会按照积分顺序进行排序。在这里会公开显示用户的等级。"
              ]
            },
            {
              question: "BiliOB观测者的等级如何划分？",
              answer: [
                "BILIOB观测者等级根据观测者的经验值进行划分。",
                "目前一共有六个等级：",
                "EXP < 100: 寻踪觅迹的初心者",
                "EXP < 200: 沉浮信海的彷徨者",
                "EXP < 1280: 本心不渝的追寻者",
                "EXP < 2560: 洞悉法度的观想者",
                "EXP < 5120: 与天同行的观测者",
                "EXP >= 5120: 观测站的管理者",
                "EXP >= 5120 的观测者可以向站长申请定制头衔。"
              ]
            }
          ]
        },
        {
          catalogName: "爬虫相关问题",
          catalogQuestions: [
            {
              question:
                "UP主、视频数据角标中的观测中、强行观测、保守观测分别有什么含义？",
              answer: [
                "由于服务器爬虫资源有限，必须要对爬取进行分类讨论，爬取关注度比较高的数据。",
                "观测中: 一天更新一次数据。",
                "保守观测: 变化幅度太小的数据将停止更新，但可以手动刷新。",
                "强行观测: 消耗200积分，可以强行每日更新数据，即使它本已进入保守观测组。",
                "目前，如果视频同时在线人数达到全站前20，那么该UP主以及其视频的数据更新频率会强行加快到每10分钟采集一次。以此获取更加精密实时的数据。"
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    brightness() {
      if (this.$store.state.dark) {
        return "lighten";
      } else {
        return "darken";
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.question-card {
  margin-bottom: 10px;
}
a {
  color: #424242;
  text-decoration: none;
}
.theme--dark a {
  color: #fff;
  text-decoration: none;
}
.theme--dark a:hover {
  color: #3c89e0;
  text-decoration: none;
}
a:hover {
  color: #1565c0;
}
</style>
