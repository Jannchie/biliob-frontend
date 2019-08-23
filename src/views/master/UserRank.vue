<template>
  <div>
    <UserListItem
      v-for="(eachUser, index) of userData"
      :key="eachUser.name"
      class="mb-2 mt-8"
      :name="eachUser.name"
      :index="index"
      :role="eachUser.role"
      :exp="eachUser.exp"
      :create-time="eachUser.id.date"
    >
    </UserListItem>
  </div>
</template>

<script>
import UserListItem from "@/components/common/UserListItem.vue";
export default {
  name: "UserRank",
  components: {
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
