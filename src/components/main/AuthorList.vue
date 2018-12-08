<template>
  <div class="author-list-main">
    <div style="background-color:#F8F8F8">
      <div>
        <VSearchForm slot="search" hint="请输入UP主名称，或者uid" @getSearchValue="getSearchValue"></VSearchForm>
        <VCard v-for="eachAuthor in authorList.content" :key="eachAuthor.mid" class="author-cards" ripple
          :to="'/author/'+eachAuthor.mid">
          <div style="padding:5px;display:flex">
            <div>
              <VResponsive :aspect-ratio="16/9">
                <img style="border-radius:40px;width:80px;height:80px" :src="eachAuthor.face.slice(5)" />
              </VResponsive>
            </div>
            <div style="margin-left:10px;width:100%">
              <div class="font-weight-bold author-title">
                {{eachAuthor.name}}
                <SexIcon :sex="eachAuthor.sex"></SexIcon>
              </div>
              <div v-if="eachAuthor.official !== ''" class="caption subtext author-info">
                <VIcon color="#FBC02D" small>mdi-flash</VIcon>{{eachAuthor.official}}
              </div>
            </div>
            <ObserveStatus class="observe-status" :object="eachAuthor"></ObserveStatus>
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>

<script>
import VSearchForm from "../common/VSearchForm.vue";
import ObserveStatus from "../common/ObserveStatus.vue";
import SexIcon from "../common/SexIcon.vue";
export default {
  name: "AuthorList",
  components: {
    VSearchForm,
    SexIcon,
    ObserveStatus
  },
  data() {
    return {
      authorList: [],
      currentApiurl: String(),
      currentPage: 0,
      text: String()
    };
  },
  watch: {
    text: function() {
      this.currentPage = 0;
      this.axios
        .get(
          this.currentApiurl +
            "?page=" +
            this.currentPage +
            "&text=" +
            this.text
        )
        .then(response => {
          this.authorList.content = response.data.content;
        });
    },
    currentPage: function changePage(page) {
      this.axios
        .get(this.currentApiurl + "?page=" + page + "&text=" + this.text)
        .then(response => {
          response.data.content.forEach(e => {
            this.authorList.content.push(e);
          });
        });
    }
  },
  created() {
    this.currentApiurl = "/author";
    this.axios.get(this.currentApiurl).then(response => {
      this.authorList = response.data;
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    onScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        this.currentPage += 1;
      }
    },
    getSearchValue(value) {
      this.text = value;
    },
    handleChoosed(index, row) {
      this.$router.push({
        path: "/author/" + row.mid + "/author/" + row.aid
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
