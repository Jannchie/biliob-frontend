<template>
  <BiliobCard
    class="elevation-3"
    @click.stop="toAuthorVersus"
  >
    <VRow
      dense
      style="align-items: center;"
    >
      <VCol
        style="text-align: center;"
        class="px-0"
      >
        <div class="hidden-md-and-up">
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
          class="title hidden-sm-and-down"
          style="align-items: center;"
        >
          <div class="caption">
            粉丝数
          </div>
          <VOdometer
            class="font-weight-bold primary--text text--darken-1"
            :value="aFans"
            format="(,ddd).d"
          />
        </div>
      </VCol>
      <VCol v-if="!$vuetify.breakpoint.lgAndDown">
        <div style="text-align:end">
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
      </VCol>

      <VCol
        cols="auto"
        class="px-0"
      >
        <VAvatar @click.stop="jumpToAuthorPage(aMid)">
          <VImg
            :src="zipPic(aFace)"
            :lazy-src="zipPic(aFace)"
          />
        </VAvatar>
      </VCol>

      <VCol
        cols="auto"
        style="text-align: center;"
        class="center-info mx-0 px-0"
      >
        <div>
          <div class="caption font-weight-black">
            焦点粉丝数对比
          </div>
          <div class="headline font-weight-black red--text">
            VS
          </div>
          <div class="caption">
            <VOdometer :value="deltaFans" />
          </div>
        </div>
      </VCol>
      <VCol
        cols="auto"
        class="px-0"
      >
        <VAvatar @click.stop="jumpToAuthorPage(bMid)">
          <VImg
            :src="zipPic(bFace)"
            :lazy-src="zipPic(bFace)"
          />
        </VAvatar>
      </VCol>
      <VCol v-if="!$vuetify.breakpoint.lgAndDown">
        <div>
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
      </VCol>
      <VCol
        style="text-align: center;"
        class="px-0"
      >
        <div class="hidden-md-and-up px-0">
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
          class="title hidden-sm-and-down"
          style="align-items: center;"
        >
          <div class="caption">
            粉丝数
          </div>
          <VOdometer
            class="font-weight-bold primary--text text--darken-1"
            :value="bFans"
            format="(,ddd).d"
          />
        </div>
      </VCol>
    </VRow>
  </BiliobCard>
</template>
<script>
import VOdometer from "@/components/common/VOdometer.vue";
export default {
  components: { VOdometer },
  props: {
    frequently: { type: Boolean, default: false }
  },
  data() {
    return {
      aMid: Number(),
      bMid: Number(),
      aTitle: String(),
      bTitle: String(),
      title: String(),
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
  mounted() {
    this.getData();
    // const timer = setInterval(this.refresh, 1000);
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer);
    // });
  },
  methods: {
    getData() {
      this.axios.get("/author/compare/top-fans?type=0").then((r) => {
        this.aMid = r.data[0].mid;
        this.aName = r.data[0].name;
        this.bMid = r.data[1].mid;
        this.bName = r.data[1].name;
        this.aFans = r.data[0].cFans;
        this.bFans = r.data[1].cFans;
        this.aFace = r.data[0].face;
        this.bFace = r.data[1].face;
        this.aOfficial = r.data[0].official;
        this.bOfficial = r.data[1].official;
        this.aRate = r.data[0].cRate;
        this.bRate = r.data[1].cRate;
      });
    },
    refresh() {
      if (Math.random() < 0.05) {
        this.getData();
      } else {
        if (Math.random() < this.aRate / 86400) {
          this.aFans += 1;
        }
        if (Math.random() < this.bRate / 86400) {
          this.bFans += 1;
        }
      }
    },
    jumpToAuthorPage(mid) {
      this.$router.push(`/author/${mid}`);
    },
    toAuthorVersus() {
      if (this.aMid != 0 && this.bMid != 0) {
        this.$router.push(`/author/versus?aMid=${this.aMid}&bMid=${this.bMid}`);
      }
    }
  }
};
</script>
