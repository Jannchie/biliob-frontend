<template>
  <VCard>
    <VCardTitle>添加观测站议程</VCardTitle>
    <VCardText>
      <VForm v-model="form">
        <VRow dense>
          <VCol cols="12">
            <VTextField
              v-model="title"
              solo
              label="议程标题"
              hint="使用5-30个字符简单叙述需求"
              :rules="[v => v.length <= 30 || '最多输入233个字符', v => v.length >= 5 || '至少输入5个字符']"
              counter="30"
            />
          </VCol>
          <VCol cols="12">
            <VTextarea
              v-model="desc"
              solo
              label="议程描述"
              hint="使用5-233个字符详细描述需求"
              auto-grow
              :rules="[v => v.length <= 233 || '最多输入233个字符', v => v.length >= 5 || '至少输入5个字符']"
              counter="233"
            />
          </VCol>
          <VCol cols="12">
            <VSelect
              v-model="type"
              :items="['修复问题', '添加功能', '改进功能', '其他']"
              :rules="[v => v != '' || '需要选择一个类型']"
              label="议程类型"
              solo
            />
          </VCol>
        </VRow>
        <VRow dense>
          <VSpacer />

          <VCol cols="auto">
            <VBtn
              large
              color="primary"
              :disabled="!form"
              @click.stop="submit"
            >
              <VIcon left>
                mdi-send
              </VIcon>
              提交
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script>
export default {
  data() {
    return {
      form: false,
      type: "",
      title: "",
      desc: ""
    };
  },
  methods: {
    submit() {
      let typeCode;
      if (this.type == "添加功能") {
        typeCode = 2;
      } else if (this.type == "改进功能") {
        typeCode = 1;
      } else if (this.type == "修复问题") {
        typeCode = 3;
      } else {
        typeCode = 4;
      }
      this.axios
        .post(`/agenda`, {
          title: this.title,
          desc: this.desc,
          type: typeCode
        })
        .then((r) => {
          if (this.$db.agenda == undefined) this.$db.agenda[0] = {};
          if (this.$db.agenda[0] == undefined) {
            this.$db.agenda[0][sort] = [r.data.data];
          }
          let sorts = Object.keys(this.$db.agenda[0]);
          sorts.forEach((sort) => {
            if (this.$db.agenda[0][sort] == undefined) {
              return;
            }
            r.data.data.creator.nickName = this.$db.user.nickName;
            this.$db.agenda[0][sort].unshift(r.data.data);
          });
        });
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>