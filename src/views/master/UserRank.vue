<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelHeader>
              <div class="title">
                用户等级排行简介
              </div>
            </VExpansionPanelHeader>
            <VExpansionPanelContent>
              <p>2019年11月22日更新了排名计算方式。</p>
              <div>
                目前设有:
                <li>
                  <VChip
                    style="vertical-align: baseline"
                    label
                    small
                    class="mr-1 my-1"
                    color="red"
                    outlined
                  >
                    管理者
                  </VChip>3名
                </li>
                <li>
                  <VChip
                    style="vertical-align: baseline"
                    label
                    small
                    class="mr-1 my-1"
                    color="orange"
                    outlined
                  >
                    观测者
                  </VChip>16名
                </li>
                <li>
                  <VChip
                    style="vertical-align: baseline"
                    label
                    small
                    class="mr-1 my-1"
                    color="purple"
                    outlined
                  >
                    观想者
                  </VChip>50名
                </li>
                <li>
                  <VChip
                    style="vertical-align: baseline"
                    label
                    small
                    class="mr-1 my-1"
                    color="blue"
                    outlined
                  >
                    追寻者
                  </VChip>经验前5%
                </li>
                <li>
                  <VChip
                    style="vertical-align: baseline"
                    label
                    small
                    class="mr-1 my-1"
                    color="green"
                    outlined
                  >
                    彷徨者
                  </VChip>经验后95%
                </li>
                <li>
                  <VChip
                    style="vertical-align: baseline"
                    label
                    small
                    class="mr-1 my-1"
                    color="grey"
                    outlined
                  >
                    初心者
                  </VChip>经验值小于100
                </li>
              </div>
            </VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
    <div v-if="userData.slice != undefined">
      <BiliobUserRankTitle
        title="管理者"
        icon="mdi-chess-queen"
      />
      <VRow>
        <VCol
          v-for="(eachUser, index) of userData.slice(0, 3)"
          :key="index"
          cols="12"
          lg="4"
        >
          <BiliobCard>
            <div
              class="grey--text"
              style="position: absolute; right: 8px"
            >
              #{{ 1 + index }}
            </div>
            <VCardTitle>
              {{ eachUser.nickName }}
            </VCardTitle>
            <VCardText>
              EXP {{ eachUser.exp }}
              <br>
              注册时间：{{ formatDate(eachUser.id.date) }}
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
      <BiliobUserRankTitle
        title="观测者"
        icon="mdi-chess-king"
      />
      <VRow>
        <VCol
          v-for="(eachUser, index) of userData.slice(3, 3 + 16)"
          :key="index"
          cols="12"
          lg="3"
        >
          <BiliobCard>
            <div
              class="grey--text"
              style="position: absolute; right: 8px"
            >
              #{{ 4 + index }}
            </div>
            <VCardTitle>
              <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                {{ eachUser.nickName }}
              </div>
            </VCardTitle>
            <VCardText>
              EXP {{ eachUser.exp }}
              <br>
              注册时间：{{ formatDate(eachUser.id.date) }}
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
      <BiliobUserRankTitle
        title="观想者"
        icon="mdi-chess-bishop"
      />
      <VRow>
        <VCol
          v-for="(eachUser, index) of userData.slice(3 + 16, 3 + 16 + 50)"
          :key="index"
          cols="12"
          lg="2"
        >
          <BiliobCard>
            <div
              class="grey--text"
              style="position: absolute; right: 8px"
            >
              #{{ 20 + index }}
            </div>
            <VCardTitle class="body-1 text-truncate">
              {{ eachUser.nickName }}
            </VCardTitle>
            <VCardText class="caption">
              EXP {{ eachUser.exp }}
              <br>
              {{ formatDate(eachUser.id.date, "YYYY-MM-DD") }}
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
      <BiliobUserRankTitle
        title="追寻者"
        icon="mdi-chess-rook"
      />
      <VRow>
        <VCol
          v-for="(eachUser, index) of userData.slice(3 + 16 + 50, 100)"
          :key="index"
          cols="12"
          lg="2"
        >
          <BiliobCard>
            <div
              class="grey--text"
              style="position: absolute; right: 8px"
            >
              #{{ 70 + index }}
            </div>
            <VCardTitle class="body-1 text-truncate">
              {{ eachUser.nickName }}
            </VCardTitle>
            <VCardText class="caption">
              EXP {{ eachUser.exp }}
              <br>
              {{ formatDate(eachUser.id.date, "YYYY-MM-DD") }}
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
var cnLocale = require("date-fns/locale/zh_cn");
export default {
  name: "UserRank",
  metaInfo() {
    return {
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "BiliOB观测者的用户排行榜，在这里可以看到所有观测者的积分排名。积分最高的用户将显示在榜首。"
        }
      ]
    };
  },
  data() {
    return {
      userData: Object()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get("/rank/user").then((response) => {
      this.userData = response.data.content;
    });
  },
  methods: {
    formatDate(date, f = "YYYY-MM-DD HH:mm:ss") {
      return format(date, f, cnLocale);
    }
  }
};
</script>
