<template>
  <VRow
    class="pa-0"
    dense
  >
    <VCol cols="12">
      <div>
        <h3 class="caption primary--text">
          赞助 / SPONSORS
        </h3>
        <VChip
          label
          text
          small
          class="px-1"
          style="vertical-align: sub;"
          color="#0000"
          href="https://azz.net/jannchie"
        >
          <VIcon small>
            mdi-currency-cny
          </VIcon>
          加入赞助
        </VChip>
        <VChip
          label
          text
          small
          class="px-1 mb-2 caption"
          style="vertical-align: sub;"
          color="#0000"
          @click="sort == 0 ? (sort = 1) : (sort = 0)"
        >
          <VIcon small>
            mdi-arrow-down
          </VIcon>
          {{ sort == 0 ? "时间" : "总额" }}顺序
        </VChip>
      </div>
      <VDivider />
      <VSlideYTransition
        group
        mode="out-in"
      >
        <div
          v-for="(eachSponsor, i) in sponsor"
          :key="`${i}${eachSponsor.user.name}`"
          :class="$vuetify.breakpoint.lgAndDown ? `px-1` : ``"
        >
          <h4
            class="text--secondary"
            style="
                white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
              "
          >
            {{ eachSponsor.user.name }}
          </h4>
          <h5 class="text--disabled caption">
            累计支援 {{ eachSponsor.orderPrice / 100 }} ￥
          </h5>
          <h5 class="text--disabled caption">
            {{ $timeFormat(eachSponsor.createDate, "MM-DD HH:mm") }}
          </h5>
          <VDivider />
        </div>
      </VSlideYTransition>
    </VCol>
  </VRow>
</template>
<script>
export default {
  data() {
    return {
      sponsor: [],
      sort: 0
    };
  },
  watch: {
    sort(val) {
      this.getData(val);
    }
  },
  mounted() {
    this.getData(this.sort);
  },
  methods: {
    getData(sort) {
      let key = "latest";
      if (sort == 1) {
        key = "most";
      }
      if (this.$db.sponsor[key].length == 0) {
        this.axios
          .get(`/site/sponsor?p=${1}&ps=${20}&sort=${sort}`)
          .then((res) => {
            this.$db.sponsor[key] = res.data;
            this.sponsor = this.$db.sponsor[key];
          });
      } else {
        this.sponsor = this.$db.sponsor[key];
      }
    }
  }
};
</script>

<style scoped>
.theme--light.v-sheet {
  background-color: #0000;
  color: #4446;
}
</style>
