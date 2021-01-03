<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑问题类型' : '新增问题类型'"
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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="系统模块" prop="systemModule">
        <a-input v-model="form.systemModule" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="问题类型编号" prop="problemTypeCode">
        <a-input v-model="form.problemTypeCode" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="问题类型名称" prop="problemTypeName">
        <a-input v-model="form.problemTypeName" placeholder="" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/problemtype'
import mixins from '../../mixins/editor'
export default {
  data() {
    return {
      form: {
        problemTypeCode: '',
        problemTypeName: '',
        systemModule: '',
      },
      rules: {
        systemModule: [
          {
            required: true,
            message: '请输入系统模块',
            trigger: 'blur',
          },
        ],
        problemTypeName: [
          {
            required: true,
            message: '请输入问题类型编号',
            trigger: 'blur',
          },
        ],
        problemTypeCode: [
          {
            required: true,
            message: '请输入问题类型名称',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mixins: [mixins],
  methods: {
    add() {
      this.loading = true
      add_post({
        data: {
          name: this.form.problemTypeName,
          code: this.form.problemTypeCode,
          systemModule: this.form.systemModule,
        },
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
        data: {
          name: this.form.problemTypeName,
          code: this.form.problemTypeCode,
          id: this.form.id,
          systemModule: this.form.systemModule,
        },
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
