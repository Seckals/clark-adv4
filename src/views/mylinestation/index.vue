<template>
  <div>
    <!-- 产线列出工位 -->
    <IMain
      :infoData="infoData"
      permission="mainData.production.mg-line-station.add"
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
                v-permission="'mainData.production.mg-line-station.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.production.mg-line-station.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <LineStation ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/comLineStationRefController'
import LineStation from '../../components/alert/lineStation'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'stationCode',
    title: '工位编号',
  },

  {
    dataIndex: 'stationName',
    title: '工位名称',
  },
  {
    dataIndex: 'sep',
    title: '显示位次',
  },
  {
    dataIndex: 'employeeName',
    title: '员工',
  },
  {
    dataIndex: 'deveui',
    title: '按钮盒ID',
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
      infoData: [
        {
          type: 'input',
          title: '产线编号',
          value: JSON.parse(this.$route.query.data).code,
          key: 'name',
        },
        {
          type: 'input',
          title: '产线名称',
          value: JSON.parse(this.$route.query.data).name,
          key: 'code',
        },
      ],
    }
  },
  components: { LineStation },
  mixins: [mixins],
  methods: {
    operation({ type, data }) {
      switch (type) {
        case 'add':
          this.current = {
            lineCode: JSON.parse(this.$route.query.data).code,
            lineName: JSON.parse(this.$route.query.data).name,
            lineId: JSON.parse(this.$route.query.data).id,
            deveui: 'A01',
          }
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
    delEvent(id) {
      this.delModel('确定删除选中的工位', () => {
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
            lineId: JSON.parse(this.$route.query.data).id,
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
