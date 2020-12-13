<template>
  <div>
    <IMain
      :searchs="[]"
      permission="mainData.production.mg-produce-line.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          :loading="loading"
          :row-key="(record) => record.id"
          :columns="columns"
          :data-source="data"
        >
          <a
            slot="stationCount"
            slot-scope="record"
            @click="tostationCount(record)"
          >
            {{ record.stationCount }}</a
          >
          <a
            slot="projectCount"
            slot-scope="record"
            @click="toprojectCount(record)"
          >
            {{ record.stationCount }}</a
          >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.production.mg-produce-line.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a-popconfirm
                title="确认删除选中的产线?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="del(record.id)"
                v-permission="'mainData.production.mg-produce-line.delete'"
              >
                <a> 删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <ProduceLine ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { list_get, remove_post } from '../../api/comLineController'
import ProduceLine from '../../components/alert/produceLine'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'code',
    title: '产线编号',
  },
  {
    dataIndex: 'name',
    title: '产线名称',
  },
  {
    dataIndex: 'seq',
    title: '显示位次',
  },
  {
    title: '工位数量',
    scopedSlots: { customRender: 'stationCount' },
  },
  {
    title: '项目数量',
    scopedSlots: { customRender: 'projectCount' },
  },
  {
    dataIndex: 'managerName',
    title: '产线主管',
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
  components: { ProduceLine },
  mixins: [mixins],
  methods: {
    toprojectCount(data) {
      console.log(data)
      this.$router.push({
        path: '/mg-line-project',
        query: {
          data: JSON.stringify(data),
        },
      })
    },
    tostationCount(data) {
      console.log(data)
      this.$router.push({
        path: '/mg-line-station',
        query: {
          data: JSON.stringify(data),
        },
      })
    },
    operation({ type }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show()
          break
        case 'del':
          this.del(this.selected)
          break
      }
    },
    del(id) {
      this.loading = true
      remove_post({
        data: { ids: [id] },
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
