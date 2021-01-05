<template>
  <div>
    <IMain
      :searchs="searchs"
      :hasReset="true"
      permission="permission.mg-role-users.add"
      :hasAdd="false"
      @operation="operation"
      ref="IMain"
    >
      <template slot="table">
        <a-table
          bordered
          :loading="loading"
          :row-key="(record) => record.userId"
          :pagination="pagination"
          :columns="columns"
          :data-source="data"
          @change="tableChange"
        >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'permission.mg-users.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <myusers ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, prePage_get } from '../../api/myusers'
import myusers from '../../components/alert/myusers'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'account',
    title: '用户账号',
  },
  {
    dataIndex: 'statusValue',
    title: '状态',
  },
  {
    dataIndex: 'deptName',
    title: '部门',
  },
  {
    title: '员工姓名',
    dataIndex: 'empName',
  },
  {
    title: '员工工号',
    dataIndex: 'empNo',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
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
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchs: [
        {
          type: 'select',
          title: '部门',
          placeholder: '请选择',
          key: 'deptId',
          listDataKey: 'depts',
          list: [{ name: '全部', id: '' }],
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'input',
          title: '员工名称',
          placeholder: '请输入',
          key: 'empName',
        },
        {
          type: 'select',
          title: '状态',
          placeholder: '请选择',
          key: 'status',
          listDataKey: 'states',
          list: [{ name: '全部', code: '' }],
          listkey: 'name',
          listvalue: 'code',
        },
        {
          type: 'input',
          title: '邮箱',
          placeholder: '请输入',
          key: 'email',
        },
        {
          type: 'input',
          title: '手机号码',
          placeholder: '请输入',
          key: 'mobile',
        },
      ],
    }
  },
  components: { myusers },
  mixins: [mixins],
  mounted() {
    this.getSelects()
  },
  methods: {
    operation({ type, data }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
        case 'search':
          this.getList(data)
          break
      }
    },
    tableChange(e) {
      this.pagination = e
      this.getList(this.$refs.IMain.searchData)
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
    getSelects() {
      prePage_get().then((res) => {
        this.searchs.map((item) => {
          if (item.listDataKey) {
            item.list = item.list.concat(res[item.listDataKey])
          }
          return item
        })
      })
    },
  },
}
</script>
