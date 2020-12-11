<template>
  <div>
    <IMain
      :searchs="searchs"
      :hasReset="true"
      :hasSelected="selected"
      delTip="确认删除选中的员工?"
      @operation="operation"
    >
      <a-button
        slot="add"
        @click="operation({ type: 'add' })"
        v-permission="'mainData.personnel.mg-employees.add'"
        >新 增</a-button
      >
      <a-button
        slot="delete"
        :disabled="!selected"
        v-permission="'mainData.personnel.mg-employees.delete'"
        >删 除</a-button
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
          <a-radio
            slot="id"
            slot-scope="id"
            :checked="selected == id"
            :value="id"
            @click="selected = id"
          ></a-radio>
          <a
            slot="operation"
            slot-scope="record"
            v-permission="'mainData.personnel.mg-employees.edit'"
            @click="editor(record)"
          >
            编辑</a
          >
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
  prePage_get,
} from '../../api/hrEmployeController'
import Employee from '../../components/alert/employee'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'id',
    title: '',
    width: 50,
    scopedSlots: { customRender: 'id' },
  },
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
      selected: '',
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
          list: [{ empName: '全部', id: '' }],
          listkey: 'empName',
          listvalue: 'empName',
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
          listvalue: 'id',
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
