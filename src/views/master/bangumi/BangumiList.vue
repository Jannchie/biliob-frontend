<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VTextField
          v-model="searchText"
          label="搜索"
          hide-details
          solo
          @keyup.enter="searchData"
        />
      </VCol>
      <VCol cols="auto">
        <VBtn
          color="primary"
          style="vertical-align: middle"
          height="48"
          @click="searchData"
        >
          <VIcon>
            mdi-magnify
          </VIcon>
        </VBtn>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol
        v-for="eachBangumi in bangumiList"
        :key="eachBangumi.sid"
        cols="12"
        lg="4"
      >
        <BiliobBangumiInfo :bangumi-info="eachBangumi" />
      </VCol>
      <VCol
        v-if="loading == true"
        cols="12"
        lg="4"
      >
        <VSkeletonLoader
          elevation="3"
          class="mx-auto"
          type="card"
        />
      </VCol>
    </VRow>
    <VRow dense>
      <VCol cols="12">
        <VBtn
          block
          outlined
          color="primary"
          @click.stop="getMore"
        >
          载入更多 / GET MORE
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
export default {
  data() {
    return {
      bangumiList: [],
      page: 1,
      pageSize: 18,
      searchText: "",
      keyword: "",
      loading: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let url = `/damn-you/bangumi/info?p=${this.page}&ps=${this.pageSize}&kw=${this.keyword}`;
      if (this.$db[url] == undefined) {
        this.axios.get(url).then(response => {
          response.data.forEach(element => {
            this.bangumiList.push(element);
            this.$db.bangumi.detail[element.sid] = element;
          });
          this.$db[url] = this.bangumiList;
          this.loading = false;
        });
      } else {
        this.bangumiList = this.$db[url];
        this.loading = false;
      }
    },
    getMore() {
      if (this.loading == false) {
        this.page += 1;
        this.getData();
      }
    },
    searchData() {
      if (this.loading == false) {
        this.keyword = this.searchText;
        this.page = 1;
        this.bangumiList = [];
        this.getData();
      }
    }
  }
};
</script>

<style></style>
