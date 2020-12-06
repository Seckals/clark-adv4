<template>
	<div class="i-content">
		<div class="i-content-title">{{ $route.meta.title }}</div>
		<div class="i-content-wrap">
			<div class="i-content-search">
				<slot name="search" />
				<div class="i-content-btns">
					<a-button @click="add">新 增</a-button>
					<a-button :disabled="!selectedRowKeys.length" @click="del"
						>删 除</a-button
					>
				</div>
			</div>
			<div class="i-content-table">
				<a-table
					:loading="loading"
					:row-key="record => {console.log(record)}"
					:row-selection="{
						selectedRowKeys: selectedRowKeys,
						onChange: onSelectChange,
					}"
					:pagination="pagination"
					:columns="columns"
					:data-source="data"
				/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			loading:false,
			pagination:{},
			selectedRowKeys: [],
		};
	},
	props: {
		columns: {
			type: Array,
			default: () => [],
		},
		data: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		onSelectChange(selectedRowKeys) {
			this.selectedRowKeys = selectedRowKeys;
		},
		add() {
			this.$emit("add");
		},
		del() {
			this.$emit("delete", this.selectedRowKeys);
		},
	},
};
</script>
<style lang="less" scoped>
.i-content-title {
	padding: 16px 32px;
	font-size: 16px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(0, 0, 0, 0.85);
	border-bottom: 1px solid #e9e9e9;
}
.i-content-wrap {
	padding: 24px;
}
.i-content-search {
	margin-bottom: 20px;
}
.i-content-btns > button {
	margin-right: 20px;
}
</style>