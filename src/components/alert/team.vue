<template>
	<a-modal
		v-model="visible"
		:title="form.id ? '编辑团队' : '新增团队'"
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
			<a-form-model-item label="团队编号" prop="teamCode">
				<a-input v-model="form.teamCode" placeholder=""  :disabled="!!form.id"/>
			</a-form-model-item>
			<a-form-model-item label="团队名称" prop="teamName">
				<a-input v-model="form.teamName" placeholder="" />
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
import { add_post, modify_post } from "../../api/comTeamController";
import mixins from "../../mixins/editor";

export default {
	data() {
		return {
			form: {
				teamCode: "",
				teamName: ""
			},
			rules: {
				teamName: [
					{
						required: true,
						message: "请输入团队名称",
						trigger: "blur",
					},
				],
				teamCode: [
					{
						required: true,
						message: "请输入团队编号",
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
				data: {
					code:this.form.teamCode,
					name:this.form.teamName
				},
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
				data: {
					id:this.form.id,
					code:this.form.teamCode,
					name:this.form.teamName
				},
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