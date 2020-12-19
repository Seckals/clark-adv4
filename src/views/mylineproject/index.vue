<template>
  <div>
    <IMain
      :infoData="infoData"
      permission="mainData.production.mg-line-project.add"
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
                v-permission="'mainData.production.mg-line-project.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a v-permission="'mainData.production.mg-line-project.delete'" @click="delEvent(record.id)"> 删除</a>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <LineProject ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/comProjectLineRefController'
import LineProject from '../../components/alert/lineProject'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'projectCode',
    title: '项目编号',
  },
  {
    dataIndex: 'projectName',
    title: '项目名称',
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
          title: '项目编号',
          value: JSON.parse(this.$route.query.data).code,
          key: 'name',
        },
        {
          type: 'input',
          title: '项目名称',
          value: JSON.parse(this.$route.query.data).name,
          key: 'code',
        },
      ],
    }
  },
  components: { LineProject },
  mixins: [mixins],
  methods: {
    operation({ type, data }) {
      switch (type) {
        case 'add':
          this.current = {
            lineCode: JSON.parse(this.$route.query.data).code,
            lineName: JSON.parse(this.$route.query.data).name,
            lineId: JSON.parse(this.$route.query.data).id,
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
    delEvent(id){
      this.delModel('确定删除选中的项目',()=>{
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
