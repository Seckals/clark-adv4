<template>
  <div>
    <IMain
      :searchs="searchs"
      permission="mainData.project.mg-projects.add"
      @operation="operation"
      ref="IMain"
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
                v-permission="'mainData.project.mg-projects.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.project.mg-projects.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Projects ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import {
  page_get,
  remove_get,
  prePage_get,
} from '../../api/comProjectController'
import Projects from '../../components/alert/projects'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'code',
    title: '项目编号',
  },
  {
    dataIndex: 'name',
    title: '项目名称',
  },
  {
    dataIndex: 'internalCode',
    title: '内部项目号',
  },
  {
    dataIndex: 'customer',
    title: '客户',
  },
  {
    dataIndex: 'sop',
    title: '是否已量产',
  },
  {
    dataIndex: 'sopStartTime',
    title: '量产时间',
  },
  {
    dataIndex: 'manager',
    title: '项目经理',
  },
  {
    dataIndex: 'peManagerValue',
    title: 'PE经理',
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
          type: 'select',
          title: '客户',
          placeholder: '请选择',
          key: 'customer',
          list: [{ name: '全部', id: '' }],
          listDataKey: 'customers',
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: '项目经理',
          placeholder: '请选择',
          key: 'manager',
          listDataKey: 'manegers',
          list: [{ name: '全部', id: '', empNo: '' }],
          listkey: 'name',
          listkey1: 'empNo',
          listvalue: 'id',
          showsearch: true,
        },
        {
          type: 'select',
          title: 'PE经理',
          placeholder: '请选择',
          key: 'peManager',
          listDataKey: 'peManegers',
          list: [{ name: '全部', id: '', empNo: '' }],
          listkey: 'name',
          listkey1: 'empNo',
          listvalue: 'id',
          showsearch: true,
        },
        {
          type: 'select',
          title: '是否量产',
          placeholder: '请选择',
          key: 'sop',
          listDataKey: 'sops',
          list: [{ name: '全部', code: '' }],
          listkey: 'name',
          listvalue: 'code',
        },
      ],
    }
  },
  components: { Projects },
  mixins: [mixins],

  mounted() {
    this.getPreList()
  },
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
      this.getList(this.$refs.IMain.searchData)
    },
    delEvent(id) {
      this.delModel('确认删除选中的项目', () => {
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
    getPreList() {
      prePage_get().then((res) => {
        this.searchs.map((item) => {
          item.list = item.list.concat(res[item.listDataKey] || [])
          return item
        })
      })
    },
  },
}
</script>
