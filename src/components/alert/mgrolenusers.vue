<template>
  <a-modal
    v-model="visible"
    title="新增用户"
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
      <a-form-model-item label="用户" prop="userId">
        <a-select v-model="form.userId" placeholder="请选择">
          <a-select-option
            v-for="(item, idx) in preList"
            :key="idx"
            :value="item.userId"
            >{{ item.empName + '[' + item.empNo + ']' }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { linkSysUser, prelinkSysUser } from '../../api/myrole'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      preList: [],
      form: {
        userId: '',
      },
      rules: {
        userId: [
          {
            required: true,
            message: '请选择用户',
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
    getPreList() {
      this.loading = true
      prelinkSysUser({ roleId: this.$route.query.id })
        .then((res) => {
          this.loading = false
          this.preList = res
        })
        .catch(() => {
          this.loading = false
        })
    },
    add() {
      console.log(this.form, this.$route)

      this.loading = true
      linkSysUser({
        data: {
          roleId: this.$route.query.id,
          ...this.form,
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
<style lang="less">
.alert-employee {
  .ant-form-item:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
