<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <VExpansionPanels tile>
          <VExpansionPanel>
            <VExpansionPanelHeader class="primary--text px-4">
              <h3>
                <VIcon
                  color="primary"
                  left
                >
                  mdi-account-group
                </VIcon>UP主群组
                / GROUP
              </h3>
            </VExpansionPanelHeader>
            <VExpansionPanelContent class="px-0">
              <VRow dense>
                <VCol>
                  <h4>UP主群组系统简介</h4>
                </VCol>
              </VRow>
              <VRow dense>
                <VCol class="body-2">
                  - 聚合统计一些相关的UP主信息。<br>
                  - 头衔达到追寻者及以上即可添加群组<br>
                  - 收藏群组需要1积分<br>
                  - 被收藏能够增加0.5积分<br>
                  - 添加群组目前需要20点积分
                  <h5>待完成功能：</h5>
                  - 维护权转交<br>
                  - 编辑者任命<br>
                  - 修改记录追踪<br>
                  - 查看收藏的群组列表<br>
                  - 设置群组列表为私有<br>
                  - 群组内聚合统计
                </VCol>
              </VRow>
              <VRow dense>
                <VSpacer />
                <VCol
                  cols="auto"
                  class="body-2"
                >
                  <VBtn
                    :disabled="
                      ['管理者', '观测者', '追寻者', '观想者'].indexOf(
                        $db.user.title
                      ) == -1
                    "
                    large
                    color="primary"
                    @click="createDialog = true"
                  >
                    <VIcon left>
                      mdi-account-multiple-plus
                    </VIcon>
                    {{
                      ["管理者", "观测者", "追寻者", "观想者"].indexOf(
                        $db.user.title
                      ) == -1
                        ? `创建群组需要用户等级达到「追寻者」`
                        : `创建新群组`
                    }}
                  </VBtn>
                  <VDialog
                    v-model="createDialog"
                    max-width="800px"
                  >
                    <VCard>
                      <VCardTitle>创建新群组</VCardTitle>
                      <VCardText>
                        <BiliobAuthorGroupInfoForm @groupInfoSubmit="groupCreated" />
                      </VCardText>
                    </VCard>
                  </VDialog>
                </VCol>
              </VRow>
            </VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <VTextField
          v-model="searchWord"
          solo
          label="输入关键词开始探索"
          hide-details
          @keyup.enter="search"
        />
      </VCol>
      <VCol
        class="align-self-center"
        cols="auto"
      >
        <VBtn
          color="primary"
          large
          @click="search"
        >
          <VIcon left>
            mdi-send
          </VIcon>
          搜索
        </VBtn>
      </VCol>
    </VRow>
    <VSlideYTransition>
      <VRow
        v-if="loaded == false"
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
        <VCol
          v-for="(authorGroup, i) in $db.author.group.list[
            `${page}${searchWord}`
          ]"
          :key="i"
          cols="12"
          lg="6"
        >
          <BiliobAuthorGroupInfoCard
            style="height: 100%"
            :author-group="authorGroup"
          />
        </VCol>
      </VRow>
    </VSlideYTransition>
    <VRow
      v-if="none"
      dense
    >
      <VCol cols="12">
        <VCard>
          <VCardText>没有数据</VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow
      v-if="loaded && !none"
      dense
    >
      <VCol cols="6">
        <VBtn
          :disabled="page == 1"
          outlined
          color="primary"
          block
          @click.stop="
            page--;
            $router.push({ query: { page: page } });
          "
        >
          上一页
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          outlined
          color="primary"
          block
          @click.stop="
            page++;
            $router.push({ query: { page: page } });
          "
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
      page: this.$route.query.page == undefined ? 1 : this.$route.query.page,
      searchWord: "",
      loaded: false,
      createDialog: false,
      none: true
    };
  },
  watch: {
    page() {
      this.getData();
    },
    "this.$route.query.page": function () {
      if (this.$route.query.page != undefined) {
        this.page = this.$route.query.page;
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    search() {
      this.page = 1;
      this.$route.query.page = 1;
      this.getData();
    },
    groupCreated() {
      this.createDialog = false;
    },
    getData() {
      this.loaded = false;
      this.none = false;
      if (this.$route.query.page == undefined) {
        this.$router.push({ query: { page: 1 } });
      }
      if (
        this.$db.author.group.list[
          `${this.$route.query.page}${this.searchWord}`
        ] == undefined
      ) {
        this.axios
          .get(
            `/author/group?p=${this.$route.query.page}&kw=${this.searchWord}`
          )
          .then((response) => {
            this.$db.author.group.list[
              `${this.$route.query.page}${this.searchWord}`
            ] = response.data;
            this.loaded = true;
            if (response.data.length == 0) {
              this.none = true;
            }
          });
      } else {
        this.loaded = true;
      }
    }
  }
};
</script>
