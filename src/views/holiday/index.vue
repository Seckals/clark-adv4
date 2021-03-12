<template>
  <div>
    <IMain
      :searchs="searchs"
      permission="mainData.calendar.holiday.add"
      @operation="operation"
      ref="IMain"
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
                v-permission="'mainData.calendar.holiday.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.calendar.holiday.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <holiday ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_post } from '../../api/holiday'
import holiday from '../../components/alert/holiday'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'moduleName',
    title: '模块',
  },
  {
    dataIndex: 'dateInfo',
    title: '日期',
  },
  {
    title: '说明',
    dataIndex: 'dateDesc',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
  },
]
export default {
  data() {
    return {
      name: '',
      columns,
      linkId: '',
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchs: [
        {
          type: 'select',
          title: '模块',
          placeholder: '请选择',
          key: 'moduleName',
          listDataKey: 'employs',
          list: [
          {moduleName:'MES'},  {moduleName:'SCM'},  {moduleName:'LPA'},
       ],
          listkey: 'moduleName',
          listvalue: 'moduleName',
          showsearch: true,
        },
      ],
    }
  },
  components: { holiday },
  mixins: [mixins],
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
    showLink(data) {
      this.linkId = data.id
      this.name = data.name
      this.$refs.alertLink.show()
    },
    tableChange(e) {
      this.pagination = e
      this.getList(this.$refs.IMain.searchData)
    },
    delEvent(id) {
      this.delModel('确定删除选中的日期', () => {
        this.del(id)
      })
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
          this.data = res.records || []
          this.pagination.total = res.total
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
