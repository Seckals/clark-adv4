<template>
  <div>
    <IMain
      :hasReset="true"
      permission="permission.mg-role-users.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
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
import { page_get } from '../../api/myusers'
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
      searchs: [],
    }
  },
  components: { myusers },
  mixins: [mixins],
  mounted() {},
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
      this.getList()
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
