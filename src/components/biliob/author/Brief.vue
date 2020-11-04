<template>
  <BiliobCard border="bottom" title="作者简介" light>
    {{ briefInfo }}
    <!-- <p v-if="authorData != undefined && authorData.name != undefined">
      <span v-if="authorData.official == ''">
        {{ `${authorData.name} 还未经过认证。` }}</span
      >
      <span v-else>
        {{ `${authorData.name} 是经过认证的 ${authorData.official}。` }}
      </span>
    </p> -->
  </BiliobCard>
</template>

<script>
export default {
  props: {
    authorData: undefined,
    authorTopVideo: undefined,
    authorLatestVideo: undefined
  },
  computed: {
    authorBrief() {
      if (this.authorData != undefined && this.authorData.name != undefined) {
        if (this.authorData.official == "") {
          return `「${this.authorData.name}」还未经过认证。`;
        } else {
          return `「${this.authorData.name}」是经过认证的「${this.authorData.official}」。`;
        }
      }
      return "";
    },
    channelsBrief() {
      if (
        this.authorData != undefined &&
        this.authorData.name != undefined &&
        this.authorData.channels != undefined &&
        this.authorData.channels[0] != undefined
      ) {
        // const TEMPLATE_2 = `TA是专精于${0}区的UP主，在该分区的投稿比例为${100}%`;
        let mostArchive = this.authorData.channels[0].name;
        let mostArchiveName = this.authorTopVideo[0].title;
        let mostChannelCount = this.authorData.channels[0].count;
        let topViewChannel = this.authorTopVideo[0].tname;
        let topChannelObject = this.getChannelCount(this.authorTopVideo);
        let latestChannelObject = this.getChannelCount(this.authorLatestVideo);
        let topSortedChannel = this.getSortedChannel(topChannelObject);
        let latestSortedChannel = this.getSortedChannel(latestChannelObject);

        let topRateChannel = topSortedChannel[0];
        let latestRateChannel = latestSortedChannel[0];
        const TEMPLATE_1 = `TA是主要活跃在「${mostArchive}区」的UP主，在该分区共存活「${mostChannelCount} 个稿件」，`;
        let TEMPLATE_2 = ``;

        if (topViewChannel != mostArchive) {
          TEMPLATE_2 = `然而TA在「${topViewChannel}区」拥有着表现最好的作品，`;
        }
        let TEMPLATE_3 = `代表作是《 ${mostArchiveName}》。`;
        let TEMPLATE_4 = ``;

        if (
          topSortedChannel[0] == latestSortedChannel[0] &&
          topChannelObject[topSortedChannel[0]] >
            latestChannelObject[topSortedChannel[0]]
        ) {
          TEMPLATE_4 = `虽然TA的投稿仍然大多在「${latestRateChannel}区」,不过TA有向「${latestSortedChannel[1]}区」转型的可能性。`;
        } else if (topRateChannel == latestRateChannel) {
          TEMPLATE_4 = `近期，TA的投稿仍然大多在「${latestRateChannel}区」。`;
        } else {
          TEMPLATE_4 = `不同于TA最火的「${topRateChannel}区」视频，最近TA的投稿大多在「${latestRateChannel}区」。`;
        }
        return TEMPLATE_1 + TEMPLATE_2 + TEMPLATE_3 + TEMPLATE_4;
      }
      return "";
    },
    archiveBrief() {
      if (this.authorTopVideo != undefined) {
        return ``;
      }
      return "";
    },
    briefInfo() {
      let briefInfo = `${this.authorBrief}${this.channelsBrief}${this.archiveBrief}`;
      return briefInfo;
    }
  },
  methods: {
    getChannelCount(videolist) {
      let temp = {};
      if (videolist == undefined) return;
      videolist.forEach((video) => {
        temp[video.tname] =
          temp[video.tname] != undefined ? temp[video.tname] + 1 : 1;
      });
      return temp;
    },
    getSortedChannel(channelObject) {
      return Object.keys(channelObject).sort((a, b) => {
        return channelObject[b] - channelObject[a];
      });
    },
    getTopChannelCount(videolist) {
      let t = this.getChannelCount(videolist);
      let max = 0;
      let result = undefined;
      for (let each in t) {
        if (t[each] > max) {
          max = t[each];
          result = each;
        }
      }
      return result;
    }
  }
};
</script>
