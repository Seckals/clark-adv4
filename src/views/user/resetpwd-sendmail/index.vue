<template>
  <div class="boxWrapper">
    <div class="title">{{ isSent ? '确认邮件' : '重置密码' }}</div>
    <div class="desc">
      <div v-if="isSent" class="descContent">
        重置密码的确认邮件已经发到您的邮箱地址{{
          email
        }}，请进入您的邮箱打开这封邮件，点击邮件里面的链接进行重置密码。
      </div>
      <div v-if="!isSent" class="descContent">
        请在以下文本框中输入您的邮箱地址进行密码重置。密码重置邮件将在
        1分钟内发送到您的邮箱，点击邮箱中的链接完成密码重置。如果长时间内没有收到密码重置邮件，请联系
        IT 部门寻求技术支持。
      </div>
    </div>
    <div class="mainWrapper">
      <a-form v-if="!isSent" :form="form" @submit="toForgetPassword">
        <a-form-item
          label="邮箱"
          labelAlign="left"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+([._\\-]*[A-Za-z0-9\u4e00-\u9fa5])*@([A-Za-z0-9\u4e00-\u9fa5]*([._\\-]*[A-Za-z0-9\u4e00-\u9fa5])*[-a-z0-9]*[A-Za-z0-9\u4e00-\u9fa5]+.){1,63}[A-Za-z0-9\u4e00-\u9fa5]+$/,
                    message: '请输入邮箱！',
                  },
                ],
              },
            ]"
            size="large"
            placeholder="请输入邮箱"
          >
          </a-input>
        </a-form-item>
        <a-button
          :loading="loading"
          type="primary"
          block
          size="large"
          html-type="submit"
          >发送重置密码邮件</a-button
        >
      </a-form>
      <a-button
        v-if="isSent"
        type="primary"
        block
        size="large"
        @click="
          () => {
            $router.push('/user/login')
          }
        "
      >
        确认
      </a-button>
    </div>
  </div>
</template>

<script>
import { sendEmail } from '../../../api/auth'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'resetpwd' }),
      email: '',
      isSent: false,
      loading: false,
    }
  },

  methods: {
    toForgetPassword(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          sendEmail({ data: values })
            .then(() => {
              this.isSent = true
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.boxWrapper {
  transform: translateY(-60px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 18px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 5px 0;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .desc {
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 5px 0;
    color: rgba(153, 153, 153, 1);
    max-width: 490px;

    .descTitle {
      margin-bottom: 20px;
    }

    .descContent {
      text-indent: 2em;
    }
  }

  .mainWrapper {
    width: 320px;
    margin-top: 30px;
  }
}
</style>
