<template>
  <div style="display: flex; flex-wrap: wrap; cursor:pointer">
    <BiliobCard
      light
      class="versus-card elevation-2"
      :title="title"
      @click.stop="toAuthorVersus"
    >
      <div style="display: flex">
        <VCardText
          class="competitor-div"
          style="flex-direction:row-reverse"
        >
          <VAvatar
            style="margin-left: 10px"
            @click.stop="jumpToAuthorPage(aMid)"
          >
            <VImg
              :src="zipPic(aFace.replace('http:', ''))"
              :lazy-src="zipPic(aFace.replace('http:', ''))"
            />
          </VAvatar>
          <div
            style="text-align:end"
            class="hidden-md-and-down"
          >
            <div class="competitor-title">
              {{ aTitle }}
            </div>
            <div>
              {{ aName }}
            </div>
            <div class="caption">
              {{ aOfficial }}
            </div>
          </div>
          <div
            class="r-fans-counter-mobile hidden-lg-and-up"
            style="align-items: center;"
          >
            <div class="caption">
              粉丝数
            </div>
            <div class="font-weight-black body-2 primary--text text--darken-1">
              {{ (aFans / 10000).toFixed(2) }}
            </div>
            <div class="caption">
              万
            </div>
          </div>
          <div
            class="r-fans-counter title hidden-sm-and-down"
            style="align-items: center;"
          />
        </VCardText>
        <div
          class="center-info"
          color="primary"
          dark
        >
          <div class="title font-weight-black red--text">
            VS
          </div>
          <div>
            <VOdometer :value="deltaFans" />
          </div>
        </div>
        <VCardText class="competitor-div">
          <VAvatar
            style="margin-right: 10px"
            @click.stop="jumpToAuthorPage(bMid)"
          >
            <VImg
              :src="zipPic(bFace.replace('http:', ''))"
              :lazy-src="zipPic(bFace.replace('http:', ''))"
            />
          </VAvatar>
          <div class="hidden-md-and-down">
            <div class="competitor-title">
              {{ bTitle }}
            </div>
            <div>
              {{ bName }}
            </div>
            <div class="caption">
              {{ bOfficial }}
            </div>
          </div>
          <div
            class="l-fans-counter-mobile hidden-lg-and-up"
            style="align-items: center;"
          >
            <div class="caption">
              粉丝数
            </div>
            <div class="font-weight-black body-2 primary--text text--darken-1">
              {{ (bFans / 10000).toFixed(2) }}
            </div>
            <div class="caption">
              万
            </div>
          </div>
          <div
            class="l-fans-counter title hidden-sm-and-down"
            style="align-items: center;"
          />
        </VCardText>
      </div>
    </BiliobCard>
  </div>
</template>
<script>
import VOdometer from "../common/VOdometer.vue";

export default {
  components: { VOdometer },
  props: {
    frequently: Boolean(),
    aMid: Number(),
    bMid: Number(),
    aTitle: String(),
    bTitle: String(),
    title: String()
  },
  data() {
    return {
      aOfficial: String(),
      aName: String(),
      aFans: Number(),
      aFace: String(),
      bOfficial: String(),
      bName: String(),
      bFans: Number(),
      bFace: String()
    };
  },
  computed: {
    deltaFans() {
      if (this.aFans !== 0 && this.bFans !== 0) {
        return this.aFans - this.bFans;
      } else {
        return 0;
      }
    }
  },
  watch: {
    aMid() {
      this.refresh();
      const timer = setInterval(this.refresh, 10000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
  },
  methods: {
    refresh() {
      if (this.aMid != 0) {
        this.axios.get(`/author/${this.aMid}/info`).then(response => {
          this.aName = response.data.name;
          this.aOfficial = response.data.official;
          this.aFans = response.data.cFans;
          this.aFace = response.data.face;
        });
      }
      if (this.bMid != 0) {
        this.axios.get(`/author/${this.bMid}/info`).then(response => {
          this.bName = response.data.name;
          this.bOfficial = response.data.official;
          this.bFans = response.data.cFans;
          this.bFace = response.data.face;
        });
      }
    },
    jumpToAuthorPage(mid) {
      this.$router.push(`/author/${mid}`);
    },
    toAuthorVersus() {
      if (this.aMid != 0 && this.bMid != 0)
        this.$router.push(
          `/author/versus?aMid=${this.aMid}&bMid=${this.bMid}&freq=${this.frequently}`
        );
    }
  }
};
</script>

<style scoped>
.versus-card {
  width: 100%;
  margin-top: 20px;
}
.center-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  padding: 0 5px;
  border-radius: 5px;
}
.competitor-div {
  display: flex;
  padding: 16px 5px;
  align-items: center;
}
.r-fans-counter-mobile {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.r-fans-counter {
  display: flex;
  margin: auto;
}

.l-fans-counter {
  display: flex;
  margin: auto;
}

.l-fans-counter-mobile {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.competitor-title {
  font-weight: 900;
}
</style>
