<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑部门' : '新增部门'"
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
      <a-form-model-item label="部门编号" prop="code">
        <a-input v-model="form.code" placeholder="" :disabled="!!form.id" />
      </a-form-model-item>
      <a-form-model-item label="部门名称" prop="name">
        <a-input v-model="form.name" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="部门简称" prop="shortName">
        <a-input v-model="form.shortName" placeholder="" />
      </a-form-model-item>

      <a-form-model-item label="父部门">
        <a-select
          v-model="form.parentId"
          placeholder="请选择"
          :filter-option="filterOption"
          :show-search="true"
        >
          <a-select-option
            v-for="(item, idx) in preList.depts"
            :key="idx"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="部门经理">
        <a-select
          v-model="form.deptManager"
          placeholder="请选择"
          :filter-option="filterOption"
          :show-search="true"
        >
          <a-select-option
            v-for="(item, idx) in preList.employes"
            :key="idx"
            :value="item.id"
            >{{ item.empName + '[' + item.empNo + ']' }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post, preAdd_get } from '../../api/hrDeptController'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      preList: {
        depts: [],
        employes: [],
      },
      form: {
        code: '',
        name: '',
        status: '',
        managerId: '',
        shortName: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入部门编号',
            trigger: 'blur',
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
      preAdd_get()
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
