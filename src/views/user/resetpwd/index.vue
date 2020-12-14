<template>
  <div class="mainWrapper">
    <div class="title">重置密码</div>
    <a-form :form="form" @submit="toResetpwd">
      <a-form-item
        label="密码"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码！' }] },
          ]"
          size="large"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-decorator="[
            'rePassword',
            { rules: [{ required: true, message: '请再次输入密码！' }] },
          ]"
          size="large"
          placeholder="请再次输入密码"
          type="password"
        />
      </a-form-item>
      <a-button
        :loading="loading"
        type="primary"
        block
        size="large"
        html-type="submit"
        >确认重置密码</a-button
      >
    </a-form>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
// import AuthPage from '@views/components/authPage'
// import { timeFix } from '@/utils/time'
export default {
  // components: { AuthPage },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'rewstpwd' }),
      loading: false,
    }
  },
  // mounted(){console.log()},

  methods: {
    toResetpwd() {
      // e.preventDefault()
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     this.loading = true
      //     this.$api.userC
      //       .resetPassword({
      //         ...this.$router.query,
      //         ...values,
      //       })
      //       .then(({ code }) => {
      //         if (cose !== 200) return
      //         this.$router.push('/user/login')
      //       })
      //       .catch((res) => {})
      //       .finally(() => {
      //         this.loading = false
      //       })
      //   }
      // })
    },
    loginSuccess() {
      this.$nextTick(() => {
        this.$router.push('/')
      })

      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `，欢迎回来`,
        })
      }, 1000)
    },
    requestFailed(err) {
      // this.$refs['validate-code'].draw()
      this.$notification.error({
        message: '错误',
        description: (err || {}).message || '请求出现错误，请稍后再试',
        duration: 4,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.mainWrapper {
  width: 320px;
  transform: translateY(-60px);

  .title {
    font-size: 18px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 5px 0;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .anticon {
    font-size: 16px;
    color: inherit;
  }
}
</style>
