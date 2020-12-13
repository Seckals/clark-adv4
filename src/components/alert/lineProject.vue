<template>
	<a-modal
		v-model="visible"
		title="按产线列出的项目"
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
			<a-form-model-item label="产线编号">
				<a-input v-model="form.lineCode" placeholder=""  :disabled="true"/>
			</a-form-model-item>
			<a-form-model-item label="产线名称">
				<a-input v-model="form.lineName" placeholder="" :disabled="true" />
			</a-form-model-item>
			<a-form-model-item label="项目编号" prop="projectId">
				<a-select 
					show-search
					option-filter-prop="children"
					:filter-option="filterOption"
					v-model="form.projectId"
					placeholder="请选择"
					@change="selectData">
					<a-select-option
						v-for="(item, idx) in preList"
						:key="idx"
						:value="item.id"
						>{{
							item.projectCode
						}}</a-select-option
					>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="项目名称">
				<a-input v-model="form.projectName" placeholder="" :disabled="true" />
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
import { add_post, modify_post, prePage_get } from "../../api/comProjectLineRefController";
import mixins from "../../mixins/editor";

export default {
	data() {
		return {
			preList:[],
			form: {
				lineId:"",
				lineCode: "",
				lineName: "",
				projectId: "",
				projectName:""
			},
			rules: {
				projectId: [
					{
						required: true,
						message: "请选择项目编号",
						trigger: "change",
					},
				]
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
				data: {
					lineId:this.form.lineId,
					projectId:this.form.projectId
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
					lineId:this.form.lineId,
					projectId:this.form.projectId
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
		getPreList() {
			this.loading = true;
			prePage_get()
				.then((res) => {
					this.loading = false;
                    this.preList = res.projectList || []
				})
				.catch(() => {
					this.loading = false;
				});
		},
		filterOption(input, option) {
			return (
				option.componentOptions.children[0].text
					.toLowerCase()
					.indexOf(input.toLowerCase()) >= 0
			);
		},
		selectData(e){
			this.preList.forEach(item=>{
				if(item.id === e){
					this.form.projectName = item.projectName
				}
			})
		}
	},
};
</script>