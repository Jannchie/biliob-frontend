<template>
  <div>
    <VRow dense>
      <VCol cols="12">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelHeader>
              <div class="title">
                用户等级排行简介
              </div>
            </VExpansionPanelHeader>
            <VExpansionPanelContent>
              详情见<RouterLink to="/faq">
                FAQ
              </RouterLink>
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
      <VRow dense>
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
            <VCardText class="caption">
              EXP {{ eachUser.exp }}
              <br>
              <span class="caption">
                注册时间：{{ $timeFormat(eachUser.id.date,"YYYY-MM-DD HH:mm:ss") }}
              </span>
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
      <BiliobUserRankTitle
        title="观测者"
        icon="mdi-chess-king"
      />
      <VRow dense>
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
            <VCardText class="caption">
              EXP {{ eachUser.exp }}
              <br>
              <span class="caption">
                注册时间：{{ $timeFormat(eachUser.id.date,"YYYY-MM-DD HH:mm:ss") }}
              </span>
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
      <BiliobUserRankTitle
        title="观想者"
        icon="mdi-chess-bishop"
      />
      <VRow dense>
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
              {{ $timeFormat(eachUser.id.date, "YYYY-MM-DD") }}
            </VCardText>
          </BiliobCard>
        </VCol>
      </VRow>
      <BiliobUserRankTitle
        title="追寻者"
        icon="mdi-chess-rook"
      />
      <VRow dense>
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
              {{ $timeFormat(eachUser.id.date, "YYYY-MM-DD") }}
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
