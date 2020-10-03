<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="newName"
          outlined
          label="名称"
          hide-details
        />
      </VCol>
      <VCol cols="12">
        <VTextField
          v-model="newDesc"
          hide-details
          outlined
          label="描述"
        />
      </VCol>
      <VCol cols="auto">
        标签：
        <VChipGroup
          multiple
          active-class="primary--text"
        >
          <VSlideYTransition group>
            <VChip
              v-for="tag in tags"
              :key="tag"
              close
              small
              class="mr-2"
              outlined
              label
              @click:close="removeTag(tag)"
            >
              {{ tag }}
            </VChip>
          </VSlideYTransition>
        </VChipGroup>
      </VCol>
      <VCol>
        <VTextField
          v-model="newTag"
          hide-details
          outlined
          label="添加标签"
          @keyup.enter="addNewTag(newTag)"
        />
      </VCol>
    </VRow>
    <VRow dense>
      <VSpacer />
      <VCol cols="auto">
        <VBtn
          large
          color="primary"
          :loading="infoLoading"
          @click="submitInfoEdit"
        >
          <VIcon left>
            mdi-content-save
          </VIcon> 提交
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>

<script>
export default {
  props: {
    gid: { type: String, default: "" },
    name: String(),
    desc: String(),
    tagList: { type: Array, default: () => [] }
  },
  data() {
    return {
      infoLoading: false,
      newTag: "",
      newName: "",
      newDesc: "",
      tags: []
    };
  },
  mounted() {
    this.tags = this.tagList;
    this.newName = this.name;
    this.newDesc = this.desc;
  },
  methods: {
    removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    addNewTag(tag) {
      if (this.tags.indexOf(tag) == -1) {
        this.tags.push(tag);
      }
      this.newTag = "";
    },
    submitInfoEdit() {
      this.infoLoading = true;
      if (this.gid != "") {
        this.axios
          .put(`/author/group/${this.gid}/edit`, {
            name: this.newName,
            desc: this.newDesc,
            tagList: this.tags
          })
          .then(() => {
            this.infoLoading = false;
            this.$emit("groupInfoSubmit");
          });
      } else {
        this.axios
          .post(`/author/group`, {
            name: this.newName,
            desc: this.newDesc,
            tagList: this.tags
          })
          .then(() => {
            this.infoLoading = false;
            this.$emit("groupInfoSubmit");
          });
      }
    }
  }
};
</script>

<style></style>
