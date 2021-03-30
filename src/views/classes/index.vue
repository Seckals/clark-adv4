<template>
  <div>
    <IMain
      :searchs="[]"
      permission="mainData.production.mg-classes.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          
          :loading="loading"
          :row-key="(record) => record.id"
          :columns="columns"
          :data-source="data"
        >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.production.mg-classes.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.production.mg-classes.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <Classes ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { list_get, remove_get } from '../../api/comShiftController'
import Classes from '../../components/alert/classes'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'code',
    title: '班次编号',
  },
  {
    dataIndex: 'name',
    title: '班次名称',
  },
  {
    dataIndex: 'shiftStartTime',
    title: '开始时间',
  },
  {
    dataIndex: 'shiftEndTime',
    title: '结束时间',
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
    }
  },
  components: { Classes },
  mixins: [mixins],
  methods: {
    operation({ type }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
      }
    },
    delEvent(id) {
      this.delModel('确认删除选中的班次', () => {
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
          this.getList()
        })
        .catch(() => {
          this.loading = false
        })
    },
    getList() {
      this.loading = true
      list_get()
        .then((res) => {
          this.loading = false
          this.data = res || []
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
