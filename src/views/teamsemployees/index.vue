<template>
  <div>
    <IMain
      :infoData="infoData"
      permission="mainData.personnel.mg-teams-employees.add"
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
                v-permission="'mainData.personnel.mg-teams-employees.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a-popconfirm
                title="确认删除选中的团队?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="del(record.id)"
                v-permission="'mainData.personnel.mg-teams-employees.delete'"
              >
                <a> 删除1</a>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Position ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/comTeamEmployeRefController'
import Position from '../../components/alert/position'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'empNo',
    title: '员工工号',
  },
  {
    dataIndex: 'empName',
    title: '员工姓名',
  },
  {
    title: '部门',
    dataIndex: 'teamName',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
  },
]
export default {
  data() {
    return {
      info: '',
      columns,
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      infoData: [
        {
          type: 'input',
          title: '团队编号',
          value: JSON.parse(this.$route.query.data).teamCode,
          key: 'name',
        },
        {
          type: 'input',
          title: '团队名称',
          value: JSON.parse(this.$route.query.data).teamName,
          key: 'code',
        },
      ],
    }
  },
  components: { Position },
  mixins: [mixins],
  created() {
    this.info = JSON.parse(this.$route.query.data)
    console.log(this.info)
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
      this.getList()
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
            teamId: this.info.id,
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
