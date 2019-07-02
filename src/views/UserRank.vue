<template>
  <MainLayout>
    <div slot="main-cards">
      <UserListItem
        v-for="(eachUser, index) of userData"
        :key="eachUser.name"
        :name="eachUser.name"
        :index="index"
        :role="eachUser.role"
        :exp="eachUser.exp"
        :create-time="eachUser.id.date"
      >
      </UserListItem>
    </div>
    <div slot="aside-cards">
      <OtherLink />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import OtherLink from "../components/aside/OtherLink.vue";
import UserListItem from "../components/common/UserListItem.vue";
export default {
  name: "UserRank",
  components: {
    MainLayout,
    OtherLink,
    UserListItem
  },
  data() {
    return {
      userData: Object()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get("/rank/user").then(response => {
      this.userData = response.data.content;
    });
  }
};
</script>
