<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑员工' : '新增员工'"
    :confirmLoading="loading"
    :width="500"
    @ok="ok"
    okText="确定"
    cancelText="取消"
    :destroyOnClose="true"
    :afterClose="close"
    class="alert-employee"
  >
    <a-form-model
      :model="form"
      ref="ruleForm"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="状态" prop="empNo">
        <a-select v-model="form.status" placeholder="请选择">
          <a-select-option
            v-for="(item, idx) in preList.states"
            :key="idx"
            :value="item.code"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="用户账号" prop="account">
        <a-input v-model="form.account" placeholder="" :disabled="!form.id" />
      </a-form-model-item>
      <a-form-model-item label="部门" prop="deptId">
        <a-select
          v-model="form.deptId"
          placeholder="请选择"
          :disabled="!form.id"
        >
          <a-select-option
            v-for="(item, idx) in preList.depts"
            :key="idx"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="员工名称" prop="empName">
        <a-input v-model="form.empName" placeholder="" :disabled="!form.id" />
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="mobile">
        <a-input v-model="form.mobile" placeholder="" :disabled="!form.id" />
      </a-form-model-item>
      <a-form-model-item label="邮箱地址" prop="email">
        <a-input v-model="form.email" placeholder="" :disabled="!form.id" />
      </a-form-model-item>
      <a-form-model-item label="员工工号" prop="empNo">
        <a-input v-model="form.empNo" placeholder="" :disabled="!form.id" />
      </a-form-model-item>
      <a-form-model-item label="创建日期" prop="createDate">
        <a-input
          v-model="form.createDate"
          placeholder=""
          :disabled="!form.id"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post, prePage_get } from '../../api/myusers'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      preList: {
        depts: [],
        states: [],
      },
      form: {},
      rules: {
        cardNo: [
          {
            required: true,
            message: '请输入卡号',
            trigger: 'blur',
          },
        ],
        empName: [
          {
            required: true,
            message: '请输入员工姓名',
            trigger: 'blur',
          },
        ],
        deptId: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'change',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
        ],
        empNo: [
          {
            required: true,
            message: '请输入员工工号',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
        ],
        parentId: [
          {
            required: true,
            message: '请选择上级',
            trigger: 'change',
          },
        ],
        positionId: [
          {
            required: true,
            message: '请选择职位',
            trigger: 'change',
          },
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
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
    ok() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.userId ? this.editor() : this.add()
        }
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
  },
}
</script>
<style lang="less">
.alert-employee {
  .ant-form-item:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
