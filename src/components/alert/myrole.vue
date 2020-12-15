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
      <a-form-model-item label="角色名称" prop="name">
        <a-input v-model="form.name" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="模块" prop="moduleId">
        <a-select v-model="form.moduleId" placeholder="请选择">
          <a-select-option
            v-for="(item, idx) in preList.modules"
            :key="idx"
            :value="item.id"
            >{{ item.description }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-select v-model="form.status" placeholder="请选择" disabled>
          <a-select-option
            v-for="(item, idx) in preList.states"
            :key="idx"
            :value="item.id"
            >{{ item.status }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post, preAdd } from '../../api/myrole'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      preList: {
        modules: [],
        states: [{ status: '激活', id: 11 }],
      },
      form: {
        name: '',
        moduleId: '',
        status: '激活',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入',
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
    getPreList() {
      this.loading = true
      preAdd()
        .then((res) => {
          this.loading = false
          this.preList.modules = res.modules
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
