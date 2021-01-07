<template>
  <a-modal v-model="visible"
           :title="'修改密码'"
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
                  :label-col="{ span: 7 }"
                  :wrapper-col="{ span: 15 }">
      <a-form-model-item label="新密码"
                         prop="password">
        <a-input v-model="form.password"
                 placeholder="请输入新密码" />
      </a-form-model-item>
      <a-form-model-item label="再次输入新密码"
                         prop="rePassword">
        <a-input v-model="form.rePassword"
                 placeholder="请输入新密码" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { newPassword } from '../api/auth'
import mixins from '../mixins/editor'

export default {
  data () {
    return {
      preList: {
        depts: [],
        states: [],
      },
      form: {
        password: '',
        rePassword: ''
      },
      rules: {
        password: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur',
          },
        ],
        rePassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mixins: [mixins],
  methods: {
    ok () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
         this.add()
        }
      })
    },
    add () {
      this.loading = true
      newPassword({
        data: this.form,
      })
        .then(() => {
          this.loading = false
          this.visible = false
          this.$router.push('/user/login')
          this.$message.success('密码修改成功')
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
