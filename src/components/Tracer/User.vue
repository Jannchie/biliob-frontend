<template>
  <VLayout wrap>
    <VFlex lg9>
      <BiliobCard
        title="查询条件"
        subtitle="高级查询可能会消耗较多时间"
      >
        <VForm>
          <VLayout wrap>
            <VFlex lg4>
              <VSelect
                v-model="matchField"
                label="根据字段筛选"
                :items="matchFields"
              />
            </VFlex>
            <VFlex lg4>
              <VSelect
                v-model="matchMethod"
                label="筛选方式"
                :items="matchMethods"
              />
            </VFlex>
            <VFlex lg4>
              <VTextField
                v-model="matchValue"
                label="筛选值"
              />
            </VFlex>

            <VFlex lg3>
              <VSelect
                v-model="groupByField"
                label="根据日期聚合"
                :items="groupByFields"
              />
            </VFlex>
            <VFlex lg3>
              <VSelect
                v-model="groupReference"
                label="聚合查询字段"
                :items="groupReferences"
              />
            </VFlex>

            <VFlex lg3>
              <VSelect
                v-model="groupKeyword"
                label="聚合方式"
                :items="groupKeywords"
              />
            </VFlex>

            <VFlex lg3>
              <VSelect
                v-model="bucket"
                label="分桶统计"
                :items="buckets"
              />
            </VFlex>
            <VFlex lg10>
              <VSelect
                v-model="orderBy"
                label="根据字段排序"
                :items="orderBys"
              />
            </VFlex>

            <VFlex lg2>
              <VRadioGroup
                v-model="sort"
                :column="false"
              >
                <VRadio
                  :key="1"
                  :label="`升序`"
                  :value="1"
                />
                <VRadio
                  :key="2"
                  :label="`降序`"
                  :value="-1"
                />
              </VRadioGroup>
            </VFlex>

            <VFlex lg6>
              <VBtn
                dark
                color="primary"
                @click.stop="submit"
              >
                <VIcon>mdi-account-search-outline</VIcon>提交查询
              </VBtn>
            </VFlex>
            <VFlex lg4>
              <VTextField
                v-model="searchMethodName"
                label="查询命名"
              />
            </VFlex>
            <VFlex lg2>
              <VBtn
                :disabled="searchMethodName == ''"
                @click.stop="save"
              >
                <VIcon>mdi-content-save</VIcon>保存查询
              </VBtn>
            </VFlex>
          </VLayout>
        </VForm>
      </BiliobCard>
      <BiliobCard
        title="用户检索"
        text="此处显示全部用户信息"
      >
        <VDataTable
          :headers="headers"
          :items="userItems"
          hide-actions
        >
          <template
            slot="headerCell"
            slot-scope="{ header }"
            color="primary"
          >
            <span
              class="subheading font-weight-light text--primary "
              v-text="header.text"
            />
          </template>
          <template
            slot="items"
            slot-scope="{ item }"
          >
            <td v-if="!group && !isBucket">
              {{ check(item.name) }}
            </td>
            <td v-if="!group && !isBucket">
              {{ check(item.credit) }}
            </td>
            <td v-if="!group && !isBucket">
              {{ check(item.exp) }}
            </td>
            <td v-if="!group && !isBucket">
              {{ check(item.mail) }}
            </td>
            <td v-if="!group && !isBucket">
              {{ check(item._id.date) }}
            </td>
            <td v-if="!group && !isBucket">
              {{ check(item.role) }}
            </td>
            <td v-if="!group && !isBucket">
              <VBtn
                v-if="item.role != '管理员'"
                text
                class="red--text"
                @click="grantAdminRole(item.name)"
              >
                授予管理员权限
              </VBtn>
              <VBtn
                v-else
                text
                class="green--text"
                @click="cancelAdminRole(item.name)"
              >
                取消管理员权限
              </VBtn>
            </td>
            <td v-if="group && !isBucket">
              {{ check(item._id) }}
            </td>
            <td v-if="group && !isBucket && groupKeyword == 'sum'">
              {{ check(item.sum) }}
            </td>
            <td v-if="group && !isBucket && groupKeyword == 'avg'">
              {{ check(item.avg) }}
            </td>
            <td v-if="isBucket">
              {{ check(item.min) }}
            </td>
            <td v-if="isBucket">
              {{ check(item.max) }}
            </td>
            <td v-if="group || isBucket">
              {{ check(item.count) }}
            </td>
            <td v-if="group && groupKeyword == 'avg'">
              {{ check(item.avg) }}
            </td>
          </template>
        </VDataTable>
      </BiliobCard>
    </VFlex>
    <VFlex lg3>
      <BiliobCard title="预设">
        <VList two-line>
          <VListItem
            v-for="eachSearchMethod in searchMethods"
            :key="eachSearchMethod.name"
            @click.stop="getProps(eachSearchMethod)"
          >
            <VListItemContent>
              <VListItemTitle>
                {{ eachSearchMethod.name }}
              </VListItemTitle>
              <VListItemSubtitle>
                {{ eachSearchMethod.owner }}
              </VListItemSubtitle>
            </VListItemContent>
            <VListItemAction>
              <VBtn
                icon
                ripple
              >
                <VIcon
                  color="red darken-1"
                  @click="removeMethod(eachSearchMethod)"
                >
                  mdi-delete-circle
                </VIcon>
              </VBtn>
            </VListItemAction>
          </VListItem>
        </VList>
      </BiliobCard>
    </VFlex>
  </VLayout>
