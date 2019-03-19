<template>
  <div style="display: flex;margin-bottom:5px; flex-wrap: wrap">
    <VCard class="versus-card">
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
              :src="aFace.replace('http:','')"
              :lazy-src="aFace.replace('http:','')"
            />
          </VAvatar>
          <div
            style="text-align:end"
            class="hidden-lg-and-down"
          >
            <div>
              {{aTitle}}
            </div>
            <div>
              {{aName}}
            </div>
            <div class="caption">{{aOfficial}}</div>
          </div>
          <div
            class="r-fans-counter-mobile hidden-md-and-up"
            style="align-items: center;"
          >
            <div class="caption">粉丝数</div>
            <div class="font-weight-black body-2 blue--text text--darken-1">{{(aFans/10000).toFixed(2)}}</div>
            <div class="caption">万</div>
          </div>
          <div
            class="r-fans-counter title hidden-sm-and-down"
            style="align-items: center;"
          >
            <VOdometer
              class="font-weight-light blue--text text--darken-1"
              :value="aFans"
              format="(,ddd).d"
            ></VOdometer>
          </div>
        </VCardText>
        <div class="center-info">
          <div class="caption font-weight-black">{{title}}</div>
          <div class="title font-weight-black red--text text--darken-2">
            VS
          </div>
          <div>
            <VOdometer :value="deltaFans"></VOdometer>
          </div>
        </div>
        <VCardText class="competitor-div">
          <VAvatar
            style="margin-right: 10px"
            @click.stop="jumpToAuthorPage(bMid)"
          >
            <VImg
              :src="bFace.replace('http:','')"
              :lazy-src="bFace.replace('http:','')"
            />
          </VAvatar>
          <div class="hidden-lg-and-down">
            <div>
              {{bTitle}}
            </div>
            <div>
              {{bName}}
            </div>
            <div class="caption">{{bOfficial}}</div>
          </div>
          <div
            class="l-fans-counter-mobile hidden-md-and-up"
            style="align-items: center;"
          >
            <div class="caption">粉丝数</div>
            <div class="font-weight-black body-2 blue--text text--darken-1">{{(bFans/10000).toFixed(2)}}</div>
            <div class="caption">万</div>
          </div>
          <div
            class="l-fans-counter title hidden-sm-and-down"
            style="align-items: center;"
          >
            <VOdometer
              class="font-weight-light blue--text text--darken-1"
              :value="bFans"
              format="(,ddd).d"
            ></VOdometer>
          </div>
        </VCardText>
      </div>
    </VCard>
  </div>
</template>
<script>
import VOdometer from "../common/VOdometer.vue";

export default {
  components: { VOdometer },
  props: {
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
      setInterval(this.refresh, 10000);
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
    }
  }
};
</script>

<style scoped>
.versus-card {
  width: 100%;
}
.center-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  padding: 0 5px;
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
</style>
