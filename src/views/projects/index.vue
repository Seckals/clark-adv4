<template>
  <div>
    <IMain
      :searchs="searchs"
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
          <!-- <a
            slot="linkUserCount"
            slot-scope="data"
            @click="showLink(data.id)"
            >{{ data.linkUserCount }}</a
          > -->
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
import {
  page_get,
  remove_get,
  prePage_get,
} from '../../api/comProjectController'
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
    title: '项目编号',
  },
  {
    dataIndex: 'name',
    title: '项目名称',
  },
  {
    dataIndex: 'customer',
    title: '客户',
  },
  {
    dataIndex: 'sop',
    title: '是否一量产',
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
    title: 'pe经理',
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
      searchs: [
        {
          type: 'select',
          title: '客户',
          placeholder: '请选择',
          key: 'customer',
          list: [
            {
              name: '全部',
              id: '',
            },
          ],
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: '项目经理',
          placeholder: '请选择',
          key: 'manager',
          list: [],
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: 'PE经理',
          placeholder: '请选择',
          key: 'peManager',
          list: [],
          listkey: 'name',
          listvalue: 'id',
        },
        {
          type: 'select',
          title: '是否量产',
          placeholder: '请选择',
          key: 'sop',
          list: [
            { name: '是', id: 1 },
            { name: '否', id: 2 },
          ],
          listkey: 'name',
          listvalue: 'id',
        },
      ],
    }
  },
  components: { Position, LinkEmployee },
  mounted() {
    this.getList()
    this.gerPrePage()
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
    async gerPrePage() {
      let result = await prePage_get()
      this.searchs[0].list = result.customers || []
      this.searchs[1].list = result.manegers || []
      this.searchs[2].list = result.peManegers || []
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
  },
}
</script>
<style lang="less" scoped></style>
