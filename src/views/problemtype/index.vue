<template>
  <div>
    <IMain
      permission="mainData.production.problem-type.add"
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
                v-permission="'mainData.production.problem-type.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.production.problem-type.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <problemtype ref="alert" :data="current" @freash="freash" />
    <!-- <LinkEmployee ref="alertLink" :id="linkId" /> -->
  </div>
</template>
<script>
import { page_get, remove_post } from '../../api/problemtype'
import problemtype from '../../components/alert/problemtype'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'systemModule',
    title: '系统模块',
  },
  {
    dataIndex: 'problemTypeCode',
    title: '问题类型编号',
  },
  {
    dataIndex: 'problemTypeName',
    title: '问题类型名称',
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
      linkId: '',
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  components: { problemtype },
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
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    delEvent(id) {
      this.delModel('确定删除选中的问题类型', () => {
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
