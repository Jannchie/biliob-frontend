<template>
  <VRow v-if="loading">
    <VCol cols="12">
      <VSkeletonLoader
        class="elevation-3"
        type="card"
      />
    </VCol>
  </VRow>
  <VRow
    v-else
    dense
  >
    <VCol
      v-for="(group, i) in groupList"
      :key="i"
      cols="12"
      lg="6"
    >
      <BiliobAuthorGroupInfoCard
        :author-group="group"
      />
    </VCol>
  </VRow>
</template>
<script>
export default {
  data() {
    return {
      groupList: undefined,
      loading: true,
      page: 1
    };
  },
  watch: {
    "$route.params.catalog"(catalog) {
      this.getData(catalog);
    }
  },
  mounted() {
    this.getData(this.$route.params.catalog);
  },
  methods: {
    getData(catalog, page = 1) {
      if (catalog == "maintain") {
        this.groupList = this.$db.maintainAuthorGroup;
      } else {
        this.groupList = this.$db.starAuthorGroup;
      }
      if (this.groupList == undefined) {
        this.loading = true;
        this.axios
          .get(`/user/author/group/${catalog}?p=${page}&ps=20`)
          .then(r => {
            if (catalog == "maintain") {
              this.$db.maintainAuthorGroup = r.data;
            } else {
              this.$db.starAuthorGroup = r.data;
            }
            this.groupList = r.data;
            this.loading = false;
          });
      }
    }
  }
};
</script>
