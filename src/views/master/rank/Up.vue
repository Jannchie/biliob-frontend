<template>
  <VSlideYTransition
    mode="out-in"
    group
  >
    <RouterLink
      v-for="eachData in data"
      :key="eachData.name"
      v-ripple
      class="py-2 px-5"
      style="display: flex; text-decoration: none; color: rgba(0, 0, 0, 0.87);"
      :to="linkTo(eachData)"
    >
      <VRow dense>
        <VCol cols="auto">
          <VAvatar size="60px">
            <img :src="zipPic(eachData.face)">
          </VAvatar>
        </VCol>
        <VCol>
          <div>
            <div>{{ eachData.name }}</div>
            <div v-if="eachData.official != ''">
              <VIcon
                color="#FBC02D"
                x-small
              >
                mdi-flash-circle
              </VIcon><span
                class="caption grey--text"
                style="vertical-align: middle"
              >
                {{ eachData.official }}
              </span>
            </div>
          </div>
        </VCol>
        <VCol
          cols="auto"
          style="align-self: center;"
        >
          <VChip
            :color="getColor()"
            small
            text-color="white"
            class="pl-0"
          >
            <VIcon
              class="ml-0"
              color="white"
              left
            >
              {{ getIcon() }}
            </VIcon>
            {{ $numberFormat(Math.abs(eachData.cRate), false) }}
          </VChip>
        </VCol>
      </VRow>
    </RouterLink>
  </VSlideYTransition>
</template>
<script>
export default {
  computed: {
    data() {
      switch (this.$route.path) {
        case "/rank/fans-decrease":
          return this.$store.state.rank.rankListFansDecrease;
        default:
          return this.$store.state.rank.rankListFansIncrease;
      }
    }
  },
  methods: {
    linkTo(eachData) {
      if (eachData.mid != undefined) {
        return `/author/${eachData.mid}`;
      }
    },
    getColor() {
      if (this.$route.path === "/rank/fans-increase") {
        return "red";
      } else {
        return "green";
      }
    },
    getIcon() {
      if (this.$route.path === "/rank/fans-increase") {
        return "mdi-chevron-up-circle";
      } else {
        return "mdi-chevron-down-circle";
      }
    }
  }
};
</script>
