<template>
  <div>
    <IMain
      :searchs="[]"
      permission="mainData.personnel.mg-departments.add"
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
            slot="employeeCount"
            slot-scope="record"
            @click="toprojectCount(record)"
          >
            {{ record.employeeCount }}</a
          >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.personnel.mg-departments.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a v-permission="'mainData.production.mg-departments.delete'" @click="delEvent(record.id)"> 删除</a>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Department ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_post } from '../../api/hrDeptController'
import Department from '../../components/alert/department'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'code',
    title: '部门编号',
  },
  {
    dataIndex: 'name',
    title: '部门名称',
  },
  {
    dataIndex: 'shortName',
    title: '部门简称',
  },
  {
    title: '员工人数',
    scopedSlots: { customRender: 'employeeCount' },
  },
  {
    dataIndex: 'parentName',
    title: '父部门',
  },
  {
    dataIndex: 'deptManagerValue',
    title: '部门经理',
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
  components: { Department },
  mixins: [mixins],
  methods: {
    toprojectCount(item) {
      this.$router.push({
        path: '/mg-employees',
        query: {
          deptId: item.id,
        },
      })
    },
    operation({ type }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
      }
    },
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    delEvent(id){
      this.delModel('确认删除选中的部门',()=>{
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
    getList() {
      this.loading = true
      page_get({
        data: {
          limit: this.pagination.pageSize,
          page: this.pagination.current,
        },
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
