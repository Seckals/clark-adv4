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
              <a-popconfirm
                title="确定删除选中的项目?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="del(record.id)"
                v-permission="'mainData.production.mg-line-project.delete'"
              >
                <a> 删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <LineProject ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import {
  page_get,
  remove_get,
  prePage_get,
} from '../../api/comProjectLineRefController'
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
          title: '团队编号',
          value: JSON.parse(this.$route.query.data).code,
          key: 'name',
        },
        {
          type: 'input',
          title: '团队名称',
          value: JSON.parse(this.$route.query.data).name,
          key: 'code',
        },
      ],
    }
  },
  components: { LineProject },
  mixins: [mixins],
  mounted() {
    // this.getPreList()
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
            page: this.pagination.current,
            id: JSON.parse(this.$route.query.data).id,
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
    getPreList() {
      prePage_get().then((res) => {
        this.searchs.map((item) => {
          if (item.listDataKey) {
            item.list = item.list.concat(res[item.listDataKey])
          }
          return item
        })
      })
    },
  },
}
</script>
