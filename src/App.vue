<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import data from './mock/userinfo'
export default {
  name: 'app',
  created() {
    // const detail = localStorage.getItem('auth-info')
		// if(!detail)this.toLogin()
    window.localStorage.setItem('auth-info',JSON.stringify(data))
    this.$store.commit('SET_DETAIL')
  },
  methods:{
		toLogin(){
			const loginURL = `http://${window.location.hostname !== '172.23.2.17' ? '49.235.30.187' : '172.23.2.17'}:8088/auth/#/user/login?from=${encodeURIComponent(location.href)}`
			window.location.href = loginURL
		},
	}
}
</script>
