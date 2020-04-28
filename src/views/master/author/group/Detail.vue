<template>
  <VContainer>
    <VRow v-if="!loaded" dense>
      <VCol>
        <VSkeletonLoader class="elevation-3" type="card" />
      </VCol>
    </VRow>
    <VRow v-if="loaded" dense>
      <VCol>
        <BiliobAuthorGroupInfoCard
          :sim="true"
          :author-group="$db.author.group.detail[this.$route.params.gid]"
        ></BiliobAuthorGroupInfoCard>
      </VCol>
    </VRow>
    <VRow v-if="loaded" dense>
      <VCol
        v-for="author in $db.author.group.detail[this.$route.params.gid]
          .authorList"
        :key="author.mid"
        cols="12"
      >
        <BiliobAuthorInfoCard :author="author"></BiliobAuthorInfoCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
export default {
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    if (this.$db.author.group.detail[this.$route.params.gid] == undefined) {
      this.axios.get(`/author/group/${this.$route.params.gid}`).then(r => {
        this.$db.author.group.detail[this.$route.params.gid] = r.data;
        this.loaded = true;
      });
    } else {
      this.loaded = true;
    }
  }
};
</script>
