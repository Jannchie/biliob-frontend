<template>
  <VContainer>
    <VDialog v-model="dialog" persistent max-width="500">
      <VCard>
        <VCardTitle class="headline grey lighten-2" primary-title>
          Privacy Policy
        </VCardTitle>

        <VCardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </VCardText>

        <VDivider></VDivider>

        <VCardActions>
          <div class="flex-grow-1"></div>
          <VBtn color="primary" text @click="dialog = false">
            I accept
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VRow dense>
      <VCol>
        <VTabs class="elevation-3 py-0 my-2" show-arrows>
          <VTab @click="getPage(0)">
            <VIcon left>mdi-account-card-details</VIcon>个人信息
          </VTab>
          <!-- <VTab @click="getPage(1)">
            <VIcon left>mdi-brain</VIcon>高级统计
          </VTab> -->
        </VTabs>
      </VCol>
    </VRow>
    <BiliobCard title="个人信息" light border="bottom ">
      <VForm>
        <VContainer>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="userName"
                disabled
                :counter="20"
                label="用户名"
                messages="登陆凭证之一，不可修改。"
                required
              ></VTextField>
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="nickName"
                :counter="20"
                label="昵称"
                disabled
                messages="观测者显示的名称。"
                required
              ></VTextField>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="email"
                :rules="mailRules"
                label="E-mail"
                messages="用于登陆或者密码找回。"
                required
                ><template v-slot:append-outer>
                  <VBtn to=""> 123</VBtn>
                </template>
              </VTextField>
            </VCol>
          </VRow>
        </VContainer>
      </VForm>
    </BiliobCard>
  </VContainer>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    mailRules: [
      value => !!value || "邮箱不得为空~",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "这不是一个合法的邮箱！";
      }
    ]
  }),
  computed: {
    userName: function() {
      return this.$store.getters.getUserName;
    },
    nickName: function() {
      return this.$store.getters.getNickName;
    },
    email: function() {
      return this.$store.getters.getMail;
    }
  },
  methods: {
    changeEmail() {
      this.dialog = true;
    }
  }
};
</script>
