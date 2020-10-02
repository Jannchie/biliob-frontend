<template>
  <VContainer>
    <VRow
      v-if="loading"
      dense
    >
      <VCol>
        <VSkeletonLoader
          class="elevation-1"
          type="card"
        />
      </VCol>
    </VRow>
    <VRow dense>
      <VCol
        v-for="author in $db.favoriteAuthor[page]"
        :key="author.mid"
        cols="12"
      >
        <BiliobAuthorInfoCard :author="author" />
      </VCol>
      <VCol
        cols="6"
      >
        <VBtn
          :disabled="page == 0"
          color="primary"
          block
          outlined
          @click.stop="page--"
        >
          上一页
        </VBtn>
      </VCol>
      <VCol
        cols="6"
      >
        <VBtn
          :disabled="last"
          color="primary"
          block
          outlined
          @click.stop="page++"
        >
          下一页
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      page: 0,
      last: true
    };
  },
  watch: {
    page() {
      this.loading = true;
      this.refreshData();
    }
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      if (this.$db.favoriteAuthor[this.page] == undefined) {
        this.axios.get(`/user/author?page=${this.page}`).then(r => {
          this.$db.favoriteAuthor[this.page] = r.data.content;
          this.last = r.data.last;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    }
  }
};
</script>
