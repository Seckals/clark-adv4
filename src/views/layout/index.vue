<template>
	<a-layout class="i-layout">
		<Iaside />
		<a-layout>
			<Iheader />
			<a-layout-content class="i-main">
				<router-view/>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
import Iaside from "./aside";
import Iheader from "./header";

import data from '../../mock/userinfo'
export default {
	created(){
		localStorage.setItem('auth-info',JSON.stringify(data))
		// const detail = localStorage.getItem('auth-info')
		// if(!detail)this.toLogin()
		this.$store.commit('SET_DETAIL')
	},
	components: { Iaside, Iheader },
	methods:{
		toLogin(){
			const loginURL = `http://${window.location.hostname !== '172.23.2.17' ? '49.235.30.187' : '172.23.2.17'}:8088/auth/#/user/login?from=${encodeURIComponent(location.href)}`
			window.location.href = loginURL
		},
	}
};
</script>
<style lang='less' scoped>
.i-layout{
	min-height:100%;
}
.i-main {
	margin: 24px 16px;
	padding: 24px;
	background: #fff;
	min-height: 280px;
}
</style>