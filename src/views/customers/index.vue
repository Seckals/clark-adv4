<template>
  <div>
    <IMain
      ref="IMain"
      :searchs="searchs"
      permission="mainData.project.mg-customers.add"
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
          <a
            slot="projectCount"
            slot-scope="record"
            @click="toprojectCount(record)"
          >
            {{ record.projectCount }}</a
          >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.project.mg-customers.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.project.mg-customers.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Customer ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import {
  page_get,
  remove_get,
  prePage_get,
} from '../../api/comCustomerController'
import Customer from '../../components/alert/customer'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'code',
    title: '客户编号',
  },
  {
    dataIndex: 'name',
    title: '客户名称',
  },
  {
    dataIndex: 'manager',
    title: '客户经理',
  },
  {
    title: '项目数量',
    scopedSlots: { customRender: 'projectCount' },
  },
  {
    dataIndex: 'statusValue',
    title: '状态',
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
          title: '客户编号',
          placeholder: '请输入',
          key: 'customCode',
        },
        {
          type: 'input',
          title: '客户名称',
          placeholder: '请输入',
          key: 'customName',
        },
        {
          type: 'select',
          title: '客户经理',
          placeholder: '请选择',
          key: 'managerId',
          listDataKey: 'managers',
          list: [{ empName: '全部', empId: '', empNo: '' }],
          listkey: 'empName',
          listkey1: 'empNo',
          listvalue: 'empId',
          showsearch: true,
        },
        {
          type: 'select',
          title: '状态',
          placeholder: '请选择',
          key: 'status',
          listDataKey: 'states',
          list: [{ name: '全部', code: '' }],
          listkey: 'name',
          listvalue: 'code',
        },
      ],
    }
  },
  components: { Customer },
  mixins: [mixins],
  mounted() {
    this.getPreList()
  },
  methods: {
    toprojectCount(item) {
      console.log(item)
      this.$router.push({
        path: '/mg-projects',
        query: {
          customer: item.id,
        },
      })
    },
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
      this.getList(this.$refs.IMain.searchData)
    },
    delEvent(id) {
      this.delModel('确认删除选中的客户', () => {
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
