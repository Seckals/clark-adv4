<template>
	<a-modal
		v-model="visible"
		:title="form.id ? '编辑产线' : '新增产线'"
		:confirmLoading="loading"
		:width="500"
		@ok="ok"
		okText="确定"
		cancelText="取消"
		:destroyOnClose="true"
		:afterClose="close"
	>
		<a-form-model
			:model="form"
			ref="ruleForm"
			:rules="rules"
			:label-col="{ span: 4 }"
			:wrapper-col="{ span: 18 }"
		>
			<a-form-model-item label="产线编号" prop="code">
				<a-input v-model="form.code" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="产线名称" prop="name">
				<a-input v-model="form.name" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="显示位次" prop="seq">
				<a-input v-model="form.seq" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="产线主管">
				<a-select v-model="form.managerId" placeholder="请选择">
					<a-select-option
						v-for="(item, idx) in managers"
						:key="idx"
						:value="item.id"
						>{{
							item.name + "[" + item.empNo + "]"
						}}</a-select-option
					>
				</a-select>
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
import { add_post, modify_post, preAdd_get } from "../../api/comLineController";
import mixins from "../../mixins/editor";

export default {
	data() {
		return {
			managers: [],
			form: {
				code: "",
				name: "",
				seq: "",
				managerId: "",
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入产线名称",
						trigger: "blur",
					},
				],
				code: [
					{
						required: true,
						message: "请输入产线编号",
						trigger: "blur",
					},
				],
				seq: [
					{
						required: true,
						message: "请输入显示位次",
						trigger: "blur",
					},
				],
			},
		};
	},
	mounted() {
		this.getManagers();
	},
	mixins: [mixins],
	methods: {
		add() {
			this.loading = true;
			add_post({
				data: this.form,
			})
				.then(() => {
					this.loading = false;
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
					this.$emit("freash");
					this.visible = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
		getManagers() {
			this.loading = true;
			preAdd_get()
				.then((res) => {
					this.loading = false;
					this.managers = res.managers || [];
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>