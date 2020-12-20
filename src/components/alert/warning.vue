<template>
  <a-modal
    v-model="visible"
    title="编辑通知对象"
    :confirmLoading="loading"
    :width="700"
    okText="确定"
    @ok="ok"
    cancelText="取消"
    :destroyOnClose="true"
    :afterClose="close"
  >
    <div class="warn-btns">
      <a-button
        :disabled="hasAdd || (selectedRowKeys && selectedRowKeys.length > 0)"
        @click="add"
        >新增</a-button
      >
      <a-button
        :disabled="!selectedRowKeys || selectedRowKeys.length === 0"
        @click="del"
        >删除</a-button
      >
      <a-button :disabled="!hasAdd" @click="save">保存</a-button>
    </div>
    <div class="warn-tabls">
      <a-table
        bordered
        :row-selection="{
          selectedRowKeys,
          getCheckboxProps,
          onChange: onSelectChange,
        }"
        :row-key="(record) => record.empId"
        :pagination="{ hideOnSinglePage: true }"
        :columns="columns"
        :data-source="notifyEmailContacts"
      >
        <template
          v-for="col in ['empName', 'email', 'mobile']"
          :slot="col"
          slot-scope="text, record, index"
        >
          <div :key="col">
            <template v-if="index === notifyEmailContacts.length - 1 && hasAdd">
              <a-select
                placeholder="请选择"
                v-if="col === 'empName'"
                style="width: 170px"
                v-model="record.empId"
                @change="selcetChange($event, index)"
              >
                <a-select-option
                  v-for="(item, idx) in employs"
                  :key="idx"
                  :value="item.id"
                  >{{ item.name + '[' + item.empNo + ']' }}</a-select-option
                >
              </a-select>
              <a-input v-else-if="col === 'email'" v-model="record.email" />
              <a-input v-else v-model="record.mobile" />
            </template>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>
<script>
import { modify_post, preModify_get } from '../../api/mesNotifyEmailController'
const columns = [
  {
    title: '被通知员工',
    dataIndex: 'empName',
    scopedSlots: { customRender: 'empName' },
  },
  {
    title: '邮箱地址',
    dataIndex: 'email',
    scopedSlots: { customRender: 'email' },
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' },
  },
]
export default {
  data() {
    return {
      visible: false,
      loading: false,
      columns,
      employs: [],
      selectedRowKeys: [],
      notifyEmailContacts: [],
      hasAdd: false,
    }
  },
  props: ['id'],
  watch: {
    id(value) {
      if (value) {
        this.getDetail(value)
      }
    },
  },
  mounted() {
    if (this.id) this.getDetail(this.id)
  },
  methods: {
    add() {
      if (this.hasAdd) return
      this.hasAdd = true
      this.notifyEmailContacts.push({
        empId: '',
        email: '',
        mobile: '',
      })
    },
    del() {
      this.notifyEmailContacts = [
        ...this.notifyEmailContacts.filter(
          (item) => !this.selectedRowKeys.includes(item.empId)
        ),
      ]
      this.selectedRowKeys = []
    },
    save() {
      let flag = this.notifyEmailContacts.every(
        (item) => item.empId && item.mobile && item.email
      )
      if (flag) {
        this.hasAdd = false
      }
      this.notifyEmailContacts = [...this.notifyEmailContacts]
    },
    getCheckboxProps(record) {
      let index = this.notifyEmailContacts.findIndex(
        (item) => item.empId == record.empId
      )
      return {
        props: {
          disabled:
            index === this.notifyEmailContacts.length - 1 && this.hasAdd,
          name: record.name,
        },
      }
    },
    selcetChange(e, i) {
      let emp = this.employs.find((item) => item.id == e)
      this.notifyEmailContacts[i].empName = emp.name
    },
    onSelectChange(e) {
      this.selectedRowKeys = e
    },
    show() {
      this.visible = true
    },
    close() {
      this.selectedRowKeys = []
      this.hasAdd = false
      this.$emit('freash', 'close')
    },
    getDetail(id) {
      this.loading = true
      preModify_get({
        data: { id },
      })
        .then((res) => {
          this.loading = false
          this.notifyEmailContacts = res.notifyEmailContacts || []
          this.employs = res.employs || []
        })
        .catch(() => {
          this.loading = false
        })
    },
    ok() {
      let notifyEmailContacts = this.notifyEmailContacts.filter(
        (item) => item.empId
      )
      this.loading = true
      modify_post({
        data: {
          notifyEmailId: this.id,
          notifyEmailContacts,
        },
      })
        .then(() => {
          this.loading = false
          this.$message.success('操作成功')
          this.$emit('freash')
          this.visible = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.warn-btns {
  margin-bottom: 24px;
  & > button {
    margin-right: 15px;
  }
}
</style>
