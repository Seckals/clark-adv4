<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑客户' : '新增客户'"
    :confirmLoading="loading"
    :width="500"
    @ok="ok"
    okText="确定"
    cancelText="取消"
    :destroyOnClose="true"
    :afterClose="close"
  >
    <a-form-model
      :model="form"
      ref="ruleForm"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="客户编号" prop="code">
        <a-input v-model="form.code" placeholder="" :disabled="!!form.id" />
      </a-form-model-item>
      <a-form-model-item label="客户名称" prop="name">
        <a-input v-model="form.name" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="客户经理" prop="managerId">
        <a-select
          v-model="form.managerId"
          placeholder="请选择"
          :filter-option="filterOption"
          :show-search="true"
        >
          <a-select-option
            v-for="(item, idx) in preList.managers"
            :key="idx"
            :value="item.empId"
            >{{ item.empName + '[' + item.empNo + ']' }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-select v-model="form.status" placeholder="请选择">
          <a-select-option
            v-for="(item, idx) in preList.states"
            :key="idx"
            :value="item.code"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  add_post,
  modify_post,
  prePage_get,
} from '../../api/comCustomerController'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      preList: {
        managers: [],
        states: [],
      },
      form: {
        code: '',
        name: '',
        status: '',
        managerId: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入客户名称',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入客户编号',
            trigger: 'blur',
          },
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change',
          },
        ],
        managerId: [
          {
            required: true,
            message: '请选择客户经理',
            trigger: 'change',
          },
        ],
      },
    }
  },
  mounted() {
    this.getPreList()
  },
  mixins: [mixins],
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    add() {
      this.loading = true
      add_post({
        data: this.form,
      })
        .then(() => {
          this.loading = false
          this.$emit('freash')
          this.visible = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    editor() {
      this.loading = true
      modify_post({
        data: this.form,
      })
        .then(() => {
          this.loading = false
          this.$emit('freash')
          this.visible = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getPreList() {
      this.loading = true
      prePage_get()
        .then((res) => {
          this.loading = false
          this.preList = res
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
