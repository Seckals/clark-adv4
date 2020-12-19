<template>
  <div>
    <IMain
      permission="mainData.personnel.problem-level.add"
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
                v-permission="'mainData.personnel.problem-level.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a v-permission="'mainData.production.problem-level.delete'" @click="delEvent(record.id)"> 删除</a>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <!-- <Position ref="alert" :data="current" @freash="freash" /> -->
    <problemlevel ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_post } from '../../api/prblemlevel'
// import Position from '../../components/alert/position'
import problemlevel from '../../components/alert/problemlevel'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'problemLevelCode',
    title: '问题等级编号',
  },
  {
    dataIndex: 'problemLevelName',
    title: '问题等级名称',
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
  components: { problemlevel },
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
    showLink(id) {
      this.linkId = id
      this.$refs.alertLink.show()
    },
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    delEvent(id){
      this.delModel('确定删除选中的问题等级',()=>{
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
