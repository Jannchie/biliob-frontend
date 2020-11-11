<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <BiliobCard title="观测者议会">
          <VRow dense>
            <VCol cols="12">
              <VueMarkdown source="观测者议会是了解观测者需求的平台。具备一定权限的观测者能够在此提出议程，所有观测者都能够决定支持或是反对某项议程。目前只有**高级研究员**以上才能够提出议程，提出议程需要消耗**50点积分**。" />
            </VCol>
            <VCol>
              <RouterLink to="/faq#观测者议会相关问题">
                前往FAQ查看相关问题
              </RouterLink>
            </VCol>
          </VRow>
        </BiliobCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol cols="12">
        <VCard elevation="3">
          <VTabs>
            <VTab @click.stop="filter= 0">
              <VBadge
                inline
                :content="waiting.toString()"
              >
                未处理
              </VBadge>
            </VTab>
            <VTab @click.stop="filter= 1">
              <VBadge
                inline
                :content="pending.toString()"
              >
                进行中
              </VBadge>
            </VTab>
            <VTab @click.stop="filter= 2">
              <VBadge
                inline
                :content="finished.toString()"
              >
                已处理
              </VBadge>
            </VTab>
            <VTab @click.stop="filter= 3">
              <VBadge
                inline
                :content="closed.toString()"
              >
                已丢弃
              </VBadge>
            </VTab>
          </VTabs>
        </VCard>
      </VCol>
    </VRow>
    <VSlideYTransition
      hide-on-leave
      mode="out-in"
    >
      <VRow
        v-if="loading"
        dense
      >
        <VCol cols="12">
          <VSkeletonLoader
            elevation="3"
            style="width:'100%'"
            type="card"
          />
        </VCol>
      </VRow>
    </VSlideYTransition>
    <VRow dense>
      <VCol>
        <VSlideYTransition
          group
          mode="out-in"
        >
          <BiliobCard
            v-if="empty"
            key="hint"
            title="提示"
          >
            该列表当前为空。
          </BiliobCard>
          <VSlideYTransition
            key="test"
            group
            mode="out-in"
          >
            <div
              v-for="agenda in agendas"
              :key="agenda.id"
              class="test"
            >
              <BiliobCard
                :key="agenda.id"
                class="mb-2"
              >
                <VMenu
                  v-if="$db.user != undefined && $db.user.id != undefined && $db.user.id.counter == agenda.creator.id.counter"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <VBtn
                      absolute
                      icon
                      style="right: 10px"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <VIcon>
                        mdi-dots-horizontal
                      </VIcon>
                    </VBtn>
                  </template>
                  <VList>
                    <VListItem
                      color="error"
                      @click="deleteAgenda(agenda.id)"
                    >
                      <VListItemIcon>
                        <VIcon>mdi-delete</VIcon>
                      </VListItemIcon>
                      <VListItemTitle>删除</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
                <div class="text--disabled overline">
                  {{ agenda.id }}
                </div>
                <VRow
                  v-if="$vuetify.breakpoint.lgAndUp"
                  no-gutters
                  class="title text--primary"
                >
                  <VCol cols="auto">
                    {{ agenda.title }}
                    <BiliobAgendaTypeChip
                      class="ml-2 align-self-center"
                      :value="agenda.type"
                    />
                    <BiliobAgendaStateChip
                      class="align-self-center"
                      :value="agenda.state"
                    />
                  </VCol>
                  <VSpacer />
                  <span class="font-weight-black primary--text"> {{ $numberFormat(agenda.score ) }}</span>
                </VRow>
                <VRow
                  v-else
                  dense
                  class="title text--primary"
                >
                  <VCol cols="auto">
                    {{ agenda.title }}
                  </VCol>
                  <VCol
                    v-if="$vuetify.breakpoint.lgAndUp"
                    cols="auto"
                  >
                    <BiliobAgendaTypeChip
                      class="align-self-center"
                      :value="agenda.type"
                    />
                    <BiliobAgendaStateChip
                      class="align-self-center"
                      :value="agenda.state"
                    />
                  </VCol>
                  <VCol
                    v-if="$vuetify.breakpoint.lgAndUp"
                    cols="auto"
                  >
                    <span class="font-weight-black primary--text"> {{ $numberFormat(agenda.score ) }}</span>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol>
                    <div class="caption">
                      {{ agenda.creator.nickName != undefined? agenda.creator.nickName: $db.user.nickName }} /
                      {{ $timeFormat(agenda.createTime,"YYYY-MM-DD HH:mm:ss") }}
                    </div>
                    <div>
                      {{ agenda.desc }}
                    </div>
                  </VCol>
                </VRow>
                <div>
                  <VRow
                    no-gutters
                    class="caption"
                  >
                    <VCol
                      class="success--text"
                      cols="6"
                    >
                      支持：{{ $numberFormat(agenda.favorScore) }}({{ agenda.favorCount }}人)
                    </VCol>
                    <VCol
                      class="text-right error--text"
                      cols="6"
                    >
                      反对：{{ $numberFormat(agenda.againstScore) }}({{ agenda.againstCount }}人)
                    </VCol>
                  </VRow>
                  <VRow
                    v-if="$db.user.role == '见齐'"
                    dense
                  >
                    <VCol cols="3">
                      <VBtn
                        block
                        color="primary"
                        tile
                        outlined
                        @click="modifyState(agenda.id,0)"
                      >
                        等待
                      </VBtn>
                    </VCol>
                    <VCol cols="3">
                      <VBtn
                        block
                        color="primary"
                        tile
                        outlined
                        @click="modifyState(agenda.id,3)"
                      >
                        处理
                      </VBtn>
                    </VCol>
                    <VCol cols="3">
                      <VBtn
                        block
                        color="primary"
                        tile
                        outlined
                        @click="modifyState(agenda.id,1)"
                      >
                        完成
                      </VBtn>
                    </VCol>
                    <VCol cols="3">
                      <VBtn
                        block
                        color="primary"
                        tile
                        outlined
                        @click="modifyState(agenda.id,2)"
                      >
                        丢弃
                      </VBtn>
                    </VCol>
                  </VRow>
                  <VRow dense>
                    <VCol :cols="Math.round( agenda.favorCount / (agenda.againstCount +agenda.favorCount) * 6)">
                      <VBtn
                        block
                        color="success"
                        tile
                        depressed
                        @click="postOpinion('support',agenda.id)"
                      >
                        <VIcon :left="$vuetify.breakpoint.lgAndUp">
                          mdi-thumb-up
                        </VIcon>
                        <span v-if="$vuetify.breakpoint.lgAndUp">
                          支持
                        </span>
                      </VBtn>
                    </VCol>
                    <VCol cols="3">
                      <VBtn
                        color="warning"
                        tile
                        depressed
                        block
                        @click="postOpinion('abstain',agenda.id)"
                      >
                        <VIcon :left="$vuetify.breakpoint.lgAndUp">
                          mdi-thumbs-up-down
                        </VIcon>
                        <span v-if="$vuetify.breakpoint.lgAndUp">
                          中立
                        </span>
                      </VBtn>
                    </VCol>
                    <VCol :cols="Math.round(9 - agenda.favorCount / (agenda.againstCount + agenda.favorCount) * 6)">
                      <VBtn
                        color="error"
                        block
                        tile
                        depressed
                        @click="postOpinion('against',agenda.id)"
                      >
                        <VIcon :left="$vuetify.breakpoint.lgAndUp">
                          mdi-thumb-down
                        </VIcon>
                        <span v-if="$vuetify.breakpoint.lgAndUp">
                          反对
                        </span>
                      </VBtn>
                    </VCol>
                  </VRow>
                </div>
              </BiliobCard>
            </div>
          </VSlideYTransition>
        </VSlideYTransition>
        <VRow
          v-if="!loading && !empty"
          dense
        >
          <VCol cols="6">
            <VBtn
              color="primary"
              block
              outlined
              :disabled="page==0"
              @click="$vuetify.goTo(0);page--;"
            >
              上一页
            </VBtn>
          </VCol>
          <VCol cols="6">
            <VBtn
              block
              color="primary"
              outlined
              :disabled="agendas.length<20"
              @click="$vuetify.goTo(0);page++;"
            >
              下一页
            </VBtn>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
