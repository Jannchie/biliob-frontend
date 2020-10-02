<template>
  <VContainer>
    <VRow
      v-if="!loaded"
      dense
    >
      <VCol>
        <VSkeletonLoader
          class="elevation-3"
          type="card"
        />
      </VCol>
    </VRow>
    <VRow
      v-if="loaded"
      dense
    >
      <VCol>
        <BiliobAuthorGroupInfoCard
          :sim="true"
          :author-group="$db.author.group.detail[this.$route.params.gid]"
        />
      </VCol>
    </VRow>
    <VRow
      v-if="loaded"
      dense
    >
      <VCol>
        <BiliobCard title="聚合数据">
          <VRow dense>
            <VCol cols="3">
              <h4>总粉丝数</h4>
              <span class="caption">
                {{ sumData("cFans") }}
              </span>
            </VCol>
            <VCol cols="3">
              <h4>总播放量</h4>
              <span class="caption">
                {{ sumData("cArchiveView") }}
              </span>
            </VCol>
            <VCol cols="3">
              <h4>总点赞数</h4>
              <span class="caption">
                {{ sumData("cLike") }}
              </span>
            </VCol>
            <VCol cols="3">
              <h4>总专栏阅读</h4>
              <span class="caption">
                {{ sumData("cArticleView") }}
              </span>
            </VCol>

            <VCol cols="3">
              <h4>粉丝榜首</h4>
              <div class="caption">
                {{ maxFansAuthor.name }}
              </div>
              <div class="caption">
                {{ $numberFormat(maxFansAuthor.cFans) }}
              </div>
            </VCol>
            <VCol cols="3">
              <h4>播放榜首</h4>
              <div class="caption">
                {{ maxArchiveViewAuthor.name }}
              </div>
              <div class="caption">
                {{ $numberFormat(maxArchiveViewAuthor.cArchiveView) }}
              </div>
            </VCol>
            <VCol cols="3">
              <h4>点赞榜首</h4>
              <div class="caption">
                {{ maxLikeAuthor.name }}
              </div>
              <div class="caption">
                {{ $numberFormat(maxLikeAuthor.cLike) }}
              </div>
            </VCol>
            <VCol cols="3">
              <h4>专栏榜首</h4>
              <div class="caption">
                {{ maxArticleViewAuthor.name }}
              </div>
              <div class="caption">
                {{ $numberFormat(maxArticleViewAuthor.cLike) }}
              </div>
            </VCol>
          </VRow>
        </BiliobCard>
      </VCol>
    </VRow>
    <VRow
      v-if="loaded"
      dense
    >
      <VCol cols="12">
        <VCard>
          <VTabs
            background-color="transparent"
            slider-color="primary"
          >
            <VTab @click="sortChange(0)">
              <VIcon>
                mdi-account-heart
              </VIcon>
              <div style="margin-left:10px">
                粉丝总数
              </div>
            </VTab>
            <VTab @click="sortChange(1)">
              <VIcon>
                mdi-play-circle-outline
              </VIcon>
              <div style="margin-left:10px">
                播放总量
              </div>
            </VTab>
            <VTab @click="sortChange(2)">
              <VIcon>
                mdi-thumb-up-outline
              </VIcon>
              <div style="margin-left:10px">
                获赞总量
              </div>
            </VTab>
            <VTab @click="sortChange(3)">
              <VIcon>
                mdi-script-text-outline
              </VIcon>
              <div style="margin-left:10px">
                专栏阅读
              </div>
            </VTab>
          </VTabs>
        </VCard>
      </VCol>
    </VRow>
    <VFabTransition
      v-if="loaded"
      group
    >
      <VRow
        v-for="author in $db.author.group.detail[this.$route.params.gid]
          .authorList"
        :key="author.mid"
        dense
      >
        <VCol cols="12">
          <BiliobAuthorInfoCard :author="author" />
        </VCol>
      </VRow>
    </VFabTransition>
  </VContainer>
</template>
<script>
export default {
  data() {
    return {
      loaded: false,
      data: []
    };
  },
  computed: {
    maxFansAuthor() {
      return this.maxAuthor("cFans");
    },
    maxArchiveViewAuthor() {
      return this.maxAuthor("cArchiveView");
    },
    maxLikeAuthor() {
      return this.maxAuthor("cLike");
    },
    maxArticleViewAuthor() {
      return this.maxAuthor("cArticleView");
    }
  },
  mounted() {
    if (this.$db.author.group.detail[this.$route.params.gid] == undefined) {
      this.axios.get(`/author/group/${this.$route.params.gid}`).then(r => {
        this.$db.author.group.detail[this.$route.params.gid] = r.data;
        this.data = this.$db.author.group.detail[
          this.$route.params.gid
        ].authorList;
        this.loaded = true;
      });
    } else {
      this.data = this.$db.author.group.detail[
        this.$route.params.gid
      ].authorList;
      this.loaded = true;
    }
  },
  methods: {
    maxAuthor(index) {
      let maxValue = 0;
      let result;
      this.data.forEach(author => {
        if (author[index] > maxValue) {
          result = author;
          maxValue = result[index];
        }
      });
      if (result == null) {
        result = { name: "" };
      }
      return result;
    },
    sumData(index) {
      return this.$numberFormat(
        this.data
          .filter(author => author[index])
          .reduce((sum, author) => sum + author[index], 0)
      );
    },
    sortChange(i) {
      let index = ["cFans", "cArchiveView", "cLike", "cArticleView"];
      this.$db.author.group.detail[this.$route.params.gid].authorList.sort(
        (a, b) => {
          return b[index[i]] - a[index[i]];
        }
      );
    }
  }
};
</script>
