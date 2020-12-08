<template>
  <div>
    <IMain
      :hasSelected="selected"
      delTip="确定删除选中的职位？"
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
          <a-radio
            slot="id"
            slot-scope="id"
            :checked="selected == id"
            :value="id"
            @click="selected = id"
          ></a-radio>
          <a slot="operation" slot-scope="record" @click="editor(record)">
            编辑</a
          >
        </a-table>
      </template>
    </IMain>
    <Position ref="alert" :data="current" @freash="freash" />
    <LinkEmployee ref="alertLink" :id="linkId" />
  </div>
</template>
<script>
import { list_get, remove_get } from '../../api/comShiftController'
import Position from '../../components/alert/position'
import LinkEmployee from '../../components/alert/linkEmployee'
const columns = [
  {
    dataIndex: 'id',
    title: '',
    width: 50,
    scopedSlots: { customRender: 'id' },
  },
  {
    dataIndex: 'code',
    title: '班次编号',
  },
  {
    dataIndex: 'name',
    title: '班次名称',
  },
  {
    dataIndex: 'shiftEndTime',
    title: '开始时间',
  },
  {
    dataIndex: 'shiftStartTime',
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
      data: [],
      loading: false,
      selected: '',
      linkId: '',
      current: '',
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  components: { Position, LinkEmployee },
  mounted() {
    this.getList()
  },
  methods: {
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
    showLink(id) {
      this.linkId = id
      this.$refs.alertLink.show()
    },
    tableChange(e) {
      this.pagination = e
      this.getList()
    },
    editor(data) {
      this.current = data
      this.$refs.alert.show()
    },
    freash() {
      this.current = ''
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
      list_get({
        data: Object.assign(
          {
            limit: this.pagination.pageSize,
            page: this.pagination.current,
          },
          data
        ),
      })
        .then((res) => {
          console.log(res)
          this.loading = false
          this.data = res || []
          // console.log(res)
          this.pagination.total = res.length
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="less" scoped></style>
