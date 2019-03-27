<template>
  <MainLayout>
    <div slot="main-cards">
      <UserRecordCard :user-record-data="userRecords" />
    </div>
    <div slot="aside-cards">
      <OtherLink />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../components/common/MainLayout.vue";
import UserRecordCard from "../components/main/UserRecordCard.vue";
import OtherLink from "../components/aside/OtherLink.vue";
export default {
  components: { OtherLink, UserRecordCard, MainLayout },
  data() {
    return {
      userRecords: []
    };
  },
  mounted() {
    this.axios.get(`/user/record`).then(response => {
      this.userRecords = response.data;
    });
  }
};
</script>
