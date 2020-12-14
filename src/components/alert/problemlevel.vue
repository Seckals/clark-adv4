<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑问题等级' : '新增问题等级'"
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
      <a-form-model-item label="问题等级编号" prop="problemLevelCode">
        <a-input v-model="form.problemLevelCode" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="问题等级名称" prop="problemLevelName">
        <a-input v-model="form.problemLevelName" placeholder="" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/prblemlevel'
import mixins from '../../mixins/editor'
export default {
  data() {
    return {
      form: {
        problemLevelCode: '',
        problemLevelName: '',
      },
      rules: {
        problemLevelName: [
          {
            required: true,
            message: '请输入问题等级编号',
            trigger: 'blur',
          },
        ],
        problemLevelCode: [
          {
            required: true,
            message: '请输入问题等级名称',
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
          name: this.form.problemLevelName,
          code: this.form.problemLevelCode,
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
          name: this.form.problemLevelName,
          code: this.form.problemLevelCode,
          id: this.form.id,
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
