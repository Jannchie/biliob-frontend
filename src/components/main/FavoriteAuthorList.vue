<template>
  <div class="author-list-main">
    <div style="background-color:#F8F8F8">
      <div>
        <!--
          <v-search-form slot="search" @getSearchValue="getSearchValue" hint="请输入UP主名称，或者uid"></v-search-form>
        -->
        <VCard v-for="eachAuthor in authorList.content" :key="eachAuthor.mid" class="author-cards" ripple :to="'/author/' + eachAuthor.mid">
          <div style="padding:5px;display:flex">
            <div>
              <VResponsive :aspect-ratio="16 / 9">
                <img style="border-radius:40px;width:80px;height:80px" :src="eachAuthor.face.slice(5)" :lazy-src="eachAuthor.face.slice(5)" />
              </VResponsive>
            </div>
            <div style="margin-left:10px;width:100%">
              <div class="font-weight-bold author-title">
                {{ eachAuthor.name }}
                <VIcon v-if="eachAuthor.sex === '男'" color="blue" small>mdi-gender-male</VIcon>
                <VIcon v-if="eachAuthor.sex === '女'" color="pink" small>mdi-gender-female</VIcon>
                <VIcon v-if="eachAuthor.sex === '保密'" color="purple" small>mdi-gender-male-female</VIcon>
              </div>
              <div v-if="eachAuthor.official !== ''" class="caption subtext author-info">
                <VIcon color="#FBC02D" small>mdi-flash</VIcon>{{ eachAuthor.official }}
              </div>
            </div>
            <ObserveStatus class="observe-status" :object="eachAuthor"></ObserveStatus>
          </div>
        </VCard>
      </div>
      <div class="block">
        <div class="text-xs-center">
          <VPagination v-model="currentPage" light ripple total-visible="5" :length="authorList.totalPages"></VPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObserveStatus from "../common/ObserveStatus.vue";
export default {
  components: { ObserveStatus },
  data() {
    return {
      authorList: {},
      currentApiurl: String,
      currentPage: 1
    };
  },
  watch: {
    currentPage: function changePage(page) {
      this.axios
        .get(this.currentApiurl + "?page=" + (page - 1))
        .then(response => {
          this.authorList = response.data;
        });
    }
  },
  created() {
    this.currentApiurl = "/user/author";
    this.axios.get(this.currentApiurl).then(response => {
      this.authorList = response.data;
    });
  },
  methods: {
    getSearchValue(value) {
      if (!isNaN(Number(value))) {
        this.currentApiurl = "/user/author?aid=" + value;
        this.axios.get(this.currentApiurl).then(response => {
          this.authorList = response.data;
        });
      } else {
        this.currentApiurl = "/user/author?text=" + value;
        this.axios.get(this.currentApiurl).then(response => {
          this.authorList = response.data;
        });
      }
    },
    handleChoosed(index, row) {
      this.$router.push({
        path: "/user/author/" + row.mid + "/user/author/" + row.aid
      });
    }
  }
};
</script>

<style>
.face {
  position: relative;
  height: 60%;
  width: 60%;
  align-content: center;
  border-radius: 4px;
}

.el-table td {
  padding: 2px 0;
}

p {
  position: absolute;
  bottom: 0px;
  margin-bottom: 5px;
}

.author-cards {
  margin: 10px 2px;
  height: 90px;
  border-radius: 5px;
}

.author-title {
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.subtext {
  color: #444444;
}

.observe-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.author-info {
  margin-top: 5px;
}
</style>
