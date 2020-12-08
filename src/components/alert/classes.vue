<template>
	<a-modal
		v-model="visible"
		:title="form.id ? '编辑班次' : '新增班次'"
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
			<a-form-model-item label="班次编号" prop="code">
				<a-input v-model="form.code" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="班次名称" prop="name">
				<a-input v-model="form.name" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="开始时间">
				<ITimepicker :data="form.shiftStartTime" @change="e=>form.shiftStartTime=e" placeholder="请选择"/>
			</a-form-model-item>
			<a-form-model-item label="结束时间">
				<ITimepicker :data="form.shiftEndTime" @change="e=>form.shiftEndTime=e" placeholder="请选择"/>
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
import { add_post, modify_post } from "../../api/comShiftController";
import mixins from "../../mixins/editor";

export default {
	data() {
		return {
			form: {
				code: "",
				name: "",
				shiftStartTime: "",
                shiftEndTime: ""
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入班次名称",
						trigger: "blur",
					},
				],
				code: [
					{
						required: true,
						message: "请输入班次编号",
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