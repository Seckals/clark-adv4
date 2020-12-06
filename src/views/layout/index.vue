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

export default {
	components: { Iaside, Iheader },
};
</script>

<style lang='less' scoped>
.i-layout{
	min-height:100%;
}
.i-main {
	margin: 24px 16px;
	background: #fff;
	min-height: 280px;
}
</style>