<template>
  <MainLayout>
    <div slot="main-cards">
      <BiliobSheet class="card-tabs">
        <VFlex slot="header">
          <BiliobDarkInfo border="bottom" class="pb-0">
            <VTabs slider-color="#1e88e5" dark background-color="#333">
              <span
                class="subheading font-weight-light mr-3"
                style="align-self: center"
                >类目：</span
              >
              <VTab @click="getData(0)">
                <VIcon style="margin-right:10px;">
                  mdi-heart
                </VIcon>
                涨粉
              </VTab>
              <VTab @click="getData(1)">
                <VIcon style="margin-right:10px;"> mdi-heart-broken </VIcon>掉粉
              </VTab>
              <VTab @click="getData(2)">
                <VIcon style="margin-right:10px;"> mdi-video-vintage </VIcon
                >番剧
              </VTab>
              <VTab @click="getData(3)">
                <VIcon style="margin-right:10px;"> mdi-rabbit </VIcon>国创
              </VTab>
            </VTabs>
          </BiliobDarkInfo>
        </VFlex>
        <div>
          <div v-if="index === 0 || index === 1">
            <div
              v-for="eachData in data"
              :key="eachData.name"
              style="display: flex"
              class="my-4"
              @click.stop="linkTo(eachData)"
            >
              <VAvatar size="60px" class="mr-4">
                <img :src="zipPic(eachData.face)" />
              </VAvatar>
              <div>
                <p>{{ eachData.name }}</p>
                <p>{{ eachData.official }}</p>
              </div>
              <VChip
                :color="getColor(index)"
                small
                text-color="white"
                style="position:absolute;right:16px;width:80px"
              >
                <VAvatar>
                  <VIcon class="mx-0" color="white" right>
                    {{ getIcon(index) }}
                  </VIcon>
                </VAvatar>
                {{ Math.abs(eachData.cRate) }}
              </VChip>
            </div>
          </div>
          <div v-else>
            <div
              v-for="eachData in data"
              :key="eachData.name"
              style="display: flex"
              class="my-4"
            >
              <VImg
                style="border-radius:3px;width:90px;height:120px;margin:0 8px"
                :src="eachData.cover"
                :lazy-src="eachData.cover"
              />
              <div style="width: 100%">
                <VContainer class="pt-0 body-1">
                  <VLayout>
                    <VFlex xs-12>
                      <h4 class="font-weight-bold">{{ eachData.title }}</h4>
                    </VFlex>
                  </VLayout>
                  <VLayout row>
                    <VFlex xs-2>
                      播放 <span>{{ eachData.currentPlay }}</span>
                    </VFlex>
                    <VFlex xs-2>
                      综分 <span>{{ eachData.currentPts }}</span>
                    </VFlex>
                    <VFlex xs-2>
                      追番 <span>{{ eachData.currentWatch }}</span>
                    </VFlex>
                    <VFlex xs-2>
                      评论 <span>{{ eachData.currentReview }}</span>
                    </VFlex>
                    <VFlex xs-4>
                      弹幕 <span>{{ eachData.currentDanmaku }}</span>
                    </VFlex>
                  </VLayout>
                </VContainer>
              </div>
            </div>
          </div>
        </div>
      </BiliobSheet>
    </div>
    <div slot="aside-cards">
      <BiliobSheet class="body-1" title="排行榜说明">
        <li>
          本排行榜数据每日更新一次。
        </li>

        <li>
          其中涨粉、掉粉排行仅包括所有正在观测的UP主数据。具体数字为一日粉丝变动数，仅供参考。
        </li>
        <li>
          国创番剧排行榜数据摘录自B站。
        </li>
      </BiliobSheet>
      <OtherLink class="aside-cards" />
    </div>
  </MainLayout>
</template>
<script>
import MainLayout from "../components/common/MainLayout.vue";
import OtherLink from "../components/aside/OtherLink.vue";
export default {
  components: {
    MainLayout,
    OtherLink
  },
  data() {
    return {
      data: Object(),
      bangumiData: Object(),
      fansIncrease: Object(),
      fansDecrease: Object(),
      donghuaData: Object(),
      index: Number()
    };
  },
  mounted() {
    this.getData(0);
    this.$store.commit("toElse");
  },
  methods: {
    linkTo(eachData) {
      if (eachData.mid != undefined) {
        this.$router.push(`author/${eachData.mid}`);
      }
    },
    getData(index) {
      this.index = index;
      switch (index) {
        case 0:
          this.axios.get("/rank/fans-increase-rate").then(response => {
            this.data = response.data.content;
          });
          break;
        case 1:
          this.axios.get("/rank/fans-decrease-rate").then(response => {
            this.data = response.data.content;
          });
          break;
        case 2:
          this.axios.get("/bangumi").then(response => {
            this.data = response.data.content;
            this.data.forEach(element => {
              element.cover = element.cover.slice(5);
            });
          });
          break;
        case 3:
          this.axios.get("/donghua").then(response => {
            this.data = response.data.content;
            this.data.forEach(element => {
              element.cover = element.cover.slice(5);
            });
          });
          break;
        default:
          break;
      }
    },
    getColor(index) {
      if (index === 0) {
        return "red";
      } else if (index === 1) {
        return "green";
      }
    },
    getIcon(index) {
      if (index === 0) {
        return "mdi-chevron-up-circle";
      } else if (index === 1) {
        return "mdi-chevron-down-circle";
      }
    }
  }
};
</script>

<style scope>
.item-cards {
  margin: 10px 2px;
  height: 90px;
  border-radius: 5px;
}

.item-title {
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info {
  display: flex;
  align-items: center;
}
</style>
