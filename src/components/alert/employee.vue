<template>
  <a-modal v-model="visible"
           :title="form.id ? '编辑员工' : '新增员工'"
           :confirmLoading="loading"
           :width="500"
           @ok="ok"
           okText="确定"
           cancelText="取消"
           :destroyOnClose="true"
           :afterClose="close"
           class="alert-employee">
    <a-form-model :model="form"
                  ref="ruleForm"
                  :rules="rules"
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 18 }">
      <a-form-model-item label="员工工号"
                         prop="empNo">
        <a-input v-model="form.empNo"
                 placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="员工姓名"
                         prop="empName">
        <a-input v-model="form.empName"
                 placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="上级"
                         prop="parentId">
        <a-select v-model="form.parentId"
                  placeholder="请选择"
                  :filter-option="filterOption"
                  @focus="getPreList"
                  :show-search="true">
          <a-select-option v-for="(item, idx) in preList.employs"
                           :key="idx"
                           :value="item.id">{{ item.empName + '[' + item.empNo + ']' }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="职位"
                         prop="positionId">
        <a-select v-model="form.positionId"
                  placeholder="请选择"
                  :filter-option="filterOption"
                  :show-search="true">
          <a-select-option v-for="(item, idx) in preList.positions"
                           :key="idx"
                           :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="手机号码"
                         prop="mobile">
        <a-input v-model="form.mobile"
                 placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="邮箱"
                         prop="email">
        <a-input v-model="form.email"
                 placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="卡号"
                         prop="cardNo">
        <a-input v-model="form.cardNo"
                 placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="部门"
                         prop="deptId">
        <a-select v-model="form.deptId"
                  placeholder="请选择"
                  :filter-option="filterOption"
                  :show-search="true">
          <a-select-option v-for="(item, idx) in preList.depts"
                           :key="idx"
                           :value="item.deptId">{{ item.deptName }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="状态"
                         prop="status">
        <a-select v-model="form.status"
                  placeholder="请选择">
          <a-select-option v-for="(item, idx) in preList.states"
                           :key="idx"
                           :value="item.code">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  add_post,
  modify_post,
  preAdd_get,
} from '../../api/hrEmployeController'
import mixins from '../../mixins/editor'

export default {
  data () {
    return {
      preList: {
        depts: [],
        employs: [],
        positions: [],
        states: [],
      },
      form: {
        cardNo: '',
        empName: '',
        deptId: '',
        email: '',
        empNo: '',
        mobile: '',
        parentId: '',
        positionId: '',
        status: '',
      },
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
  mounted () {
    this.getPreList()
  },
  mixins: [mixins],
  methods: {
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    add () {
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
    editor () {
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
    getPreList () {
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
<style lang="less">
.alert-employee {
  .ant-form-item:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
