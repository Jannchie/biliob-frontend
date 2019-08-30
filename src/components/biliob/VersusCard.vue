<template>
  <BiliobCard class="elevation-3" @click.stop="toAuthorVersus">
    <VRow dense style="align-items: center;">
      <VCol style="text-align: center;" class="px-0">
        <div class="hidden-md-and-up">
          <div class="caption">粉丝数</div>
          <div class="font-weight-black body-2 blue--text text--darken-1">
            {{ (aFans / 10000).toFixed(2) }}
          </div>
          <div class="caption">万</div>
        </div>
        <div class="title hidden-sm-and-down" style="align-items: center;">
          <div class="caption">粉丝数</div>
          <VOdometer
            class="font-weight-bold blue--text text--darken-1"
            :value="aFans"
            format="(,ddd).d"
          ></VOdometer>
        </div>
      </VCol>
      <VCol v-if="!$vuetify.breakpoint.lgAndDown" cols="auto">
        <div style="text-align:end">
          <div class="competitor-title">
            {{ aTitle }}
          </div>
          <div>
            {{ aName }}
          </div>
          <div class="caption">{{ aOfficial }}</div>
        </div>
      </VCol>

      <VCol cols="auto" class="px-0">
        <VAvatar @click.stop="jumpToAuthorPage(aMid)">
          <VImg
            :src="aFace.replace('http:', '')"
            :lazy-src="aFace.replace('http:', '')"
          />
        </VAvatar>
      </VCol>

      <VCol
        cols="auto"
        style="text-align: center;"
        class="center-info mx-0 px-0"
      >
        <div>
          <div class="caption font-weight-black">榜首粉丝争夺</div>
          <div class="title font-weight-black red--text text--darken-2">
            VS
          </div>
          <div>
            <VOdometer :value="deltaFans"></VOdometer>
          </div>
        </div>
      </VCol>
      <VCol cols="auto" class="px-0">
        <VAvatar @click.stop="jumpToAuthorPage(bMid)">
          <VImg
            :src="bFace.replace('http:', '')"
            :lazy-src="bFace.replace('http:', '')"
          />
        </VAvatar>
      </VCol>
      <VCol v-if="!$vuetify.breakpoint.lgAndDown" cols="auto">
        <div>
          <div class="competitor-title">
            {{ bTitle }}
          </div>
          <div>
            {{ bName }}
          </div>
          <div class="caption">{{ bOfficial }}</div>
        </div>
      </VCol>
      <VCol style="text-align: center;" class="px-0">
        <div class="hidden-md-and-up px-0">
          <div class="caption">粉丝数</div>
          <div class="font-weight-black body-2 blue--text text--darken-1">
            {{ (bFans / 10000).toFixed(2) }}
          </div>
          <div class="caption">万</div>
        </div>
        <div class="title hidden-sm-and-down" style="align-items: center;">
          <div class="caption">粉丝数</div>
          <VOdometer
            class="font-weight-bold blue--text text--darken-1"
            :value="bFans"
            format="(,ddd).d"
          ></VOdometer>
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
  watch: {
    aMid() {
      this.refresh();
      const timer = setInterval(this.refresh, 10000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
  },
  mounted() {
    this.axios.get("/author?page=0&pageSize=3&sort=0").then(r => {
      this.aMid = r.data.content[0].mid;
      this.bMid = r.data.content[1].mid;
    });
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
      if (this.aMid != 0 && this.bMid != 0) {
        this.$router.push(`/author/versus?aMid=${this.aMid}&bMid=${this.bMid}`);
      }
    }
  }
};
</script>
