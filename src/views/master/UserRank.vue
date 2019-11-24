<template>
  <div>
    <VRow>
      <VCol cols="12">
        <BiliobCard>
          <div class="title">排名计算方式</div>
          <div>2019年11月22日更新了排名计算方式。</div>
          <div>
            目前观测站的管理者三名、与天同行的观测者十六名、洞悉法度的观想者三十二名。
          </div>
          <div>积分前50%的观测者头衔为，其余观测者的头衔为。</div>
        </BiliobCard>
      </VCol>
    </VRow>
    <BiliobUserRankTitle
      title="观测站的管理者"
      icon="mdi-chess-queen"
    ></BiliobUserRankTitle>
    <VRow>
      <VCol
        v-for="(eachUser, index) of userData.slice(0, 3)"
        :key="index"
        cols="12"
        lg="4"
      >
        <BiliobCard>
          <VCardTitle>
            {{ eachUser.nickName }}
          </VCardTitle>
          <VCardText>
            EXP {{ eachUser.exp }}
            <br />
            注册时间：{{ formatDate(eachUser.id.date) }}
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
    <BiliobUserRankTitle
      title="与天同行的观测者"
      icon="mdi-chess-king"
    ></BiliobUserRankTitle>
    <VRow>
      <VCol
        v-for="(eachUser, index) of userData.slice(3, 15)"
        :key="index"
        cols="12"
        lg="3"
      >
        <BiliobCard>
          <VCardTitle>
            {{ eachUser.nickName }}
          </VCardTitle>
          <VCardText>
            EXP {{ eachUser.exp }}
            <br />
            注册时间：{{ formatDate(eachUser.id.date) }}
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
    <BiliobUserRankTitle
      title="洞悉法度的观想者"
      icon="mdi-chess-bishop"
    ></BiliobUserRankTitle>
    <VRow>
      <VCol
        v-for="(eachUser, index) of userData.slice(15, 51)"
        :key="index"
        cols="12"
        lg="2"
      >
        <BiliobCard>
          <VCardTitle
            style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
            class="body-1"
          >
            {{ eachUser.nickName }}
          </VCardTitle>
          <VCardText class="caption">
            EXP {{ eachUser.exp }}
            <br />
            {{ formatDate(eachUser.id.date, "YYYY-MM-DD") }}
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import { format } from "date-fns";
var cnLocale = require("date-fns/locale/zh_cn");
export default {
  name: "UserRank",
  data() {
    return {
      userData: Object()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get("/rank/user").then(response => {
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
