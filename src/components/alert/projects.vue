<template>
	<a-modal
		v-model="visible"
		:title="form.id ? '编辑项目' : '新增项目'"
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
			<a-form-model-item label="项目编号" prop="code">
				<a-input v-model="form.code" placeholder=""  :disabled="!!form.id"/>
			</a-form-model-item>
			<a-form-model-item label="项目名称" prop="name">
				<a-input v-model="form.name" placeholder="" />
			</a-form-model-item>
			<a-form-model-item label="客户" prop="customerId">
				<a-select v-model="form.customerId" placeholder="请选择客户">
					<a-select-option
						v-for="(item, idx) in preList.customers"
						:key="idx"
						:value="item.id"
						>{{
							item.name
						}}</a-select-option
					>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="是否已量产" prop="isSop">
				<a-select v-model="form.isSop" placeholder="请选择">
					<a-select-option
						v-for="(item, idx) in preList.sops"
						:key="idx"
						:value="item.code"
						>{{
							item.name
						}}</a-select-option
					>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="量产时间">
				<a-date-picker v-model="form.sopStartTime" valueFormat="YYYY-MM-DD HH:mm:ss"/>
			</a-form-model-item>
			<a-form-model-item label="项目经理" prop="managerId">
				<a-select v-model="form.managerId" placeholder="请选择">
					<a-select-option
						v-for="(item, idx) in preList.manegers"
						:key="idx"
						:value="item.id"
						>{{
							item.name + "[" + item.empNo + "]"
						}}</a-select-option
					>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="PE经理" prop="peManager">
				<a-select v-model="form.peManager" placeholder="请选择">
					<a-select-option
						v-for="(item, idx) in preList.peManegers"
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
import { add_post, modify_post, preAdd_get } from "../../api/comProjectController";
import mixins from "../../mixins/editor";

export default {
	data() {
		return {
			preList:{
				customers:[],
				manegers:[],
				peManegers:[],
				sops:[]
			},
			form: {
				code: "",
				name: "",
				customerId:'',
				isSop:'',
				sopStartTime: "",
				managerId: "",
				peManager:''
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入项目名称",
						trigger: "blur",
					},
				],
				code: [
					{
						required: true,
						message: "请输入项目编号",
						trigger: "blur",
					},
				],
				customerId: [
					{
						required: true,
						message: "请选择客户",
						trigger: "change",
					},
				],
				isSop: [
					{
						required: true,
						message: "请选择是否已量产",
						trigger: "change",
					},
				],
				managerId: [
					{
						required: true,
						message: "请选择项目经理",
						trigger: "change",
					},
				],
				peManager: [
					{
						required: true,
						message: "请选择PE经理",
						trigger: "change",
					},
				],
			},
		};
	},
	mounted() {
		this.getPreList();
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
		getPreList() {
			this.loading = true;
			preAdd_get()
				.then((res) => {
					this.loading = false;
					this.preList = res
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>