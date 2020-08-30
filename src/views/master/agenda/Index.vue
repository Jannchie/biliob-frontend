<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <BiliobCard title="观测者议会">
          <VRow dense>
            <VCol cols="12">
              观测者议会是了解观测者需求的平台。具备一定权限的观测者能够在此提出议程，所有观测者都能够决定支持或是反对某项议程。
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
              未处理
            </VTab>
            <VTab @click.stop="filter= 1">
              进行中
            </VTab>
            <VTab @click.stop="filter= 2">
              已处理
            </VTab>
            <VTab @click.stop="filter= 3">
              已丢弃
            </VTab>
          </VTabs>
        </VCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <VSlideYTransition mode="out-in">
          <BiliobCard
            v-if="empty"
            key="hint"
            title="提示"
          >
            该列表当前为空。
          </BiliobCard>

          <BiliobCard
            v-else
            key="list"
            title="议程列表"
            :loading="agendas.length == 0"
          >
            <VSlideYTransition
              mode="out-in"
              group
            >
              <div
                v-for="agenda in agendas"
                :key="agenda.id"
              >
                <BiliobCard class="mb-2">
                  <VMenu
                    v-if="$db.user.uid == agenda.creator.uid"
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
                    <VCol>
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
                    no-gutters
                    class="title text--primary"
                  >
                    <VCol cols="auto">
                      {{ agenda.title }}
                    </VCol>
                    <VCol cols="auto">
                      <BiliobAgendaTypeChip
                        class="align-self-center"
                        :value="agenda.type"
                      />
                      <BiliobAgendaStateChip
                        class="align-self-center"
                        :value="agenda.state"
                      />
                    </VCol>
                    <VCol cols="auto">
                      <span class="font-weight-black primary--text"> {{ $numberFormat(agenda.score ) }}</span>
                    </VCol>
                  </VRow>
                  <div class="caption">
                    {{ agenda.creator.nickName }} /
                    {{ $timeFormat(agenda.createTime,"YYYY-MM-DD HH:mm:ss") }}
                  </div>
                  <div>
                    {{ agenda.desc }}
                  </div>
                  <div>
                    <VRow dense>
                      <VSpacer />
                      <VCol cols="auto">
                        <VBtn
                          color="success"
                          depressed
                          @click="postOpinion('support',agenda.id)"
                        >
                          <VIcon left>
                            mdi-thumb-up
                          </VIcon>
                          <span v-if="$vuetify.breakpoint.lgAndUp">
                            支持
                          </span>
                          {{ $numberFormat( agenda.favorScore) }}
                        </VBtn>
                      </VCol>
                      <VCol cols="auto">
                        <VBtn
                          color="warning"
                          depressed
                          @click="postOpinion('abstain',agenda.id)"
                        >
                          <VIcon left>
                            mdi-thumbs-up-down
                          </VIcon>
                          <span v-if="$vuetify.breakpoint.lgAndUp">
                            中立
                          </span>
                        </VBtn>
                      </VCol>
                      <VCol cols="auto">
                        <VBtn
                          color="error"
                          depressed
                          @click="postOpinion('against',agenda.id)"
                        >
                          <VIcon left>
                            mdi-thumb-down
                          </VIcon>
                          <span v-if="$vuetify.breakpoint.lgAndUp">
                            反对
                          </span>
                          {{ $numberFormat( agenda.againstScore) }}
                        </VBtn>
                      </VCol>
                      <VSpacer />
                    </VRow>
                  </div>
                </BiliobCard>
              </div>
            </VSlideYTransition>
          </BiliobCard>
        </VSlideYTransition>
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
      empty: false
    };
  },
  watch: {
    "$db.agenda": function () {
      this.agendas = this.$db.agenda[this.filter][this.sort].slice(
        20 * this.page,
        20
      );
    },
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
    }
  },
  mounted() {
    this.page = 0;
    this.loadData();
  },
  methods: {
    loadData() {
      if (
        this.$db.agenda == undefined ||
        this.$db.agenda[this.filter] == undefined ||
        this.$db.agenda[this.filter][this.sort] == undefined ||
        this.$db.agenda[this.filter][this.sort].length < this.page * 20
      ) {
        this.axios
          .get(`/agenda`, {
            params: {
              p: this.page,
              sort: this.sort,
              filter: this.filter
            }
          })
          .then((r) => {
            if (this.$db.agenda == undefined) this.$db.agenda = {};
            if (this.$db.agenda[this.filter] == undefined)
              this.$db.agenda[this.filter] = {};
            this.$db.agenda[this.filter][this.sort] = r.data;
            if (this.$db.agenda[this.filter][this.sort].length == 0) {
              this.empty = true;
              return;
            }
            this.agendas = r.data;
          });
      } else {
        if (this.$db.agenda[this.filter][this.sort].length == 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }
        this.agendas = this.$db.agenda[this.filter][this.sort].slice(
          20 * this.page,
          20
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

        this.agendas = this.$db.agenda[this.filter][this.sort].slice(
          20 * this.page,
          20
        );
      });
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
          this.agendas = this.$db.agenda[this.filter][this.sort].slice(
            20 * this.page,
            20
          );
        }
      });
    }
  }
};
</script>

