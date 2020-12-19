<template>
  <div>
    <IMain
      :searchs="searchs"
      :hasReset="true"
      permission="mainData.personnel.mg-employees.add"
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
                v-permission="'mainData.personnel.mg-employees.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a v-permission="'mainData.production.mg-employees.delete'" @click="delEvent(record.id)"> 删除</a>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Employee ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import {
  page_get,
  remove_post,
  prePage_get1,
} from '../../api/hrEmployeController'
import Employee from '../../components/alert/employee'
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
    dataIndex: 'mobile',
    title: '手机号码',
  },
  {
    dataIndex: 'email',
    title: '邮箱',
  },

  {
    dataIndex: 'cardNo',
    title: '卡号',
  },
  {
    dataIndex: 'deptName',
    title: '部门',
  },
  {
    dataIndex: 'positionName',
    title: '职位',
  },
  {
    dataIndex: 'parentName',
    title: '上级',
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
          type: 'select',
          title: '员工姓名',
          placeholder: '请选择',
          key: 'empName',
          listDataKey: 'employs',
          list: [{ empName: '全部', id: '', empNo: '' }],
          listkey: 'empName',
          listkey1: 'empNo',
          listvalue: 'empName',
          showsearch: true,
        },
        {
          type: 'select',
          title: '部门',
          placeholder: '请选择',
          key: 'deptId',
          listDataKey: 'depts',
          list: [{ name: '全部', id: '' }],
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: '职位',
          placeholder: '请选择',
          key: 'positionId',
          listDataKey: 'positions',
          list: [{ name: '全部', id: '' }],
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: '上级',
          placeholder: '请选择',
          key: 'parentId',
          listDataKey: 'employs',
          list: [{ empName: '全部', id: '' }],
          listkey: 'empName',
          listkey1: 'empNo',
          listvalue: 'id',
          showsearch: true,
        },
        {
          type: 'input',
          title: '手机号码',
          placeholder: '请输入',
          key: 'mobile',
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
        {
          type: 'input',
          title: '员工工号',
          placeholder: '请输入',
          key: 'empNo',
        },
      ],
    }
  },
  components: { Employee },
  mixins: [mixins],
  mounted() {
    this.getSelects()
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
        case 'reset':
          this.getList(data)
          break
      }
    },
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    delEvent(id){
      this.delModel('确认删除选中的员工',()=>{
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
    getSelects() {
      prePage_get1().then((res) => {
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
