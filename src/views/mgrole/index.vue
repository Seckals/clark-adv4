<template>
  <div>
    <IMain :hasReset="true"
           permission="permission.mg-role.add"
           @operation="operation">
      <template slot="table">
        <a-table bordered
                 :loading="loading"
                 :row-key="(record) => record.id"
                 :pagination="pagination"
                 :columns="columns"
                 :data-source="data"
                 @change="tableChange">
          <template slot="operation"
                    slot-scope="record">
            <a-space size="small">
              <a v-permission="'permission.mg-role.linkUser'"
                 @click="go('/mg-role-users', record)">
                链接用户</a>
              <a v-permission="'permission.mg-role.linkFunction'"
                 @click="go('/mg-role-authorize', record)">
                链接功能</a>
              <a v-permission="'permission.mg-role.edit'"
                 @click="editor(record)">
                编辑</a>
            </a-space>
          </template>
          <template slot="type"
                    slot-scope="record">
            {{record.type==0?'管理员':record.type==1?'普通用户':'--'}}
          </template>
        </a-table>
      </template>
    </IMain>
    <myrole ref="alert"
            :data="current"
            @freash="freash" />
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
    scopedSlots: { customRender: 'type' },
    title: '角色类型',
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
  data () {
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
  mounted () { },
  methods: {
    go (path, data) {
      this.$router.push({
        path,
        query: {
          id: data.id,
          name: data.name,
          moduleName: data.moduleName,
        },
      })
    },
    operation ({ type, data }) {
      switch (type) {
        case 'add':
          this.current = { status: 1 }
          this.$refs.alert.show()
          break
        case 'search':
          this.getList(data)
          break
      }
    },
    tableChange (e) {
      this.pagination = e
      this.getList()
    },
    getList (data = {}) {
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
