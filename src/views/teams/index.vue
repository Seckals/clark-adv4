<template>
  <div>
    <IMain
      :searchs="searchs"
      permission="mainData.personnel.mg-teams.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          bordered
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
                v-permission="'mainData.personnel.mg-teams.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.personnel.mg-teams.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
          <a slot="linkUserCount" slot-scope="data" @click="showLink(data)">{{
            data.linkEmployeeCount
          }}</a>
        </a-table>
      </template>
    </IMain>
    <Team ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/comTeamController'
import Team from '../../components/alert/team'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'teamCode',
    title: '团队编号',
  },
  {
    dataIndex: 'teamName',
    title: '团队名称',
  },
  {
    title: '关联员工数',
    scopedSlots: { customRender: 'linkUserCount' },
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
          type: 'input',
          title: '团队名称',
          placeholder: '请输入团队名称',
          key: 'name',
        },
      ],
    }
  },
  components: { Team },
  mixins: [mixins],
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
    showLink(data) {
      this.$router.push({
        path: '/mg-teams-employees',
        query: {
          data: JSON.stringify(data),
        },
      })
    },
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    delEvent(id) {
      this.delModel('确认删除选中的团队', () => {
        this.del(id)
      })
    },
    del(id) {
      this.loading = true
      remove_get({
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