</template>
<script>
import { distanceInWords } from "date-fns";
var cnLocale = require("date-fns/locale/zh_cn");
export default {
  data() {
    return {
      orderBys: [
        { value: "credit", text: "积分" },
        { value: "exp", text: "经验值" },
        { value: "name", text: "名称" },
        { value: "", text: "无" }
      ],
      orderBy: "",
      isBucket: false,
      matchFields: [
        { value: "credit", text: "积分" },
        { value: "exp", text: "经验值" },
        { value: "name", text: "名称" },
        { value: "", text: "无" }
      ],
      matchField: "",

      matchMethods: [
        { value: "is", text: "等于" },
        { value: "gt", text: "大于" },
        { value: "lt", text: "小于" },
        { value: "", text: "无" }
      ],
      matchMethod: "",
      buckets: [
        { value: "auto", text: "自动均匀分布" },
        { value: "SERIES_1_2_5", text: "1:2:5分桶" },
        { value: "E6", text: "E6分桶" },
        { value: "", text: "无" }
      ],
      bucket: "",
      groupByFields: [
        { value: "day", text: "日" },
        { value: "month", text: "月" },
        { value: "year", text: "年" },
        { value: "", text: "无" }
      ],
      groupByField: "",
      groupReferences: [
        { value: "credit", text: "积分" },
        { value: "exp", text: "经验" },
        { value: "", text: "无" }
      ],
      groupReference: "",
      groupKeywords: [
        { value: "sum", text: "总量" },
        { value: "avg", text: "平均值" },
        { value: "", text: "无" }
      ],
      searchMethodName: "",
      groupKeyword: "",
      matchValue: "",
      sort: 0,
      userItems: Array(),
      headers: [
        { text: "用户名", sortable: false },
        { text: "积分", sortable: false },
        { text: "经验值", sortable: false },
        { text: "邮箱", sortable: false },
        { text: "创建时间", sortable: false },
        { text: "权限", sortable: false },
        { text: "操作", sortable: false }
      ],
      headersNormal: [
        { text: "用户名", sortable: false },
        { text: "积分", sortable: false },
        { text: "经验值", sortable: false },
        { text: "邮箱", sortable: false },
        { text: "创建时间", sortable: false },
        { text: "权限", sortable: false },
        { text: "操作", sortable: false }
      ],
      headersBucket: [
        { text: "最小值", sortable: false },
        { text: "最大值", sortable: false },
        { text: "计数", sortable: false }
      ],
      headersGroup: [
        { text: "时间", sortable: true },
        { text: "值", sortable: false },
        { text: "数量", sortable: false }
      ],
      page: 0,
      pagesize: 20,
      searchMethods: []
    };
  },
  mounted() {
    this.getSearchMethods();
    this.submitSearchMethod();
  },
  methods: {
    submit() {
      this.submitSearchMethod();
    },
    submitSearchMethod() {
      if (this.groupKeyword != "") {
        this.group = true;
        this.isBucket = false;
        this.headers = this.headersGroup;
      } else if (this.bucket != "") {
        this.group = false;
        this.headers = this.headersBucket;
        this.isBucket = true;
      } else {
        this.group = false;
        this.isBucket = false;
        this.headers = this.headersNormal;
      }
      this.axios
        .post(`/admin/user/aggregation`, {
          name: this.searchMethodName,
          orderBy: this.orderBy,
          sort: this.sort,
          bucket: this.bucket,
          groupByField: this.groupByField,
          groupReference: this.groupReference,
          groupKeyword: this.groupKeyword,
          matchField: this.matchField,
          matchValue: this.matchValue,
          matchMethod: this.matchMethod,
          bucketType: 1,
          day: 0,
          page: this.page,
          pagesize: this.pagesize
        })
        .then(r => {
          this.userItems = r.data;
        });
    },
    save() {
      this.axios
        .post(`/admin/user/search-method`, {
          owner: "",
          name: this.searchMethodName,
          orderBy: this.orderBy,
          sort: this.sort,
          bucket: this.bucket,
          groupByField: this.groupByField,
          groupReference: this.groupReference,
          groupKeyword: this.groupKeyword,
          matchField: this.matchField,
          matchValue: this.matchValue,
          matchMethod: this.matchMethod,
          bucketType: 1,
          day: 0
        })
        .then(() => {
          this.getSearchMethods();
        });
    },
    removeMethod(item) {
      this.axios
        .delete(`/admin/user/search-method`, {
          params: {
            type: item.type,
            owner: item.owner,
            name: item.name
          }
        })
        .then(function() {
          this.getSearchMethods();
        });
    },
    getSearchMethods() {
      this.axios.get(`/admin/user/search-method`).then(rr => {
        this.searchMethods = rr.data;
      });
    },
    grantAdminRole(name) {
      this.axios.put(`/admin/user/grant?userName=${name}`);
      this.submit();
    },
    cancelAdminRole(name) {
      this.axios.put(`/admin/user/cancel?userName=${name}`);
      this.submit();
    },
    getProps(props) {
      this.orderBy = props.orderBy;
      this.sort = Number(props.sort);
      this.bucket = props.bucket;
      this.groupByField = props.groupByField;
      this.groupReference = props.groupReference;
      this.groupKeyword = props.groupKeyword;
      this.matchField = props.matchField;
      this.matchValue = props.matchValue;
      this.matchMethod = props.matchMethod;
      this.submit();
    },
    lastTime(startTime, updateTime) {
      return distanceInWords(startTime, updateTime, { locale: cnLocale });
    },
    getStatus(value) {
      if (value === "0") {
        return "队列空闲中";
      } else {
        return "正在消化爬取队列";
      }
    },
    getColor(value) {
      if (value === "0" || value === "") {
        return "primary";
      } else {
        return "orange";
      }
    },
    successRate(item) {
      if (item.crawlCount == 0) {
        return "-";
      } else {
        return (
          (100 - (item.crawlFailed / item.crawlCount) * 100).toFixed(2) + "%"
        );
      }
    },
    check(value) {
      if (value == undefined) {
        return "无";
      } else {
        return value;
      }
    }
  }
};
</script>
