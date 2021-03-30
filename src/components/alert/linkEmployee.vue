<!--
 * @Author: your name
 * @Date: 2021-03-25 12:04:00
 * @LastEditTime: 2021-03-30 20:38:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /clark-adv4/src/components/alert/linkEmployee.vue
-->
<template>
  <a-modal
    v-model="visible"
    :title="title"
    :width="500"
    @ok="ok"
    okText="确定"
    cancelText="取消"
    :destroyOnClose="true"
  >
    <a-table
      
      :loading="loading"
      :row-key="(record) => record.id"
      :columns="columns"
      :data-source="data"
      :pagination="{ hideOnSinglePage: true }"
    >
    </a-table>
  </a-modal>
</template>
<script>
import { listLinkEmploy_get } from '../../api/hrPositionController'
export default {
  data() {
    return {
      visible: false,
      loading: false,
      columns: [
        {
          dataIndex: 'empNo',
          title: '员工编号',
        },
        {
          dataIndex: 'empName',
          title: '员工姓名',
        },
        {
          dataIndex: 'deptName',
          title: '所在部门',
        },
      ],
      data: [],
      title: '',
    }
  },
  props: ['id', 'name'],
  watch: {
    id(value) {
      this.getList(value)
    },
    name(value) {
      this.title = `职位${value}关联的员工列表`
    },
  },
  methods: {
    ok() {
      this.visible = false
    },
    show() {
      this.visible = true
    },
    getList(positionId) {
      this.loading = true
      listLinkEmploy_get({
        data: { positionId },
      })
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
