<template>
  <div>
    <IMain :searchs="searchs"
           :hasReset="true"
           permission="permission.mg-role-users.add"
           @operation="operation"
           ref="IMain">
      <div slot="detail">
        <div style="margin-bottom: 12px">
          模块:{{ $route.query.moduleName }}
        </div>
        <div style="margin-bottom: 12px">角色名:{{ $route.query.name }}</div>
      </div>
      <a-button slot="btns-left"
                @click="operation({ type: 'del' })"
                v-permission="'permission.mg-role-users.delete'"
                :disabled="!selectedRowKeys || selectedRowKeys.length === 0">删除</a-button>
      <a-button slot="btns-right"
                type="primary"
                @click="$router.back()">返回</a-button>
      <template slot="table">
        <a-table bordered
                 :loading="loading"
                 :row-key="(record) => record.userId"
                 :pagination="pagination"
                 :row-selection="{
            selectedRowKeys,
            onChange: onSelectChange,
          }"
                 :columns="columns"
                 :data-source="data"
                 @change="tableChange">
        </a-table>
      </template>
    </IMain>
    <mgrolenusers ref="alert"
                  @freash="freash" />
  </div>
</template>
<script>
import {
  pageLinkSysUser,
  linkOrUnlinkSysFunction,
  prePageLinkSysUser,
} from '../../api/myrole'
import mgrolenusers from '../../components/alert/mgrolenusers'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'deptName',
    title: '部门',
  },
  {
    dataIndex: 'empName',
    title: '员工姓名',
  },
  {
    dataIndex: 'email',
    title: '员工邮箱',
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
  },
  {
    title: '用户账号',
    dataIndex: 'account',
  },
]
export default {
  data () {
    return {
      columns,
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      selectedRowKeys: [],
      searchs: [
        {
          type: 'select',
          title: '部门',
          placeholder: '请选择',
          key: 'deptId',
          listDataKey: 'depts',
          list: [{ deptName: '全部', deptId: '' }],
          listkey: 'deptName',
          listvalue: 'deptId',
        },
        {
          type: 'input',
          title: '员工姓名',
          placeholder: '请输入',
          key: 'empName',
        },
        {
          type: 'input',
          title: '用户账号',
          placeholder: '请输入',
          key: 'account',
        },
        {
          type: 'input',
          title: '邮箱地址',
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
  components: { mgrolenusers },
  mixins: [mixins],
  mounted () {
    this.getSelects()
  },
  methods: {
    operation ({ type, data }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
        case 'del':
          this.unlink()
          break
        case 'search':
          this.getList(data)
          break
      }
    },
    tableChange (e) {
      this.pagination = e
      this.getList(this.$refs.IMain.searchData)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    getList (data = {}) {
      this.loading = true
      pageLinkSysUser({
        data: Object.assign(
          {
            limit: this.pagination.pageSize,
            page: this.pagination.current,
            roleId: this.$route.query.id,
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
    unlink () {
      linkOrUnlinkSysFunction({
        data: {
          userIds: this.selectedRowKeys,
          roleId: this.$route.query.id,
        },
      }).then(() => {
        this.$message.success('操作成功')
        this.getList()
      })
    },
    getSelects () {
      prePageLinkSysUser({ data: { roleId: this.$route.query.id } }).then(
        (res) => {
          this.searchs.map((item) => {
            if (item.listDataKey) {
              item.list = item.list.concat(res[item.listDataKey])
            }
            return item
          })
        }
      )
    },
  },
}
</script>
