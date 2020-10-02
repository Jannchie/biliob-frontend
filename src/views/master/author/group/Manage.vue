<template>
  <VContainer>
    <VRow
      v-if="!loaded"
      dense
    >
      <VCol>
        <VSkeletonLoader
          class="elevation-1"
          type="card"
        />
      </VCol>
    </VRow>
    <VRow
      v-else
      dense
    >
      <VCol>
        <BiliobCard title="群组基本信息">
          <BiliobAuthorGroupInfoForm
            :gid="this.$route.params.gid"
            :name="name"
            :desc="desc"
            :tag-list="tagList"
          />
        </BiliobCard>
      </VCol>
      <VCol cols="12">
        <BiliobCard title="添加或移除UP主">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="uid"
                outlined
                hide-details
                label="UP主ID"
                @keyup.enter="addNewTag(newTag)"
              />
            </VCol>
          </VRow>
          <VRow>
            <VSpacer />
            <VCol cols="auto">
              <VRadioGroup
                v-model="operationType"
                row
              >
                <VRadio
                  v-for="n in [
                    ['add', '添加'],
                    ['del', '移除']
                  ]"
                  :key="n[1]"
                  :label="`${n[1]}`"
                  :value="n[0]"
                />
              </VRadioGroup>
            </VCol>
            <VCol
              cols="auto"
              class="align-self-center"
            >
              <VBtn
                :disabled="uid == undefined || uid == ''"
                large
                color="primary"
                :loading="authorLoading"
                @click="authorSubmit"
              >
                <VIcon left>
                  mdi-pencil
                </VIcon> 提交
              </VBtn>
            </VCol>
          </VRow>
        </BiliobCard>
      </VCol>
      <VCol cols="12">
        <BiliobCard title="危险操作">
          <VRow dense>
            <VCol cols="auto">
              <VBtn
                color="error"
                large
                @click.stop="deleteGroup"
              >
                删除群组
              </VBtn>
            </VCol>
            <VCol cols="auto">
              <VBtn
                disabled
                color="warning"
                large
              >
                TODO: 转交群组
              </VBtn>
            </VCol>
            <VCol cols="auto">
              <VBtn
                disabled
                color="green"
                large
              >
                TODO: 添加编辑者
              </VBtn>
            </VCol>
          </VRow>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
export default {
  data() {
    return {
      loaded: false,
      operationType: "add",
      uid: undefined,
      authorLoading: false,
      infoLoading: false
    };
  },
  mounted() {
    if (this.$db.author.group.detail[this.$route.params.gid] == undefined) {
      this.axios.get(`/author/group/${this.$route.params.gid}`).then(r => {
        this.$db.author.group.detail[this.$route.params.gid] = r.data;
        this.loadData();
      });
    } else {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      var data = this.$db.author.group.detail[this.$route.params.gid];
      this.loaded = true;
      this.name = data.name;
      this.desc = data.desc;
      this.tagList = data.tagList;
    },
    authorSubmit() {
      this.authorLoading = true;

      this.axios
        .put(
          `/author/group/${this.$route.params.gid}/${this.operationType}/${this.uid}`
        )
        .then(() => {
          this.authorLoading = false;
        });
    },
    deleteGroup() {
      this.axios.delete(`/author/group/${this.$route.params.gid}`);
    }
  }
};
</script>
