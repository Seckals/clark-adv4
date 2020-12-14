<template>
	<a-modal
		v-model="visible"
		:title="form.id ? '编辑职位' : '新增职位'"
		:confirmLoading="loading"
		:width="500"
		@ok="ok"
		okText="确定"
		cancelText="取消"
		:destroyOnClose="true"
	>
		<a-form-model
			:model="form"
			ref="ruleForm"
			:rules="rules"
			:label-col="{ span: 4 }"
			:wrapper-col="{ span: 18 }"
		>
			<a-form-model-item label="职位编号" prop="code">
				<a-input v-model="form.code" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="职位名称" prop="name">
				<a-input v-model="form.name" placeholder="" />
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
import { add_post, modify_post } from "../../api/hrPositionController";
export default {
	data() {
		return {
			visible: false,
			loading: false,
			form: {
				code: "",
				name: "",
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入职位名称",
						trigger: "blur",
					},
				],
				code: [
					{
						required: true,
						message: "请输入职位编号",
						trigger: "blur",
					},
				],
			},
		};
	},
	props: ['data'],
	watch: {
		data(value) {
			this.form = value || {};
		},
	},
	methods: {
		ok() {
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					this.form.id ? this.editor() : this.add();
				}
			});
		},
		show() {
			this.visible = true;
		},
		add() {
			this.loading = true;
			add_post({
				data: this.form,
			})
				.then(() => {
					this.loading = false;
					this.form = {};
					this.$emit("freash");
					this.visible = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
		editor() {
			this.loading = true;
			modify_post({
				data: this.form,
			})
				.then(() => {
					this.loading = false;
					this.form = {};
					this.$emit("freash");
					this.visible = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>