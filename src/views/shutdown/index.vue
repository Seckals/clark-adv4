<template>
  <div>
    <IMain
      :searchs="[]"
      permission="mainData.production.shutdown.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          
          :loading="loading"
          :row-key="(record) => record.id"
          :columns="columns"
          :data-source="data"
        >
        
             <template slot="downtimeType" slot-scope="record">
               {{record.downtimeType=='un_plan_downtime'?'非计划停机':'计划停机'}}
          </template>
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.production.shutdown.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.production.shutdown.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <shutdown ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { queryList_get, remove_get } from '../../api/shutdown.js'
import shutdown from '../../components/alert/shutdown'
import mixins from '../../mixins/list'
const columns = [
  {
    title: '停机类型',
     scopedSlots: { customRender: 'downtimeType' },
  },
  {
    dataIndex: 'downtimeCode',
    title: '停机代码',
  },
  {
    dataIndex: 'downtimeName',
    title: '停机名称',
  },
  {
    dataIndex: 'remark',
    title: '备注',
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
  components: { shutdown },
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
      let formdata = new FormData()
      formdata.append('id', id)
      remove_get({
        data: formdata,
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
      queryList_get()
        .then((res) => {
          console.log(res)
          this.loading = false
          this.data = res.records || []
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
