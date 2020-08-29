<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <BiliobCard title="议程系统">
          <VRow dense>
            <VCol>
              {{}}
            </VCol>
          </VRow>
        </BiliobCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobCard
          title="议程列表"
          :loading="agendas.length == 0"
        >
          <BiliobCard
            v-for="agenda in agendas"
            :key="agenda.id"
            class="mb-2"
          >
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
        </BiliobCard>
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
      filter: 1
    };
  },
  mounted() {
    if (
      this.$db.agenda == undefined ||
      this.$db.agenda[this.sort] == undefined ||
      this.$db.agenda[this.sort].length < this.page * 20
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
          this.$db.agenda[this.sort] = r.data;
          this.agendas = r.data;
        });
    } else {
      this.agendas = this.$db.agenda[this.sort].splice(20 * this.page, 20);
    }
  },
  methods: {
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
    postOpinion(opinion, id) {
      this.axios.post(`/agenda/${id}/${opinion}`).then((r) => {
        let sorts = Object.keys(this.$db.agenda);
        for (let i = 0; i < sorts.length; i++) {
          for (let j = 0; j < this.$db.agenda[sorts[i]].length; j++) {
            if (this.$db.agenda[sorts[i]][j].id == r.data.data.id) {
              this.$db.agenda[sorts[i]][j]["againstCount"] =
                r.data.data["againstCount"];
              this.$db.agenda[sorts[i]][j]["againstScore"] =
                r.data.data["againstScore"];
              this.$db.agenda[sorts[i]][j]["favorCount"] =
                r.data.data["favorCount"];
              this.$db.agenda[sorts[i]][j]["favorScore"] =
                r.data.data["favorScore"];
              this.$db.agenda[sorts[i]][j]["score"] = r.data.data["score"];
            }
          }
        }
      });
    }
  }
};
</script>

