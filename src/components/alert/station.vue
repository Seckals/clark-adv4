<template>
	<a-modal
		v-model="visible"
		:title="form.id ? '编辑工位' : '新增工位'"
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
			:label-col="{ span: 5 }"
			:wrapper-col="{ span: 18 }"
		>
			<a-form-model-item label="工位编号" prop="code">
				<a-input v-model="form.code" placeholder=""  :disabled="!!form.id"/>
			</a-form-model-item>
			<a-form-model-item label="工位名称" prop="name">
				<a-input v-model="form.name" placeholder="a" />
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
import { add_post, modify_post } from "../../api/comStationController";
import mixins from "../../mixins/editor";

export default {
	data() {
		return {
			form: {
				code: "",
				name: "",
				status:'',
				managerId: ""
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入工位名称",
						trigger: "blur",
					},
				],
				code: [
					{
						required: true,
						message: "请输入工位编号",
						trigger: "blur",
					},
				]
			},
		};
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
		}
	},
};
</script>