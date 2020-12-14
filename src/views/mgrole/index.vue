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
          :row-key="(record) => record.id"
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
                链接用户</a
              >
              <a
                v-permission="'permission.mg-users.edit'"
                @click="editor(record)"
              >
                连接操作</a
              >
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
    <myrole ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get } from '../../api/myrole'
import myrole from '../../components/alert/myrole'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'moduleName',
    title: '模块',
  },
  {
    dataIndex: 'name',
    title: '角色名称',
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
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchs: [],
    }
  },
  components: { myrole },
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
