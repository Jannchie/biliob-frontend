<template>
  <VContainer>
    <VSlideYReverseTransition
      hide-on-leave
      group
    >
      <VRow
        v-if="info != undefined"
        key="title"
        dense
      >
        <VCol
          v-if="$vuetify.breakpoint.lgAndUp"
          cols="auto"
        >
          <VImg
            class="elevation-3"
            style="border-radius: 2px; display: inline-block; height: 118px;width:200px"
            :src="info.pic"
          />
        </VCol>
        <VCol>
          <BiliobCard>
            <div>
              <div class="overline">
                av{{ info.aid }} /
                <span class="overline">
                  BV{{ info.bvid }}
                </span>
              </div>
              <div class="title">
                {{ info.title }}
              </div>
              <div>
                {{ info.owner.name }}
                <span>
                  {{ this.$timeFormat(new Date(info.ctime * 1000),"YYYY-MM-DD HH:mm:ss") }}
                </span>
              </div>
            </div>
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined"
        key="info-cards"
        dense
      >
        <VCol cols="12">
          <VList class="elevation-3">
            <VListItem>
              <VListItemAvatar>
                <VAvatar>
                  <VImg :src="info.owner.face" />
                </VAvatar>
              </VListItemAvatar>
              <VListItemContent>
                <VListItemTitle>{{ info.owner.name }}</VListItemTitle>
                <VListItemSubtitle>
                  mid: {{ info.owner.mid }}
                </VListItemSubtitle>
              </VListItemContent>
            </VListItem>
          </VList>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined"
        key="tab"
        dense
      >
        <VCol>
          <VTabs
            grow
            class="elevation-3"
          >
            <VTab @click="tab='video'">
              浏览 / VIEW
            </VTab>
            <VTab @click="tab='info'">
              信息 / INFO
            </VTab>
            <VTab @click="tab='stat'">
              历史 / HISTORY
            </VTab>
          </VTabs>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && tab=='video'"
        key="video"
        dense
      >
        <VCol>
          <VResponsive
            class="elevation-3"
            :aspect-ratio="16 / 9"
          >
            <iframe
              width="100%"
              height="100%"
              :src="`//player.bilibili.com/player.html?aid=${info.aid}&bvid=BV${info.bvid}&cid=${info.cid}&page=1`"
              scrolling="no"
              border="0"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
            />
          </VResponsive>
        </VCol>
      </VRow>

      <VRow
        v-if="info != undefined && tab=='video'"
        key="desc"
        dense
      >
        <VCol>
          <BiliobCard>
            <VueMarkdown :source="info.desc" />
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined && tab=='info'"
        key="test"
        dense
      >
        <VCol>
          <BiliobCard>
            <VRow>
              <VCol>
                <div>
                  播放
                </div>
                <div class="caption">
                  {{ info.stat.view }}
                </div>
              </VCol>
              <VCol>
                <div>
                  硬币
                </div>
                <div class="caption">
                  {{ info.stat.coin }}
                </div>
              </VCol>
              <VCol>
                <div>
                  弹幕
                </div>
                <div class="caption">
                  {{ info.stat.danmaku }}
                </div>
              </VCol>
              <VCol>
                <div>
                  评论
                </div>
                <div class="caption">
                  {{ info.stat.reply }}
                </div>
              </VCol>
              <VCol>
                <div>
                  点赞
                </div>
                <div class="caption">
                  {{ info.stat.like }}
                </div>
              </VCol>
              <VCol>
                <div>
                  收藏
                </div>
                <div class="caption">
                  {{ info.stat.favorite }}
                </div>
              </VCol>
              <VCol>
                <div>
                  分享
                </div>
                <div class="caption">
                  {{ info.stat.share }}
                </div>
              </VCol>
            </VRow>
          </BiliobCard>
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined"
        key="attr"
      >
        <VCol>
          {{ info.attribute }}
          {{ parseInt(info.attribute).toString(2) }}
        </VCol>
      </VRow>
      <VRow
        v-if="info != undefined"
        key="test"
        dense
      >
        <h1 class="caption">
          {{ info }}
        </h1>
      </VRow>
    </VSlideYReverseTransition>
  </VContainer>
</template>

<script>
export default {
  data() {
    return {
      tab: "video",
      info: undefined
    };
  },
  async mounted() {
    let res;
    if (this.$route.params.aid == undefined) {
      res = await this.axios.get(`/video/v3/BV${this.$route.params.bvid}/info`);
    } else {
      res = await this.axios.get(`/video/v3/av${this.$route.params.aid}/info`);
    }
    this.info = res.data;
  }
};
</script>
