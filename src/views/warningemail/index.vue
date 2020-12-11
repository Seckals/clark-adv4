<template>
  <div>
    <IMain :searchs="[]">
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
            slot="operation"
            slot-scope="record"
            v-permission="'mainData.email.warning-email.edit'"
            @click="editor(record)"
          >
            编辑</a
          >
        </a-table>
      </template>
    </IMain>
    <Warning ref="alert" :id="current.id || ''" @freash="freash" />
  </div>
</template>
<script>
import { page_get } from '../../api/mesNotifyEmailController'
import Warning from '../../components/alert/warning'
import mixins from '../../mixins/list'
const columns = [
  {
    dataIndex: 'typeValue',
    title: '系统功能',
  },
  {
    dataIndex: 'notifyEmailContacts',
    title: '通知对象',
    customRender: (text) => {
      let list = text || []
      let str = list
        .map((item) => {
          return item.empName
        })
        .join(',')
      return str
    },
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
  components: { Warning },
  mixins: [mixins],
  methods: {
    tableChange(e) {
      this.pagination = e
      this.getList()
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
