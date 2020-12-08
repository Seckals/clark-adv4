<template>
  <div>
    <IMain
      :searchs="searchs"
      :hasSelected="selected"
      delTip="确定删除选中的职位？"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          :loading="loading"
          :row-key="(record) => record.id"
          :pagination="pagination"
          :columns="columns"
          :data-source="data"
          @change="tableChange"
        >
          <a-radio
            slot="id"
            slot-scope="id"
            :checked="selected == id"
            :value="id"
            @click="selected = id"
          ></a-radio>
          <!-- <a
            slot="linkUserCount"
            slot-scope="data"
            @click="showLink(data.id)"
            >{{ data.linkUserCount }}</a
          > -->
          <a slot="operation" slot-scope="record" @click="editor(record)">
            编辑</a
          >
        </a-table>
      </template>
    </IMain>
    <Position ref="alert" :data="current" @freash="freash" />
    <LinkEmployee ref="alertLink" :id="linkId" />
  </div>
</template>
<script>
import {
  page_get,
  remove_post,
  prePage_get,
} from '../../api/hrEmployeController'
import Position from '../../components/alert/position'
import LinkEmployee from '../../components/alert/linkEmployee'
const columns = [
  {
    dataIndex: 'id',
    title: '',
    width: 50,
    scopedSlots: { customRender: 'id' },
  },
  {
    dataIndex: 'empNo',
    title: '员工工号',
  },
  {
    dataIndex: 'empName',
    title: '员工姓名',
  },
  {
    dataIndex: 'mobile',
    title: '手机机号',
  },
  {
    dataIndex: 'email',
    title: '邮箱',
  },
  {
    dataIndex: 'cardNo',
    title: '卡号',
  },
  {
    dataIndex: 'deptName',
    title: '部门',
  },
  {
    dataIndex: 'positionName',
    title: '职位',
  },
  {
    dataIndex: 'parentName',
    title: '上级',
  },
  {
    dataIndex: 'statusValue',
    title: '状态',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
  },
]
export default {
  data() {
    return {
      columns,
      data: [],
      loading: false,
      selected: '',
      linkId: '',
      current: '',
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchs: [
        {
          type: 'select',
          title: '员工姓名',
          placeholder: '请选择',
          key: 'empName',
          list: [],
          listkey: 'empName',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: '部门',
          placeholder: '请选择',
          key: 'empNo',
          list: [],
          listkey: 'name',
          listvalue: 'code',
        },
        {
          type: 'select',
          title: '职位',
          placeholder: '请选择',
          key: 'positionId',
          list: [],
          listkey: 'name',
          listvalue: 'code',
        },
        {
          type: 'select',
          title: '上级',
          placeholder: '请选择',
          key: 'maneger',
          list: [],
          listkey: 'empName',
          listvalue: 'id',
        },
        {
          type: 'input',
          title: '手机号码',
          placeholder: '请输入手机号码',
          key: 'mobile',
        },

        {
          type: 'select',
          title: '状态',
          placeholder: '请选择',
          key: 'status',
          list: [],
          listkey: 'name',
          listvalue: 'code',
        },
        {
          type: 'input',
          title: '员工工号',
          placeholder: '请输入员工工号',
          key: 'deptId',
        },
      ],
    }
  },
  components: { Position, LinkEmployee },
  mounted() {
    this.getList()
    this.gerPrePage()
  },
  methods: {
    operation({ type, data }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
        case 'del':
          this.del(this.selected)
          break
        case 'search':
          this.getList(data)
          break
      }
    },
    showLink(id) {
      this.linkId = id
      this.$refs.alertLink.show()
    },
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    editor(data) {
      this.current = data
      this.$refs.alert.show()
    },
    freash() {
      this.current = ''
      this.getList()
    },
    del(id) {
      this.loading = true
      remove_post({
        data: { id },
      })
        .then(() => {
          this.loading = false
          this.$message.success('删除成功')
          this.selected = ''
          this.getList()
        })
        .catch(() => {
          this.loading = false
        })
    },
    async gerPrePage() {
      let result = await prePage_get()
      console.log(result)
      this.searchs[0].list = result.employs || []
      this.searchs[3].list = result.employs || []
      this.searchs[1].list = result.depts || []
      this.searchs[2].list = result.positions || []
      this.searchs[5].list = result.states || []
    },
    getList(data = {}) {
      this.loading = true
      page_get({
        data: Object.assign(
          {
            limit: this.pagination.pageSize,
            page: this.pagination.current,
          },
          data
        ),
      })
        .then((res) => {
          this.loading = false
          this.data = res.result || []
          this.pagination.total = res.count
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="less" scoped></style>
