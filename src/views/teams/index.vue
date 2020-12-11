<template>
  <div>
    <IMain
      :searchs="searchs"
      permission="mainData.production.mg-teams.add"
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
								v-permission="
									'mainData.production.mg-teams.edit'
								"
								@click="editor(record)"
							>
								编辑</a
							>
							<a-popconfirm
								title="确认删除选中的团队?"
								ok-text="确定"
								cancel-text="取消"
								@confirm="del(record.id)"
								v-permission="
									'mainData.production.mg-teams.edit'
								"
							>
								<a> 删除</a>
							</a-popconfirm>
						</a-space>
					</template>
          <a
            slot="linkUserCount"
            slot-scope="data"
            @click="showLink(data.id)"
            >{{ data.linkUserCount }}</a
          >
        </a-table>
      </template>
    </IMain>
    <Position ref="alert" :data="current" @freash="freash" />
    <LinkEmployee ref="alertLink" :id="linkId" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/comTeamController'
import Position from '../../components/alert/position'
import LinkEmployee from '../../components/alert/linkEmployee'
import mixins from '../../mixins/list'
const columns = [
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
  },
}
</script>
