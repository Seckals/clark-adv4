<template>
  <div>
    <IMain
      :searchs="[]"
      permission="mainData.production.mg-station.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          :pagination="pagination"
          :loading="loading"
          :row-key="(record) => record.id"
          :columns="columns"
          :data-source="data"
          @change="tableChange"
        >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.production.mg-station.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a-popconfirm
                title="确认删除选中的工位?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="del(record.id)"
                v-permission="'mainData.production.mg-station.delete'"
              >
                <a> 删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Station ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/comStationController'
import Station from '../../components/alert/station'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'stationCode',
    title: '工位编号',
  },
  {
    dataIndex: 'stationName',
    title: '工位名称 ',
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
    }
  },
  components: { Station },
  mixins: [mixins],
  methods: {
    operation({ type }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
      }
    },
    del(id) {
      this.loading = true
      remove_get({
        data: { id: id },
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
