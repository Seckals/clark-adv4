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
    console.log(detail)
    if (!detail) {
      this.toLogin()
      return
    }
    this.$store.commit('SET_DETAIL')
  },
  methods: {
    toLogin() {
      if (this.$route.path != '/login') {
        this.$router.push('/')
      }
    },
  },
}
</script>