export default {
  data() {
    return {
      agendas: [],
      page: 0,
      sort: 1,
      filter: 0,
      empty: false,
      loading: true,
      waiting: 0,
      pending: 0,
      finished: 0,
      closed: 0
    };
  },
  watch: {
    sort() {
      this.page = 0;
      this.loadData();
    },
    filter() {
      this.page = 0;
      this.loadData();
    },
    page() {
      this.loadData();
    },
    "$db.agenda": {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.agendas = this.$db.agenda[this.filter][this.sort].slice(
          20 * this.page,
          20 + 20 * this.page
        );
      },
      deep: true
    }
  },
  mounted() {
    this.axios(`/agenda/state`).then((r) => {
      this.waiting = null != r.data.waiting ? r.data.waiting : 0;
      this.pending = null != r.data.pending ? r.data.pending : 0;
      this.finished = null != r.data.finished ? r.data.finished : 0;
      this.closed = null != r.data.closed ? r.data.closed : 0;
    });
    this.page = 0;
    this.loadData();
  },
  methods: {
    loadData() {
      if (
        this.$db.agenda == undefined ||
        this.$db.agenda[this.filter] == undefined ||
        this.$db.agenda[this.filter][this.sort] == undefined ||
        (this.$db.agenda[this.filter][this.sort].length <= this.page * 20 &&
          this.$db.agenda[this.filter][this.sort].length != 0)
      ) {
        this.loading = true;
        this.agendas = [];
        let page = this.page;
        let sort = this.sort;
        let filter = this.filter;
        this.axios
          .get(`/agenda`, {
            params: {
              p: page,
              sort: sort,
              filter: filter
            }
          })
          .then((r) => {
            if (this.$db.agenda == undefined) this.$db.agenda = {};
            if (this.$db.agenda[filter] == undefined)
              this.$db.agenda[filter] = {};
            if (this.$db.agenda[filter][sort] == undefined) {
              this.$db.agenda[filter][sort] = [];
            }
            this.$db.agenda[filter][sort].push(...r.data);
            this.loading = false;
            if (this.$db.agenda[filter][sort].length == 0) {
              this.empty = true;
              return;
            }
            if (this.filter == filter) {
              this.agendas = this.$db.agenda[filter][sort].slice(
                20 * this.page,
                20 + 20 * this.page
              );
            }
          });
      } else {
        this.loading = false;
        if (this.$db.agenda[this.filter][this.sort].length == 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }
        this.agendas = this.$db.agenda[this.filter][this.sort].slice(
          20 * this.page,
          20 + 20 * this.page
        );
      }
    },
    color(value) {
      switch (value) {
        case 1:
          return "blue";
        case 2:
          return "orange";
        case 3:
          return "red";
        default:
          return "green";
      }
    },
    deleteAgenda(id) {
      this.axios.delete(`/agenda/${id}`).then((r) => {
        if (r.data.code == -1) {
          return;
        }
        for (let f = 0; f < Object.keys(this.$db.agenda).length; f++) {
          let filter = Object.keys(this.$db.agenda)[f];
          for (let i = 0; i < Object.keys(this.$db.agenda).length; i++) {
            let key = Object.keys(this.$db.agenda[filter])[i];
            for (let j = 0; j < this.$db.agenda[filter][key].length; j++) {
              const element = this.$db.agenda[filter][key][j];
              if (element.id == id) {
                this.$db.agenda[filter][key].splice(j, 1);
              }
            }
          }
        }

        // this.agendas = this.$db.agenda[this.filter][this.sort].slice(
        //   20 * this.page,
        //   20
        // );
      });
    },
    modifyState(id, state) {
      this.axios.put(`/agenda/${id}/state/${state}`);
    },
    postOpinion(opinion, id) {
      this.axios.post(`/agenda/${id}/${opinion}`).then((r) => {
        for (
          let index = 0;
          index < Object.keys(this.$db.agenda).length;
          index++
        ) {
          const filter = Object.keys(this.$db.agenda)[index];
          let agenda = this.$db.agenda[filter];
          let sorts = Object.keys(agenda);
          for (let i = 0; i < sorts.length; i++) {
            for (let j = 0; j < agenda[sorts[i]].length; j++) {
              if (agenda[sorts[i]][j].id == r.data.data.id) {
                agenda[sorts[i]][j]["againstCount"] =
                  r.data.data["againstCount"];
                agenda[sorts[i]][j]["againstScore"] =
                  r.data.data["againstScore"];
                agenda[sorts[i]][j]["favorCount"] = r.data.data["favorCount"];
                agenda[sorts[i]][j]["favorScore"] = r.data.data["favorScore"];
                agenda[sorts[i]][j]["score"] = r.data.data["score"];
              }
            }
            this.$db.agenda[filter][sorts[i]] = this.$db.agenda[filter][
              sorts[i]
            ].sort((a, b) => -a.score + b.score);
          }
          // this.agendas = this.$db.agenda[this.filter][this.sort].slice(
          //   20 * this.page,
          //   20
          // );
        }
      });
    }
  }
};
</script>

