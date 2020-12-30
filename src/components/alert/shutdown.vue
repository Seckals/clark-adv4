<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑停机代码' : '新增'"
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
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="停机类型" prop="downtimeType">
        <a-select v-model="form.downtimeType" placeholder="请选择">
          <a-select-option
            v-for="(item, idx) in downtimeTypes"
            :key="idx"
            :value="item.name"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="停机代码" prop="downtimeCode">
        <a-input v-model="form.downtimeCode" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="停机名称" prop="downtimeName">
        <a-input v-model="form.downtimeName" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { save_post, update_post } from '../../api/shutdown'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      downtimeTypes: [
        {
          id: '计划停机',
          name: '计划停机',
        },
        {
          id: '非计划停机',
          name: '非计划停机',
        },
      ],
      form: {
        downtimeType: '',
        downtimeName: '',
        downtimeCode: '',
        remark: '',
      },
      rules: {
        remark: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        downtimeCode: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        downtimeName: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        downtimeType: [
          {
            required: true,
            message: '请选择',
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
      let formdata = new FormData()
      Object.keys(this.form).map((i) => {
        formdata.append(i, this.form[i])
      })
      save_post({
        data: formdata,
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
      let formdata = new FormData()
      formdata.append('downtimeType', this.form.downtimeType)
      formdata.append('id', this.form.id)
      formdata.append('downtimeCode', this.form.downtimeCode)
      formdata.append('downtimeName', this.form.downtimeName)
      formdata.append('remark', this.form.remark)
      update_post({
        data: formdata,
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
