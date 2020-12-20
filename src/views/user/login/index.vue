<template>
  <div class="mainWrapper">
    <div class="tabs">
      <router-link
        tag="div"
        to="/user/login"
        active-class="tabsItem tabsItemActive"
        class="tabsItem"
        >登录</router-link
      >
      <router-link
        tag="div"
        to="/user/regist"
        active-class="tabsItem"
        class="tabsItem"
        >注册</router-link
      >
    </div>
    <a-form :form="form" @submit="toLogin">
      <a-form-item>
        <a-input
          v-decorator="[
            'key',
            {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱或手机号！',
                },
              ],
            },
          ]"
          size="large"
          placeholder="请输入邮箱或手机号登录"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码！' }],
            },
          ]"
          size="large"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-button
        :loading="loading"
        type="primary"
        block
        size="large"
        html-type="submit"
        >登录</a-button
      >
    </a-form>
    <div class="pwdForget">
      <a href="#/user/resetpwd-sendmail">忘记密码</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { login } from '../../../api/auth'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'login' }),
      loading: false,
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    ...mapActions(['Login']),
    toLogin(e) {
      e.preventDefault()
      // this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          login({
            data: values,
          }).then((res) => {
            window.localStorage.setItem('auth-info', JSON.stringify(res))
            this.$store.commit('SET_DETAIL')
            this.loginSuccess()
          })
        }
      })
    },

    loginSuccess() {
      this.$nextTick(() => {
        console.log(process.env.NODE_ENV)
        const fromUrl = this.$route.query.from || '/mg-users'
        if (fromUrl.indexOf('//') === 0 || fromUrl.indexOf('http') === 0) {
          window.location.href = this.$route.query.from
        } else {
          if (process.env.NODE_ENV == 'development') {
            this.$router.push(fromUrl)
          } else if (process.env.NODE_ENV == 'prod') {
            window.location.href = 'http://49.235.30.187:8088/prod/#/'
          } else if (process.env.NODE_ENV == 'production') {
            window.location.href = 'http://172.23.2.17:8088/prod/#/'
          }
        }
      })

      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${this.$store.state.user},欢迎回来`,
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
