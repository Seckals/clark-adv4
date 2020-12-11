<template>
  <div>
    <IMain
      :searchs="searchs"
      :hasSelected="selected"
      delTip="确定删除选中的项目？"
      @operation="operation"
    >
      <a-button
        slot="add"
        @click="operation({ type: 'add' })"
        v-permission="'mainData.personnel.mg-position.add'"
        >新 增</a-button
      >
      <a-button
        slot="delete"
        :disabled="!selected"
        v-permission="'mainData.personnel.mg-position.delete'"
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
            slot="linkUserCount"
            slot-scope="data"
            @click="showLink(data.id)"
            >{{ data.linkUserCount }}</a
          >
          <a
            slot="operation"
            slot-scope="record"
            v-permission="'mainData.personnel.mg-position.edit'"
            @click="editor(record)"
          >
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
import { page_get, remove_post } from '../../api/hrPositionController'
import Position from '../../components/alert/position'
import LinkEmployee from '../../components/alert/linkEmployee'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'id',
    title: '',
    width: 50,
    scopedSlots: { customRender: 'id' },
  },
  {
    dataIndex: 'code',
    title: '团队编号',
  },
  {
    dataIndex: 'name',
    title: '团队名称',
  },
  {
    title: '关联员工数',
    scopedSlots: { customRender: 'linkUserCount' },
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
      linkId: '',
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      searchs: [
        {
          type: 'input',
          title: '团队名称',
          placeholder: '请输入团队名称',
          key: 'name',
        },
      ],
    }
  },
  components: { Position, LinkEmployee },
  mixins: [mixins],
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
  },
}
</script>
