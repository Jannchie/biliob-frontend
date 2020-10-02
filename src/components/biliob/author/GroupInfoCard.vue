<template>
  <VCard>
    <VCardText style="height:calc(100% - 52px)">
      <h3 class=" text--primary">
        {{ authorGroup.name }} /
        <span
          v-for="tag in authorGroup.tagList"
          :key="tag"
          class="caption text--secondary"
        >{{ tag }}/
        </span>
      </h3>
      <h4 class="caption">
        {{ authorGroup.desc }}
      </h4>
      <h4 class="caption">
        创建者：{{ authorGroup.creator.nickName }}<br>
        维护者：{{ authorGroup.maintainer.nickName }}
      </h4>
      <div
        v-if="!sim"
        class="mt-2"
      >
        <VAvatar
          v-for="author in authorGroup.authorList"
          :key="author.mid"
          class="mr-2"
          :to="`/author/${author.mid}`"
        >
          <VImg :src="zipPic(author.face)" />
        </VAvatar>
        <span v-if="authorGroup.authors - 5 > 0">
          +{{ authorGroup.authors - 5 }}名UP主
        </span>
      </div>
    </VCardText>

    <VDivider />
    <VCardActions>
      <VBtn
        v-if="!stared"
        color="orange"
        text
        @click="star(authorGroup.id)"
      >
        <VIcon left>
          mdi-star-outline
        </VIcon>
        {{ authorGroup.stars }}
      </VBtn>
      <VBtn
        v-else
        color="orange"
        text
        @click="unstar(authorGroup.id)"
      >
        <VIcon left>
          mdi-star
        </VIcon>
        {{ authorGroup.stars }}
      </VBtn>
      <!-- <VBtn color="green" text>
                <VIcon left>mdi-directions-fork</VIcon>
                分支
              </VBtn> -->
      <VSpacer />
      <VBtn
        v-if="!sim"
        color="primary"
        text
        :to="`/authorgroup/${authorGroup.id}/detail`"
      >
        <VIcon left>
          mdi-view-list
        </VIcon>
        详情
      </VBtn>
      <VBtn
        v-if="authorGroup.maintainer.nickName == $db.user.nickName"
        color="red"
        text
        :to="`/authorgroup/${authorGroup.id}/manage`"
      >
        <VIcon left>
          mdi-settings
        </VIcon>
        管理
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  props: {
    authorGroup: Object(),
    sim: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stared: false
    };
  },
  mounted() {
    if (this.authorGroup.stared) {
      this.stared = true;
    }
  },
  methods: {
    star(gid) {
      this.axios.put(`/author/group/${gid}/star`).then(() => {
        this.stared = true;
        this.authorGroup.stars += 1;
      });
    },
    unstar(gid) {
      this.axios.delete(`/author/group/${gid}/star`).then(() => {
        this.stared = false;
        this.authorGroup.stars -= 1;
      });
    }
  }
};
</script>

<style></style>
