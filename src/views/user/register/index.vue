<template>
  <div class="mainWrapper">
    <div class="tabs">
      <router-link
        tag="div"
        to="/login"
        active-class="tabsItem"
        class="tabsItem"
        >登录</router-link
      >
      <router-link
        tag="div"
        to="/regist"
        active-class="tabsItem tabsItemActive"
        class="tabsItem"
        >注册</router-link
      >
    </div>
    <a-form :form="form" @submit="toRigist">
      <a-form-item
        label="邮箱"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  required: true,
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+([._\\-]*[A-Za-z0-9\u4e00-\u9fa5])*@([A-Za-z0-9\u4e00-\u9fa5]*([._\\-]*[A-Za-z0-9\u4e00-\u9fa5])*[-a-z0-9]*[A-Za-z0-9\u4e00-\u9fa5]+.){1,63}[A-Za-z0-9\u4e00-\u9fa5]+$/,
                  message: '请输入您的公司邮箱！',
                },
              ],
            },
          ]"
          size="large"
          placeholder="请输入您的公司邮箱"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
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
          type="password"
        />
      </a-form-item>
      <a-form-item
        label="密码"
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
        >注册</a-button
      >
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'regist' }),
      submitting: false,
      loading: false,
    }
  },

  methods: {
    toRigist() {
      this.form.validateFields((err) => {
        if (!err) {
          this.loading = true
          // this.$api.auth
          //   .register(values)
          //   .then(({ code }) => {
          //     console.log(code)
          //     if (code === 200) {
          //       this.$router.push({
          //         path: '/register-result',
          //         query: { email: encodeURIComponent(values.email) },
          //       })
          //     }
          //   })
          //   .finally(() => {
          //     this.loading = false
          //   })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.mainWrapper {
  width: 320px;
  transform: translateY(-60px);

  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .tabsItem {
      cursor: pointer;
      font-size: 18px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      padding: 5px 0;
      color: rgba(153, 153, 153, 1);

      &.tabsItemActive {
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        border-bottom: 2px solid #1890ff;
      }

      &:last-child {
        margin-left: 20px;
      }
    }
  }

  .pwdForget {
    text-align: center;
    margin-top: 20px;

    a {
      float: none;
    }
  }

  .anticon {
    font-size: 16px;
    color: inherit;
  }
}
</style>
