<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import data from './mock/userinfo'
export default {
  name: 'app',
  data() {
    return {
      locale: zhCN,
    }
  },
  created() {
    const detail = localStorage.getItem('auth-info')
    if (!detail) {
      this.toLogin()
      return
    }
    this.$store.commit('SET_DETAIL')
  },
  methods: {
    toLogin() {
      const loginURL = `http://${
        window.location.hostname !== '172.23.2.17'
          ? '49.235.30.187'
          : '172.23.2.17'
      }:8088/auth/#/user/login?from=${encodeURIComponent(location.href)}`
      window.location.href = loginURL
    },
  },
}
</script>
